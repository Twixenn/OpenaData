var webserver = require('webserver');
var page = require('webpage').create();
page.settings.userAgent = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36";
//sidans utseende kan ändras om fönstret är för litet (vissa objekt kan vara svårare att få tag på)
page.viewportSize = {width: 1280, height: 1024};

page.onConsoleMessage = function(msg) {
  console.log(msg);
}

//öppnar sidan i en "osynlig" webbläsare
page.open('https://www.airbnb.se/s/Tokyo/homes?refinement_path=%2Fhomes&allow_override%255B%25=&allow_override%5B%5D=&checkin=2017-12-29&checkout=2017-12-30&ne_lat=35.891392701847174&ne_lng=139.9288495501171&sw_lat=35.58850799889009&sw_lng=139.39326605402334&zoom=10&search_by_map=true&s_tag=D931ba6Z', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
  } else {
    console.log("Unable to load the adress!");
  }
  //för att jag ska kunna använda mig av jquery måste jag lägga in det på sidan
  page.injectJs('jquery.min.js');
  var residentsInfo = page.evaluate(function() {
    var residents = [];
    $("div[itemprop='itemListElement']").each(function(index, element) {
      var name1 = ($(element).find("._o0r6eqm").html());
      var type1 = $(element).find("._1127fdt6 span").html();
      type1 = type1.replace(/<(.*?)>/g, "");
      var price1 = $(element).find("._hylizj6").html();
      price1 = price1.replace(/<(.*?)>/g, "").replace("Pris", "");
      var rating1 = ($(element).find("._36rlri span[role='img']").attr("aria-label"));
      var image1 = ($(element).find("._1dp4576 div[role='img']").attr("style"));
      residents[index] = {name: name1, type: type1, price: price1, rating: rating1, image: image1};
    });
    //värderna för de olika boendena är sparade och returneras ihop
    return residents;
  });
  phantom.exit();
});
