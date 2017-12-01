function book() {
  //går att välja flyg och boende
  $("#flights .api-information").click(function() {
    $("#flights .api-information.active").each(function() {
      $(this).removeClass("active");
    })
    $(this).addClass("active");
  });

  $("#bnb .api-information").click(function() {
    $("#bnb .api-information.active").each(function() {
      $(this).removeClass("active");
    });
    $(this).addClass("active");
  });

  //öppnar en ny flik med de boende en valt (just nu är det bara bilden)
  $("#book").click(function() {
    var bg = $("#bnb .active img").css('background-image');
    var url = bg.replace('url(','').replace(')','').replace(/\"/gi, "");
    window.open(url);
  });
}
