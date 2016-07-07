#!/usr/bin/env casperjs

var system  = require('system');
var helpers = require('./helpers');
var Casper  = require('casper');
var casper  = helpers.buildCasper(Casper, 'sentinel-github');

var GITHUB_USERNAME = system.env.GITHUB_USERNAME;
var GITHUB_PASSWORD = system.env.GITHUB_PASSWORD;

if(!GITHUB_USERNAME || !GITHUB_PASSWORD) {
  console.log('Missing required env: GITHUB_USERNAME or GITHUB_PASSWORD')
  casper.exit(1)
}

helpers.thenWithErrors(casper, function() {
  casper.click('.auth__button--github');
})

casper.waitForSelector("#login")

helpers.thenWithErrors(casper, function() {
  casper.capture('pre-form.png')
  casper.fill('#login', {
    'login': GITHUB_USERNAME,
    'password': GITHUB_PASSWORD
  })

  casper.click('input[name="commit"]')
})

helpers.assertOnOctobluDashboard(casper);
helpers.thenWithErrors(casper, function(){
  helpers.logout(casper);
});
helpers.thenWithErrors(casper, function(){
  casper.echo("success");
  casper.exit(0);
})

casper.run();
