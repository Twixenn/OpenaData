var windowHeight;
$(document).ready(function() {
  windowHeight = $(window).height() - 60;
  setHeights();
  $(window).resize(resize);
});

function resize() {
  if ($("main").css("background-color") != "rgb(255, 255, 255)"){
    windowHeight = $(window).height() - 60;
    setHeights();
  } else {
    $("main").removeAttr("style");
    $(".api").each(function() {
      $(this).removeAttr("style");
    });
  }
}

function setHeights() {
  $("main").height(windowHeight);
  $(".api").each(function() {
    $(this).height(windowHeight);
  });
}
