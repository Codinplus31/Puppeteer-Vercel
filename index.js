const app = require("express")();
const puppeteer = require("puppeteer");

require("dotenv").config();
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
    
  });
console.log(process.env.NODE_ENV,"node_env")
console.log(process.env.PUPPETEER_EXECUTABLE_PATH,"node_exec")
app.get("/api", async (req, res) => {
  let options = {};

 /* if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
     // args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
     args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreDefaultArgs: ['--disable-extensions'],
      
      ignoreHTTPSErrors: true,
    };
    console.log("core working")
  }
*/
  try {
  //  let browser = await puppeteer.launch(options);

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
