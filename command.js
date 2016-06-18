#!/usr/bin/env casperjs

var system = require('system');
var casper = require('casper').create({
  onError: (function(error){
    console.log("failure due to error: " + error)
    casper.capture('error.png')
    console.log(this.echo(casper.captureBase64('png')))
    casper.exit(1)
  })
});

var GITHUB_USERNAME = system.env.GITHUB_USERNAME;
var GITHUB_PASSWORD = system.env.GITHUB_PASSWORD;

if(!GITHUB_USERNAME || !GITHUB_PASSWORD) {
  console.log('Missing required env: GITHUB_USERNAME or GITHUB_PASSWORD')
  this.exit(1)
}

casper.start('https://app.octoblu.com/');

casper.waitForText("Github")

casper.then(function() {
  this.click('.auth__button--github');
})

casper.waitForSelector("#login")

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
  console.log("failure")
  casper.capture('failure.png')
  console.log(this.echo(casper.captureBase64('png')))
  this.exit(1)
})

casper.run();
