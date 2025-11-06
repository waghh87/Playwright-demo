const {test, expect} = require ('@playwright/test');
const { asyncWrapProviders } = require('async_hooks');
//const { isContext } = require('vm');
//const { request } = require('http');
const tracoUtils = require ('./utils/travocart_e2e');
//const { constrainedMemory } = require('process');

let otptext;
//let verify_page

//Sign_up Front-end flow

test('Registration_flow', async({browser}) =>
{
    const context = await browser.newContext({
        
        
    });
    const page1 = await context.newPage();

   

    await page1.goto('https://staging.theflightsbookers.com/en');

    await page1.getByRole('button',{name: 'Sign Up'}).click();

    const u_name = "harshad.w+56@crestinfosystems.com";
    await page1.getByPlaceholder('Enter Email').type(u_name);
    await page1.getByPlaceholder('Enter Password*',{exact: 'Enter Password'}).type("Harshad@9996");
    await page1.getByPlaceholder('Confirm Password*',{exact: 'Confirm Password'}).type("Harshad@9996");

    await page1.locator("//input[@name= 'terms']").click();

    //Click on the Generate OTP button
   await page1.getByRole('button',{name: 'Generate OTP'}).click();

   await page1.waitForTimeout(2000);

   // New tab open
   const page2 = await context.newPage()
    await page2.goto('https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox');
    await page2.locator("//input[@type='email']").type("harshad.w@crestinfosystems.com");
    await page2.getByRole('button', {name: 'Next'}).click();

    await page2.waitForSelector("//input[@type='password']");
    await page2.locator("//input[@type='password']").type("Wagh@9996");
    await page2.getByRole('button', {name: 'Next'}).click();

    //await page2.waitFor('Search mail')
    // Search rental and press the Enter key
    await page2.getByPlaceholder('Search mail').type("no-reply@theflightsbookers.com");
    await page2.keyboard.press('Enter');

    await page2.waitForSelector('table');
    
    const pge = page2.url();
    console.log(pge);

    const un = page2.locator('tr.zE:visible').first();

    await expect(un).toBeVisible();

    await un.click();

    const pgms = page2.url();
    console.log(pgms);

    await page2.waitForTimeout(2000);
      
    // await page.waitForSelector("//div[@class='m_8055391434144773369content']");
     const otp = await page2.locator("//span[contains(@class,'otp-code')]").last();
     await otp.waitFor();
    // console.log(otp);
   
    otptext = await otp.innerText();
    console.log(otptext);
   
   // await page.pause();

   //Move back tab
   await page1.bringToFront(); //switch back to first tab

   await page1.locator("//input[@name='otp.0']").type(otptext);

   await page1.getByRole('button', {name: 'Verify & Continue'}).click();

   await page1.waitForLoadState('networkidle');

   // Round Trip
   //await page1.getByPlaceholder('Where from?').type('delhi');

    await page1.locator('.css-1czo6wm').click();
    await page1.getByRole('menuitem',{name:'Sign out'}).click();
    await page1.waitForTimeout(3000);
    await page1.getByRole('button',{name:'Logout'}).click();
    //await page1.pause();

});


