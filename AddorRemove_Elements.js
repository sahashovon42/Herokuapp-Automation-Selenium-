
import { By, Key, Builder, Browser } from "selenium-webdriver";
//import { expect } from "chai";

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function herokuapp(){
    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get("https://the-internet.herokuapp.com/");


    //Add Elements//
    await driver.findElement(By.xpath("//a[contains(@href,'/add_remove_elements/')]")).click();
    await driver.sleep(2000);

    //add 3 elements//
    await driver.findElement(By.xpath("//button[contains(@onclick,'addElement')]")).click();
    await driver.findElement(By.xpath("//button[contains(@onclick,'addElement')]")).click();
    await driver.findElement(By.xpath("//button[contains(@onclick,'addElement')]")).click();
    await driver.sleep(2000);

    //Remove just 1 Element//
    const elementData = await driver.findElements(By.xpath("//div[contains(@id,'elements')]/button"));
    const maxElement = (elementData.length - 1);
    const selectElement = getRandomNumber(1, maxElement)

    await elementData[selectElement].click();
    await driver.sleep(2000);


    await driver.quit();

}
herokuapp();