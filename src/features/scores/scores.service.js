import puppeteer, { executablePath } from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Fetches exam scores for a student using Puppeteer to interact with the university's web system.
 * @param {Object} data - An object containing login information.
 * @param {string} data.facultad - The UTN to select.
 * @param {string} data.legajo - The student's ID number.
 * @param {string} data.password - The student's password.
 * @returns {Promise<Array>} - A promise that resolves to an array of exam scores.
 */
export async function fetchScores(data) {
    let browser;

    /**
     * Starts the Puppeteer browser with specific launch options.
     * @returns {Promise<void>} - A promise that resolves when the browser is launched.
     * @throws {Error} - Throws an error if the browser fails to launch.
     */
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

    /**
     * Navigates to the specified URL and retrieves exam scores.
     * @returns {Promise<Array>} - A promise that resolves to an array of exam scores.
     * @throws {Error} - Throws an error if data fetching fails.
     */
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
