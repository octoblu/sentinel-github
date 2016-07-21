var filename = "image";

var assertOnOctobluDashboard = function(casper){
  return casper.waitForSelector(".TabBar-title", function(){
    return;
  }, function(){
    console.log("failure to load dashboard")
    casper.capture('./images/' + randomFilename());
    casper.exit(1)
    casper.waitForSelector('.endo-of-the-world', (function(){}), (function(){}), 30000);
  }, 30 * 1000);
};

var buildCasper = function(Casper, _filename){
  filename = _filename;
  var casper = Casper.create({
    waitTimeout: (10 * 1000),
    onError: (function(error){
      console.log("failure due to error: " + error)
      casper.capture('./images/' + randomFilename());
      casper.exit(1)
      casper.waitForSelector('.endo-of-the-world', (function(){}), (function(){}), 30000);
    })
  });

  casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36');
  casper.start('https://app.octoblu.com/');

  casper.waitForSelector(".auth.login");
  casper.on('error', function(error){
    console.log("failure due to casper error: " + error)
    casper.capture('./images/' + randomFilename());
    casper.exit(1)
    casper.waitForSelector('.endo-of-the-world', (function(){}), (function(){}), 30000);
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

var randomFilename = function(){
  var a = Math.random();
  return filename+"-"+parseInt(a * 1000)+".png";
}

var reportErrors = function(casper, f) {
  try {
    return f();
  } catch (e) {
    casper.echo("failure in thenWithErrors: " + e)
    casper.capture('./images/' + randomFilename());
    casper.exit(1)
    casper.waitForSelector('.endo-of-the-world', (function(){}), (function(){}), 30000);
  }
};

var thenWithErrors = function(casper, f){
  return casper.then(function() {
    return reportErrors(casper, f);
  });
};

module.exports = {
  assertOnOctobluDashboard: assertOnOctobluDashboard,
  buildCasper: buildCasper,
  logout: logout,
  reportErrors: reportErrors,
  thenWithErrors: thenWithErrors
};
