(function($) {
    var ModalWindow = function(content, options) {
        var obj = this;
        // private variables
        var defaults = {
            // general options
            width: null,
            add_class: '',
            pushState: false,
            multiple: false,
            centerVertical: true,
            fullscreen: false,
            fixedLayout: true,
            contentHeight: false,
            windowTitle: '',
            overlayClickClose: true,
            autoClose: false,
            animate: false,
            windowScroll: false,
            reopenOnRefresh: false,
            addHeader: false,
            data: {},
            // element classes
            closeButtonClass: 'closeModalWindow',
            saveCloseButtonClass: 'saveAndCloseWindow',
            modalWindowOverlayId: 'modalWindowOverlay',
            modalWindowContainerClass: 'modalWindowContainer',
            modalWindowHeaderClass: 'modalWindowHeader',
            modalWindowContentClass: 'modalWindowContent',
            // html
            html: {},
            not_logged_modal_content: 'user.php?act=showLoginWindow',
            not_logged_width: 390,
            // events
            onError: function() {},
            onBeforeOpenWindow: function() {},
            onAfterOpenWindow: function() {},
            onClose: function() {},
            onSaveClose: function() {},
            onReady: function(){}
        };
        
        defaults.html = {
                overlay: '<div id="'+defaults.modalWindowOverlayId+'"/>',
                windowContainer: '<div class="'+defaults.modalWindowContainerClass+'[[add_class]]" id="modalWindow[[win_id]]"/>',
                windowHeader: '<div class="'+defaults.modalWindowHeaderClass+'">[[header_title]]<div class="delete[[closeButtonClass]]"></div><div class="clearright"></div></div>',
                windowContent: '<div class="'+defaults.modalWindowContentClass+'"></div>'
        };
        
        var settings = $.extend(defaults, options || {});
        
        var _ = {
            $elements: {
                window: $(window),
                body: $('body'),
                modalOverlay: null,
                modalContainer: null,
                modalHeader: null,
                modalContent: null,
                close_buttons: null
            }
        };
        var _var = {
            isUrl: /^(ftp:\/\/|http:\/\/|https:\/\/)?(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!-\/]))?$/,
            isImg: /^(.*?)\.(jpg|png|gif)/i,
            isHtmlTag: /(<([^>]+)>)/ig,
            contentType: '',
            error: ''
        };

        // public variables
        this.elements = {
            overlay: null,
            modal: null
        };
        this.urlToOpen = null;
        this.windowContentHtml = '';

        // public methods
        function __construct() {
            if ($('#modalWindowOverlay').length > 0) {
                _getExistingWindow();
                obj.destroy(function(){
                    _init();
                });
            } else {
                _init();
            };
        };
        
        function _init() {
            if (typeof(Storage) !== 'undefined' && settings.reopenOnRefresh) {
                sessionStorage.setItem('modalWindow', JSON.stringify({ content: content, options: options }));
                sessionStorage.setItem('URI', window.location.href);
            };
            _checkContentType(content);
            _eventListener();
            _contentController();
            if (settings.autoClose) {
                setTimeout(function(){
                    obj.destroy();
                }, settings.autoClose);
            };
        };
        
        function _preloadImages(images, callback) {
            if (!images || images === null) {
                if (callback) {
                    callback();
                };
                return;
            };
            var loaded_index = 0;
            if (images.length > 0) {
                for (var i = 0; i < images.length; i++) {
                    images[i] = images[i].replace(/src\=\"(.*?)\"/gi, function($0, $1){
                        return $1;
                    });
                    if (images[i] === '' || images[i] === null || typeof images[i] === 'undefined') {
                        loaded_index++;
                        if (loaded_index === images.length) {
                            if (callback) {
                                callback();
                            };
                        };
                        continue;
                    };
                    var img = new Image();
                    img.onload = function(){
                        loaded_index++;
                        if (loaded_index === images.length) {
                            if (callback) {
                                callback();
                            };
                        };
                    };
                    img.onerror = function(){
                        loaded_index++;
                        if (loaded_index === images.length) {
                            if (callback) {
                                callback();
                            };
                        };
                    };
                    img.src = images[i];
                };
            } else {
                if (callback) {
                    callback();
                };
            };
        };

        this.setHtmlToWindow = function(content) {
            if (content) {
                obj.windowContentHtml = content;
                var images = content.match(/src\=\"(.*?)\"/gi);
                _.$elements.modalContent.html(content).hide();
                _preloadImages(images, function(){
                    _.$elements.modalContent.show();
                    _.$elements.body.trigger('modalLoaded');
                });
            } else {
                obj.destroy(function(){}, true);
            }
        };

        this.appendHtmlToWindow = function(content) {
            _.$elements.modalContent.append(content);
            obj.windowContentHtml = _.$elements.modalContent.html();
        };

        this.reloadContent = function() {
            _.$elements.modalContent.empty();
            _contentController();
        };
        
        this.fullscreen = function(){
            _.$elements.modalContainer.css({
                'width': '100%',
                'height': '100%',
                'max-height': '100%',
                'margin': 0
            });
        };
        
        this.centerVertical = function(method){
            var method = (method)? method : (settings.animate)? 'animate' : 'css';
            var options = {};
            // TODO: Анимирането не е добре, трябва да се направи добро разгъване
            switch (method) {
                case 'css':
                    options = { 'margin-top': (parseInt(_.$elements.window.height()) - parseInt(_.$elements.modalContainer.outerHeight()))/2 };
                    break;
                case 'animate':
                    options = {
                        'margin-top': (parseInt(_.$elements.window.height()) - parseInt(_.$elements.modalContainer.outerHeight()))/2,
                        'margin-bottom': (parseInt(_.$elements.window.height()) - parseInt(_.$elements.modalContainer.outerHeight()))/2,
                        'height': parseInt(_.$elements.window.height())*0.9
                    };
                    break;
            }
            _.$elements.modalContainer[method](options);
        };

        /**
         * 
         * @param function callback - функция, която се изпълнява след като е завършено затварянето на прозореца
         * @param boolean animate - ако не е сложена или е false, прозореца се затваря с анимация, ако е true, се затваря веднага
         * @returns undefined
         */
        this.destroy = function(callback, animate) {
            settings.onClose();
            if (!settings.windowScroll) {
                var top = -(parseInt(_.$elements.body.css('top')));
                _.$elements.body.removeAttr('position').removeAttr('style').scrollTop(top);
            }
            delete sessionStorage.modalWindow;
            delete sessionStorage.URI;
            _.$elements.body.trigger('closeModal');
            if (!animate) {
                _.$elements.modalOverlay.fadeOut(400, function() {
                    obj.windowContentHtml = null;
                    _.$elements.modalContent.empty().remove();
                    _.$elements.modalOverlay.empty().remove();
                    _.$elements.body.removeData('modalWindow');
                    _stopEventListener();
                    if (typeof callback === 'function') {
                        callback();
                    };
                });
            } else {
                _.$elements.modalOverlay.hide();
                obj.windowContentHtml = null;
                _.$elements.modalContent.empty().remove();
                _.$elements.modalOverlay.empty().remove();
                _.$elements.body.removeData('modalWindow');
                _stopEventListener();
                if (typeof callback === 'function') {
                    callback();
                };
            }
            return obj;
        };
        
        /**
         * 
         * @param {type} callback
         * @param {type} animate
         * @returns {obj} Modal window instance
         */
        this.close = function(callback, animate){
            return obj.destroy(callback, animate);
        };
        
        function _getExistingWindow(){
            _.$elements.modalOverlay = $('#'+ settings.modalWindowOverlayId);
            _.$elements.modalContainer = _.$elements.modalOverlay.find('.'+settings.modalWindowContainerClass);
            _.$elements.modalHeader = _.$elements.modalContainer.find('.'+settings.modalWindowHeaderClass);
            _.$elements.close_buttons = _.$elements.modalOverlay.find('.' + settings.closeButtonClass);
            _.$elements.modalContent = _.$elements.modalContainer.find('.'+settings.modalWindowContentClass);
        };

        function _checkContentType(window_content) {
            if (typeof window_content !== 'undefined') {
                if (/^\#(.*?)/gi.test(window_content)) {
                    _var.contentType = 'dom';
                    return;
                } else if (_var.isHtmlTag.test(window_content)) {
                    _var.contentType = 'html';
                    return;
                } else if (_var.isImg.test(window_content)) {
                    _var.contentType = 'img';
                    return;
                } else if (_var.isUrl.test(window_content)) {
                    _var.contentType = 'link';
                    return;
                } else if (!_var.isHtmlTag.test(window_content) && !_var.isUrl.test(window_content)) {
                    _var.contentType = 'string';
                    return;
                };
            };
            _var.contentType = '';
            _var.error = 'Please, provide parameters!';
        };

        function _contentController() {
            if (_var.contentType !== '') {
                settings.onBeforeOpenWindow();
                _buildContainerHtml();
                switch (_var.contentType) {
                    case 'link':
                        obj.urlToOpen = content;
                        _getContentAjax();
                        break;
                    case 'img':
                        obj.windowContentHtml = '<div class="element-container"><div class="image-container"><img src="'+content+'" alt=""/></div></div>';
                        _.$elements.body.trigger('contentReady');
                        break;
                    case 'html':
                        obj.windowContentHtml = content;
                        _.$elements.body.trigger('contentReady');
                        break;
                    case 'dom':
                        _getContentDOM();
                        break;
                    default:
                        obj.windowContentHtml = content;
                        _.$elements.body.trigger('contentReady');
                        break;
                };
                if (_var.contentType !== 'link') settings.onAfterOpenWindow(_.$elements.modalContainer);
            } else {
                settings.onError(_var.error);
                _log('error', 'MODAL WINDOW NOT OPENED!\n--------------------------\nError: ' + _var.error);
                if (typeof(Storage) !== 'undefined') {
                    delete sessionStorage.modalWindow;
                    delete sessionStorage.URI;
                }
                return false;
            };
        };

        function _buildContainerHtml() {
            if (_.$elements.modalOverlay === null) {
                _.$elements.modalOverlay = $(settings.html.overlay).appendTo(_.$elements.body);
                obj.elements.overlay = _.$elements.modalOverlay;
                var tmp_container = settings.html.windowContainer.replace(/\[\[add_class\]\]/gi, (settings.add_class === '') ? '' : ' ' + settings.add_class).replace(/\[\[win_id\]\]/gi, '');
                _.$elements.modalContainer = $(tmp_container).appendTo(_.$elements.modalOverlay);
                if (settings.width) {
                    _.$elements.modalContainer.css('width', settings.width);
                };
                obj.elements.modal = _.$elements.modalContainer;
                if (settings.addHeader) {
                    var tmp_header = settings.html.windowHeader.replace(/\[\[header_title\]\]/gi, settings.windowTitle).replace(/\[\[closeButtonClass\]\]/gi, ' ' + settings.closeButtonClass);
                    _.$elements.modalHeader = $(tmp_header).appendTo(_.$elements.modalContainer);
                }
                if (settings.windowTitle)
                    _.$elements.modalHeader.css({
                        'position': 'relative',
                        'width': 'auto',
                        'text-align': 'left',
                        'right': '0'
                    });
                _.$elements.modalContent = $(settings.html.windowContent).appendTo(_.$elements.modalContainer);
                if (settings.contentHeight) {
                    _.$elements.modalHeader.css({
                        'position': 'relative',
                        'right': '0px'
                    });
                    _.$elements.modalContent.css({
                        'width': '100%',
                        'height': settings.contentHeight
                    });
                };
                if (settings.fullscreen) {
                    obj.fullscreen();
                }else if (settings.centerVertical) {
                    obj.centerVertical('css');
                };
            };
        };

        function _getContentAjax() {
            $.ajax({
                url: obj.urlToOpen,
                data: settings.data || {},
                method: 'POST',
                success: function(html) {
                    var type = 'html';
                    try {
                        html = JSON.parse(html);
                        type = 'json';
                    } catch (e) {}
                    if (type === 'html') {
                        obj.windowContentHtml = html;
                        _.$elements.body.trigger('contentReady');
                        settings.onAfterOpenWindow(_.$elements.modalContainer);
                    } else if (type === 'json') {
                        if (html.hasOwnProperty('not_logged')) {
                            content = settings.not_logged_modal_content;
                            _.$elements.modalContainer.css('width', settings.not_logged_width);
                            _checkContentType(content);
                            obj.reloadContent();
                        } else {
                            $.modalWindow(html.message, {autoClose: 3000});
                        }
                    }
                }
            });
        };

        function _getContentDOM() {
            obj.windowContentHtml = $(content).html();
            _.$elements.body.trigger('contentReady');
        };
        
        this.set = function(option, value){
            if (option && typeof option === 'string' && value) {
                settings[option] = value;
                _.$elements.modalContainer.css('width', settings.width);
                obj.centerVertical();
            }
        };

        function _log(type, message) {
            if (window.console && console[type])
                console[type](message);
        };

        function _eventListener() {
            _.$elements.body.on('contentReady', function() {
                obj.setHtmlToWindow(obj.windowContentHtml);
                if (settings.overlayClickClose) {
                    _.$elements.modalOverlay.on('click', function(e){
                        var $e_target = $(e.target);
                        if ($e_target.is(_.$elements.modalOverlay)) {
                            obj.destroy();
                        };
                    });
                };
            }).on('modalLoaded', function(e, data){
                if (settings.centerVertical) {
                    obj.centerVertical();
                };
                _.$elements.body.data('modalWindow', obj);
                _.$elements.close_buttons = _.$elements.modalOverlay.find('.' + settings.closeButtonClass);
                _.$elements.close_buttons.on('click', function(e){
                    e.preventDefault();
                    obj.destroy();
                });
                settings.onReady(_.$elements.modalContent);
            });
            _.$elements.window.on('resize', function(){
                if (settings.fullscreen) {
                    obj.fullscreen();
                }else if (settings.centerVertical) {
                    obj.centerVertical();
                };
            });
            if (!settings.windowScroll) {
                var css = {
                    position: 'fixed',
                    top: -(_.$elements.body.scrollTop()),
                    width: '100%',
                    'overflow-x': 'hidden',
                    'overflow-y': (($(document).height() - _.$elements.body.height())?'hidden' : 'scroll')
                };
                _.$elements.body.css(css);
            }
        };
        
        function _stopEventListener(){
            _.$elements.body.off('contentReady').off('modalLoaded');
            if (_.$elements.close_buttons !== null) _.$elements.close_buttons.off('click');
        };

        // init object
        __construct();
    };

    $.modalWindow = function(content, options) {
        var modalWindow = new ModalWindow(content, options);
        return modalWindow;
    };
})(jQuery);

$(function(){
    if (Storage && typeof Storage !== 'undefined') {
        if (sessionStorage.modalWindow) {
            if (window.location.href === sessionStorage.URI) {
                var modalOptions = $.parseJSON(sessionStorage.modalWindow);
                $.modalWindow(modalOptions.content, modalOptions.options);
            } else {
                delete sessionStorage.modalWindow;
                delete sessionStorage.URI;
            }
        }
    }
});