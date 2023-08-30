$(() => {
  //when DOM is loaded

  //tabs - jQuery widget
  $("#tabs").tabs({
    activate: function (event, ui) {
      //Remove the "active" class from all tab headers
      $(".tabs-header li").removeClass("active");
      //Add the "active" class to the clicked tab header
      $(ui.newTab).addClass("active");
    },
  });

  //accordian - jQuery widget
  $(".acc-container .acc:nth-child(1) .acc-head").addClass("active");
  $(".acc-container .acc:nth-child(1) .acc-content").slideDown();
  $(".acc-head").on("click", function () {
    //this refers to ".acc-head"
    if ($(this).hasClass("active")) {
      $(this).siblings(".acc-content").slideUp();
      $(this).removeClass("active");
    } else {
      $(".acc-content").slideUp();
      $(".acc-head").removeClass("active");
      $(this).siblings(".acc-content").slideToggle();
      $(this).toggleClass("active");
    }
  });
});
