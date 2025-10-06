
import { By, Key, Builder, Browser } from "selenium-webdriver";
//import { expect } from "chai";

// function getRandomNumber(min, max) {
//   return Math.floor(Math.random() * (max - min) + min);
// }

async function herokuapp(){
    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get("https://the-internet.herokuapp.com/");


    //digest_auth//
    await driver.findElement(By.xpath("//a[contains(@href,'/disappearing_elements')]")).click();
    await driver.sleep(2000);

 
    //check elements//
    const elements = await driver.findElements(By.xpath("//div/ul/li"));
    console.log(`Found Toatl ${elements.length} Elements(Without Reload)`);

    for (let i = 0; i < elements.length; i++) {
      const text = await elements[i].getText();
      console.log(`${i+1}. ${text}`);
    }
    await driver.sleep(2000);

    //1st Reload//
    await driver.executeScript("location.reload();");

    const elements1 = await driver.findElements(By.xpath("//div/ul/li"));
    console.log(`\nFound Toatl ${elements1.length} Elements(1st Reload)`);

    for (let i = 0; i < elements1.length; i++) {
      const text = await elements1[i].getText();
      console.log(`${i+1}. ${text}`);
    }
    await driver.sleep(2000);
    

    //2nd reload
    await driver.executeScript("location.reload();");

    const elements2 = await driver.findElements(By.xpath("//div/ul/li"));
    console.log(`\nFound Toatl ${elements2.length} Elements(2nd Reload)`);

    for (let i = 0; i < elements2.length; i++) {
      const text = await elements2[i].getText();
      console.log(`${i+1}. ${text}`);
    }
    await driver.sleep(2000);
    


    await driver.quit();
}
herokuapp();