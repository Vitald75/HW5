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
        await browser.pause(2000);
        await $("button").click(); 
        await $("#error`).isDisplayed;
        await expect( await ($("#error").getText())).toEqual(row.message); 
    }
  //  await browser.pause(2000);
  //  await $("button").click();

  //  console.log(login);
  //  console.log(password);
  
});

When (/^I click the login button$/, async function () {
    //console.log(button);
    //await $(`button=${button}`).click();
    await $("button").click();
    await browser.pause(2000);
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

When('I go to {string} menu item', function (item) {
    // add implementation here
});

When(/^I fill form:$/, function (formYaml) {
    const formData = YAML.parse(formYaml);
    console.log({ formData });
    // add implementation here
});

When('I login as: {string}, {string}', function (login, password) {
    // add implementation here
});
