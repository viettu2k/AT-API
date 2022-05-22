const puppeteer = require('puppeteer-extra');
// const puppeteer = require('puppeteer');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const googleLogin = 'https://accounts.google.com/signin';
const https = require('https');
const fs = require('fs');
puppeteer.use(StealthPlugin());

const download = (url, destination) =>
    new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destination);

        https
            .get(url, (response) => {
                response.pipe(file);

                file.on('finish', () => {
                    file.close(resolve(true));
                });
            })
            .on('error', (error) => {
                fs.unlink(destination);

                reject(error.message);
            });
    });

async function run(googleMeet) {
    const browser = await puppeteer.launch({
        headless: false,
        // executablePath: 'C://Program Files//Google//Chrome//Application//chrome.exe',
        args: [
            '--use-fake-ui-for-media-stream',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            // '--user-data-dir=%d0azvjettu%\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1',
            // '--profile-directory=Profile 1',
        ],
    });

    const page = await browser.newPage();
    await page.goto(googleLogin);
    // // await page.waitFor(1000);
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', 'doazvjettu0012');
    await Promise.all([
        page.waitForNavigation(),
        await page.keyboard.press('Enter'),
    ]);
    await page.waitForSelector('input[type="password"]', { visible: true });
    await page.type('input[type="password"]', 'd0azvjettu');
    await Promise.all([
        await page.keyboard.press('Enter'),
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ]);
    await page.goto(googleMeet);

    // await page.waitForSelector(
    //     '#yDmH0d > c-wiz > div > div > div:nth-child(10) > div.crqnQb > div > div.gAGjv > div.vgJExf > div > div > div.d7iDfe.NONs6c > div > div.Sla0Yd > div > div.XCoPyb > div:nth-child(1) > button > span'
    // );
    await page.waitForTimeout(1000);
    await page.evaluate(() => {
        document
            .querySelector(
                '#yDmH0d > c-wiz > div > div > div:nth-child(10) > div.crqnQb > div > div.gAGjv > div.vgJExf > div > div > div.d7iDfe.NONs6c > div > div.Sla0Yd > div > div.XCoPyb > div:nth-child(1) > button > span'
            )
            .click();
    });

    await page.waitForSelector('.XEazBc.adnwBd');
    const grabStudentNames = await page.evaluate(async() => {
        const nameTags = document.querySelectorAll('.XEazBc.adnwBd');
        let studentNames = [];
        nameTags.forEach((tag) => {
            studentNames.push(tag.innerText);
        });
        return studentNames;
    });

    //  const grabStudentImages = await page.evaluate(async () => {
    //    const nameTags = document.querySelectorAll('.XEazBc.adnwBd');
    //    let studentNames = [];
    //    nameTags.forEach((tag) => {
    //      studentNames.push(tag.innerText);
    //    });

    //  });

    // await page.waitForSelector(
    //     '#ow3 > div.T4LgNb > div > div:nth-child(10) > div.crqnQb > div:nth-child(2) > div.zWfAib.eFmLfc.nrxduf.a1pVef > div:nth-child(2) > div.koV58.Zi94Db > div.LBDzPb > div'
    // ); // Method to ensure that the element is loaded
    // const logo = await page.$(
    //     '#ow3 > div.T4LgNb > div > div:nth-child(10) > div.crqnQb > div:nth-child(2) > div.zWfAib.eFmLfc.nrxduf.a1pVef > div:nth-child(2) > div.koV58.Zi94Db > div.LBDzPb > div'
    // ); // logo is the element you want to capture
    // await logo.screenshot({
    //     path: 'test.png',
    // });

    const images = await page.evaluate(() =>
        Array.from(document.images, (e) => e.src)
    );

    for (let i = 0; i < images.length; i++) {
        result = await download(images[i], `${grabStudentNames[i]}.png`);

        if (result === true) {
            console.log('Success:', images[i], 'has been downloaded successfully.');
        } else {
            console.log('Error:', images[i], 'was not downloaded.');
            console.error(result);
        }
    }

    console.log(grabStudentNames);

    await browser.close();

    // page.on("dialog", async (dialog) => {
    //   await dialog.dismiss();
    // });
}
run('https://meet.google.com/wgu-kjxc-mfo?authuser=1');