const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const googleLogin = "https://accounts.google.com/signin";
const googleMeet = "https://meet.google.com/cyy-ajdu-wxe";

puppeteer.use(StealthPlugin());

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--use-fake-ui-for-media-stream"],
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

  await page.waitForTimeout(1000);

  const xp = '//*[@class="VfPpkd-vQzf8d"]';
  const [el] = await page.$x(xp);
  await el.evaluate((b) => {
    console.log("click");
    b.click();
  });
  await page.waitForTimeout(3000);
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
}
run();
