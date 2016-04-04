//Variables
var $hex = $("header .hexagon img:first-child");
var $hexThree = $(".container-fluid > .row:nth-child(3) .hexagon img");
var $invisible = $(".invisible");
var $scroller = $("#scroller");
var $attr, $selector, $selectorSection;
var $quoteNav = $(".quoteNav");
var $quotes = $(".quote");
var $active, $child, $visible, $quoteSelector;
var $leftNav = $("#nav img:first-child");
var $rightNav = $("#nav img:last-child");
var $staffRow = $(".container-fluid > .row:nth-child(6) > .row:nth-child(3)");
var $team = $(".person");
var $burger = $("#burger");
var $menu = $("#menu");
var $checker = 0;
var $containerRows = $(".container-fluid > .row");
var $firstRow = $(".container-fluid > .row:first-child")
var $width, $height;
var $portfolioArray, $mainDiv, $detached, $temp;
var $detachedArray = new Array;



//Functions
function $paddingMe() {
  $width = $(window).width();
  $height = $(window).height();
  if ($width > 1500) {
    $width = ($width - 1500) / 2;
    $width += "px";
    $containerRows.css("padding-left", $width);
    $containerRows.css("padding-right", $width);
  } else {
    $containerRows.css("padding-left", "15px");
    $containerRows.css("padding-right", "15px");
  }
  if ($height > $firstRow.height()) {
    $height = ($height - $firstRow.height()) / 2;
    $height += "px";
    $firstRow.css("padding-top", $height);
    $firstRow.css("padding-bottom", $height);
  } else {
    $firstRow.css("padding-top", "6em");
    $firstRow.css("padding-bottom", "6em");
  }
}
function $showMenu() {
  $burger.on("click", function() {
    //if control variable is 0 change to 1, otherwise leave 0
    // used this for the border, otherwise use toggle
    if ($checker == 0) {
      $menu.css("display", "inherit");
      $checker = 1;
    } else {
      $menu.css("display", "none");
      $checker = 0;
    }
  });
}
function $swapHamburger() {
  $burger.on("mouseover", function() {
    //if control variable is not 0 it means that menu is triggered, no need for color swap
    if ($checker == 0) {
      var src = $(this).attr("src").match(/[^\.]+/) + "Purple.png";
      $(this).attr("src", src);
    }
  });
  $burger.on("mouseout", function() {
    if ($checker == 0) {
      var src = $(this).attr("src").replace("Purple.png", ".png");
      $(this).attr("src", src);
    }
  });
}
function $createPortfolioArray() {
  $.getJSON("js/portfolio.json", function(data) {
    $portfolioArray = data;
  });
  $(document).ajaxComplete(function() {
    $createPortfolio();
  });
}
function $createPortfolio() {
  $mainDiv = "<div class=\"col-xs-12 col-sm-6 col-md-4 hidden-xs\"><div class=\"imageContainer\"></div></div>";
  for (var i = $portfolioArray.length - 1; i >= 1 ; i--) {
    //add container for image, title and text
    $("#gallery").prepend($mainDiv);
    //add class for the container
    for (var j = 0; j < $portfolioArray[i].category.length; j++) {
      $("#gallery div:first-child:not(.imageContainer)").addClass($portfolioArray[i].category[j]);
    }
    //add image, title and text to the container
    $("#gallery div:first-child .imageContainer").prepend("<img src=" + $portfolioArray[i].img + "><h2>" + $portfolioArray[i].title
    + "</h2><p>" + $portfolioArray[i].category.join(", ") + "</p>");
  }
  //detach all the images, save them into array
  $detached = $("#gallery div:not(.imageContainer)").detach();
  for (var n = 0; n < $detached.length; n++) {
    $detachedArray.push($detached[n]);
  }
  $("[name=portfolio]").on("click", function() {
    //if button is ALL
    if ($(this).text() == "ALL") {
      if ($(this).hasClass("clicked")) {
        //if button has class .clicked detach all the images, save them into array
        $detached = $("#gallery div:not(.imageContainer)").detach();
        for (var n = 0; n < $detached.length; n++) {
          $detachedArray.push($detached[n]);
        }
        //remove class
        $("[name=portfolio]").removeClass("clicked");
      } else {
        $("[name=portfolio]").addClass("clicked");
        //if button wasnt .clicked prepend all elements
        for (var m = 0; m < $detachedArray.length; m++) {
          $("#gallery").prepend($detachedArray.splice(m, 1));
          m--;
        }
      }
    } else {
      //start building selector here
      temp = "." + $(this).text();
      //if this is clicked we want to know which elements to remove...
      if ($(this).hasClass("clicked")) {
        $("[name=portfolio]:first-child").removeClass("clicked");
        for (var l = 0; $(".clicked").length > l; l++) {
          //or which elements do not remove
          if ($(this).text() != $(".clicked")[l].innerText) {
            temp += ":not(." + $(".clicked")[l].innerText + ")";
          }
        }
        //detach elements with created selector
        $detached = $(temp).detach();
        for (var n = 0; n < $detached.length; n++) {
          $detachedArray.push($detached[n]);
        }
      } else {
        //if button is not .clicked we add all elements with this tag
        for (var m = 0; m < $detachedArray.length; m++) {
          if ($detachedArray[m].className.indexOf($(this).text()) > -1) {
            $("#gallery").prepend($detachedArray.splice(m, 1));
            m--;
          }
        }
        if ($(".clicked").length == 2) {
          $("[name=portfolio]:first-child").addClass("clicked");
        }
      }
      $(this).toggleClass("clicked");
    }
  });
}

