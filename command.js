#!/usr/bin/env casperjs

var system = require('system');
var casper = require('casper').create({
  waitTimeout: (10 * 1000),
  onError: (function(error){
    console.log("failure due to error: " + error)
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

casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36');
casper.start('https://app.octoblu.com/');

casper.waitForText("Github")

casper.then(function() {
  this.click('.auth__button--github');
})

casper.then(function(){
  casper.waitForSelector("#login")
})

casper.then(function(){
  this.capture('pre-form.png')
  this.fill('#login', {
    'login': GITHUB_USERNAME,
    'password': GITHUB_PASSWORD
  })

  this.click('input[name="commit"]')
})

casper.waitForText("dashboard", function(){
  this.echo("success", 'INFO');
  this.exit()
}, function(){
  this.echo("failure", 'ERROR');
  console.log(this.echo(casper.captureBase64('png')))
  this.exit(1)
})

casper.run();
