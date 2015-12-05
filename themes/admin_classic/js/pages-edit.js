$(function () {
    var $iframe = $('#preview-iframe');
    $iframe.load(function () {
        $iframe = $iframe.contents().find('body');
        console.log($iframe);
        $iframe.on('mouseover', '[data-role="page-content"]', function () {
            console.log('over');
            $(this).css('outline', '1px solid red');
        }).on('mouseout', '[data-role="page-content"]', function () {
            console.log('out');
            $(this).css('outline', 'none');
        });
    });
});