const {test,request} = require ('@playwright/test');
let tken1;


test.beforeAll('travocart_login_case', async({request})=>
{
    const respayload = await request.post('https://staging-api.theflightsbookers.com/api/v1/user/login',
        {
            data: 
            {
                email:"harshad.w+1@crestinfosystems.com",
                password:"Harshad@96"
            },
        });

        const resreq = await respayload.json();
        //console.log(responsereq);

        tken1 = resreq.data.token;
        console.log(tken1);
});

test('web_URL', async ({page})=>
{
    page.addInitScript(value =>
    {
        window.localStorage.setItem('access', value);
    },tken1);

        await page.goto('https://staging.theflightsbookers.com/en/user-profile?tab=my-bookings');

        await page.pause();



});