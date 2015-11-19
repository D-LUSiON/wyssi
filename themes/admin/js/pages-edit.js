$(function(){
    $('head').load($('body').data('main_dir') + 'admin/pages/getEditPage head');
    $('#edit-container').load($('body').data('main_dir') + 'admin/pages/getEditPage body');
    $.ajax({
       url: $('body').data('main_dir') + 'admin/pages/getEditPage',
       data: {},
       method: 'POST',
       success: function(response){
            console.log(response);
           $('head').html($(response).contents().find('head').html());
           $('#edit-container').html($(response).find('body').html());
       }
    });
});