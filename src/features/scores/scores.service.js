import puppeteer from 'puppeteer';

export async function fetchScores(data){
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
    });
    const page = await browser.newPage();

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
    
    // await page.screenshot({
    //     path: 'sysacadcalificationsfromstudent.png'
    // });

    await browser.close();    

    return examData;

}