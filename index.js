const app = require("express")();

let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
  console.log("core working")
} else {
  puppeteer = require("puppeteer");
console.log("normal working")
}

app.get("/api", async (req, res) => {
  let options = {};

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
    console.log("core working")
  }

  try {
    let browser = await puppeteer.launch(options);

    let page = await browser.newPage();
    await page.goto("https://watchoutmovies.vercel.app/");
    res.send(await page.title());
  } catch (err) {
    console.error(err);
    return null;
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});

module.exports = app;
