var hasUpdated = false;
var lastFile;
var url = "http://localhost:8080/FlightBnB_backend/webresources/flights?place=";

//hämtar data
function loadDataFlights(iata) {
  $.ajax({
    dataType: "json",
    url:url + iata,
    success:function (data){
      buildFlights(data);
    },
    error:function (jqXHR, status, error){
      alert("warning");
    }
  })
}

//använder mustache för att skicka information till index.html
function buildFlights(data) {
  var flights = "";
  for (var i = 0; i < data.length; i++) {
    flights += Mustache.render('<div class="flight api-information">' +
      '<div class="image"></div>' +
      '<div class="information">' +
        '<h2>{{{locationName}}}</h2>' +
        '<p>{{{landings}}}</p>' +
        '<p><span>från  </span>{{{price}}}kr</p>' +
        '<p>{{{flightTime}}}</p>' +
      '</div>' +
    '</div>', data[i]);
  }
  $("#flights .api-content").html(flights);
  book();
}
