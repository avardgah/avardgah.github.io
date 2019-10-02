var c = getUrlVars()["c"];
var i = getUrlVars()["i"];

$.get("data/content/" + c + "_" + i + ".md" , function(content, status){
    $.getScript( "lib/showdown.js", function( data, textStatus, jqxhr ) {
        var converter = new showdown.Converter(),
            converted      = converter.makeHtml(content);
        $('#content_loader').append(converted);
    });
});

