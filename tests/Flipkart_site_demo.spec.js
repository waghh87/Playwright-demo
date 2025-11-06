const {test, expect} = require ('@playwright/test');


// test('register or login case for flipkart website', async({browser}) => 
// {
//   const lg1 = await browser.newContext();
//   const page = await lg1.newPage();

//   await page.goto('https://www.flipkart.com/');

//   await page.waitForLoadState('networkidle');

//   await page.locator ('.H6-NpN._3N4_BX').click();
//   //await page.getByRole('link', {name: 'Login Login'}).click();

//   // Click on the Sign up URL
//   await page.getByRole('link', {name: 'New to Flipkart? Create an account'}).click();

//   await page.locator('.r4vIwl').waitFor();

//   await page.locator('.r4vIwl').fill("8488975254");
//   await page.pause();
// });

test('register_flipkart', async({page})=>
{
    await page.goto('https://www.flipkart.com/account/login?ret=/');

    await page.getByRole('link',{name:'New to Flipkart? Create an account'}).click();

    await page.locator('.r4vIwl').type("8460120063");

    await page.getByRole('button', {name: 'CONTINUE'}).click();
    await page.waitForTimeout(5000);

    const tre = page.locator('.WDL02o');

       if( expect(tre).toBeVisible){
    await page.getByRole('button',{name:'Signup'}).click();
       }
    await page.pause();

});