function $showTeamSmall() {
  $leftNav.on("click", function() {
    $active = $(".person:not(.hidden-xs)");
    $active.addClass("hidden-xs");
    $active.prev(".person").removeClass("hidden-xs");
    $active = $(".person:not(.hidden-xs)");
    if ($active.length == 0) {
      $(".person:last-child").removeClass("hidden-xs");
    }
  });
  $rightNav.on("click", function() {
    $active = $(".person:not(.hidden-xs)");
    $active.addClass("hidden-xs");
    $active.next(".person").removeClass("hidden-xs");
    $active = $(".person:not(.hidden-xs)");
    if ($active.length == 0) {
      $(".person:first-child").removeClass("hidden-xs");
    }
  });
};

function $showTeamBig() {
  $leftNav.on("click", function() {
    $active = $(".teamActive");
    if ($active.prev().length != 0) {
      $active.removeClass("teamActive");
      $active.prev(".person").addClass("teamActive");
      $active = $(".teamActive");
      $team.animate({
        left: "+=33.333%",
      }, 1500);
    }
  });
  $rightNav.on("click", function() {
    $active = $(".teamActive");
    if ($active.next().length != 0) {
      $active.removeClass("teamActive");
      $active.next(".person").addClass("teamActive");
      $active = $(".teamActive");
      $team.animate({
        left: "-=33.333%",
      }, 1500);
    }
  });
};
function $nextQuote() {
  /* Add class .visible to the corresponding .quote after .quoteNav is clicked */
  $quoteNav.on("click", function() {
    $active = $(".active");
    $visible = $(".visible");
    $active.removeClass("active");
    $(this).addClass("active");
    for (var i = 1; $quotes.length >= i; i++) {
      $child = ":nth-child(" + i + ")";
      if ($(this).is($child)) {
        $quoteSelector = ".quote" + $child;
        $visible.removeClass("visible");
        $($quoteSelector).addClass("visible");
      }
    }
  })
};
function $showMePicked() {
  /* Show subsections corresponding to the clicked image */
  $hex.on("click", function() {
    $attr = $(this).attr("data-name");
    $selector = "[data-name=" + $attr + "]";
    $selectorSection = $selector + ":not(img)";
    $($selector).removeClass("invisible");
    $("footer").removeClass("invisible");
    $(window).scrollTo($selectorSection, 2000);
  });
};
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
  $paddingMe();
  $(window).resize(function() {
    $paddingMe();
  });
  $hexHover();
  $showMeAll();
  $showMePicked();
  $nextQuote();
  if (window.matchMedia('(max-width: 768px)').matches) {
    $showTeamSmall();
  } else {
    $showTeamBig();
  }
  $swapHamburger();
  $showMenu();
  $createPortfolioArray();
  /*
  $(window).resize(function() {
    if (window.matchMedia('(max-width: 768px)').matches) {
      $showTeamSmall();
    } else {
      $showTeamBig();
    }
  });*/
})
