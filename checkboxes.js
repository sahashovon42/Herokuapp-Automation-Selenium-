
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
    await driver.findElement(By.xpath("//a[contains(@href,'/checkboxes')]")).click();
    await driver.sleep(1000);

    //Check or uncheck any box//
    const boxData = await driver.findElements(By.xpath("//form[contains(@id,'checkboxes')]/input"));
    const selectCheckBox = getRandomNumber(0, boxData.length-1);
    await driver.sleep(2000);
    await boxData[selectCheckBox].click();

    const checkbox1 = await boxData[0].isSelected();
    const checkbox2 = await boxData[1].isSelected();

    if (checkbox1 && checkbox2) {
      console.log("Both checkboxes are checked.");
    } else if (checkbox1 && !checkbox2) {
      console.log("Only Checkbox 1 is checked.");
    } else if (!checkbox1 && checkbox2) {
      console.log("Only Checkbox 2 is checked.");
    } else {
      console.log("Both checkboxes are unchecked!");
    }

    await driver.quit();

}
herokuapp();