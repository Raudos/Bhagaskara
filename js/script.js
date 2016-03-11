//Variables
var $hex = $("header .hexagon img:first-child");
var $hexThree = $(".container-fluid > .row:nth-child(3) .hexagon img");
var $invisible = $(".invisible");
var $scroller = $("#scroller");
var $attr, $selector, $selectorSection;
//Functions
function $showMePicked() {
  /* Show subsections coresponding to the clicked image */
  $hex.on("click", function() {
    $attr = $(this).attr("data-name");
    $selector = "[data-name=" + $attr + "]";
    $selectorSection = $selector + ":not(img)";
    $($selector).removeClass("invisible");
    $("footer").removeClass("invisible");
    $(window).scrollTo($selectorSection, 2000);
  });
}
function $showMeAll() {
  /* Show all previously hidden subsections, move to first one */
  $scroller.on("click", function() {
    $invisible.removeClass("invisible");
    $(window).scrollTo(".container-fluid > .row:nth-child(2)", 2000);
  });
}
function $hexHover() {
  /* This whole function relies on the structure of .hexagon class div, which looks like this:
  <img(hexagonal shape), img(icon)>. Both images are siblings, which is why i used .prev() and .next() to target them.
  Function later adds/removes "Purple" from the src attribute of image on hover */
  $hex.on("mouseover", function() {
    var src = $(this).attr("src").match(/[^\.]+/) + "Purple.png";
    $(this).attr("src", src);
  });
  $hex.on("mouseout", function() {
    var src = $(this).attr("src").replace("Purple.png", ".png");
    $(this).attr("src", src);
  });
  $hex.next().on("mouseover", function() {
    var src = $(this).prev().attr("src").match(/[^\.]+/) + "Purple.png";
    $(this).prev().attr("src", src);
  });
  $hex.next().on("mouseout", function() {
    var src = $(this).prev().attr("src").replace("Purple.png", ".png");
    $(this).prev().attr("src", src);
  });
  $hexThree.on("mouseover", function() {
    var src = $(this).attr("src").match(/[^\.]+/) + "Purple.png";
    $(this).attr("src", src);
    if ($(this).is(":first-child")) {
      var srcNext = $(this).next().attr("src").match(/[^\.]+/) + "Purple.png";
      $(this).next().attr("src", srcNext);
    } else {
      var srcPrev = $(this).prev().attr("src").match(/[^\.]+/) + "Purple.png";
      $(this).prev().attr("src", srcPrev);
    }
  });
  $hexThree.on("mouseout", function() {
    var src = $(this).attr("src").replace("Purple.png", ".png");
    $(this).attr("src", src);
    if ($(this).is(":first-child")) {
      var srcNext = $(this).next().attr("src").replace("Purple.png", ".png");
      $(this).next().attr("src", srcNext);
    } else {
      var srcPrev = $(this).prev().attr("src").replace("Purple.png", ".png");
      $(this).prev().attr("src", srcPrev);
    }
  });
}


$(document).on("ready", function() {
  $hexHover();
  $showMeAll();
  $showMePicked();
})
