import { test, expect } from '@playwright/test';
//const { compileFunction } = require('vm');

//test.describe.configure({mode: 'serial'});
test.describe('',()=>{
test('end-to-end demo with special locators- rgistration form test case',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await page.getByRole('link', {name: 'Register'}).click(); //click on the register link

    //Registration form filling
    await page.getByPlaceholder('First Name').type('harshad');
    await page.getByPlaceholder('Last Name').type('wagh');
    await page.getByPlaceholder('email@example.com').type('harshad.w+special_locator05@crestinfosystems.com');
    await page.getByPlaceholder('enter your number').type('8488975254');

    await page.getByRole('combobox').selectOption({label:'Engineer'});

    await page.locator('//body//app-root//label[2]').getByRole('radio', {name: 'Male'}).click();

//    await page.getByText('Male').check();
    //await page.getByRole('radio', {name:'Male'} ).check();

    await page.getByRole('textbox', {name: 'Passsword'}).type('Harshad@96');
    await page.getByLabel('Confirm Password').type('Harshad@96');

    await page.getByRole('checkbox').click();

    await page.getByRole('button', {name: 'Register'}).click();

});

test('login case with special locators', async ({page})=>
{
    const user_det = "harshad.w+special_locator05@crestinfosystems.com";

     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
     await page.getByPlaceholder('email@example.com').type(user_det);
     await page.getByPlaceholder('enter your passsword').type('Harshad@96');

     await page.getByRole('button', {name: 'Login'}).click();

     

    // await page.getByText('ZARA COAT 3').isVisible();
     await page.locator('.card-body').filter({hasText: 'ADIDAS ORIGINAL'}).getByRole('button',{name: 'Add To Cart'}).click();

    // go to the cart item
    await page.getByRole('listitem').getByRole('button', {name: 'Cart'}).click();

    //assertion for product name
    await expect(page.getByText('ADIDAS ORIGINAL')).toBeVisible();

    // click on the checkout button
    await page.getByRole('button', {name: 'Checkout'}).click();
    
    //My Order page
    //await page.getByRole('textbox', {name: 'Credit Card Number'}).clear();

    //dropdown handling expire card month & year
    await page.getByRole('combobox').nth(0).selectOption("09");
    await page.getByRole('combobox').nth(1).selectOption("30");

    await page.getByRole('textbox').nth(1).type('999');
    await page.getByRole('textbox').nth(2).type('harshad Wagh');
    await page.getByRole('textbox').nth(3).type('rahulshettyacademy');
    await page.getByRole('button', {name: 'Apply Coupon'}).click();
    await page.waitForTimeout(3000);
    await page.waitForLoadState('networkidle');
   // await page.waitForSelector("//label[@style='color: lightgray; font-weight: 600;']");
    await expect(page.getByText(user_det)).toBeVisible();

   
    await page.getByPlaceholder('Select Country').waitFor();
    await page.getByPlaceholder('Select Country').type("ind");
    await page.getByRole('button', {name: 'India'}).nth(1).click();

    //Click on the Place Order button
    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

    const order_id = (await page.locator("label[class='ng-star-inserted']").innerText()).replace(/\|/g, '');
    console.log(order_id);
  //  await expect(page.getByText(order_id)).toBeVisible();

    //CLick on the Order History Page
    await page.getByText('Orders History Page').click();

    await page.waitForLoadState('load');
    const od = order_id.trim();
    await expect(page.getByText(od)).toBeVisible();

  //  await page.getByText("View").first.click();
     await page.locator('.container.table-responsive.py-5').getByRole('button', {name: "View"}).first().click();

    //fecth the order id from URLs
     await page.waitForLoadState('load');
    
    const caurl = await page.url();
    console.log(caurl);

    const odtails = await page.locator('.col-text.-main').textContent();
    console.log(odtails);

    await expect(caurl.includes(odtails)).toBeTruthy();

    // const ac= await page.locator('.title').textContent();
    // await expect(ac.includes(' ADIDAS ORIGINAL ')).toBeTruthy();

    await expect(page.locator('.title')).toHaveText(' ADIDAS ORIGINAL ');

    await page.getByRole('listitem').getByRole('button', {name: ' Sign Out '}).click();    

    //await page.pause();



});
});