const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");

async function register() {
  let firstName = "Mohammad";
  let lastName = "Musthafa"
  let email = "Musthafa@gmail.com";
  let password = "Musthafa@123"
  let confirmPassword = "Musthafa@123";

  //To wait for browser to build and launch properly
  let driver = await new Builder().forBrowser("chrome").build();

  //To fetch http://google.com from the browser with our code.
  await driver.get("http://localhost:3000");

  //To send a search query by passing the value in searchString.
  //registeration page
  await driver.findElement(By.id("first-name")).sendKeys(firstName);
  await driver.findElement(By.id("last-name")).sendKeys(lastName);
  await driver.findElement(By.id("email")).sendKeys(email);
  await driver.findElement(By.id("password")).sendKeys(password);
  await driver.findElement(By.id("confirm")).sendKeys(confirmPassword);
  await driver.sleep(1000)
  await driver.findElement(By.id("submit")).click();

  //Verify the page title and print it
  var title = await driver.getTitle();
  console.log("Title is:", title);
  await driver.sleep(1000)

  //It is always a safe practice to quit the browser after execution
  await driver.quit();
}

register();