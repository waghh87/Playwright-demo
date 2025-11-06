// End-to-end flow with codegen tool
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://staging.theflightsbookers.com/en');
  await page.getByRole('button', { name: 'Sign Up Sign Up' }).click();
  await page.getByText('Sign In').click();
  await page.getByRole('textbox', { name: 'Enter Email' }).click();
  await page.getByRole('textbox', { name: 'Enter Email' }).fill('harshad.w+26@crestinfosystems.com');
  await page.getByRole('textbox', { name: 'Enter Password*' }).click();
  await page.getByRole('textbox', { name: 'Enter Password*' }).fill('Harshad@9996');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'Leaving from' }).click();
  await page.getByRole('textbox', { name: 'Leaving from' }).fill('delhi');
  await page.getByRole('button', { name: 'DEL - Indira Gandhi' }).click();
  await page.getByRole('textbox', { name: 'Going to' }).click();
  await page.getByRole('textbox', { name: 'Going to' }).fill('bom');
  await page.getByRole('button', { name: 'BOM - Chhatrapati Shivaji' }).click();
  
  await page.locator("//input[@name='flights.flight1.departureDate']").click();
  const enabledate = page.locator("//div[@role='gridcell']").filter({hasNot: page.locator('[disabled]')}).first();
  await enabledate.evaluate(element => element.click());

  //Pick the Return date flow.
  await page.locator("//input[@name='flights.flight1.returnDate']").click();
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
  
  await page.getByRole('button',{name: 'Done'}).click();

  await page.getByRole('button', { name: 'Search' }).click();

  await page.getByRole('tab', { name: 'Cheapest' }).click();

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
 
//  await page.waitForTimeout(5000);

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

  await page.getByRole('button', { name: 'Continue to book' }).click();

  await page.pause();


/*
  await page.locator('input[name="travelers.0.firstName"]').click();
  await page.locator('input[name="travelers.0.firstName"]').fill('harshad');
  await page.locator('input[name="travelers.0.firstName"]').press('Tab');
  await page.locator('.MuiButtonBase-root.Mui-focusVisible').press('Tab');
  await page.locator('input[name="travelers.0.lastName"]').fill('wagh');
  await page.locator('input[name="travelers.0.lastName"]').press('Tab');
  await page.getByRole('combobox', { name: 'Male' }).first().click();
  await page.getByRole('option', { name: 'Male', exact: true }).click();
  await page.locator('input[name="travelers.0.DOB"]').click();
  await page.getByRole('button', { name: 'calendar view is open, switch' }).click();
  await page.getByRole('radio', { name: '1996' }).click();
  await page.getByRole('button', { name: 'Previous month' }).click();
  await page.getByRole('gridcell', { name: '9', exact: true }).click();
  await page.locator('input[name="travelers.1.firstName"]').click();
  await page.locator('input[name="travelers.1.firstName"]').fill('yash');
  await page.locator('input[name="travelers.1.lastName"]').click();
  await page.locator('input[name="travelers.1.lastName"]').fill('patel');
  await page.locator('input[name="travelers.1.DOB"]').click();
  await page.getByRole('button', { name: 'calendar view is open, switch' }).click();
  await page.getByRole('radio', { name: '2000' }).click();
  await page.getByRole('button', { name: 'Previous month' }).click();
  await page.getByRole('button', { name: 'Previous month' }).click();
  await page.getByRole('gridcell', { name: '17' }).click();
  await page.getByTitle('United States: +').click();
  await page.getByText('+ 91').click();
  await page.getByRole('textbox', { name: 'Phone no.*' }).click();
  await page.getByRole('textbox', { name: 'Phone no.*' }).fill('8488975254');
  await page.getByRole('button', { name: 'Continue to book' }).click();
  await page.goto('https://staging.theflightsbookers.com/en/extras');
  await page.getByText('$312.40').click();
  await page.getByText('Total price$').click();
  await page.getByRole('button', { name: 'Continue to book' }).click();
  await page.getByRole('button', { name: 'Continue to book' }).click();*/
});