test('Login_test_Case', async({page})=> 
{
  const loginUtil = new tracoUtils(page);
  await loginUtil.login(); // login code write on the utils file.
  
  //let dtc ="3"

  //await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000);
  //Enter the search button and type leaving from name
  await page.locator("//input[@name='flights.flight1.sourceAirport.query']").type('delhi');
  await page.getByRole('button',{name: 'DEL'}).click();

  //Enter the Search button and type going to
  await page.locator("//input[@name='flights.flight1.destinationAirport.query']").type('Mumbai');
  await page.getByRole('button',{name:'BOM'}).click();
  
  //Pick the date for departure and Return
  await page.locator("//input[@name='flights.flight1.departureDate']").click();
 // await page.locator('.MuiPickersArrowSwitcher-nextIconButton').click();
 // expect (page.getByRole('rowgroup').getByText(dtc,{exact:true}).toBeVisible());
  //const dat = page.getByRole('rowgroup').getByText(dtc,{exact:true});
  const enabledate = page.locator("//div[@role='gridcell']").filter({hasNot: page.locator('[disabled]')}).first();
//  console.log(dat);

  //Use the JavaScript evaluate method : best for scrolling issue.
   await enabledate.evaluate(element => element.click());

  //Pick the Return date flow.
  await page.locator("//input[@name='flights.flight1.returnDate']").click();
  //const ret = page.getByRole('rowgroup').getByText('2',{exact: true});

  const destenabledate = page.locator("//div[@role='gridcell']").filter({hasNot: page.locator('[disabled]')}).last();
  await destenabledate.evaluate(element => element.click());


  //Pasenger selection
  await page.getByPlaceholder('Passengers').click();

  const pas = page.locator('div').filter({hasText: 'Adult'}).getByRole('button').nth(1);
  const decre = page.locator('div').filter({hasText: 'Adult'}).getByRole('button').nth(0);
  //check the and increase the passenger detail
  //Adult
  const no_passenger = 2;
  //let count = 0;

   for(let i=0; i<no_passenger;i++)
   {
    if(i>4)
    {
        await decre.click();
    }
    else{
     await pas.click();
  }
     
  }

  //Child
  /*const child = page.locator('div .css-18zsr3k').filter({hasText:'Child'}).getByRole('button').nth(1);
  
  const no_child = 2;

  for(let j=0;j<no_child;j++)
  {
    await child.click();
  }

  await page.getByRole('combobox').nth(0).click();
  await page.getByRole('option',{name: '3',exact: true}).click();


  await page.getByRole('combobox').nth(1).click();
  await page.getByRole('option',{name: '3',exact: true}).click();*/

  await page.getByRole('button',{name: 'Done'}).click();

  await page.getByRole('button',{name: 'Search'}).click();


//Flight-search Page:
  await page.getByRole('tab', {name: 'Cheapest'}).click();
  //await page.waitForTimeout(10000)

  const time = (await page.locator('.time').nth(0).textContent()).trim();
  const time1 = time.replace(/^0/, '');
  console.log(time1)

  
  const du = await page.locator('.format.css-1upl8f0').nth(0).textContent();
   const up= await du.toUpperCase();
   console.log(up);

   const st = await page.locator('.date').nth(0).textContent();
   console.log(st);

   const tm = (time1+ " "+up);
   console.log(tm);

  // const amt= await page.locator('.amount').allTextContents();
  // console.log(amt);
  await page.waitForTimeout(5000);
  await page.getByRole('button',{name: 'View details'}).nth(0).click();
 
  await page.waitForTimeout(3000);

  await page.waitForSelector('.modal-wrapper-box.MuiBox-root.css-0');

  //get the destination value
  const dest_time = (await page.locator('.time').nth(1).textContent()).trim();
  const dest_time1 = dest_time.replace(/^0/, '');
  console.log(dest_time1);

  const fm = await page.locator('.format.css-1upl8f0').nth(0).textContent();
  const upfm = fm.toUpperCase();
  console.log(upfm);

  const dat1 = await page.locator('.date').nth(1).textContent();
  console.log(dat1);

  const tmm = (dest_time1+" "+upfm);
  console.log(tmm);



  //assert the ticket
  await expect(page.locator('.ticket-content').nth(0)).toContainText(tm,st,tmm,dat1);

  
  //get the return value
  const ret_time = (await page.locator('.time').nth(2).textContent()).trim();
  const ret_time1 = ret_time.replace(/^0/, '');
  console.log(ret_time1);

  const fmt = await page.locator('.format.css-1upl8f0').nth(4).textContent();
  const upfmt = fmt.toUpperCase();
  console.log(upfmt);

  const r_dat1 = await page.locator('.date').nth(3).textContent();
  console.log(r_dat1);
  

  
  const return_date = (ret_time1+" "+upfmt);
  console.log(return_date);

   await expect(page.locator('.ticket-content').nth(1)).toContainText(ret_time1,upfmt,return_date,r_dat1);

  await page.getByRole('button',{name: 'Continue'}).click();


  await page.waitForLoadState('networkidle');
  
  //await page.waitForSelector("div[class='total-price MuiBox-root css-0'] span[class='MuiTypography-root MuiTypography-body2 css-16u6scb']");
  
  //click on the "Continue to book" button
  await page.getByRole('button', {name: 'Continue to book'}).click();


  //Your detail Steps:
  // --- 1St Passenger details ---
  await page.getByPlaceholder('Enter First Name*').first().fill("Harshad");
  await page.getByPlaceholder('Enter Last Name*').first().fill("Wagh");

  await page.locator("//div[@aria-labelledby='gender-label-0 gender']").click();
  await page.getByRole('option', {name: 'Male', exact: true}).click();
  
  //handle date Picker
  //steps:
  /*
    1. click on the date picker field.
    2. click on the month text
    3. find and click on the selected year
    4. add the month value in the one variable.
    5. add the previous month button in the one variable
    6. add the date value in the one variable.
    7. for loop and set the condiion i<12 for td or table data
    8. check the current month value in the for loop
    9. check the condition with current month and before loop month.
    10. after if set the previous button click event.

  */
  //await page.locator("//input[@name = 'travelers.0.DOB']").click();

  await page.locator("input[name='travelers.0.DOB']").click();
  await page.getByRole('button', {name: 'calendar view is open, switch to year view'}).click();
  await page.getByRole('radio', {name: '1996', exact: true}).click();
  const months = await page.locator(".MuiPickersCalendarHeader-label.css-8633fn");
  //console.log(months);
  const prev_month = await page.getByRole('button', {name: 'Previous month'});
  const date_cell = await page.getByRole('gridcell', {name: '9',exact: true});


  for(let i=0;i<12;i++)
  {
    const current_month = await months.textContent();
    console.log(current_month);

    if(current_month?.includes('September'))
    {
       await date_cell.first().click();
        break;
    }
    
      await prev_month.click();
  }

//2nd Passenger
  await page.getByPlaceholder('Enter First Name*').last().fill("Nikita");
  await page.getByPlaceholder('Enter Last Name*').last().fill("Wagh");
  
  await page.locator("//div[@aria-labelledby='gender-label-1 gender']").click();
  await page.getByRole('option', {name: 'Female', exact: true}).click();

  await page.locator("input[name='travelers.1.DOB']").click();
  await page.getByRole('button',{name: 'calendar view is open, switch to year view'}).click();
  await page.getByRole('radio', {name: '2004'}).click();

 const pas2 = await page.locator('.MuiPickersCalendarHeader-label.css-8633fn');
 const pass_prev_month = await page.getByRole('button', {name: 'Previous month'});
 const pas_date_cell = await page.getByRole('gridcell', {name: '28',exact: true});
 
 for(let j=0; j<12;j++)
 {
   const pas2_cur_month = await pas2.textContent();
   console.log(pas2_cur_month);

   if(pas2_cur_month?.includes('April'))
   {
      await pas_date_cell.first().click();
      break;
   }

   await pass_prev_month.click();
 }

await page.locator('.selected-flag').click();
 
await page.locator("li[data-dial-code= '91']").click();
await page.getByPlaceholder('Phone no.*').fill('8488975254');

await page.getByRole('button', {name: 'Continue to book'}).click();


//4. Extras Steps:

await page.waitForURL('https://staging.theflightsbookers.com/en/extras');
const pge = 'https://staging.theflightsbookers.com/en/extras';

await expect(pge).toBeTruthy();
await page.getByRole('button', {name: 'Continue to book'}).click();

//5. Select Your Seat Step:
await page.waitForURL('https://staging.theflightsbookers.com/en/select-your-seat');

await page.getByRole('button', {name: 'Continue to book'}).click();

//6. Checkout Page:

await page.getByPlaceholder('Cardholder’s name').fill('Harshad Wagh');
await page.getByPlaceholder('**** **** **** ***').fill('4111 1111 1111 1111');
await page.getByPlaceholder('MM/YY').fill('09/30');
await page.getByPlaceholder('CVC/CVV').fill('123');

await page.getByRole('combobox').click();
await page.getByRole('option', {name: 'INR'}).click();

//Billing Details*

await page.getByPlaceholder('Address Line 1*').type('60, Vishwakarma Society');
await page.getByPlaceholder('Address Line 2').type('Bhaiya Nagar, Punagam');
await page.getByPlaceholder('Country*').type('India');
await page.getByRole('button', {name: 'India'}).click();
await page.getByPlaceholder('City*').type('Surat');
await page.getByPlaceholder('State*').type('Gujarat');
await page.getByRole('button', {name: 'Gujarat'}).click();
await page.getByPlaceholder('Zip*').type('395010');

await page.getByRole('button', {name: 'Book Now'}).click();

//await page.pause();
});

















