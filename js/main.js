// =================================================================
//
//                          Caching the DOM
//
// =================================================================

const $body = $("body");
const $footer = $(".sticky-footer");
const $navbar = $(".navbar");
const $dropLink = $("li[data-dropdown=\"true\"]");
const $getChildren = $body.children().not($footer).not("script")

// =================================================================
//
//                           Sticky Footer
//
// =================================================================
// Checks if there is an element with the class ".sticky-footer".
// Wraps everything else in a div with a variable height.
// This pins the footer to the bottom of the page. 
// Requires at least one tag present other than the footer.

if($footer.length === 1) {
    $getChildren.wrapAll("<div class=\"wrapper\"></div>")
    $(".wrapper").css( { "min-height": $(window).height() - $footer.height() } );;
}

// =================================================================
//
//                          Dropdown Menus
//
// =================================================================
// Adds a slide down animation to menus with the class ".drop"
// Animation is triggered when nav item with the attribute 

$dropLink.hover(function() {
    $(this).find($(".drop")).slideDown();
}, function() {
    $(this).find($(".drop")).slideUp(200);

});



