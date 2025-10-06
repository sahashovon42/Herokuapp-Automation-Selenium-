
import { By, Key, Builder, Browser } from "selenium-webdriver";
import { expect } from "chai";

//const userAndpass = "admin";

// function getRandomNumber(min, max) {
//   return Math.floor(Math.random() * (max - min) + min);
// }

async function herokuapp(){
    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get("https://the-internet.herokuapp.com/");


    //basic_auth//
    await driver.findElement(By.xpath("//a[contains(@href,'/basic_auth')]")).click();
    await driver.sleep(2000);

    //log in//
    await driver.get("https://admin:admin@the-internet.herokuapp.com/basic_auth");
    await driver.sleep(2000);


    await driver.quit();

}
herokuapp();