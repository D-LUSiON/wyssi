//TODO: Да се обединят _filterResults и _setFilteredResults - няма смисъл да се обикаля още един път целия масив с данни;
//TODO: Да се измисли как да се добавят всички резултати на веднъж в dropdown-а, но да се запази на всеки елемент data-та;

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
                main_menu_container: 'body > header'
            },
            html: {
                
            }
        };
        var _ = {
            $elements: {
                body: $('body'),
                main_menu_container: $()
            },
            settings: $.extend(true, {}, defaults, options || {})
        };

        /**
         * Initialization of the object
         * @returns {object} Plugin class instance
         */
        function __construct() {
            _buildSelectors();
            _buildHTMLElements();
            _runEventListeners();
            return this;
        }
        
        function _buildSelectors(){
            for (var key in _.settings.selectors)
                _.$elements[key] = $(_.settings.selectors[key]);
            return true;
        }
        
        function _buildHTMLElements(){
            
        }
        
        /**
         * Run event listeners
         * @returns {Boolean}
         */
        function _runEventListeners(){
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

$(function(){
    $.themeEditor();
});