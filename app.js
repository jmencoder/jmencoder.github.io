$(document).ready(function () {
    setTimeout(() => {
        $("#sidebar-categories").next().remove();
        $("#sidebar-categories").removeClass("hidden");
        $("#sidebar-languages").next().remove();
        // $("#sidebar-languages").removeClass("hidden");
        $("#sidebar-about").next().remove();
        $("#sidebar-about").removeClass("hidden");
    }, 200);
    $("#pagination-options>a:first").on("click", function(e){
        e.preventDefault();
        e.stopPropagation();
        var link = $("a.bg-cyan-800").prev();
        if (!link.hasClass("prev-control")){
            window.location.href = $(link).attr("href");
        }
    });
    $("#pagination-options>a:last").on("click", function(e){
        e.preventDefault();
        e.stopPropagation();
        var link = $("a.bg-cyan-800").next();
        if (!link.hasClass("next-control")){
            window.location.href = $(link).attr("href");
        }
    });
});