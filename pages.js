
const HideShowedModal = function(){
    $(".modal[aria-hidden=false]").attr("aria-hidden","true").toggle('hidden');
    setTimeout(() => {
        $("body").removeClass("overflow-hidden");
    }, 100);
}
$(window).on("keydown",function(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code===27){
        if ($(".modal[aria-hidden=false]").length){
            HideShowedModal();
        }
    }
});
$(".backdrop").on("click",function(e){
    e.preventDefault();
    e.stopPropagation();
    // HideShowedModal();
});
$(document).ready(function () {
    setTimeout(() => {
        $("#sidebar-categories").next().remove();
        $("#sidebar-categories").removeClass("hidden");
        $("#sidebar-languages").next().remove();
        // $("#sidebar-languages").removeClass("hidden");
        $("#sidebar-about").next().remove();
        $("#sidebar-about").removeClass("hidden");
    }, 200);
    $.each($("code"), function (indexInArray, valueOfElement) { 
        $(valueOfElement).html($(valueOfElement).html().replace(/(\r\n|\n|\r)/gm, "<br>").replace("<br>","").replace(/<br><br>/g,"<br>"));
    });
    $("a[data-modal-toggle]").on("click",function(e){
        e.preventDefault();
        e.stopPropagation();
        var image = null;
        var control = $(e.target);
        if ($(e.target).is("img")){
            image = $(e.target).clone();
            control = $(e.target).parent();
        }else{
            image = $(e.target).find("img").clone();
        }
        $("body").addClass("overflow-hidden");
        $("#"+$(control).attr("data-modal-toggle")).find(".modal-body").text("").append(image);
        $("#"+$(control).attr("data-modal-toggle")).attr("aria-hidden","false").toggle('hidden');
    });
    if (Object.values(categories).length){
        $("#top-categories").text("");
        const cats = categories.slice(0, 10);
        cats.forEach((category, idx) => {
            $("#top-categories").append(`<a href="#" class="hover:bg-gray-400 rounded py-2 px-4 mx-2">${category.name}</a>`);
            if (idx===(cats.length-1)){
                $("#top-categories").prev().remove();
                $("#top-categories").removeClass("hidden").removeClass("pointer-events-none");
            }
        });
    }
    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/')+1).split(".")[0]+".html";
    const entradas = alasql('SELECT * FROM ? WHERE file!="'+filename+'"',[entries]);
    if (Object.values(entradas).length){
        var indice = alasql('SELECT VALUE id::NUMBER FROM ? WHERE file="'+filename+'"',[entries]);
        var previewControl,nextControl,previewPage,previewControl,order;
        var nextValidate = alasql('SELECT * FROM ? WHERE id='+(indice+1),[entries]);
        var preValidate = alasql('SELECT * FROM ? WHERE id='+(indice-1),[entries]);
        if (!Object.keys(preValidate).length&&!Object.keys(nextValidate).length){
            return;
        }else if (Object.keys(preValidate).length&&Object.keys(nextValidate).length){
            preValidate=preValidate[0];
            nextValidate=nextValidate[0];
            order = "";
        }else if (Object.keys(preValidate).length){
            preValidate=preValidate[0];
            order = ":first";
        }else if (Object.keys(nextValidate).length){
            nextValidate=nextValidate[0];
            order = ":last";
        }
        $("#page-controls").removeClass("hidden");
        $("#page-controls").find("a"+order).removeClass("pointer-events-none").find("p:first").removeClass("text-gray-800").addClass("text-teal-800").removeClass("opacity-40");
        if (Object.keys(preValidate).length){
            $("#page-controls").find("a:first").attr("href",preValidate.file).find("p:last").text(preValidate.title.substring(0,47)+"....").removeClass("hidden");
        }
        if (Object.keys(nextValidate).length){
            $("#page-controls").find("a:last").attr("href",nextValidate.file).find("p:last").text(nextValidate.title.substring(0,47)+"....").removeClass("hidden");
        }
    }
});