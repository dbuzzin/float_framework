const $body = $("body");
const $footer = $(".sticky-footer");
const $navbar = $(".navbar");
const $getChildren = $body.children().not($footer).not("script")

if($footer.length === 1) {
    $getChildren.wrapAll("<div class=\"wrapper\"></div>")
    $(".wrapper").css( { "min-height": $(window).height() - $footer.height() } );;
}

