
import { By, Key, Builder, Browser} from "selenium-webdriver";
//import { expect } from "chai";


async function herokuapp() {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get("https://the-internet.herokuapp.com/");


    //Add Elements//
    await driver.findElement(By.xpath("//a[contains(@href,'/context_menu')]")).click();
    await driver.sleep(1000);

    //Check or uncheck any box//
    const context_menuData = await driver.findElement(By.id("hot-spot"));
    await driver.actions().contextClick(context_menuData).perform();
    await driver.sleep(3000);

    await driver.quit();

}
herokuapp();