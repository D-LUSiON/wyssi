$(function(){
    $.ajaxSetup({
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
    $('body > .loader').fadeOut(400);
    
    $('.dropdown-container').on('click', function(){
        $(this).toggleClass('open');
    });
    
    $('.modal-trigger').on('click', function(e){
        e.preventDefault();
        $.modalWindow(this.href);
    });
});