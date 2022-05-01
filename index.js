const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const googleLogin = "https://accounts.google.com/signin";
const googleMeet = "https://meet.google.com/kwk-bchb-bwk";

puppeteer.use(StealthPlugin());

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    args: [
      "--use-fake-ui-for-media-stream",
      "--user-data-dir=C:\\Users\\d0azvjettu\\AppData\\Local\\Google\\Chrome\\Profile 1",
    ],
  });
  const page = await browser.newPage();
  await page.goto(googleLogin);
  // await page.waitFor(1000);
  await page.waitForSelector('input[type="email"]');
  await page.type('input[type="email"]', "doazvjettu0012");
  await Promise.all([
    page.waitForNavigation(),
    await page.keyboard.press("Enter"),
  ]);
  await page.waitForSelector('input[type="password"]', { visible: true });
  await page.type('input[type="password"]', "d0azvjettu");
  await Promise.all([
    await page.keyboard.press("Enter"),
    page.waitForNavigation({ waitUntil: "networkidle2" }),
  ]);
  await page.goto(googleMeet);

  // await page.waitForSelector("VfPpkd-vQzf8d");
  await page.waitForTimeout(1000);

  const xp = '//*[@class="VfPpkd-vQzf8d"]';
  const [el] = await page.$x(xp);
  await el.evaluate((b) => {
    console.log("click");
    b.click();
  });
  // await page.waitForTimeout(3000);
  await page.waitForSelector(".XEazBc.adnwBd");
  const grabStudentNames = await page.evaluate(async () => {
    const nameTags = document.querySelectorAll(".XEazBc.adnwBd");
    let studentNames = [];
    nameTags.forEach((tag) => {
      studentNames.push(tag.innerText);
    });
    return studentNames;
  });

  console.log(grabStudentNames);

  await browser.close();

  // page.on("dialog", async (dialog) => {
  //   await dialog.dismiss();
  // });
}
run();
