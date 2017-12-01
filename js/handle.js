//använder mig av jquery-ui för att kunna dra flikarna till höger och vänster
$(document).ready(function() {
  var dragDistance = $(".api").outerWidth();
  $("#flights").draggable({
    axis: "x",
    scroll: false,
    handle: "div.handle",
    drag: function(event, ui){
      //Kan bara dras från 0 till flikens storlek åt vänster
      ui.position.left = Math.min(ui.position.left,  0);
      ui.position.left = Math.max(ui.position.left, - dragDistance);
    }
  });

  $("#bnb").draggable({
    axis: "x",
    scroll: false,
    handle: "div.handle",
    drag: function(event, ui){
      //kan bara dras från fönstrets bredd - flikens storlek till fönstrets bredd från vänster
      ui.position.left = Math.max(ui.position.left, $(window).width() - dragDistance);
      ui.position.left = Math.min(ui.position.left, $(window).width());
    }
  });

  checkSize();
  //om fönstret blir mindre
  $(window).resize(checkSize);
});

//om fönstret blir så litet att main ändrar färg så tas all inline-css på flikarna bort
//annars om de är utdragna kommer de att försvinna åt kanterna
function checkSize(){
  if ($("main").css("background-color") == "rgb(255, 255, 255)"){
    $('.api').each(function() {
      $(this).removeAttr('style');
    });
  }
}
