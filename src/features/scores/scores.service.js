import puppeteer from 'puppeteer';

export async function fetchScores(data) {

    // Define una variable global para almacenar la instancia del navegador
    let browser;

    // Función para iniciar el navegador
    async function startBrowser() {
        try {
            const launchOptions = {
                args: ['--no-sandbox']
            };
            browser = await puppeteer.launch(launchOptions);
            console.log('Browser launched successfully');
        } catch (error) {
            console.error('Error launching browser:', error);
        }
    }

    // Función para navegar y obtener datos
    async function fetchData() {
        const page = await browser.newPage();

        try {
            await page.goto('https://sysacadweb.frgp.utn.edu.ar/loginAlumno.asp');

            await page.select('#selectFacultad', data.facultad);
            await page.type('#legajo', data.legajo);
            await page.type('input[name="password"]', data.password);

            await page.click('input[name="loginbutton"]');

            await page.waitForSelector('ul.textoTabla');
            await page.evaluate(() => {
                const examLink = Array.from(document.querySelectorAll('a')).find(
                    (el) => el.textContent?.includes('Exámenes')
                );
                if (examLink) examLink.click();
            });

            await page.waitForNavigation();
            await page.waitForSelector('table[border="1"]');

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
            return [];
        } finally {
            await page.close();
        }
    }

    // Iniciar el navegador y ejecutar la función para obtener datos
    await startBrowser();
    const examData = await fetchData();
    await browser.close();

    return examData;
}
