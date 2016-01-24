/**
 * TITLE: WYSSI theme editor script
 * AUTHOR: Lubomir Peikov
 * VERSION: v0.0.1
 * COPYRIGHT: MIT license!
 *
 * @param {object} $ - jQuery
 * @param {object} window
 * @param {object} document
 * @returns {object}
 */

;(function($, window, document) {
    'use strict';
    var pluginName = 'themeEditor',
        version = 'v0.0.1',
        dependancies = [],
        local_namespace = {};

    if (typeof window.Localization === 'undefined')
        window.Localization = {};

    window.Localization[pluginName] = {
        en: {}
    };
    
    var Theme = function(options){
        var obj = this;
        
        var defaults = {
            url: {
                get_theme: 'admin/themes/getTheme',
                save_theme: 'admin/themes/saveTheme'
            }
        };
        
        this.id;
        this.layout;
        this.sections;
        this.elements;
        this.widgets;
        
        var _ = {
            settings: $.extend(true, {}, defaults, options || {})
        };
        
        function __construct(){}
        
        this.getTheme = function(id){
            
        };
        
        __construct();
    };

    /**
     * Main Class of the plugin
     *
     * @param {DOM} element
     * @param {object} options
     * @returns {undefined}
     */
    local_namespace[pluginName] = function(element, options) {
        var obj = this;
        /**
         * Default settings for the plugin
         * @type object
         */
        var defaults = {
            lang: 'en',
            selectors: {
                iframe: '#ThemeEditor-container > iframe',
                main_menu_container: 'body .layouts-container > img',
                main_preview_container: '#ThemeEditor-container'
            },
            url: {
                get_resources: 'admin/themes/getResources'
            },
            html: {
                
            }
        };
        
        var _ = {
            $elements: {
                body: $('body')
            },
            settings: $.extend(true, {}, defaults, options || {}),
            main_dir: ''
        };
        
        var theme = new Theme();

        /**
         * Initialization of the object
         * @returns {object} Plugin class instance
         */
        function __construct() {
            _buildSelectors();
            _buildHTMLElements();
            _getResources(function(elements_data){
                console.log(elements_data);
                _runEventListeners();
            });
            _.$elements.iframe.body.html('<h1 style="color: red;">Hello world!</h1>');
            // init here draggable and droppable
            return this;
        }
        
        function _buildSelectors(){
            for (var key in _.settings.selectors) {
                _.$elements[key] = $(_.settings.selectors[key]);
                var nodeType = (_.$elements[key].get(0) || {}).tagName;
                if (nodeType && (nodeType || '').toLowerCase() === 'iframe') {
                    _.$elements[key] = {
                        html: _.$elements[key].contents().find('html'),
                        head: _.$elements[key].contents().find('head'),
                        body: _.$elements[key].contents().find('body')
                    };
                }
            }
            
            _.main_dir = _.$elements.body.data('main_dir');
            return true;
        }
        
        function _buildHTMLElements(){
            
        }
        
        function _getResources(callback){
            if (1 !== 1)
                $.ajax({
                    url: _.main_dir + _.settings.url.get_resources,
                    //dataType: 'json',
                    success: function(data){
                        if (typeof callback === 'function') {
                            callback(data);
                        }
                    }
                });
            else
                callback();
        }
        
        /**
         * Run event listeners
         * @returns {Boolean}
         */
        function _runEventListeners(){
            _.$elements.main_menu_container.draggable({
                helper: 'clone'
            });
            _.$elements.main_preview_container.droppable({
                drop: function(e, ui){
                    console.log($(ui.draggable).data());
                    //$(this).append($(ui.draggable).clone());
                }
            });
            return true;
        }

        /**
         * @description Returns current plugin version
         * @returns {string}
         */
        this.version = function(){
            return version;
        };

        /**
         * @description Returns current settings
         * @returns {object}
         */
        this.getSettings = function() {
            return _.settings;
        };

        /**
         * @description Sets an option
         * @example $('.some-selector').pluginName('some_option', 'option_value');
         * @example $('.some-selector').pluginName('some_option', { opt1: 1, opt2: 2: opt3: 'text_value'});
         * @param {string|object} option
         * @param {string|number|array|object} value
         * @returns {object} jQuery selector or error
         */
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
        
        /**
         * 
         * @param {string} func_name Custom function name
         * @param {function} func Custom function itself
         * @returns {object} Plugin class instance
         */
        this.customFunction = function(func_name, func){
            if (obj.hasOwnProperty(func_name)) {
                if (window.console && console.error) console.error('You cannot overwrite already defined custom function!');
            } else {
                obj[func_name] = func;
            }
            return this;
        };

        __construct();

    };
    
    $[pluginName] = function(options, parameters){
        var all_dependancies_loaded = true;
        var missing_dependancies = [];

        if (dependancies.length > 0) {
            $.each(dependancies, function(i, val){
                if (typeof $.fn[val] === 'undefined') {
                    all_dependancies_loaded = false;
                    missing_dependancies.push(val);
                }
            });
        }
        if (all_dependancies_loaded) {
            var args = arguments,
                result;
            
            var $this = $('body'),
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
        }
    };
})(jQuery, window, document);