import { Builder, By, Browser } from "selenium-webdriver";

async function dragAndDropWithFallback(driver, sourceElem, targetElem) {
    // Try native actions dragAndDrop
    try {
        await driver.actions().dragAndDrop(sourceElem, targetElem).perform();
        // small wait to let DOM update
        await driver.sleep(500);
        return;
    } catch (err) {
        console.warn("Native dragAndDrop failed, falling back to JS simulation:", err.message);
    }

    // Fallback: simulate HTML5 Drag and Drop via JS
    const script = `
    function createEvent(typeOfEvent) {
      const event = new CustomEvent("CustomEvent");
      event.initCustomEvent(typeOfEvent, true, true, null);
      event.dataTransfer = {
        data: {},
        setData: function(key, value) { this.data[key] = value; },
        getData: function(key) { return this.data[key]; }
      };
      return event;
    }
    function dispatchEvent(element, event, transferData) {
      if (transferData !== undefined) {
        event.dataTransfer = transferData;
      }
      element.dispatchEvent(event);
    }
    const src = arguments[0];
    const dst = arguments[1];
    const dragStartEvent = createEvent('dragstart');
    dispatchEvent(src, dragStartEvent);

    const dropEvent = createEvent('drop');
    dispatchEvent(dst, dropEvent, dragStartEvent.dataTransfer);

    const dragEndEvent = createEvent('dragend');
    dispatchEvent(src, dragEndEvent, dragStartEvent.dataTransfer);
    return true;
  `;
    await driver.executeScript(script, sourceElem, targetElem);
    await driver.sleep(500);
}

async function herokuapp() {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    await driver.get("https://the-internet.herokuapp.com/");

    await driver.findElement(By.xpath("//a[contains(@href,'/drag_and_drop')]")).click();
    await driver.sleep(2000);

    const source = await driver.findElement(By.id("column-a"));
    const target = await driver.findElement(By.id("column-b"));

    const beforeA = await source.getText();
    const beforeB = await target.getText();
    await driver.sleep(3000);
    console.log("Before drag:", beforeA, beforeB); // Expect A B

    await dragAndDropWithFallback(driver, source, target);

    const afterA = await driver.findElement(By.id("column-a")).getText();
    const afterB = await driver.findElement(By.id("column-b")).getText();
    await driver.sleep(3000);
    console.log("After drag:", afterA, afterB); // Expect B A

    if (afterA === beforeB && afterB === beforeA) {
        console.log("Drag-and-drop succeeded and boxes swapped.");
    } else {
        console.error("Drag-and-drop did not swap boxes as expected.");
    }


    await driver.quit();
}
herokuapp();
