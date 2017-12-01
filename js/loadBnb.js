var hasUpdated = false;
var lastFile;

$(document).ready(function() {
  setInterval(checkUpdate, 1000);
});

//kollar om filen ser likadan ut som den som fanns för en sekund sedan
function checkUpdate() {
  $.getJSON("output.json", function(json) {
    var currentFile = JSON.stringify(json);
    if (currentFile !== lastFile) {
      lastFile = currentFile;
      loadData();
    }
  });
}

//hämtar data från output.json
function loadData() {
  var url = "output.json";

  $.ajax({
    dataType: "json",
    url:url,
    success:function (data){
      buildBnb(data);
    },
    error:function (jqXHR, status, error){
      alert("warning");
    }
  })
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
}
