module.exports = {
  '#site#' : function (browser) {    
      browser
        .url('#siteUrl#')
        .waitForElementVisible('body', 1000)
        .waitForElementVisible('div.widgetPQP', 1000)
        .useXpath()
        .click('//a[text()="Avis clients"]')
        .useCss()
        .waitForElementVisible('body', 1000)
        .waitForElementVisible('.OS-header', 1000)
        .screenshot(true)
        .end();
  },
};