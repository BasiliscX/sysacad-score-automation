import puppeteer, { executablePath } from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

export async function fetchScores(data) {
    let browser;

    async function startBrowser() {
        try {
            browser = await puppeteer.launch({
                args: [
                    "--disable-setuid-sandbox",
                    "--no-sandbox",
                    "--single-process",
                    "--no-zygote",
                ],
                executablePath: process.env.NODE_ENV === "production"
                    ? process.env.PUPPETEER_EXECUTABLE_PATH
                    : puppeteer.executablePath(),
            });
        } catch (error) {
            console.error('Error launching browser:', error);
            throw new Error('Failed to launch browser');
        }
    }

    async function fetchData() {
        const page = await browser.newPage();
        try {
            await page.goto('https://sysacadweb.frgp.utn.edu.ar/loginAlumno.asp', { waitUntil: 'networkidle2' });

            await page.select('#selectFacultad', data.facultad);
            await page.type('#legajo', data.legajo);
            await page.type('input[name="password"]', data.password);

            await page.click('input[name="loginbutton"]');
            await page.waitForSelector('ul.textoTabla', { timeout: 10000 });

            await page.evaluate(() => {
                const examLink = Array.from(document.querySelectorAll('a')).find(
                    (el) => el.textContent?.includes('Exámenes')
                );
                if (examLink) examLink.click();
            });

            await page.waitForNavigation({ waitUntil: 'networkidle2' });
            await page.waitForSelector('table[border="1"]', { timeout: 10000 });

            const examData = await page.evaluate(() => {
                const rows = Array.from(document.querySelectorAll('table[border="1"] tr.textoTabla'));
                return rows.map(row => {
                    const cells = row.querySelectorAll('td');
                    if (cells.length === 6) {
                        return {
                            fecha: cells[0]?.textContent?.trim() || '',
                            materia: cells[1]?.textContent?.trim() || '',
                            nota: cells[2]?.textContent?.trim() || '',
                            especialidad: cells[3]?.textContent?.trim() || '',
                            plan: cells[4]?.textContent?.trim() || '',
                            codigo: cells[5]?.textContent?.trim() || '',
                        };
                    } else {
                        return null;
                    }
                }).filter(row => row !== null);
            });

            return examData;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw new Error('Failed to fetch data');
        } finally {
            await page.close();
        }
    }

    try {
        await startBrowser();
        const examData = await fetchData();
        await browser.close();
        return examData;
    } catch (error) {
        if (browser) {
            await browser.close();
        }
        throw error;
    }
}
