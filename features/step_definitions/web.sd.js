// noinspection NpmUsedModulesInstalled
const { When, Then, Given } = require('@cucumber/cucumber');
const YAML = require('yaml');


When(/^I go to "([^"]*)"$/, async function (url) {
    await browser.url(url);
});

When (/^I input login and password$/, async function (table) {
    const rows = table.hashes()
    for (const row of rows) {
        await $("#login").setValue(row.login);
        await $("#password").setValue(row.password);
        await $("button").click(); 
        await expect( await ($("#error").getText())).toEqual(row.message); 
    }
});

When (/^I click the login button$/, async function () {
    await $("button").click();
});

When(/^I check the texts of the elements:$/, async function (table) {
    const rows = table.hashes()
    for (const row of rows) {
        expect(await $(row.selector).getText())
            .toEqual(row.text)
    }
});

When(/^I expect element: "([^"]*)" (text|value): "([^"]*)"$/, async function (selector, type, text) {
    const methods = {
        text: 'getText',
        value: 'getValue'
    }
    expect(await $(selector)[methods[type]]())
        .toEqual(text)
});

When('I go to {string} menu item', async function (item) {
    // add implementation here
    //await $("*=Create User").click()
    //await $("a[href='./formUser.html']").click()
    await $(`//a[normalize-space()='${item}']`).click();
    //a[normalize-space()='Create User']")
});

When(/^I fill form:$/, async function (formYaml) {
    //await browser.pause(3000);
    const formData = YAML.parse(formYaml);
    console.log({ formData });
    console.log(formData.City);
    // add implementation here
    await $("#email").addValue(formData.email);
    await $("#password").addValue(formData.password);
    await $("#address1").addValue(formData.address1);
    await $("#address2").addValue(formData.address2);
    await $("#city").addValue(formData.city);
    await $("#zip").addValue(formData.zip);
    await $("#description").addValue(formData.description);
    await $("button[type='submit']").click();
    await browser.pause(3000);
});

When('I login as: {string}, {string}', async function (login, password) {
    // add implementation here
    await $("#login").setValue(login);
    await $("#password").setValue(password);
    await $("button").click();
//    await browser.pause(10000);
});

When ('I wait for spiner is disabled', async function() {
    
    await $("#spinner").waitForDisplayed({
        timeout: 2000,
      });

    await $("#spinner").waitForDisplayed({
        reverse: true,
        timeout: 20000,
      });
  
});
