$(function () {
    window.main_dir = $('body').data('main_dir');
    $.ajaxSetup({
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
    $('body > .loader').fadeOut(400);

    $('.dropdown-container').on('click', function () {
        $(this).toggleClass('open');
    });

    $('.modal-trigger').on('click', function (e) {
        e.preventDefault();
        $.modalWindow(this.href);
    });

    var $submenu = $('aside.submenu'),
        $mainContent = $('#MainContent'),
        $submenu_triggers = $('#MainContent-container aside .submenu-trigger');
    $submenu_triggers.on('click', function () {
        var $this = $(this),
            $target = $($this.data('href'));
        if ($target && $target !== '')
            if ($submenu.hasClass('open')) {
                if ($target.is(':visible')) {
                    $submenu.removeClass('open');
                    $mainContent.removeClass('submenu-open');
                    setTimeout(function () {
                        $target.hide();
                        $submenu_triggers.removeClass('open');
                    }, 300);
                } else {
                    $submenu.children('.submenu-content').hide();
                    $target.show();
                    $submenu_triggers.removeClass('open');
                    $this.addClass('open');
                }
            } else {
                $submenu_triggers.removeClass('open');
                $this.addClass('open');
                $submenu.addClass('open');
                $mainContent.addClass('submenu-open');
                $target.show();
            }
    });
});