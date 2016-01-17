$(function(){
    window.main_dir = $('body').data('main_dir');
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
    
    var $submenu = $('aside.submenu'),
        $mainContent = $('#MainContent');
    $('#MainContent-container aside').on('click', '.submenu-trigger', function(){
        var $target = $($(this).data('href'));
        if ($submenu.hasClass('open')) {
            if ($target.is(':visible')) {
                $submenu.removeClass('open');
                $mainContent.removeClass('submenu-open');
                setTimeout(function(){
                    $target.hide();
                },300);
            } else {
                $submenu.children('.submenu-content').hide();
                $target.show();
            }
        } else {
            $submenu.addClass('open');
            $mainContent.addClass('submenu-open');
            $target.show();
        }
    });
});