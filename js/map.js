var marker;
var map;
var geocoder;
var markers = [];
var koordinates = [];

function initAutocomplete() {
  geocoder = new google.maps.Geocoder();
  var start = {lat: 43.258288, lng: 6.728614};
  map = new google.maps.Map(document.getElementById('map'), {
    center: start,
    zoom: 3,
    styles: [
      {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "saturation": 36
          },
          {
            "color": "#333333"
          },
          {
            "lightness": 40
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#ffffff"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#fefefe"
          },
          {
            "lightness": 20
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#fefefe"
          },
          {
            "lightness": 17
          },
          {
            "weight": 1.2
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text",
        "stylers": [
          {
            "lightness": "0"
          },
          {
            "saturation": "0"
          },
          {
            "gamma": "1.00"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "gamma": "0.60"
          },
          {
            "lightness": "-20"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          },
          {
            "lightness": 20
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          },
          {
            "lightness": 21
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dedede"
          },
          {
            "lightness": 21
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#c4c4c4"
          },
          {
            "lightness": 17
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#ffffff"
          },
          {
            "lightness": 29
          },
          {
            "weight": 0.2
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e9e9e9"
          },
          {
            "lightness": 18
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e6e6e6"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f2f2f2"
          },
          {
            "lightness": 19
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e9e9e9"
          },
          {
            "lightness": 17
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#60c6f2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
          {
            "lightness": "-51"
          }
        ]
      }
    ]
  });

  //Så det endast går att söka på städer
  var options = {
    types: ['(cities)']
  };

  //gör så att inputsen har autocomplete
  new google.maps.places.Autocomplete(document.getElementById('to'), options);
  new google.maps.places.Autocomplete(document.getElementById('from'), options);
}

function codeAddress(address) {
  clearMarkers(null);
  for (var i = 0; i < address.length; i++) {
    //gör om platsnamnet till en position
    geocoder.geocode( { 'address': address[i]}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        koordinates.push(lat);
        koordinates.push(lng)
        addMarker(lat, lng)
      }
    });
  }
}

//gör markers
function addMarker(lat, lng) {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map
  });
  markers.push(marker);
}

//sätter in markers på kartan
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

//raderar alla markers
function clearMarkers() {
  setMapOnAll(null);
}

//drar linje mellan två markers
function drawLine() {
  var flightPlanCoordinates = [
    new google.maps.LatLng(koordinates[0], koordinates[1]),
    new google.maps.LatLng(koordinates[2], koordinates[3])
  ];
  var line = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  line.setMap(map);
}

$(document).ready(function() {
  //hämtar från inputs när knappen trycks på
  $("#button").click(function(event){
    event.preventDefault();
    var locations = [];
    locations[0] = $("#from").val();
    locations[1] = $("#to").val()
    codeAddress(locations);
  });
});
