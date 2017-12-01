//För att få tag på månadens namn
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var year;
var thisMonth;
var date = 1;
var tdPosition = 0;
var firstClick = true;
var tds = [];
var departDate;
var returnDate;

$(document).ready(function() {
  //kalendern visas när användaren trycker på inputen för datumen
  $("input").focus(function() {
    if($(this).attr("name") == "date"){
      $("#calender").show();
    } else {
      $("#calender").hide();
    }
  });
  $("button").focus(function() {
    $("#calender").hide();
  })

  year = new Date().getFullYear();
  thisMonth = new Date().getMonth()
  //sätter headingen till rätt månad
  $("#calender h2").text(months[thisMonth]);
  $("#calender tbody td").each(function() {
    tds.push(this);
    var today = new Date();
    //om td är en cell som inte ska innehålla datum denna månaden
    if(tdPosition < new Date(today.getFullYear(), today.getMonth(), today.getDate()).getDay()) {
      $(this).text("");
      $(this).addClass("disabled");
    }
    //om datumet redan varit
    else if(date < new Date().getDate()) {
      $(this).addClass("disabled");
      $(this).text(date);
      date++;
    }
    //om datumet är innan nästa månad
    else if(date <= new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()) {
      $(this).text(date);
      date++;
    } else {
      $(this).addClass("invisible");
      $(this).text("");
    }
    tdPosition++;
  });

  $("#calender tbody td").click(function() {
    if(!$(this).hasClass("disabled")) {
      //om det är första gången den klickas på så sätts datumet för avresan
      if (firstClick) {
        departDate = new Date(year, thisMonth, tds.indexOf(this) - 2);
        firstClick = false;
        $("td.border").each(function(){
          $(this).removeClass("border");
        });
        $("td.active").each(function(){
          $(this).removeClass("active");
          $(this).removeClass("border");
        });
        $(this).addClass("active");
      }
      //kollar så att inte hemresan är innan avresan
      else if (new Date(year, thisMonth, tds.indexOf(this) - 2) > departDate) {
        returnDate = new Date(year, thisMonth, tds.indexOf(this) - 2);
        firstClick = true;
        addToInput(departDate, returnDate);
        $(this).addClass("active");
      }
      else {
        $("td.active").each(function(){
          $(this).removeClass("active");
          $(this).removeClass("border");
        });
        firstClick = true;
      }
    }
  });

  $("#calender tbody td").hover(function() {
    //om användaren redan klickat så markeras alla td mellan avresan och hemresan
    if(!firstClick) {
      returnDate = new Date(year, thisMonth, tds.indexOf(this) - 2);
      $("td.border").each(function(){
        $(this).removeClass("border");
      });
      for(var i = departDate.getDate()  + 2; i < returnDate.getDate() + 2; i++) {
        $(tds[i]).addClass("border");
      }
    }
  });
});

function displayCalender(month) {
  thisMonth = month;
  //sätter rubriken till rätt månad
  $("#calender h2").text(months[thisMonth]);
  $("#calender tbody td").each(function() {
    tds.push(this);
    var today = new Date();
    //om td är en cell som inte ska innehålla datum denna månaden
    if(tdPosition < new Date(today.getFullYear(), today.getMonth(), today.getDate()).getDay()) {
      $(this).text("");
      $(this).addClass("disabled");
    }
    //om datumet redan varit
    else if(date < new Date().getDate()) {
      $(this).addClass("disabled");
      $(this).text(date);
      date++;
    }
    //om datumet är innan nästa månad
    else if(date <= new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()) {
      $(this).text(date);
      date++;
    } else {
      $(this).addClass("invisible");
      $(this).text("");
    }
    tdPosition++;
  });
}

//sätter värdet av avresan och hemresan i inputen
function addToInput(departD, returnD) {
  $("input[name='date']").val(departD.getFullYear() + "-" + departD.getDate() + "-" + departD.getMonth()
                            + " to " + returnD.getFullYear() + "-" + returnD.getDate() + "-" + returnD.getMonth());
}
