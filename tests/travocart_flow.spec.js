const {test, expect,request} = require ('@playwright/test');
//const { request } = require('http');

let otptext
let verify_page

//Sign_up Front-end flow
test('Registration_flow', async({page}) =>
{
    await page.goto('https://staging.theflightsbookers.com/en');

    await page.getByRole('button',{name: 'Sign Up'}).click();

    await page.getByPlaceholder('Enter Email').type("harshad.w+23@crestinfosystems.com");
    await page.getByPlaceholder('Enter Password*',{exact: 'Enter Password'}).type("Harshad@9996");
    await page.getByPlaceholder('Confirm Password*',{exact: 'Confirm Password'}).type("Harshad@9996");

    await page.locator("//input[@name= 'terms']").click();

    //Click on the Generate OTP button
   await page.getByRole('button',{name: 'Generate OTP'}).click();

   await page.waitForTimeout(5000);

 

   await page.locator('.authentication-modal')
  verify_page = page.url();
  console.log(verify_page);
  //  await page.pause();
});

test.describe.serial('gamil otp',()=>{
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

//Verify-OTP page
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

})

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


