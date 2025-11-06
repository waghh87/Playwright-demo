
//# Section 9: Handling Web dialogs, Frames & event listeners lecture

//Lecture 44: How to validate if element is hidden, displayed mode with expect assertions

const {test, expect} = require ('@playwright/test');

const s_url = "https://rahulshettyacademy.com/AutomationPractice/";

test('Check the hidden element validate', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    expect (page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();

    //check the hidden elements after the element is hide. -- Using toBeHidden() method
    expect(page.locator('#displayed-tex')).toBeHidden();

    await page.pause();
});

//Lecture 45: How to automate Java/Javascript popups with playwright
test('handle the Alert & popups', async({page})=>
{
    await page.goto(s_url);
   
    //On() we are using On method for handling the Alert/popups of Java/Javascript
    await page.on('dialog', dialog => dialog.dismiss());
    //   await page.pause();
    await page.locator('#confirmbtn').click();

    //use of the Hover() method with Playwright
    await page.locator('#mousehover').hover();
    //await page.pause();

    // const framespage = page.frameLocator('#courses-iframe');
    // await framespage.locator("li a[href *= 'learning-path']:visible").click();
});

//Lecture 46: How to handle & Automate frames with Playwright

test.only('handle the frames concept', async ({page})=>
{
    await page.goto(s_url);

    //await page.waitForLoadState('load');

    const framespage = page.frameLocator('#courses-iframe');
    
    await framespage.locator("li a[href*='lifetime-access']:visible").click();

    const textcheck = await framespage.locator('.text h2').textContent();
    console.log(textcheck.split(" ")[1]);
    //console.log(textcheck);
});


test('Integrate API with web test case', async ({page})=>
{
   /* lecture 47:
    - 
   
   */

});
