const {test,request,expect} = require ('@playwright/test');
//const { validateHeaderValue } = require('http');
const {APIUtils} = require ('./utils/bg_API');

//const { request } = require('http');

let tok;

test('book_gobble_case', async ({page, context, request})=>
{
    //create a new object for class
      const apiUtils = new APIUtils(request);

     // call the getToken () method and store the token value in variable
      const token = await apiUtils.getToken();
      console.log(token);
    

    // Add the token in cookies
    await context.addCookies([
    {
      name: 'token',
      value: token,
      domain: '.bookgobble.com',
      path: '/',
    }
]);

    await page.goto("https://dev.bookgobble.com/memberhome");

    expect (page.locator("//h1[normalize-space()='My BookGobble']")).toBeVisible();

    await page.pause();

    // await page.getByPlaceholder('Email Address').type("harshad.w+redref01@crestinfosystems.com");
    // await page.getByPlaceholder('Password').type("Test@123");

});

/*
test.beforeAll(async({request})=>
{
   //const req = await request.newContext();
   const apiUtils = new APIUtils(request);
   const token = await apiUtils.getToken();
    console.log(token);
    
 /*  const payload =  await request.post('https://dev.bookgobble.com/api/user/login',
    {
        data: {email:"harshad.w+redref01@crestinfosystems.com",password:"Test@123",fcmToken:"flSscn2TDnu_vGMNoUED4Z:APA91bH81IndLulQhzHeYNTMiM-Tzn7a99cAnIqZ2o3k-kcl0SCffpbPhm3ooLtHBZMCKXp1EPyIISWDVMugFp5M5lwzFqeDP9JhuYV_OR9SDChSlvgKDxU",deviceId:"3"}

    })

    const payloadresponse = await payload.json();
    console.log(payloadresponse);

    tok = await payloadresponse.data;
    console.log(tok);  
});*/