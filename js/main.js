// =================================================================
//
//                          Caching the DOM
//
// =================================================================

const $window = $(window);
const $body = $("body");
const $footer = $(".sticky-footer");
const $navbar = $(".navbar");
const $navParent = $(".nav__parent");
const $getDataAttr = $("[data-content]");
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
    $(".wrapper").css( { "min-height": $window.height() - $footer.height() } );;
}






// =================================================================
//
//                     Handle Data Attributes
//
// =================================================================

$getDataAttr.each(function() {

    // =================================================================
    //
    //                          Dropdown Menus
    //
    // =================================================================
    // Adds a slide down animation to menus with the class ".drop"
    // Animation is triggered when a nav item with the attribute
    // data-content attached to it is equal to drop.

    if($(this).data("content") === "drop") {
        $(this).hover(function() {
            $(this).find($(".drop")).slideDown();
        }, function() {
            $(this).find($(".drop")).slideUp(200);
        });
    } 

    let resizeTimer;
    let newHeight = $navbar.height() + $(this).height();

    if($(this).data("content") === "collapse-menu") {

        $window.on("resize", () => {

            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                console.log($navbar.height());
                console.log($navbar.height() + $(this).height());

                if($window.width() < 600 && !$(this).parent().hasClass("navbar")) {
                    $navbar.css({ "height": newHeight});
                    $navbar.append($(this));
                } else {
                    $navParent.append($(this));
                }
            }, 0);
            
        });
        
    }
});




