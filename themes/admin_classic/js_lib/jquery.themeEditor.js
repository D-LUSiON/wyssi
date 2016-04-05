/**
 * TITLE: WYSSI theme editor script
 * AUTHOR: Lubomir Peikov
 * VERSION: v0.0.1
 * COPYRIGHT:
 *      (2015 - 2016) D-LUSiON;
 *      Licensed under the MIT license: http://www.opensource.org/licenses/MIT
 * 
 * @author D-LUSiON
 * @version v0.0.1
 * @param {object} $ - jQuery
 * @param {object} window
 * @param {object} document
 * @returns {object}
 */

/**
 * Changelog:
 * 
 * v0.0.1:
 * - Initial build
 */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'jquery.ui'
        ], factory);
    } else {
        // Browser globals:
        factory(window.jQuery);
    }
}(function ($) {
    'use strict';
    var pluginName = 'themeEditor',
        version = 'v0.0.1',
        dependancies = [],
        local_namespace = {},
        
        CONST = {};

    if (typeof window.Localization === 'undefined')
        window.Localization = {};

    window.Localization[pluginName] = {
        en: {},
        bg: {}
    };
    
    var Theme = function (options) {
        var obj = this;

        var defaults = {
            transport: {
                get: '/admin/themes/getTheme',
                save: '/admin/themes/saveTheme'
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

        function __construct() {}

        this.getTheme = function (id) {};

        __construct();
    };

    var ThemeResources = function (options) {
        var obj = this;

        var defaults = {
            transport: {
                get: '/admin/themes/getThemeResources'
            }
        };

        this.data = {};

        var _ = {
            settings: $.extend(true, {}, defaults, options || {})
        };

        function __construct() {
        }

        this.getResources = function (callback) {
            $.ajax({
                url: _.settings.transport.get,
                type: 'POST',
                dataType: 'json',
                success: function (response) {
                    obj.data = response;
                    if (typeof callback === 'function')
                        callback(response);
                }
            });
        };

        __construct();
    };

    local_namespace[pluginName] = function (element, options) {
        var obj = this;
        this.defaults = {
            lang: 'en',
            selectors: {
                iframe: '#ThemeEditor-container > iframe',
                main_menu_container: 'body .layouts-container > img',
                main_preview_container: '#ThemeEditor-container',
                layouts_container: '.layouts_list-container',
                elements_container: '.elements_list-container'
            },
            url: {
                get_resources: 'admin/themes/getResources'
            },
            templates: {
                layout: '<div class="layout-container">'+
                            '<div class="image-container">'+
                                '<img src="[[thumb_src]]" alt="" title="[[thumb]] - [[name]]"/>'+
                            '</div>'+
                        '</div>',
                widget: '<div class="widget-container draggable">'+
                            '<div class="image-container">'+
                                '<img src="[[thumb_src]]" alt="" title="[[thumb]] - [[name]]"/>'+
                            '</div>'+
                            '<div class="widget-title">[[name]]</div>'+
                        '</div>'
            },
            droppable_settings: {
                iframeFix: true,
                drop: function (e, ui) {
                    var dropped_data = $(ui.draggable).data(),
                        $dropped_element = $(dropped_data.html).data(dropped_data);
                    $dropped_element.appendTo(e.target);
                    console.log(ui, e.target);
                }
            }
        };
        
        this.$selectors = {
            body: $('body')
        };
        
        this.settings = $.extend(true, {}, this.defaults, options || {});
        
        this.localization = window.Localization[pluginName][this.settings.lang];
        
        var _ = {
            main_dir: '',
            ie_lt_9: ($.browser.msie && parseFloat($.browser.version) > 9) || (!$.browser.msie && navigator.userAgent.indexOf('Trident') === -1)
        };
        
        this.Theme = new Theme();

        this.Resources = new ThemeResources();
        
        function __construct() {
            _buildSelectors();
            _buildHTMLElements();
            _injectEditorStyles();
            obj.Resources.getResources(function (elements_data) {
                _setLoadedElementsToView();
                // init here draggable and droppable
                _startEventListeners();
            });
            return this;
        }

        function _translate(text, custom_value, custom_text, lang) {
            if (text) {
                if (custom_value && custom_text) {
                    return text.replace(new RegExp('%' + custom_value + '%', 'gi'), custom_text);
                } else {
                    return text.replace(/\%(.+?)\%/gi, function ($0, $1) {
                        if (window.Localization[pluginName][lang || obj.settings.lang][$1])
                            return window.Localization[pluginName][lang || obj.settings.lang][$1];
                        else
                            return window.Localization[pluginName][lang || obj.defaults.lang][$1] || '';
                    });
                }
            } else {
                return false;
            }
        }

        function _renderTemplate(template, data) {
            if (template && data) {
                return _translate(
                            template.replace(/\[\[(.+?)\]\]/gi, function ($0, $1) {
                                return data[$1] || '';
                            })
                        );
            }
            
            throw new Error('Please, provide valid template AND data!');
            return false;
        }
        
        function _buildSelectors() {
            for (var key in obj.settings.selectors) {
                obj.$selectors[key] = $(obj.settings.selectors[key]);
                var nodeType = (obj.$selectors[key].get(0) || {}).tagName;
                if (nodeType && (nodeType || '').toLowerCase() === 'iframe') {
                    obj.$selectors[key] = {
                        html: obj.$selectors[key].contents().find('html'),
                        head: obj.$selectors[key].contents().find('head'),
                        body: obj.$selectors[key].contents().find('body')
                    };
                }
            }

            _.main_dir = obj.$selectors.body.data('main_dir');
            return true;
        }
        
        function _buildHTMLElements() {}
        
        function _injectEditorStyles() {
            obj.$selectors.iframe.head.append('<link rel="stylesheet" href="/resources/theme_editor.css" data-rel="editor_styles"/>');
        }
        
        function _setLoadedElementsToView() {
            for (var key in obj.Resources.data) {
                switch (key) {
                    case 'layouts':
                        _setLayoutsToView(obj.Resources.data[key]);
                        break;
                    case 'elements':
                        _setElementsToView(obj.Resources.data[key]);
                        break;
                    default: break;
                }
            }
        }
        
        function _setLayoutsToView(layouts_data){
            if (layouts_data instanceof Array) {
                layouts_data.forEach(function(current, index){
                    current.thumb_src = current.path + current.thumb;
                    var template = _renderTemplate(obj.settings.templates.layout, current),
                        $target = obj.$selectors.layouts_container.filter('[data-element_type="' + current.type.toLowerCase() + '"]'),
                        $layout = $(template).data('element', current).appendTo($target);
                });
            } else {
                console.error('Wrong layouts data!');
            }
        }
        
        function _setElementsToView(elements_data){
            if (typeof elements_data === 'object') {
                for (var key in elements_data) {
                    if (elements_data[key] instanceof Array) {
                        for (var i = 0, max = elements_data[key].length; i < max; i++) {
                            // set to appropriate places
                            var current = elements_data[key][i];
                            current.thumb_src = current.path + current.thumb;
                            var template = _renderTemplate(obj.settings.templates.widget, current),
                                $target = obj.$selectors.elements_container.filter('[data-element_type="' + current.type.toLowerCase() + '"]');
                            var $element = $(template).data('element', current).appendTo($target).draggable({
                                iframeFix: true,
                                connectToSortable: obj.$selectors.iframe.body.find('.ui-sortable'),
                                helper: 'clone',
                                stop: function(){
                                    $element.draggable('option', 'connectToSortable', obj.$selectors.iframe.body.find('.ui-sortable'));
                                }
                            });
                        }
                    }
                }
            } else {
                console.error('Wrong elements data!');
            }
        }
        
        function _onElementDrop(e, ui) {
            console.log($(ui.item).data());
            var dropped_data = $(ui.item).data('element'),
                $dropped_element = $(dropped_data.html).data('element', dropped_data);
            $dropped_element.appendTo(e.target);
            if ($dropped_element.hasClass('.ui-sortable'))
                $dropped_element.sortable({
                    revert: true,
                    connectWith: '.ui-sortable',
                    hoverClass: 'ui-sortable-active',
                    iframeFix: true,
                    stop: _onElementDrop
                });
            $('.ui-sortable').sortable('refresh');
        }
        
        function _setLayoutToIframe(data){
            obj.$selectors.iframe.head
                    .find('link').not('[data-rel="editor_styles"]')
                    .remove();
            obj.$selectors.iframe.head
                    .append('<link rel="stylesheet" href="'+ data.path + data.resources.css + '"/>');
            
            obj.$selectors.iframe.body.html(data.html);
            obj.Theme.layout = data;
        }

        function _startEventListeners() {
//            obj.$selectors.main_menu_container.draggable({
//                helper: 'clone'
//            });
//            obj.$selectors.iframe.body.droppable({
//                drop: function (e, ui) {
//                    var dropped_data = $(ui.draggable).data(),
//                        $dropped_element = $(dropped_data.html).data(dropped_data);
//                    console.log(ui, e.target);
//                }
//            });
            obj.$selectors.iframe.body.on('DOMNodeInserted', function(e){
                $(e.target).find('.ui-sortable')
                            .sortable({
                                revert: true,
                                connectWith: '.ui-sortable',
                                hoverClass: 'ui-sortable-active',
                                iframeFix: true,
                                stop: _onElementDrop
                            });
            });
            obj.$selectors.layouts_container.on('click', '> *', function(){
                var el_data = $(this).data('element');
                _setLayoutToIframe(el_data);
            });
            return true;
        }
        
        this.enable = function(){
            return this;
        };
        
        this.disable = function(){
            return this;
        };
        
        this.destroy = function(){
            return this.$selectors.root;
        };

        __construct();
    };


    local_namespace[pluginName].prototype = {
        version: function () {
            return version;
        },

        getSettings: function () {
            return this.settings;
        },

        setSettings: function (option, value) {
            switch (typeof option) {
                case 'string':
                    if (option && value) {
                        var new_options = {};
                        new_options[option] = value;
                        this.settings = $.extend(true, {}, this.settings, new_options || {});
                        return _.$element.root;
                    } else
                        throw new Error('Please, provide valid option to change and its value or the whole settings object!');
                    break;
                case 'object':
                    this.settings = $.extend(true, {}, this.settings, option || {});
                    return _.$element.root;
                    break;
                default:
                    throw new Error('Please, provide valid option to change and its value or the whole settings object!');
                    break;
            }
        }
    };

    $[pluginName] = function (options, parameters) {
        var all_dependancies_loaded = true;
        var missing_dependancies = [];

        if (dependancies.length > 0) {
            $.each(dependancies, function (i, val) {
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
}));