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

When('I go to {string} menu item', async function (item) {
    // add implementation here
    //await $("*=Create user").click()
    await $("a[href='./formUser.html']").click()
});

When(/^I fill form:$/, function (formYaml) {
    const formData = YAML.parse(formYaml);
    console.log({ formData });
    // add implementation here
});

When('I login as: {string}, {string}', async function (login, password) {
    // add implementation here
    await $("#login").setValue(login);
    await $("#password").setValue(password);
    await $("button").click();
});
