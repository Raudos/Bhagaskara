# Bhagaskara
Site layout based on PSD file provided by Coder's Lab and edited slightly by myself. 
PSD file for comparison can be found on https://www.behance.net/gallery/16872707/Bhagaskara-Onepage-PSD-Template .

Tools: Html, Css, Sass, Javascript, jQuery, Gulp.

Site itself is created with grid made durning lectures in Coder's Lab (https://github.com/Raudos/myGrid) which is based
on all the basic features of Bootstrap plus few additions added on my own. For the live version css has added all prefixes,
minified and gziped, Javascript file also got uglified.

Css Reset file made by http://meyerweb.com/eric/tools/css/reset/

Mobile friendly, created for devices starting from 350px width to 1920px. For the devices with width bigger than 1500px jquery adds
automated paddings, that make the rows wider while keeping the contents intact.

//Site Overview
Whole content is hidden inside .container-flui, grouped into 12 rows. User on the start always is presented with header and rest
of the site hidden. By clicking on the buttons inside header a corresponding section will open, scrolling down to it. User also
has option to use the arrow and uncover whole content at once. After scrolling down the site second row (additional menu for fast
interaction) fixes on top of the screen and stays with the user. Automated scrolling is done with jquery plugin scrollTo (http://lions-mark.com/jquery/scrollTo/).

