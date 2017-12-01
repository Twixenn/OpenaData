var _ = require('phantomjs');
var _require = require;
var url = require('./names.js');

openPage(url());

function openPage(values) {
  var fs = _require('fs');
  var page = _require('webpage').create();
  page.settings.userAgent = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36";
  page.viewportSize = {width: 1280, height: 1024};
  var city = values.from;
  var checkin = values.checkin;
  var checkout = values.checkout;
  var url ="https://www.airbnb.se/s/Berlin/homes?refinement_path=%2Fhomes&allow_override%255B%25=&allow_override%5B%5D=&checkin=2017-12-29&checkout=2017-12-30&s_tag=sW4RI5XX";

  page.onConsoleMessage = function(msg) {
    console.log(msg);
  }

  page.open('https://www.airbnb.se/s/' + city +'/homes?refinement_path=%2Fhomes&allow_override%255B%25=&allow_override%5B%5D=&checkin=' + checkin + '&checkout=' + checkout, function(status) {
    console.log("Status: " + status);
    if(status === "success") {
    } else {
      console.log("Unable to load the adress!");
    }
    page.injectJs('jquery.min.js');
    var users = page.evaluate(function() {
      var residents = [];
      $("div[itemprop='itemListElement']").each(function(index, element) {
        var name1 = ($(element).find("._o0r6eqm").html());
        var type1 = $(element).find("._1127fdt6 span").html();
        type1 = type1.replace(/<(.*?)>/g, "");
        var price1 = $(element).find(".._hylizj6 span").html();
        price1 = price1.replace(/<(.*?)>/g, "");
        var rating1 = ($(element).find("._36rlri span[role='img']").attr("aria-label"));
        var image1 = ($(element).find("._1dp4576 div[role='img']").attr("style"));
        residents[index] = {name: name1, type: type1, price: price1, rating: rating1, image: image1};
      });
      return residents;
    });
    var path = 'output.json';
    fs.write(path, JSON.stringify(users), 'w');
    phantom.exit(users);
  });
  console.log(residents);
}
