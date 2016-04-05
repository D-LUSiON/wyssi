/**
 * TITLE: Equal tabs plugin title
 * AUTHOR: Lubomir Peikov aka D-LUSiON
 * VERSION: v1.0.0
 * COPYRIGHT: MIT license
 * 
 */
;(function($, window, document) {
    'use strict';
    var pluginName = 'equal_tabs',
        version = 'v1.0.0',
        dependancies = [],
        local_namespace = {};
    
    if (typeof window.Localization === 'undefined')
        window.Localization = {};
        
    window.Localization[pluginName] = {
        en: {},
        bg: {}
    };
    
    local_namespace[pluginName] = function(element, options) {
        var obj = this;
        var defaults = {
            lang: 'en',
            visible_tabs: 2, // 2 - 4
            initial_tab: 1,
            selectors: {
                tabs_container: '.tabs-container',
                tab: '.tab',
                tabs_content_container: '.tabs-content_container',
                tab_content: '.tab-content'
            },
            classes: {
                has_current: 'has_current',
                more_tabs_open: 'open',
                tab_current: 'current',
                tab_content_current: 'current',
                tabs_num: 'tabs-[[visible_tabs]]',
                has_more_tabs: 'more_tabs'
            },
            templates: {
                more_tabs: {
                    container: '<div class="more_tabs-container">',
                    trigger: '<span class="fa fa-angle-double-right"/>',
                    dropdown: '<div class="more_tabs-dropdown">'
                }
            }
        };
        
        var _ = {
            $element: {
                root: $(element),
                body: $('body'),
                tabs_container: null,
                tabs: null,
                tab_contents_container: null,
                tab_contents: null,
                more_tabs: {}
            },
            ie_lt_9: ($.browser.msie && parseFloat($.browser.version) > 9) || (!$.browser.msie && navigator.userAgent.indexOf('Trident') === -1),
            settings: $.extend(true, {}, defaults, options || {})
        };
        
        _.localization = window.Localization[pluginName][_.settings.lang];
        
        var __construct = (function(){
            _cacheSelectors();
            
            if (_.$element.tabs.length > _.settings.visible_tabs) {
                _addMoreTabsElements();
            }
            
            setCurrentTab(_.settings.initial_tab || 1);
            
            _startEventListeners();
            return this;
        })();
        
        function _cacheSelectors(){
            _.$element.tabs_container = _.$element.root.children(_.settings.selectors.tabs_container);
            _.$element.tabs = _.$element.tabs_container.children(_.settings.selectors.tab);
            _.$element.tab_contents_container = _.$element.root.children(_.settings.selectors.tabs_content_container);
            _.$element.tab_contents = _.$element.tab_contents_container.children(_.settings.selectors.tab_content);
            
            _.$element.tabs_container.addClass(_.settings.classes.tabs_num.replace(/\[\[visible_tabs\]\]/gi, _.settings.visible_tabs));
        }
        
        function _addMoreTabsElements(){
            for (var key in _.settings.templates.more_tabs) {
                _.$element.more_tabs[key] = $(_.settings.templates.more_tabs[key]);
            }
            _.$element.more_tabs.container.appendTo(_.$element.tabs_container);
            _.$element.more_tabs.trigger.appendTo(_.$element.more_tabs.container);
            _.$element.more_tabs.dropdown.appendTo(_.$element.more_tabs.container);
            _.$element.tabs.each(function(i){
                if (i >= _.settings.visible_tabs) {
                    $(this).appendTo(_.$element.more_tabs.dropdown);
                }
            });
            _.$element.tabs_container.addClass(_.settings.classes.has_more_tabs);
        }
        
        this.showMoreTabsDropdown = function(){
            _.$element.more_tabs.container.addClass(_.settings.classes.more_tabs_open);
        };
        
        this.hideMoreTabsDropdown = function(){
            if (_.$element.more_tabs.container)
                _.$element.more_tabs.container.removeClass(_.settings.classes.more_tabs_open);
        };
        
        function _removeMoreTabsElements(){
            _.$element.more_tabs.dropdown.children(_.settings.selectors.tab).each(function(){
                
            });
        }
        
        function setCurrentTab(index){
            if (index && index > 0) {
                _.$element.tabs.removeClass(_.settings.classes.tab_current);
                var $current_tab = $(_.$element.tabs.get(index-1)).addClass(_.settings.classes.tab_current);
                _.$element.tab_contents.removeClass(_.settings.classes.tab_content_current);
                _.$element.tab_contents.filter($current_tab.attr('href')).addClass(_.settings.classes.tab_content_current);
                if (_.$element.more_tabs.dropdown && _.$element.more_tabs.dropdown.find($current_tab).length === 1) {
                    _.$element.more_tabs.container.addClass(_.settings.classes.has_current);
                } else if (_.$element.more_tabs.container){
                    _.$element.more_tabs.container.removeClass(_.settings.classes.has_current);
                }
            }
        };
        
        function _translate(text, custom_value, custom_text, lang) {
            if (text) {
                if (custom_value && custom_text) {
                    return text.replace(new RegExp('%' + custom_value + '%', 'gi'), custom_text);
                } else {
                    return text.replace(/\%(.*?)\%/gi, function($0, $1){
                        return window.Localization[pluginName][lang || _.settings.lang][$1] || '';
                    });
                }
            } else {
                return false;
            }
        }
        
        function _renderTemplate(template, data){
            if (template && data) {
                return _translate(
                    template.replace(/\[\[(.*?)\]\]/gi, function($0, $1){
                        return data[$1] || '';
                    })
                );
            } else
                throw new Error('Please, provide valid template AND data!');
        }
        
        function _startEventListeners(){
            if (_.$element.more_tabs.trigger) {
                _.$element.more_tabs.trigger.on('click', function(e){
                    e.preventDefault();
                    _.$element.more_tabs.container.toggleClass(_.settings.classes.more_tabs_open);
                });
            }
            
            _.$element.tabs.on('click', function(e){
                e.preventDefault();
                var $this = $(this);
                var index = $this.index() + 1;
                
                if (_.$element.more_tabs.dropdown && _.$element.more_tabs.dropdown.find($this).length === 1)
                    index += _.settings.visible_tabs;
                
                if (index <= _.settings.visible_tabs)
                    obj.hideMoreTabsDropdown();
                
                setCurrentTab(index);
            });
        };
        
        this.version = function(){
            return version;
        };
        
        this.getSettings = function() {
            return _.settings;
        };
        
        this.setSettings = function(option, value) {
            switch (typeof option) {
                case 'string':
                    if (option && value) {
                        var new_options = {};
                        new_options[option] = value;
                        _.settings = $.extend(true, {}, _.settings, new_options || {});
                        return _.$element.root;
                    } else 
                        throw new Error('Please, provide valid option to change and its value or the whole settings object!');
                    break;
                case 'object':
                    _.settings = $.extend(true, {}, _.settings, option || {});
                    return _.$element.root;
                    break;
                default: 
                    throw new Error('Please, provide valid option to change and its value or the whole settings object!');
                    break;
            }
        };
    };
    
    $.fn[pluginName] = function(options, parameters) {
        
        var all_dependancies_loaded = true;
        var missing_dependancies = [];
        
        if (dependancies.length > 0) {
            $.each(dependancies, function(i, val){
                if (typeof $.fn[val] === 'undefined' && typeof $[val] === 'undefined') {
                    all_dependancies_loaded = false;
                    missing_dependancies.push(val);
                }
            });
        }
        
        if (all_dependancies_loaded) {
            var args = arguments,
                result;
            
            this.each(function() {
                var $this = $(this),
                    data = $this.data(pluginName);

                if (!data || typeof data === 'undefined') {
                    var instance = new local_namespace[pluginName](this, options);
                    $this.data(pluginName, instance);
                } else {
                    if (typeof options === 'string' && typeof data[options] === 'function')
                        result = data[options].apply(data, Array.prototype.slice.call(args, 1));
                    else
                        throw new Error(pluginName + ' method "' + options + '" not found!');
                }
            });
            
            return result || this;
        } else {
            throw new Error(pluginName + ' needs these jQuery plugin(s) to be loaded: ' + missing_dependancies.join(', '));
        }
    };
})(jQuery, window, document);