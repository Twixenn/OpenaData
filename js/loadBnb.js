var hasUpdated = false;
var lastFile;

//hämtar datas
function loadBnb(place, inD, outD) {
  if(place != null && inD != null && outD != null) {
    var url = "http://localhost:8080/FlightBnB_backend/webresources/bnb?place=" + place + "?in=" + inD + "?out=" + outD;

    $.ajax({
      dataType: "json",
      url:url,
      success:function (data){
        buildBnb(data);
      },
      error:function (jqXHR, status, error){
        alert("It's something wrong with the server or your input (check spelling)");
      }
    });
  }
}

//använder mustache för att skicka information från jsonfilen till index.html
function buildBnb(data) {
  var residents = "";
  for (var i = 0; i < data.length; i++) {
    residents += Mustache.render('<div class="bnb api-information">' +
      '<div class="image"><img style="{{{image}}}"></div>' +
      '<div class="information">' +
        '<h2>{{{name}}}</h2>' +
        '<p>{{{type}}}</p>' +
        '<p><span>från  </span>{{{price}}}</p>' +
        '<p>{{{rating}}}</p>' +
      '</div>' +
    '</div>', data[i]);
  }
  $("#bnb .api-content").html(residents);
  book();
}
