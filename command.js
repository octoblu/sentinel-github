#!/usr/bin/env casperjs

var system  = require('system');
var helpers = require('./helpers');
var Casper  = require('casper');
var casper  = helpers.buildCasper(Casper);

var GITHUB_USERNAME = system.env.GITHUB_USERNAME;
var GITHUB_PASSWORD = system.env.GITHUB_PASSWORD;

if(!GITHUB_USERNAME || !GITHUB_PASSWORD) {
  console.log('Missing required env: GITHUB_USERNAME or GITHUB_PASSWORD')
  this.exit(1)
}

helpers.thenWithErrors(casper, function() {
  this.click('.auth__button--github');
})

casper.waitForSelector("#login")

helpers.thenWithErrors(casper, function() {
  this.capture('pre-form.png')
  this.fill('#login', {
    'login': GITHUB_USERNAME,
    'password': GITHUB_PASSWORD
  })

  this.click('input[name="commit"]')
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
