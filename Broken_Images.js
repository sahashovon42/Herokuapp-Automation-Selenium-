
import { By, Builder, Browser } from "selenium-webdriver";

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function herokuapp() {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get("https://the-internet.herokuapp.com/");


    ///broken_images//
    await driver.findElement(By.xpath("//a[contains(@href,'/broken_images')]")).click();
    await driver.sleep(1000);

    //lmages//

    const imgData = await driver.findElements(By.xpath("//div[contains(@class,'example')]/img"));
    //const maxImg = (imgData.length - 1);
    const selectImg = getRandomNumber(2, imgData.length - 1);
    await driver.sleep(2000);

    const Img = imgData[selectImg];
    const src = await Img.getAttribute("src");
    const naturalWidth = await driver.executeScript("return arguments[0].naturalWidth;", Img);

    if (naturalWidth === 0) {
        console.log(`Image #${selectImg + 1} is broken. src: ${src}`);
    } else {
        console.log(`Image #${selectImg + 1} is valid (naturalWidth=${naturalWidth}). src: ${src}`);
    }

    await driver.quit();

}
herokuapp();