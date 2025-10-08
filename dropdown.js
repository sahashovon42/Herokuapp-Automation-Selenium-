
import { By, Key, Builder, Browser } from "selenium-webdriver";
//import { expect } from "chai";


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function herokuapp(){
    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get("https://the-internet.herokuapp.com/");


    //basic_auth//
    await driver.findElement(By.xpath("//a[contains(@href,'/dropdown')]")).click();
    await driver.sleep(2000);

    //dropdown//
    const dropData = await driver.findElements(By.xpath("(//select[contains(@id,'dropdown')]/option)"));
    const selectDrop = getRandomNumber(1, dropData.length-1);
    await driver.sleep(2000);

    await dropData[selectDrop].click();
    await driver.sleep(2000);

    
    await driver.quit();

}
herokuapp();