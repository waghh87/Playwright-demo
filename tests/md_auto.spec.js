const {test} = require ('@playwright/test');
const { request } = require('http');
let tok;

test.beforeAll('Merch_API_Call', async({request})=>
{
    const reqpayload = await request.post('https://dev.merchdominator.com/api/login',
        {
            data: {email: "harshad.w+limit_banner01@crestinfosystems.com", password: "12345678"}
        });

        const responsd = await reqpayload.json();
        console.log(responsd);

        tok = responsd.token;
        console.log(tok);

});

test('merch dominator', async({page})=>
{
    page.addInitScript( value =>
    {    
        window.localStorage.setItem('token',value);
   
    },tok);

    await page.goto("https://dev.merchdominator.com/home_page");
    await page.pause();



});