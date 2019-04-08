// =================================================================
//
//                            Settings
//
// =================================================================

let settings = {

    gutters: {
        x: 10,
        y: 10
    },

    breakpoints: {

        phone: 600,
        tabPort: 900,
        tabLand: 1200
    
    }

}

// =================================================================
//
//                          Caching the DOM
//
// =================================================================

const $window = $(window);
const $body = $("body");
const $footer = $(".sticky-footer");
const $navbar = $(".navbar");
const $toWrap = $body.children().not($footer).not("script")
const $menuButton = $(".navbar__icon-box");

// =================================================================
//
//                     Navbar Fixed Body Margin
//
// =================================================================
// Dynamically adds a margin to the body if the navbar is fixed.

if($navbar.hasClass("navbar--fixed-top")) {

    const calcMarginTop = () => ($navbar.height() + settings.gutters.y);

    $body.css({ "margin-top": calcMarginTop() });

    $window.resize(() => {
        $body.css({ "margin-top": calcMarginTop() });
    });
    
}

// =================================================================
//
//                           Sticky Footer
//
// =================================================================
// Checks if there is an element with the class ".sticky-footer".
// Wraps everything else in a div with a variable height. 
// This pins the footer to the bottom of the page. 
// Requires at least one tag present other than the footer.

function calcWrap() {
    let wrapHeight = $window.height() - $footer.height();

    return $navbar.hasClass("navbar--fixed-top") 
        ? wrapHeight -= parseInt($body.css("margin-top")) 
        : wrapHeight;
}

if($footer.length === 1) {
    $toWrap.wrapAll("<div class=\"wrapper\"></div>")
    $(".wrapper").css( { "min-height": calcWrap()} );
    $window.resize(() => $(".wrapper").css( { "min-height": calcWrap()} ));
}

// =================================================================
//
//                     Handle Data Attributes
//
// =================================================================
// Cache the DOM for elements with data attributes

const $drop = $("[data-content=\"drop\"]")
const $collapseMenu = $("[data-content=\"collapse-menu\"]")
const $newLoc = $("[data-content=\"new-location\"]")
const $origLoc = $("[data-content=\"orig-location\"]")

// =================================================================
//
//                          Dropdown Menus
//
// =================================================================
// Adds a slide down animation to menus with the class ".drop"
// Animation is triggered when a nav item with the attribute
// data-content attached to it is equal to drop.

if($drop) {
    $drop.hover(function() {
        $drop.find($(".drop")).slideDown();
    }, function() {
        $drop.find($(".drop")).slideUp(200);
    });
} 

// =================================================================
//
//                     Collapse and Move Menu
//
// =================================================================
// Dynamically detaches and re-appends the nav to the main navbar
// element. It is hidden until the menu button is clicked to slide
// it in and out of view.

let oldHeight, newHeight;
let isMobile = false;

function setPos(elem) {

    oldHeight = $navbar.height();
    newHeight = oldHeight + $collapseMenu.height();

    $window.outerWidth() < settings.breakpoints.phone ? isMobile = true : isMobile = false;

    if(isMobile) {
        $newLoc.append(elem);
    } else {
        $origLoc.append(elem);
    }
}

if($collapseMenu) {
    setPos($collapseMenu);

    $window.resize(() => {
        setPos($collapseMenu);
    }); 
}

$menuButton.on("click", () => {
    if($newLoc.height() <= oldHeight) {
        $newLoc.animate({ "height": newHeight}, 500);
        $collapseMenu.slideDown(500);
    } else {
        $newLoc.animate({ "height": oldHeight}, 500);
        $collapseMenu.slideUp(500);
    }
});




