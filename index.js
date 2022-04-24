const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const googleLogin = "https://accounts.google.com/signin";
const googleMeet =
  "https://meet.google.com/qzs-genq-jay?fbclid=IwAR0OIZBeAlQKQtsQ77C5ORQLigNzc46n0e7iVFWVnE-YNB3KPA7RoevWjSA";

puppeteer.use(StealthPlugin());

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--use-fake-ui-for-media-stream"],
  });
  const page = await browser.newPage();
  await page.goto(googleLogin);

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

  // await Promise.all([
  //   await page.evaluate(() => document.querySelector(".VfPpkd-vQzf8d").click()),
  //   page.waitForNavigation({ waitUntil: "networkidle2" }),
  // ]);

  const xp = '//*[@class="VfPpkd-vQzf8d"]';
  const [el] = await page.$x(xp);
  await el.evaluate((b) => b.click());

  await page.waitFor(2000);
  const grabStudentNames = await page.evaluate(() => {
    const nameTags = document.querySelectorAll(".XEazBc.adnwBd");
    let studentNames = [];
    nameTags.forEach((tag) => {
      studentNames.push(tag.innerText);
    });

    console.log(studentNames);

    return studentNames;
  });

  console.log(grabStudentNames);

  // await browser.close();
}
run();
