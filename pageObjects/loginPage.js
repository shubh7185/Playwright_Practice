class loginPage{


    constructor(page){
        this.page = page;
        this.signInButton= page.locator("[type='submit']");
        this.userEmail = page.locator("#userEmail");
        this.userPassword = page.locator("#userPassword");

        
    }

    async goTo()
    {
            await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username,Password)
    {
    await this.userEmail.fill(username);
    await this.userPassword.fill(Password);
    await this.signInButton.click();

    }
}

module.exports = {loginPage};