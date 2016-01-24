/**
 * TITLE: File Browser
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
    var pluginName = 'fileBrowser',
        version = 'v0.0.1',
        dependancies = ['modalWindow'],
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
            transport: {
                create: {
                   url: '' 
                },
                read: {
                    url: window.main_dir + 'files/getList'
                },
                update: {
                    url: ''
                },
                del: {
                    url: ''
                }
            },
            classes: {
                directory_tree: {
                    selector: '.folders_tree',
                    item: '.folder_title'
                },
                all_list: {
                    selector: '.file_browser-file_container',
                    item: '.file_container'
                }
            },
            template: {
                directory_tree: {
                    container: '<ul/>',
                    item:   '<li data-dir="[[title]]">'+
                                '<div class="folder_title" data-type="folder">[[title]]</div>'+
                            '</li>'
                },
                all_list: {
                    item:   '<div class="file_container" data-type="[[type]]" data-title="[[title]]">'+
                                '<div class="file_icon-container">'+
                                    '<span class="fa fa-[[type]]"></span>'+
                                '</div>'+
                                '<div class="file_title">[[title]]</div>'+
                                '<div class="file_size">[[size]]</div>'+
                                '<div class="file_type">[[type]]</div>'+
                            '</div>'
                },
                contextmenu: {
                    container: '<div class="file_browser-contextmenu"/>',
                    item: '<div class="menu-item" data-action="[[action]]">[[title]]</div>',
                    divider: '<div class="menu-divider"/>'
                }
            },
            contextmenu_items: {
                folder: [
                    {
                        title: 'Upload file',
                        action: 'file_upload'
                    },
                    {
                        title: 'Rename',
                        action: 'rename_folder'
                    },
                    {
                        title: 'Delete',
                        action: 'delete_folder'
                    },
                    'divider',
                    {
                        title: 'Properties',
                        action: 'file_properties'
                    }
                ],
                file: [
                    {
                        title: 'Rename',
                        action: 'rename_file'
                    },
                    {
                        title: 'Delete',
                        action: 'delete_file'
                    },
                    'divider',
                    {
                        title: 'Properties',
                        action: 'file_properties'
                    }
                ],
                whitespace: [
                    {
                        title: 'Upload file',
                        action: 'file_upload'
                    },
                    {
                        title: 'New folder',
                        action: 'new_folder'
                    }
                ]
            }
        };
        
        var _ = {
            $elements: {
                body: $('body'),
                root: $(element),
                directory_tree: ''
            },
            settings: $.extend(true, {}, defaults, options || {})
        };
        
        this.current_path = '/';
        
        /**
         * Initialization of the object
         * @returns {object} Plugin class instance
         */
        function __construct() {
            _buildHTML();
            _runEventListeners();
            _getDir(null);
            return this;
        }
        
        function _buildHTML(){
            _.$elements.contextmenu = $(_.settings.template.contextmenu.container).appendTo(_.$elements.body);
            _.$elements.directory_tree = _.$elements.root.find(_.settings.classes.directory_tree.selector);
            _.$elements.all_container = _.$elements.root.find(_.settings.classes.all_list.selector);
        }
        
        function _getDir(path){
            path = (!path)? obj.current_path : path;
            var $tree_element = _.$elements.directory_tree.find('[data-dir="'+path+'"]').children(':first-child');
            _.$elements.directory_tree.find('.current').removeClass('current');
            $tree_element.addClass('current');
                    
            $.ajax({
                url: _.settings.transport.read.url,
                data: {
                    dir: path
                },
                method: 'POST',
                dataType: 'json',
                success: function(response){
                    obj.current_path = path;
                    var folders = '',
                        all = '',
                        $dir_container = $(_.settings.template.directory_tree.container).insertAfter($tree_element);
                    
                    for (var i = 0, max = response.length; i < max; i++) {
                        if (response[i].type === 'folder')
                            folders += _.settings.template.directory_tree.item.replace(/\[\[title\]\]/gi,response[i].title);
                        
                        all += _.settings.template.all_list.item.replace(/\[\[(.+?)\]\]/gi, function($0, $1){
                            if (response[i][$1])
                                return response[i][$1];
                            return '';
                        });
                    }
                    if (!$tree_element.parent().hasClass('open')) {
                        $tree_element.parent().addClass('open');
                        if (folders === '')
                            $dir_container.remove();
                        else 
                            $dir_container.html(folders);
                    }
                    
                    _.$elements.all_container.html(all);
                }
            });
        }
        
        function _showContextMenu(type, e){
            _hideContextMenu();
            var context_content = '';
            if (typeof _.settings.contextmenu_items[type] === 'object') {
                for (var i = 0, max = _.settings.contextmenu_items[type].length; i < max; i++) {
                    if (typeof _.settings.contextmenu_items[type][i] === 'string') {
                        context_content += _.settings.template.contextmenu[_.settings.contextmenu_items[type][i]];
                    } else 
                        context_content += _.settings.template.contextmenu.item.replace(/\[\[(.+?)\]\]/gi, function($0, $1){
                            if (_.settings.contextmenu_items[type][i][$1]) {
                                return _.settings.contextmenu_items[type][i][$1];
                            } else
                                return '';
                        });
                }
                
            }
            _.$elements.contextmenu.html(context_content).css({
                top: e.pageY + 'px',
                left: e.pageX + 'px'
            }).show();
        }
        
        function _hideContextMenu(){
            _.$elements.contextmenu.empty().hide();
        }
        
        function _contextAction(action){
            console.log(action);
            switch (action) {
                case '':
                    
                    break;
                    
                default: break;
            }
            _hideContextMenu();
        }
        
        /**
         * Run event listeners
         * @returns {Boolean}
         */
        function _runEventListeners(){
            _.$elements.root.on('click', function(){
                _.$elements.contextmenu.empty().hide();
            });
            _.$elements.directory_tree.on('click', _.settings.classes.directory_tree.item, function(){
                var $this = $(this);
                var dir = $this.parent().data('dir');
                if (dir) {
                    _getDir(dir);
                }
            }).on('contextmenu', _.settings.classes.directory_tree.item, function(e){
                e.preventDefault();
                e.stopPropagation();
                var $this = $(this);
                _showContextMenu($this.data('type'), e);
            }).parent().on('contextmenu', function(e){
                e.preventDefault();
                e.stopPropagation();
                _showContextMenu('whitespace',e);
            });
            
            _.$elements.all_container.on('contextmenu', '.' + $(_.settings.template.all_list.item).attr('class').replace(/\s{1,}/gi, '.'), function(e){
                e.preventDefault();
                e.stopPropagation();
                var $this = $(this);
                if (!e.ctrlKey && !e.shiftKey) {
                    _.$elements.all_container.find('.' + $(_.settings.template.all_list.item).attr('class').replace(/\s{1,}/gi, '.')).removeClass('selected');
                }
                $this.addClass('selected');
                _showContextMenu($this.data('type'), e);
            }).on('click', '.' + $(_.settings.template.all_list.item).attr('class').replace(/\s{1,}/gi, '.'), function(e){
                var $this = $(this);
                
                if (!e.ctrlKey && !e.shiftKey) {
                    _.$elements.all_container.find('.' + $(_.settings.template.all_list.item).attr('class').replace(/\s{1,}/gi, '.')).removeClass('selected');
                }
                $this.toggleClass('selected');
            }).on('dblclick', '.' + $(_.settings.template.all_list.item).attr('class').replace(/\s{1,}/gi, '.'), function(e){
                e.preventDefault();
                e.stopPropagation();
                var $this = $(this);
                
                if ($this.data('type') === 'folder')
                    _getDir($this.data('title'));
            }).parent().parent().on('contextmenu', function(e){
                e.preventDefault();
                e.stopPropagation();
                _.$elements.all_container.find('.' + $(_.settings.template.all_list.item).attr('class').replace(/\s{1,}/gi, '.')).removeClass('selected');
                _showContextMenu('whitespace',e);
            });
            
            _.$elements.contextmenu.on('click', '.' + $(_.settings.template.contextmenu.item).attr('class').replace(/\s{1,}/gi, ''), function(){
                _contextAction($(this).data());
            });
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
    
    $.fn[pluginName] = function(options, parameters){
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
    };
})(jQuery, window, document);