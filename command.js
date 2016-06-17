#!/usr/bin/env casperjs

var system = require('system');
var casper = require('casper').create({
  onError: (function(error){
    casper.echo("failure due to error: " + error)
    casper.exit(1)
  })
});

var GITHUB_USERNAME = system.env.GITHUB_USERNAME;
var GITHUB_PASSWORD = system.env.GITHUB_PASSWORD;

if(!GITHUB_USERNAME || !GITHUB_PASSWORD) casper.die('Missing required env: GITHUB_USERNAME or GITHUB_PASSWORD')

casper.start('https://app.octoblu.com/');

casper.waitForText("Github")

casper.then(function() {
  this.click('.auth__button--github');
})

casper.waitForText("Sign in to GitHub")

casper.then(function(){
  this.fill('#login', {
    'login_field': GITHUB_USERNAME,
    'password': GITHUB_PASSWORD
  })
  this.click("#commit")
})

casper.waitForText("dashboard", function(){
  this.echo("success");
  this.exit()
}, function(){
  this.die("failure")
})

casper.run();
