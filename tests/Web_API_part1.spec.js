import { test, request, expect } from '@playwright/test';
let tk;
let orderId;


// Login_API Call


test.beforeAll( async() =>
{

   const req = await request.newContext();

    const loginPayload = await req.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
    {
       data: {userEmail:"nkclient01@yopmail.com",userPassword:"Harshad@9996"},
    });
    
    expect(loginPayload.ok()).toBeTruthy(); // check the status code assertion using payload variable

    const loginResponseJson = await loginPayload.json(); // this is the Json body value
    console.log(loginResponseJson);

     tk = loginResponseJson.token; //Store the token data at one varibale.  print or get only message parameter
    console.log(tk);

    //
   const order_response = await req.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
        data: {orders: [
                    {
                    "country": "India",
                    "productOrderedId": "68a961719320a140fe1ca57c"
                    }
                ]},
                headers: {
                    'Authorization': tk,
                    'Content-type': 'application/json'
                }
    })
    const order_responseJson = await order_response.json();
    console.log(order_responseJson);
    orderId= order_responseJson.orders[0];
});

