import {test} from '@playwright/test';

test('Playwright Special Locator', async ({page}) => 
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Gender').selectOption("Female");
    await page.getByLabel('Employed').click();

    //getbyplaceholder()
    await page.getByPlaceholder('Password').fill("12345");

    //getbyrole()
    await page.getByRole('button', {name: 'Submit'}).click();

    //getbytext()
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();

    await page.getByRole('link', {name: 'Shop'}).click();

    //using the difficult way to find locator and click on the button
    // Case: if the one page same tag have and button text also same.
    await page.locator("app-card").filter({hasText: 'Blackberry'}).getByRole('button').click();

});


/*
Lecture 35: special locators in Playwright
- getby() locator:
  - getbylabel:- 
    - this locator generally use for select & click action. it doesn't work on the textbox action.
    - if clickable action on label then it's works.

-----------------------------------------------------------------------------------------------------------
Lecture 36: Filtering elements with GetByRole,GetByText and perform chaining methods in step
- getbyplaceholder():- 
  - only use for placeholder textbox & dropdown box.  
- getbyrole():-
  - 
- getbytext():-
  - fetch the text from whole page.

- In this lecture, we are using above special locator.
- Learn about how to identify product name while the button text is same using locator and getbyrole() function.
  - page.locator('l_name').filter({hasText: 'product_name'}).getbyrole('button').click();
- Explored the test runner feature. 
-----------------------------------------------------------------------------------------------------------

Lecture 37: Code downlaod
-----------------------------------------------------------------------------------------------------------

Lecture 38:
- getbylabel()
  - it's possible to add/edit the password field or another text box field.
  - if the reference attribute is added on the label tag.
  - reference attribut means: in the input tag have id or another element.
    - so in the able add the same with for or etc.
  - reference element value should be same.


*/