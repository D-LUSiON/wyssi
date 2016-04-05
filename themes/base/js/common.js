$(function(){
    var $MainContent = $('#MainContent');
    
    $MainContent.on('click', '[type=submit]', function(e){
        e.preventDefault();
        var $form = $(this).closest('form');
        var form_data = {};
        $form.find('[name]').each(function(i, val){
            if (this.type === 'checkbox') {
                if (!form_data[val.name])
                    form_data[val.name] = [];
                if (this.checked)
                    form_data[val.name].push(val.value);
            } else if (this.type === 'radio') {
                if (this.checked)
                    form_data[val.name] = val.value;
            } else
                form_data[val.name] = val.value;
        });
        
        $.ajax({
            url: '',
            data: form_data,
            method: 'POST',
            success: function(response){
                var err = false;
                try {
                    response = JSON.parse(response);
                } catch (e) {} 
               if (typeof response === 'object' && response.redirect_url) {
                    window.location.assign(response.redirect_url);
                } else {
                    $MainContent.html(response);
                }
            }
        });
    });
});