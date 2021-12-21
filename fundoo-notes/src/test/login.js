const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");

async function signIN() {

  let email = "Musthafa@gmail.com";
  let password = "Musthafa@123"

  //To wait for browser to build and launch properly
  let driver = await new Builder().forBrowser("chrome").build();

  //To fetch http://google.com from the browser with our code.
  await driver.get("http://localhost:3000/login");

  //To send a search query by passing the value in searchString.
  //login page
  await driver.findElement(By.id("email")).sendKeys(email);
  await driver.findElement(By.id("password")).sendKeys(password);
  await driver.findElement(By.id("submit")).click();

  await driver.sleep(3000)

  //create Note
  await driver.findElement(By.id("note-title")).click();
  await driver.findElement(By.id("note-title")).sendKeys("hello");
  await driver.findElement(By.id("note-content")).sendKeys("world");
  await driver.findElement(By.id("note-submit")).click();

  //It is always a safe practice to quit the browser after execution
  await driver.quit();
}

signIN();