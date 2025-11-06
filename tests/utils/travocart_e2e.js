class tracoUtils{

    constructor(page)
    {
        this.page = page;
    }

    async login()
    {
        await this.page.goto('https://staging.theflightsbookers.com/en');
        await this.page.getByRole('button',{name: 'Sign Up'}).click();

        await this.page.locator('.css-1jksid4').click();

        await this.page.locator("(//input[@placeholder= 'Enter Email'])[2]").type('harshad.w+56@crestinfosystems.com');
        await this.page.locator("//input[@name='password']",{delay: 100}).type("Harshad@9996");

        await this.page.getByRole('button',{name: 'Sign In'}).click();

          //await this.page.waitForTimeout(10000);
        return ;
    }
}
module.exports = tracoUtils;