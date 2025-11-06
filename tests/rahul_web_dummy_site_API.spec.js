const {test} = require ('@playwright/test');
//const { request } = require('node:http');

let spectoken;

test.beforeAll('test API Call',async ({request}) => 
{
    //const req = await request.newContext();

    const payloadreq = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
        {
            data: {userEmail:"nkclient01@yopmail.com",userPassword:"Harshad@9996"}

        });

        const requestresponse = await payloadreq.json();
        console.log(requestresponse);

        spectoken= await requestresponse.token;
        console.log(spectoken);



});

test('test', async ({page}) =>
{
    page.addInitScript(value =>
    {
        window.localStorage.setItem('token',value);


    },spectoken);
    await page.goto('https://rahulshettyacademy.com/client');

});