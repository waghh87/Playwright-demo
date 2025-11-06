const {test, expect} = require('@playwright/test');

test('Calendar handle', async ({page})=>
{
    const mothcan = "9";
    const daten = "9";
    const yearn = "2027";

    const exp = [mothcan,daten,yearn];


    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await page.locator('.react-date-picker__inputGroup').click();

    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();

    await page.getByText(yearn).click();

    //Using from directly button
    await page.locator('.react-calendar__year-view__months__month').nth(Number(mothcan)-1).click();
    await page.locator("//abbr[text()= '"+daten+"']").click();

    const input1 = page.locator('.react-date-picker__inputGroup__input')

    for(let i=0; i<exp,length;i++)
    {
        const value = await input1.nth(i).inputValue();
        expect(value).toEqual(exp[i]);
    }


//Use getby locator
/*
    await page.getByText('2025').click();

    await page.getByText("2027").click();
    await page.getByText("September").click();
    */
   // await page.locator("//abbr[text()='9']").click();

});

test('implement date picker in the other project', async({page})=>
{

    const monthc = "09";
    const datec = "20";
    const yearc = "2025";

     
    await page.goto("https://staging.theflightsbookers.com/en");

    await page.waitForLoadState('networkidle');

    await page.locator("//input[@name='flights.flight1.departureDate']").click();
    await page.locator(".css-1kele7z").click();
    await page.locator('.css-1kqbfht').click();

    const rows = await page.locator('.MuiPickersDay-root').getByText(datec);
    await rows.click();

  // console.log("rowdata",rows);
  
//   await page.locator()
   await page.locator("//input[@name ='flights.flight1.returnDate']").click();
   //await page.locator("//div[@id=':rl:-grid-label']").waitFor();
   await page.locator(".css-1kele7z").last().click();

   await page.locator('.css-zxk1w2').getByText("2030").click();
   await page.locator('.MuiPickersDay-root').getByText("9").first().click();

   //assert date field value


 console.log(await page.locator("input[inputmode*='numeric']").innerText());
//  console.log(tb.allTextContents());

 await page.pause();
});