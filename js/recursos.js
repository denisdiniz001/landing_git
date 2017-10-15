$(document).ready(function () {
    renderParallax();
    renderContentSelector();
});

function renderParallax(){
    $('parallax').each(function( index ) {
        var grandParent = $(this).parent().parent();
        grandParent.addClass('parallax');
        grandParent.css('background-image',$(this).attr('img'));
        
        var parent = $(this).parent();
        var BKGD = hexToRgba($(this).attr('color'),$(this).attr('opacity'));
        if (typeof BKGD != 'undefined' && BKGD != null) {
            parent.css('background', BKGD);
        }
    });
}
function hexToRgba(hex, opac) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 'rgba('+
        parseInt(result[1], 16)+','+
        parseInt(result[1], 16)+','+
        parseInt(result[1], 16)+','+
        opac+')' : null;
}
function renderContentSelector(){
    $('.content-selector').each(function( index ) {
        var length = $(this).children('.content-item').length;
        for(var i=0;i<length;i++){
            $(this).children('.item-selector').append('<li class="item"></li>');
        }
        $(this).find('.item-selector .item').first().addClass('active');
    });
    
    //FUNCAO PARA TRANSICAO EM INTERVALO DE TEMPO
    var interval;
    var item = $('.content-selector .item-selector .item').first().next();
    interval = setInterval(function(){
        var pos = $('.content-selector .item-selector .item').index(item);
        var content = $('.content-selector .content-item').get(pos);
        
        $(item).siblings().removeClass('active');
        $(content).siblings().removeClass('active');
        $(item).addClass('active');
        $(content).addClass('active');
        if (typeof $(item).next().html() != 'undefined' && $(item).next().html() != null) {
           item = $(item).next();
        }else{
            item = $('.content-selector .item-selector .item').first();
        }
    }, 4000);
    
    $('.content-selector .item-selector .item').on('click', function(){
        //clearInterval(interval);
        item = $(this);
        var pos = $('.content-selector .item-selector .item').index(item);
        var content = $('.content-selector .content-item').get(pos);
        
        $(item).siblings().removeClass('active');
        $(content).siblings().removeClass('active');
        $(item).addClass('active');
        $(content).addClass('active');
    });
}