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
        dependancies = ['modalWindow', 'fileupload'],
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
                read: {
                    url: window.main_dir + 'files/getList'
                },
                update: {
                    url: window.main_dir + 'files/update'
                },
                mkdir: {
                    url: window.main_dir + 'files/mkdir'
                },
                remove: {
                    url: window.main_dir + 'files/delete'
                },
                upload: {
                    url: window.main_dir + 'files/upload'
                },
                get_properties: {
                    url: window.main_dir + 'files/getProperties'
                }
            },
            file_upload_options: {
                maxChunkSize: 2 * 1024 * 1024 // 2Mb
            },
            multiple_upload: true,
            classes: {
                directory_tree: {
                    selector: '.folders_tree',
                    item: '.folder_title'
                },
                all_list: {
                    selector: '.file_browser-file_container',
                    item: '.file_container'
                },
                uploader: {
                    input: '.file_upload-trigger',
                    progress_container: '.file_browser-progress',
                    progress: '.progress',
                    info: '.progress-info'
                }
            },
            template: {
                directory_tree: {
                    container: '<ul/>',
                    item:   '<li data-dir="[[path]]">'+
                                '<div class="folder_title" data-type="folder">[[title]]</div>'+
                            '</li>'
                },
                all_list: {
                    item:   '<div class="file_container" data-type="[[type]]" data-title="[[path]]">'+
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
                        action: 'delete_file_folder'
                    },
                    'divider',
                    {
                        title: 'Refresh',
                        action: 'refresh'
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
                        action: 'delete_file_folder'
                    },
                    'divider',
                    {
                        title: 'Refresh',
                        action: 'refresh'
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
                    },
                    {
                        title: 'Refresh',
                        action: 'refresh'
                    }
                    
                ]
            }
        };
        
        var _ = {
            $elements: {
                body: $('body'),
                root: $(element),
                directory_tree: '',
                uploader_input: null,
                uploader: {
                    input: null,
                    progress_container: null,
                    progress: null,
                    info: null
                }
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
            _initFileUploader();
            _runEventListeners();
            _getDir(null);
            return this;
        }
        
        function _buildHTML(){
            _.$elements.contextmenu = $(_.settings.template.contextmenu.container).appendTo(_.$elements.body);
            _.$elements.directory_tree = _.$elements.root.find(_.settings.classes.directory_tree.selector);
            _.$elements.all_container = _.$elements.root.find(_.settings.classes.all_list.selector);
        }
        
        function _initFileUploader(){
            _.$elements.uploader.progress_container = _.$elements.root.find(_.settings.classes.uploader.progress_container).hide();
            _.$elements.uploader.progress = _.$elements.uploader.progress_container.find(_.settings.classes.uploader.progress).width(0);
            _.$elements.uploader.info = _.$elements.uploader.progress_container.find(_.settings.classes.uploader.info);
            
            if (!_.settings.file_upload_options.url)
                _.settings.file_upload_options.url = _.settings.transport.upload.url;
            
            _.$elements.uploader.input = _.$elements.root.find(_.settings.classes.uploader.input)
                                            .fileupload(_.settings.file_upload_options)
                                            .on('fileuploadstart', function(){
                                                _.$elements.uploader.progress_container.show();
                                                _.$elements.uploader.progress.width('0%');
                                                _.$elements.uploader.info.text('0%');
                                            })
                                            .on('fileuploadprogress', function(e, data){
                                                var percent = parseInt(data.loaded / data.total * 100, 10);
                                                _.$elements.uploader.progress.width(percent + '%');
                                                _.$elements.uploader.info.text(percent + '%');
                                            })
                                            .on('fileuploaddone', function(e, data){
                                                _.$elements.uploader.progress_container.hide();
                                            });
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
                        if (response[i].type === 'folder') {
                            folders += _.settings.template.directory_tree.item.replace(/\[\[(.+?)\]\]/gi, function($0, $1){
                                if (response[i][$1])
                                    return response[i][$1];
                                return '';
                            });
                        
                            all += _.settings.template.all_list.item.replace(/\[\[(.+?)\]\]/gi, function($0, $1){
                                if (response[i][$1])
                                    return response[i][$1];
                                return '';
                            });
                        }
                    }
                    
                    for (var i = 0, max = response.length; i < max; i++) {
                        if (response[i].type !== 'folder') {
                            all += _.settings.template.all_list.item.replace(/\[\[(.+?)\]\]/gi, function($0, $1){
                                if (response[i][$1])
                                    return response[i][$1];
                                return '';
                            });
                        }
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
            _.$elements.contextmenu.data('node_data', e).html(context_content).css({
                top: e.pageY + 'px',
                left: e.pageX + 'px'
            }).show();
        }
        
        function _hideContextMenu(){
            _.$elements.contextmenu.empty().hide();
        }
        
        function _contextAction(action, data){
            _hideContextMenu();
            if ($.isFunction(obj.contextActions[action]))
                obj.contextActions[action](_.$elements.contextmenu.data('node_data'));
            _.$elements.contextmenu.removeData('node_data');
        }
        
        this.contextActions = {
            new_folder: function(data){
                var new_folder = prompt('Enter new folder name:');
                if (new_folder && new_folder !== '') {
                    $.ajax({
                        url: _.settings.transport.mkdir.url,
                        data: {
                            dir: obj.current_path,
                            new_folder: new_folder
                        },
                        success: function(response){
                            _getDir();
                        }
                    });
                }
            },
            rename_folder: function(data){
                console.log('rename_folder', data);
            },
            delete_file_folder: function(data){
                if (confirm('Are you sure you want to delete?')) {
                    console.log('delete_file_folder', data);
                }
            },
            file_upload: function(data){
                console.log('file_upload', $(data.currentTarget).data());
                _.$elements.uploader.input.trigger('click');
            },
            rename_file: function(data){
                var $current_target = $(data.currentTarget),
                    file_name = $current_target.data().title,
                    file_path = '/' + obj.current_path + '/' + file_name,
                    new_name = prompt('Rename file:', file_name);
                    if (new_name) {
                        var old_ext = file_name.split('.').pop(),
                            new_ext = new_name.split('.').pop();

                        if (new_name === new_ext)
                            new_name += '.' + old_ext;
                        $.ajax({
                            url: _.settings.transport.update.url,
                            data: {
                                dir: obj.current_path,
                                file_name: file_name,
                                new_name: new_name
                            },
                            success: function(response){
                                var html = $current_target.data('title', new_name).html();
                                html = html.replace(file_name, new_name);
                                $current_target.html(html);
                                console.log(file_name, old_ext, new_ext, new_name);
                            }
                        });
                    }
            },
            file_properties: function(data){
                console.log('file_properties', data);
            },
            refresh: function(data){
                _getDir();
            }
        };
        
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
                if (dir)
                    _getDir(dir);
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
                if (!e.ctrlKey && !e.shiftKey)
                    _.$elements.all_container.find('.' + $(_.settings.template.all_list.item).attr('class').replace(/\s{1,}/gi, '.')).removeClass('selected');
                
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
                else if ($this.data('type') === 'file') {
                    // TODO: Preview file
                }
            }).parent().parent().on('contextmenu', function(e){
                e.preventDefault();
                e.stopPropagation();
                _.$elements.all_container.find('.' + $(_.settings.template.all_list.item).attr('class').replace(/\s{1,}/gi, '.')).removeClass('selected');
                _showContextMenu('whitespace', e);
            });
            
            _.$elements.contextmenu.on('click', '.' + $(_.settings.template.contextmenu.item).attr('class').replace(/\s{1,}/gi, ''), function(){
                _contextAction($(this).data('action'), $(this).data());
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