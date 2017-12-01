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
  $("#calender h2").text(months[thisMonth]);
  $("#calender tbody td").each(function() {
    tds.push(this);
    var today = new Date();
    if(tdPosition < new Date(today.getFullYear(), today.getMonth(), today.getDate()).getDay() - 1) {
      $(this).text("");
      $(this).addClass("disabled");
    }
    else if(date < new Date().getDate()) {
      $(this).addClass("disabled");
      $(this).text(date);
      date++;
    } else if(date <= new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()) {
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
      } else if (new Date(year, thisMonth, tds.indexOf(this) - 2) > departDate) {
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

function addToInput(departD, returnD) {
  $("input[name='date']").val(departD.getFullYear() + "-" + departD.getDate() + "-" + departD.getMonth()
                            + " to " + returnD.getFullYear() + "-" + returnD.getDate() + "-" + returnD.getMonth());
}
