(function($){
    var SimpleEdit = function(element, options){
        var obj = this;
        var defaults = {
            height: null,
            focusHeight: '100px',
            preventDefaultOnEnter: false,
            onInit: function(){},
            onFocus: function(){},
            onBlur: function(){},
            onPressEnter: function(){},
            onPressAltEnter: function(){},
            onPressCtrlEnter: function(){},
            onPressShiftEnter: function(){},
            onPaste: function(){},
            onPasteUrl: function(){},
            emoticons: {
                ':)' : 'smile',
                ':-)' : 'smile',
                ':(' : 'sad',
                ':-(' : 'sad',
                ':P' : 'tongue',
                ':-P' : 'tongue',
                ':D' : 'laugh',
                ':-D' : 'laugh',
                ':X' : 'numb',
                ':-X' : 'numb',
                ';)' : 'wink',
                ';-)' : 'wink',
                ':*' : 'kiss',
                ':-*' : 'kiss',
                ':S' : 'worried',
                ':-S' : 'worried',
                '|(' : 'dull',
                '|-(' : 'dull',
                '|)' : 'sleepy',
                '|-)' : 'sleepy',
                ':|' : 'speechless',
                ':-|' : 'speechless',
                '8)' : 'cool',
                '8-)' : 'cool',
                '8|' : 'nerd',
                '8-|' : 'nerd',
                ':?' : 'think',
                ':-?' : 'think',
                ':@' : 'angry',
                ':-@' : 'angry',
                ';(' : 'cry',
                ';-(' : 'cry'
            },
            useEmoticons: false
        };
        var settings = $.extend(defaults, options || {});
        this.text = '';
        this.html = '';
        var _ = {
            $element: {
                textarea: $(element),
                editor: null
            },
            pattern: {
                url: /(http|ftp|https):\/\/[a-z0-9\-_]+(\.[a-z0-9\-_]+)+([a-z0-9\-\.,@\?^=%&;:/~\+#]*[a-z0-9\-@\?^=%&;/~\+#])?/,
                email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/gi,
                emoticon: /((?::|;|=)(?:-)?(?:\)|\(|\/|[A-Za-z]|\*))/gi,
                html: /<[^>]*>/gi
            },
            urlPattern: new RegExp('', 'i'),
            html: {
                container: '<div class="textarea" contenteditable="true"/>',
                link: '<a href="[[link]]" target="_blank">[[link]]</a>'
            }
        };
        function __construct() {
            _buildHtml();
            _eventListener();
            settings.onInit(_.$element.editor);
        };
        
        function _buildHtml(){
            _.$element.textarea.hide();
            _.$element.editor = $(_.html.container).insertBefore(_.$element.textarea);
            if (settings.height) {
                _.$element.editor.css({
                    'height': settings.height,
                    'min-height': '1em'
                });
            };
            _.$element.editor.html(_.$element.textarea.val());
            if (_.$element.textarea.attr('placeholder') !== '') {
                _.$element.editor.attr('placeholder', _.$element.textarea.attr('placeholder'));
            };
        };
        
        function _stopEventListener(){
            _.$element.editor.off('focus').off('blur').off('paste').off('keydown');
        }
        
        function _eventListener(){
            _.$element.editor.on('focus', function(){
                settings.onFocus(_.$element.editor);
            }).on('blur', function(){
                settings.onBlur(_.$element.editor);
            }).on('paste', function(e){
                e.preventDefault();
                var text = (e.originalEvent || e);
                text = (text.clipboardData || window.clipboardData).getData('text');
                if (_.pattern.url.test(text)) {
                    var link_text = _.html.link.replace(/\[\[link\]\]/gi, text);
                    obj.pasteHtmlAtCaret(link_text);
                    settings.onPasteUrl(text);
                } else {
                    obj.pasteHtmlAtCaret(text);
                };
            }).on('keydown', function(e){
                setTimeout(function(){
                    
                    var key = e.which || e.keycode;
                    if (key == 13 && settings.preventDefaultOnEnter) {
                        e.preventDefault();
                    };
                    obj.syncEditorToText();
                    if (key == 13 && !(e.shiftKey || e.altKey || e.ctrlKey)) {
                        _.$element.textarea.trigger('key.enter', [e]);
                        settings.onPressEnter(e, _.$element.textarea.val());
                    } else if ((key == 13 && e.shiftKey) && !(e.altKey || e.ctrlKey)) {
                        _.$element.textarea.trigger('key.shiftEnter', [e]);
                        settings.onPressShiftEnter(e, _.$element.textarea.val());
                    } else if ((key == 13 && e.ctrlKey) && !(e.altKey || e.shiftKey)) {
                        _.$element.textarea.trigger('key.ctrlEnter', [e]);
                        settings.onPressCtrlEnter(e, _.$element.textarea.val());
                    } else if ((key == 13 && e.altKey) && !(e.ctrlKey || e.shiftKey)) {
                        _.$element.textarea.trigger('key.altEnter', [e]);
                        settings.onPressAltEnter(e, _.$element.textarea.val());
                    };
                }, 50);
            });
        };
        
        this.destroy = function(){
            _stopEventListener();
            _.$element.editor.empty().remove();
            return _.$element.textarea.show();
        };
        
        this.height = function(height){
            if (height) {
                _.$element.editor.css({
                    'height': settings.height,
                    'min-height': 'initial'
                });
                return this;
            } else {
                return _.$element.editor.outerHeight();
            }
        };
        
        this.updateSettings = function(newSettings){
            settings = $.extend(settings, newSettings || {});
        };
        
        this.pasteHtmlAtCaret = function(html) {
            var sel, range;
            if (window.getSelection) {
                // IE9 and non-IE
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();
                    var el = document.createElement("div");
                    el.innerHTML = html;
                    var frag = document.createDocumentFragment(), node, lastNode;
                    while ((node = el.firstChild)) {
                        lastNode = frag.appendChild(node);
                    };
                    range.insertNode(frag);
                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                };
            } else if (document.selection && document.selection.type != "Control") {
                // IE < 9
                document.selection.createRange().pasteHTML(html);
            };
            obj.syncEditorToText();
        };
        
        this.clearEditor = function(){
            _.$element.textarea.val('');
            _.$element.editor.html('');
            this.text = '';
            this.html = '';
        };
        
        this.syncEditorToText = function() {
            var html = _.$element.editor.html();
            if (settings.useEmoticons) {
                html = html.replace(_.pattern.emoticon, function($0){
                    //TODO: syncEditorToText
                });
            };
            _.$element.textarea.val(html);
            this.html = html;
            this.text = _.$element.editor.text();
        };
        this.syncTextToEditor = function() {
            _.$element.editor.html(_.$element.textarea.val());
            var html = _.$element.editor.html();
            this.html = html;
            this.text = _.$element.editor.text();
        };
        
        this.getText = function(){
            return obj.html;
        };
        __construct();
    };
    
    $.fn.simpleEdit = function(options, parameters){
        var args = arguments,
            result;

        this.each(function() {
            var $this = $(this),
                data = $this.data('simpleEdit');
            if (!data || typeof data === 'undefined') {
                var instance = new SimpleEdit(this, options);
                $this.data('simpleEdit', instance);
            } else {
                if (typeof options === 'string' && typeof data[options] === 'function')
                    result = data[options].apply(data, Array.prototype.slice.call(args, 1));
                else
                    throw new Error('simpleEdit method "' + options + '" not found!');
            }
        });

        return result || this;
    };
})(jQuery);