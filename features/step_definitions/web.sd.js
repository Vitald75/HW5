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
    await $(`//a[normalize-space()='${item}']`).click();
    
});

When(/^I fill form:$/, async function (formYaml) {
    const formData = YAML.parse(formYaml);
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
});

When ('I wait for the spiner is disabled', async function() {
    
    await $("#spinner").waitForDisplayed({
        timeout: 2000,
      });

    await $("#spinner").waitForDisplayed({
        reverse: true,
        timeout: 20000,
      });
});

Then ('I expect to open form List of Users with correct users data', async function(formYaml) {
   const formData = YAML.parse(formYaml);
   await expect(await $("//div[text()='test@test.com']/following-sibling::div[@tabulator-field='address1']").getText()).toEqual(formData.address1);  
   await expect(await $("//div[text()='test@test.com']/following-sibling::div[@tabulator-field='address2']").getText()).toEqual(formData.address2);
   await expect(await $("//div[text()='test@test.com']/following-sibling::div[@tabulator-field='city']").getText()).toEqual(formData.city);  
   await expect(await $("//div[text()='test@test.com']/following-sibling::div[@tabulator-field='zip']").getText()).toEqual(formData.zip.toString());  
   await expect(await $("//div[text()='test@test.com']/following-sibling::div[@tabulator-field='description']").getText()).toEqual(formData.description);  
})
