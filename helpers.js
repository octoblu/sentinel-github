var assertOnOctobluDashboard = function(casper){
  return casper.waitForText("dashboard", function(){
    return;
  }, function(){
    console.log("failure to load dashboard")
    console.log(casper.echo(casper.captureBase64('png')))
    casper.exit(1)
  });
};

var buildCasper = function(Casper){
  var casper = Casper.create({
    waitTimeout: (10 * 1000),
    onError: (function(error){
      console.log("failure due to error: " + error)
      console.log(casper.echo(casper.captureBase64('png')))
      casper.exit(1)
    })
  });

  casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36');
  casper.start('https://app.octoblu.com/');

  casper.waitForSelector(".auth.login");
  casper.on('error', function(error){
    console.log("failure due to casper error: " + error)
    console.log(casper.echo(casper.captureBase64('png')))
    casper.exit(1)
  });
  return casper;
};

var logout = function(casper){
  casper.waitForSelector('.TopBar-settings');
  casper.click(".TopBar-settings");

  casper.waitForSelector('a[aria-label="Sign Out"]');
  casper.click('a[aria-label="Sign Out"]');

  casper.waitForSelector(".auth.login");
}

var reportErrors = function(f) {
  try {
    return f();
  } catch (e) {
    casper.echo("failure in thenWithErrors: " + e)
    casper.echo(casper.captureBase64('png'))
    casper.exit(1)
  }
};

var thenWithErrors = function(casper, f){
  return casper.then(function() {
    return reportErrors(f);
  });
};

module.exports = {
  assertOnOctobluDashboard: assertOnOctobluDashboard,
  buildCasper: buildCasper,
  logout: logout,
  reportErrors: reportErrors,
  thenWithErrors: thenWithErrors
};
