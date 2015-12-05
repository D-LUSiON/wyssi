(function($){
    var Layout = function(options){
        var $root = $('body');
        var obj = this;
        var defaults = {
            selector: {
                elementToSet: '',
                excluded: []
            },
            set_fixed_height: false,
            update: {
                onLoad: true,
                onResize: true
            },
            additionalPxFix: 0
        };
        
        var settings = $.extend(defaults, options || {});
        var $window = $(window);
        
        this.window_height = null;
        this.selectors = {
            $mainContent: $(settings.selector.elementToSet)
        };
        
        function __construct(){
            obj.window_height = $window.height();
            __updateElementsHeight();
            obj.setMainContentHeight();
            __eventListener();
        };
        
        function __updateElementsHeight(){
            obj.window_height = $window.height();
        };
        
        function __calculateHeight(){
            var new_height = 0;
            for (var i = 0; i < settings.selector.excluded.length; i++) {
                var $element =$(settings.selector.excluded[i]); 
                new_height += $element.outerHeight();
                if (parseInt($element.css('margin-top')) < 0) 
                    new_height += +(parseInt($element.css('margin-top')));
                if (parseInt($element.css('margin-bottom')) < 0) 
                    new_height += +(parseInt($element.css('margin-bottom')));
            };
            return obj.window_height - new_height - parseInt(obj.selectors.$mainContent.css('margin-top')) - parseInt(obj.selectors.$mainContent.css('margin-bottom')) + settings.additionalPxFix;
        };
        
        this.setMainContentHeight = function(height){
            var new_height = height || __calculateHeight();
            this.selectors.$mainContent.css((settings.set_fixed_height)? 'height' : 'min-height', new_height);
        };
        
        function __eventListener(){
            __stopEventListener();
            if (settings.update.onResize) {
                $window.on('resize', function(){
                    __updateElementsHeight();
                    obj.setMainContentHeight();
                });
            };
            if (settings.update.onLoad) {
                $window.on('load', function(){
                    __updateElementsHeight();
                    obj.setMainContentHeight();
                });
            };
        };
        
        function __stopEventListener(){
            $window.off('resize');
        };
        
        this.updateOptions = function(opts){
            settings = $.extend(settings, opts || {});
            __construct();
        };
        __construct();
    };
    $.layout = function(options, parameters){
        var root = $('body');
        if (root.data('layout')) {
            var layout = root.data('layout');
            if (typeof options == 'string') {
                if (eval('typeof '+ layout[options]) == 'function') {
                    layout[options](parameters);
                } else {
                    if (window.console && console.error) {
                        console.error('Method not found!')
                    };
                };
            } else {
                layout.updateOptions(options);
            };
        } else {
            var layout = new Layout(options, parameters);
            root.data('layout', layout);
        }
    };
    $(function(){
        $.layout({
            selector: {
                elementToSet: '#preview-iframe',
                excluded: ['header']
            },
            set_fixed_height: true,
            additionalPxFix: -2
        });
    });
})(jQuery);