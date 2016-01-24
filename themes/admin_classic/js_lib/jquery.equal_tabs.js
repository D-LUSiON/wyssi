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
            templates: {
                example_template: '<div>%some_text% - [[some_value]]</div>'
            }
        };
        
        var _ = {
            $element: {
                root: $(element),
                body: $('body')
            },
            ie_lt_9: ($.browser.msie && parseFloat($.browser.version) > 9) || (!$.browser.msie && navigator.userAgent.indexOf('Trident') === -1),
            settings: $.extend(true, {}, defaults, options || {})
        };
        
        _.localization = window.Localization[pluginName][_.settings.lang];
        
        var __construct = (function(){
            _startEventListeners();
            return this;
        })();
        
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