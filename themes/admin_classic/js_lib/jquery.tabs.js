(function($){
    var Tabs = function(element, options){
        var obj = this;
        var defaults = {
            disabled: false,
            ajax_load: false,
            updateOnResize: false,
            vertical: false,
            fixContentSize: true, // когато са вертикални, да прави съдържанието по цялата височина
            classes: {
                disabled: 'disabled',
                current: 'current',
                ajax_load: 'ajax_load',
                change_tabs_only: 'change_tabs_only',
                container: 'tabs',
                vertical: 'vertical',
                tabs_container: 'tabs-container',
                tab: 'tab',
                tabs_content_container: 'tabs-content_container',
                tabs_content: 'tab-content',
                pagination_item: 'tabs-controlls-pagination_item'
            },
            html: {
                loadingHtml: '<div class="ajax-loading"/>',
                fade_left: '<div class="tabs-fade left"/>',
                fade_right: '<div class="tabs-fade right"/>',
                tabs_mover: '<div class="tabs-container-mover"/>',
                tabs_controlls: '<div class="tabs-controlls"/>',
                tabs_pagination: '<div class="tabs-controlls-pagination"/>',
                controlls_left: '<div class="tabs-controlls-arrow left"/>',
                controlls_right: '<div class="tabs-controlls-arrow right"/>',
                controlls_item: '<div class="tabs-controlls-pagination_item"/>',
                content_overlay: '<div class="tabs-content_overlay"/>'
            },
            closeOnClickActive: false,
            extTrigger: null,
            beforeSend: function(){},
            onTabChange: function(){},
            onDataLoaded: function(){}
        };
        var settings = $.extend(defaults, options || {});
        var _ = {
            $elements: {
                root: $(element),
                tabs_container: null,
                tabs: null,
                current_tab: null,
                contents: null,
                current_content: null,
                fade_left: null,
                fade_right: null,
                tabs_mover: null,
                tabs_controlls: null,
                tabs_pagination: null,
                controlls_left: null,
                controlls_right: null,
                controlls_item: null
            },
            tabs_container_width: null,
            tabs_width: null,
            controlls_width: null
        };
        this.url = null;
        
        function __construct(){
            _getElements();
            _getTabsWidth();
            if (settings.vertical && settings.fixContentSize) {
                _setVerticalHeight();
            };
            _eventListener();
        };
        function _getElements(){
            _.$elements.tabs_container = _.$elements.root.find('.'+settings.classes.tabs_container);
            _.$elements.tabs = _.$elements.root.find('.'+settings.classes.tab);
            _.$elements.current_tab = _.$elements.tabs.filter('.'+settings.classes.tab+'.'+settings.classes.current);
            if (settings.extTrigger != null) {
                if (typeof settings.extTrigger == 'string' && settings.extTrigger != '') {
                    _.$elements.ext_trigger = $(settings.extTrigger);
                } else if (typeof settings.extTrigger == 'object') {
                    _.$elements.ext_trigger = settings.extTrigger;
                };
            };
            _.$elements.content_container = _.$elements.root.children('.'+settings.classes.tabs_content_container);
            _.$elements.contents = _.$elements.content_container.children('.'+settings.classes.tabs_content);
            _.$elements.current_content = _.$elements.content_container.filter('.'+settings.classes.tabs_content+'.'+settings.classes.current);
            settings.vertical = (options && options.vertical)? options.vertical : _.$elements.root.hasClass(settings.classes.vertical);
            settings.disabled = (options && options.disabled)? options.disabled : _.$elements.root.hasClass(settings.classes.disabled);
            settings.ajax_load = _.$elements.root.hasClass(settings.classes.ajax_load);
            settings.change_tabs_only = _.$elements.root.hasClass(settings.classes.change_tabs_only);
        };
        function _getTabsWidth(){
            _.tabs_container_width = _.$elements.tabs_container.outerWidth();
            _.tabs_width = 0;
            _.$elements.tabs.each(function(){
                _.tabs_width += $(this).outerWidth() + 1;
            });
            if (_.tabs_width >= _.tabs_container_width && !settings.vertical) {
                _appendPagination();
            } else {
                _destroyPagination();
            }
        };
        function _getTabsMaxHeight(){
            var height = 0;
            _.$elements.tabs.each(function(){
                if (height < $(this).outerHeight()) {
                    height = $(this).outerHeight();
                };
            });
            return height;
        };
        function _appendPagination(){
            _.$elements.fade_left = $(settings.html.fade_left).appendTo(_.$elements.tabs_container).hide();
            _.$elements.tabs_mover = $(settings.html.tabs_mover).appendTo(_.$elements.tabs_container).css('width', _.tabs_width + 10);
            _.$elements.tabs.appendTo(_.$elements.tabs_mover);
            _.$elements.tabs_controlls = $(settings.html.tabs_controlls).appendTo(_.$elements.tabs_container);
            _.$elements.fade_right = $(settings.html.fade_right).appendTo(_.$elements.tabs_controlls);
            _.$elements.tabs_pagination = $(settings.html.tabs_pagination).appendTo(_.$elements.tabs_controlls);
            _.$elements.controlls_left = $(settings.html.controlls_left).appendTo(_.$elements.tabs_pagination);
            _.$elements.controlls_left.addClass(settings.classes.disabled);
            for (var i = 0; i < (_.tabs_width / _.tabs_container_width); i++) {
                 $(settings.html.controlls_item).appendTo(_.$elements.tabs_pagination);
            };
            _.$elements.controlls_item = _.$elements.tabs_pagination.find('.'+settings.classes.pagination_item);
            _.$elements.controlls_item.filter(':first').addClass(settings.classes.current);
            _.$elements.controlls_right = $(settings.html.controlls_right).appendTo(_.$elements.tabs_pagination);
            _.controlls_width = _.$elements.tabs_controlls.outerWidth();
            _.view_width = _.$elements.tabs_container.outerWidth() - _.controlls_width;
            var diff = (_.$elements.current_tab.length > 0) ? (_.view_width - (_.$elements.current_tab.position().left + _.$elements.current_tab.outerWidth())) : 0;
            if (diff < 0) {
                _.$elements.tabs_mover.css('left', diff);
                _.$elements.fade_left.show();
                _.$elements.controlls_left.removeClass(settings.classes.disabled);
            };
            _.$elements.tabs_container.height(_getTabsMaxHeight());
            _startPaginationEventListener();
        };
        function _destroyPagination(){
            if (_.$elements.fade_left != null) {
                _.$elements.fade_left.remove();
                _.$elements.tabs.unwrap(settings.html.tabs_mover);
                _.$elements.tabs_controlls.empty().remove();
            };
        };
        function _setVerticalHeight() {
            var $container = _.$elements.root.parent();
            _.$elements.content_container.css('min-height', $container.height());
            _.$elements.content_overlay =$(settings.html.content_overlay).insertBefore(_.$elements.content_container);
        };
        function _getUrlData($elem, callback){
            $.ajax({
                url: obj.url,
                beforeSend: function(){
                    _.$elements.tabs.removeClass(settings.classes.current);
                    $elem.addClass(settings.classes.current);
                    _.$elements.current_content.html(settings.html.loadingHtml);
                    settings.beforeSend();
                },
                success: function(returned){
                    setTimeout(function(){
                        if ($.parseJSON(returned))
                            returned = $.parseJSON(returned);
                        else if ($.parseHTML(returned)) {
                            _.$elements.current_content.html($.parseHTML(returned));
                        };
                        if (typeof callback == 'function')
                            callback(returned);
                    }, 5000);
                }
            });
        };
        function _setCurrentTab($elem){
            _.$elements.tabs.removeClass(settings.classes.current);
            $elem.addClass(settings.classes.current);
        };
        function _setCurrentTabContent($elem){
            var url = $elem.attr('href');
            _.$elements.contents.removeClass(settings.classes.current);
            $(url).addClass(settings.classes.current);
        };
        function _eventListener(){
            _.$elements.tabs.on('click', function(e){
                var $this = $(this);
                if (settings.change_tabs_only) {
                    e.preventDefault();
                    _setCurrentTab($this);
                    _.$elements.root.trigger('tab_change', [$this.attr('href')]);
                } else if (!settings.disabled) {
                    e.preventDefault();
                    _setCurrentTab($this);
                    _setCurrentTabContent($this);
                } else if (settings.ajax_load){
                    e.preventDefault();
                    obj.url = $this.attr('href');
                    _getUrlData($this, function(data){
                        _.$elements.root.trigger('dataLoaded', data);
                    });
                };
                settings.onTabChange();
            });
            
            if (_.$elements.ext_trigger) {
                _.$elements.ext_trigger.on('click', function(e){
                    var $this = $(this);
                    var $e_target = $(e.target);
                    _.$elements.ext_trigger.removeClass(settings.classes.current);
                    $this.addClass(settings.classes.current);
                    var $target = $($this.attr('data-href') || $this.attr('href') || $this.val());
                    _.$elements.contents.removeClass(settings.classes.current);
                    $target.addClass(settings.classes.current);
                    settings.onTabChange();
                });
            };
            _.$elements.root.on('dataLoaded', function(){
                settings.onDataLoaded();
            });
            //TODO: Да се ъпдейтват табовете при ресайз на прозорци - responsive
            if (settings.updateOnResize) {
                $(window).on('resize', function(){

                });
            }
        };
        function _startPaginationEventListener(){
            _.$elements.controlls_right.on('click', function(){
                if (!_.$elements.controlls_right.hasClass(settings.classes.disabled)) {
                    var $current_item = _.$elements.controlls_item.filter('.'+settings.classes.current);
                    _.$elements.controlls_item.removeClass(settings.classes.current);
                    $current_item.next().addClass(settings.classes.current);
                    _.$elements.controlls_right.addClass(settings.classes.disabled);
                    _.$elements.controlls_left.removeClass(settings.classes.disabled);
                    _.$elements.fade_left.show();
                    _.$elements.tabs_mover.animate({
                        left: -(_.tabs_width - (_.tabs_container_width - _.controlls_width))
                    });
                };
            });
            _.$elements.controlls_left.on('click', function(){
                if (!_.$elements.controlls_left.hasClass(settings.classes.disabled)) {
                    var $current_item = _.$elements.controlls_item.filter('.'+settings.classes.current);
                    _.$elements.controlls_item.removeClass(settings.classes.current);
                    $current_item.prev().addClass(settings.classes.current);
                    _.$elements.controlls_left.addClass(settings.classes.disabled);
                    _.$elements.controlls_right.removeClass(settings.classes.disabled);
                    _.$elements.fade_left.hide();
                    _.$elements.tabs_mover.animate({
                        left: 0
                    });
                };
            });
        };
        __construct();
    };
    
    $.fn.tabs = function(options, parameters){
        return this.each(function(){
            var element = $(this);
            var element_data = element.data('tabs');
            if (element_data) {
                if (options != 'init' && eval('typeof '+ element_data('tabs')[options]) == 'function') 
                    element_data('tabs')[options](parameters);
            } else {
                var tabs = new Tabs(this, options);
                element.data('tabs', tabs);
            }; 
        });
    };
})(jQuery);