/*test.describe.serial('gamil otp',()=>{
test('Pick the otp from gmail', async({page})=>
{

    await page.goto('https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox');
    await page.locator("//input[@type='email']").type("harshad.w@crestinfosystems.com");
    await page.getByRole('button', {name: 'Next'}).click();

    await page.waitForSelector("//input[@type='password']");
    await page.locator("//input[@type='password']").type("Wagh@9996");
    await page.getByRole('button', {name: 'Next'}).click();

    
    // Search rental and press the Enter key
    await page.getByPlaceholder('Search mail').type("no-reply@theflightsbookers.com");
    await page.keyboard.press('Enter');


  
    await page.waitForSelector('table');
    
    const pge = page.url();
    console.log(pge);

    const un = page.locator('tr.zE:visible').first();

    await expect(un).toBeVisible();

    await un.click();

    const pgms = page.url();
    console.log(pgms);

      await page.waitForTimeout(2000);
      
    // await page.waitForSelector("//div[@class='m_8055391434144773369content']");
     const otp = await page.locator("//span[contains(@class,'otp-code')]").last();
     await otp.waitFor();
    // console.log(otp);
   
    otptext = await otp.innerText();
    console.log(otptext);
   
   // await page.pause();
});
});
*/

/*Verify-OTP page
test('Verify OTP page', async({page})=>
{
   
  page.waitForEvent('popup') 
   page.click('text= open popup')
 // await page.goto(verify_page);
    
await page.pause();

});

test('page url', async({page})=>
{
  await page.goto('https://staging.theflightsbookers.com/en/user-profile?tab=my-bookings');
  const urL = page.url();
  console.log(urL)
  expect(page).toHaveURL(urL);

  await page.pause()

})*/

//API Flow
//Sign_up API Flow
/*test('sign_up_APi',async({request})=>
{
  const payld = await request.post('https://staging-api.theflightsbookers.com/api/v1/user/register',{
    data:{password:"Harshad@96",email:"harshad.w+11@crestinfosystems.com"}
  })

  const res= await payld.json();
  //console.log(res);

  const dta = await res.data;
  console.log(dta)
})*/


//OTP-Verify API

// test('verify_OTP',async ({request})=>{
  
//   const ps_pay = await request.post('https://staging-api.theflightsbookers.com/api/v1/user/verify-otp',{
//     data:{"otp_code":otptext,"type":"register","email":"harshad.w+11@crestinfosystems.com"}
//  })
//  const resp_verify = await ps_pay.json();
//  console.log(resp_verify);

//  const verify_data = await resp_verify.data;
//  console.log(verify_data);
// })


//Front-end OTp verify case:


