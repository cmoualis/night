module.exports = {
  '#site#' : function (browser) {    
      browser
        .url('#siteUrl#')
        .waitForElementVisible('body', 1000)
        .waitForElementVisible('div.PQP-widget', 1000)
        .useXpath()
        .pause(2000)
        .click('//a[text()="Avis clients"]')
        .useCss()
        .waitForElementVisible('body', 1000)
        .waitForElementVisible('.OS-header', 1000)
        .pause(2000)
        .end();
  },
};