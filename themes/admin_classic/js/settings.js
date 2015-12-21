$(function(){
    $('.tiles-container').on('click', '.tile', function(){
        var $this = $(this);
        if ($this.data('href')){
            $.ajax({
                url: $this.data('href'),
                method: 'POST',
                success: function(res){
                    console.log(res);
                }
            });
        }
    });
});