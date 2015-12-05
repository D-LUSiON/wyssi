function parseQuery(q){
    q = q.split('&');
    var obj = {};
    for (var i = 0; i < q.length; i++) {
        q[i] = q[i].split('=');
        obj[q[i][0]] = q[i][1];
    }
    return obj;
};
;(function($, window, document) {
    'use strict';
    var pluginName = 'form',
        /**
         * @description <h2>Plugin version.</h2>First digit is a major release. If plugin is rewritten from scratch, major version is changed from v1 to v.2.<br/>Second digit is "stable release" when added new functionality.<br/>Third digit is minor release - bugfixes or minor changes to the code.
         * @type String
         */
        version = 'v1.0.0',
        /**
         * @description These plugins have to be loaded before this plugin is initialized. Each plugin is jQuery method so here should be listed method names as strings
         * @example ['pluginName_1', 'pluginName_2']
         * @type Array
         */
        dependancies = [],
        local_namespace = {};
    
    if (typeof window.Localization === 'undefined')
        window.Localization = {};
        
    window.Localization[pluginName] = {
        en: {
            confirm_delete: 'Are you sure you want to delete?'
        },
        bg: {
            confirm_delete: 'Сигурни ли сте, че искате да изтриете?'
        }
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
        var defaults = {
            lang: 'bg',
            localization: window.Localization[pluginName],
            url: {
                getAll: '',
                getMunicipalities: '',
                getCities: '',
                getHospitals: '',
                submitTo: ''
            },
            data: {},
            classes: {
                autocomplete: {
                    container: 'autocomplete-container',
                    dropdown: 'autocomplete-dropdown',
                    dropdown_item: 'autocomplete-item'
                },
                datepicker: 'datepicker',
                simple_edit: 'simpleEdit'
            },
            html: {
                autocomplete: {
                    container: '<div class="[[container]]"/>',
                    dropdown: '<div class="[[dropdown]]"/>',
                    dropdown_item: '<div class="[[item]]" data-id="[[item_id]]">[[item_title]]</div>'
                }
            },
            allData: {},
            datepicker_date_format: 'yy-mm-dd',
            validate: false,
            validate_fields: [],
            submit: true,
            ajax_submit: true,
            loading_overlay: false,
            onInit: function(){},
            beforeSend: function(){},
            success: function(){},
            error: function(){},
            complete: function(){},
            onValidate: function(){},
            onNotValidForm: function(){},
            onBeforeSubmit: function(){},
            onAfterSubmit: function(){}
        };
        var settings = $.extend(defaults, options || {});
        var _ = {
            $elements: {
                body: $('body'),
                form: $(element),
                inputs: null,
                submit: null,
                del_button: null,
                datepickers: null
            },
            allData: null,
            ie_lt_9: ($.browser.msie && parseFloat($.browser.version) < 9)
        };
        this.fields = {};
        
        function __construct(){
//            if (_.ie_lt_9) {
//                settings.ajax_submit = false;
//            }
            obj.syncForm();
            if (settings.allData === {} && settings.url.getAll !== ''&& typeof settings.url.getAll !== 'undefined') {
                obj.getAllData();
            } else {
                _.allData = settings.allData || {};
                for (var key in _.allData) {
                    if (_.allData[key].parent === '') {
                        _buildSelect(key);
                    };
                };
            };
            _.$elements.textarea_editors = _.$elements.form.find('textarea.'+settings.classes.simple_edit).simpleEdit();
            var datepicker_options = {};
            _.$elements.datepickers = _.$elements.form.find('.'+settings.classes.datepicker);
            _.$elements.datepickers.datepicker({
                minDate: $(this).attr('data-minDate') || '',
                changeMonth: true,
                changeYear: true,
                yearRange: 'c-100:c+10',
                beforeShow: _customRange,
                dateFormat: settings.datepicker_date_format
            });
            _eventListener();
            settings.onInit(_.$elements.form, obj);
        };
        
        this.syncForm = function(){
            _.$elements.del_button = _.$elements.form.find('a[data-rel="delete_button"]');
            _.$elements.inputs = _.$elements.form.find('[name]');
            obj.fields = {};
            _.$elements.inputs.each(function(){
                if (this.name.indexOf('[') === -1) {
                    if (this.type === 'checkbox') {
                        obj.fields[this.name] = (this.checked)? 1 : 0;
                        var $chk = $(this);
                        if ($chk.attr('data-show')) {
                            var checked = $chk.prop('checked');
                            var show = $chk.attr('data-show');
                            if (checked) {
                                _.$elements.inputs.filter('[name="'+show+'"]').show();
                            } else {
                                _.$elements.inputs.filter('[name="'+show+'"]').hide();
                            }
                        }
                    } else if (this.type === 'radio' && this.checked) {
                        obj.fields[this.name] = this.value;
                    } else {
                        obj.fields[this.name] = (!obj.fields[this.name]) ? this.value : obj.fields[this.name];
                    };
                } else {
                    if (this.name.indexOf('[]') > -1) {
                        var arr_name = this.name.replace('[]', '');
                        if (!obj.fields[arr_name]) obj.fields[arr_name] = [];
                        if (this.type === 'checkbox') {
                            if (this.checked) {
                                obj.fields[arr_name].push(this.value);
                            };
                        } else {    
                            obj.fields[arr_name].push(this.value);
                        };
                    } else {
                        var arr_name = this.name.replace(']', '').split('[');
                        if (!obj.fields[arr_name[0]]) obj.fields[arr_name[0]] = {};
                        if (this.type === 'checkbox') {
                            if (this.checked) {
                                obj.fields[arr_name[0]][arr_name[1]] = this.value;
                            };
                        } else {
                            obj.fields[arr_name[0]][arr_name[1]] = this.value;
                        };
                    };
                };
            });
        };
        
        //TODO: Да направя данните от формата да се слатат на инпутите
        this.syncElements = function(){
            _.$elements.inputs = _.$elements.form.find('[name]');
            for (var key in obj.fields) {
                if (typeof obj.fields[key] !== 'object' && typeof obj.fields[key] !== 'array') {
                    _.$elements.inputs.filter('[name="'+key+'"]').val(obj.fields[key]);
                } else {
                    
                };
            }
        };
        
        function _customRange(input) {
            var dateMin = null;
            var dateMax = null;
            var $input = $(input);
            if ($input.attr('data-link')) {
                var $link = _.$elements.form.find('[name="'+$input.attr('data-link')+'"]');
                var input_type = (this.name.indexOf('from') > -1 || this.name.indexOf('start') > -1 )? 'from' : 'to';
                if (input_type === 'from') {
                    dateMax = ($link.datepicker('getDate') !== null)? $link.datepicker('getDate') : null;
                    dateMin = $input.attr('data-minDate') || null;
                } else {
                    dateMin = ($link.datepicker('getDate') !== null)? $link.datepicker('getDate') : null;
                    dateMax = $input.attr('data-minDate') || null;
                };
                return {
                    maxDate: dateMax,
                    minDate: dateMin
                };
            } else {
                return {
                    minDate: $input.attr('data-minDate') || null,
                    maxDate: $input.attr('data-maxDate') || null
                };
            };
        };
        
        function _buildSelect(key){
            var $target = _.$elements.inputs.filter('[name='+key+']');
            if ($target.get(0)) {
                if (['input', 'iframe', 'ul'].indexOf($target.get(0).tagName.toLowerCase()) === -1) {
                    if ($.trim($target.html()).length === 0) {
                        var html = '<option value="null"></option>';
                        for (var i = 0; i < _.allData[key].data.length; i++) {
                            html += '<option value="'+_.allData[key].data[i].id+'">'+_.allData[key].data[i].title+'</option>';
                        };
                        $target.html(html);
                    };
                };
            };
        };
        
        function _buildAutocomplete($input, data) {
            if (!$input.parent().hasClass(settings.classes.autocomplete.container)) {
                $input.wrap(settings.html.autocomplete.container.replace(/\[\[container\]\]/gi, settings.classes.autocomplete.container));
                var $container = $input.parent();
                var $dropdown = $(settings.html.autocomplete.dropdown.replace(/\[\[dropdown\]\]/gi, settings.classes.autocomplete.dropdown)).appendTo($container);
            } else {
                var $dropdown = $input.next();
            };
            var items = '';
            if (data.length === 0) {
                $dropdown.hide();
            } else {
                for (var i = 0; i < data.length; i++) {
                    items += settings.html.autocomplete.dropdown_item.replace(/\[\[item\]\]/gi, settings.classes.autocomplete.dropdown_item).replace(/\[\[item_id\]\]/gi, data[i].id).replace(/\[\[item_title\]\]/gi, data[i].title);
                };
                $dropdown.html(items).show();
            };
        };
        this.validateForm = function(){
            var valid = true;
            _.$elements.inputs.parent().removeClass('not_valid');
            var not_valid_fields = [];
            for (var i = 0; i < settings.validate_fields.length; i++) {
                var $field = _.$elements.form.find('[name='+settings.validate_fields[i]+']');
                if ($field.val() === '' || $field.val() === null || $field.val() === 'null' || typeof $field.val() === 'undefined') {
                    $field.parent().addClass('not_valid');
                    not_valid_fields.push(settings.validate_fields[i]);
                    valid = false;
                };
            };
            var data = {
                valid: valid,
                not_valid_fields: not_valid_fields
            };
            settings.onValidate(data);
            return valid;
        };
        this.reset = function(){
            _.$elements.form[0].reset();
        };
        this.submit = function(){
            obj.syncForm();
            if (settings.submit) {
                if (obj.validateForm()) {
                    settings.onBeforeSubmit();
                    if (settings.ajax_submit) {
                        $.ajax({
                           url: settings.url.submitTo || _.$elements.form.attr('action'),
                           data: obj.fields,
                           method: 'POST',
                           beforeSend: function(){
                                if (settings.loading_overlay) {
                                    _.$elements.loading_overlay = $('<div id="ajaxLoadingContainer"/>').prependTo(_.$elements.body);
                                }
                                settings.beforeSend(_.$elements.form);
                           },
                           success: function(data){
                                try {
                                    data = $.parseJSON(data);
                                } catch (e) {};
                               settings.success(obj.fields, data, _.$elements.form);
                           },
                           error: function(a, b, c){
                                if (window.console && console.log)
                                    console.error('Error submitting form via AJAX! - ' + c);
                                
                                settings.error(a, b, c);
                           },
                           complete: function(jqXHR, response){
                                if (_.$elements.loading_overlay) {
                                    _.$elements.loading_overlay.remove();
                                };
                                try {
                                    response = $.parseJSON(response);
                                } catch (e) {};
                               settings.complete(obj.fields, response, _.$elements.form);
                           }
                        });
                    } else {
                        _.$elements.form.submit();
                    };
                } else {
                    settings.onNotValidForm();
                };
            } else {
                settings.onBeforeSubmit(obj.fields);
            };
        };
        function _eventListener(){
            _.$elements.inputs.on('change', function(){
                obj.fields[this.name] = this.value;
                if (_.allData[this.name]) {
                    var children = _.allData[this.name].children;
                    var $this_children = _.$elements.inputs.filter('[name='+children+']');
                    var children_type = ($this_children.length > 0)? $this_children.get(0).tagName.toLowerCase() : '';
                    switch (children_type) {
                        case 'select':
                            var html = '<option value="null"></option>';
                            var found = 0;
                            for (var i = 0; i < _.allData[children].data.length; i++) {
                                if (_.allData[children].data[i].parent_id === this.value) {
                                    html += '<option value="'+_.allData[children].data[i].id+'">'+_.allData[children].data[i].title+'</option>';
                                    found++;
                                };
                            };
                            $this_children.html(html).trigger('change');
                            break;
                        case 'input':
                            /**
                             * Когато е input, може да са два варианта - като аутокомплийт и като поле, което автоматично се попълва с пропърти на parent-а.
                             * Ако в JSON-а с всички данни, данните на текущия children е = 0, тогава се търси стойност за попълване от родителския елемент,
                             * като пропъртито на родителския елемент трбява да е като name-а на текущия.
                             * Ако масива от данни на текущия children е > 0, тогава се прави аутокомплийт.
                             * 
                             * Пример:
                             * Ако родителския елемент е select с болници, трябва да има пропърти address, което да се попълва в input[name=address]
                             */
                            if (_.allData[children].data.length === 0) {
                                var c_data = _.allData[$this_children.attr('name')];
                                var parent_data = _.allData[c_data.parent];
                                var $parent = _.$elements.inputs.filter('[name="'+c_data.parent+'"]');
                                if ($parent.val() !== 'null' && $parent.val() !== null && $parent.val() !== '') {
                                    for (var i = 0; i < parent_data.data.length; i++) {
                                        if (parent_data.data[i].id === $parent.val()) {
                                            $this_children.val(parent_data.data[i][$this_children.attr('name')]);
                                            continue;
                                        };
                                    };
                                };
                            } else {
                                var data = [];
                                for (var i = 0; i < _.allData[children].data.length; i++) {
                                    if (_.allData[children].data[i].parent_id === this.value) {
                                        data.push(_.allData[children].data[i]);
                                    };
                                };
                                _buildAutocomplete($this_children, data);
                            };
                            break;
                        default:
                            break;
                    };
                };
            });
            
            /**
             * Ако се добави input type=checkbox с data-rel=select_all, той става бутон за check-ване на група от чекбоксове с еднакъв "name"
             */
            _.$elements.form.find('[data-rel="select_all"]').on('click', function(){
                var $this = $(this);
                var inputs = _.$elements.inputs.filter('[name^='+$this.attr('data-name')+']').prop('checked', function(){
                    if ($(this).is(':disabled')) {
                        return $(this).attr('checked');
                    } else {
                        return $this.is(':checked');
                    }
                });
            });
            
            /**
             * Ако се добави чекбокс с пропърти data-show, което да е name на някой елемент от формата, то ще показва/скрива когато се отбележи
             */
            _.$elements.form.find('[data-show]').on('click', function(){
                obj.fields[this.name] = this.value;
                var $this = $(this);
                var checked = $this.prop('checked');
                var show = $this.attr('data-show');
                if (checked) {
                    _.$elements.inputs.filter('[name="'+show+'"]').show();
                } else {
                    _.$elements.inputs.filter('[name="'+show+'"]').hide();
                }
            });
            
            if (!settings.validate_form) {
                _.$elements.form.find('[type=submit]').on('click', function(e){
                    e.preventDefault();
                    obj.submit();
                });
            };
            
            _.$elements.del_button.on('click', function(e){
                e.preventDefault();
                if (confirm(settings.localization[settings.lang].confirm_delete)) {
                    window.location.assign($(this).attr('href'));
                }
            });
        };
        
        this.getMunicipalities = function(){};
        this.getCities = function(municipality_id) {};
        this.getHospitals = function(city_id){};
        this.getAllData = function(callback){
            $.ajax({
                url: settings.url.getAll,
                dataType: 'json',
                success: function(data){
                    _.allData = data;
                    for (var key in _.allData) {
                        if (_.allData[key].parent === '') {
                            var $target = _.$elements.inputs.filter('[name='+key+']');
                            switch ($target.get(0).tagName.toLowerCase()) {
                                case 'select':
                                    _buildSelect(key);
                                    break;
                                case 'input':
                                    _buildAutocomplete($target, _.allData[key].data);
                                    break;
                                default:
                                    break;
                            };
                        };
                    };
                    if (typeof callback === 'function') {
                        callback(data);
                    };
                }
            });
        };
        
        __construct();
    };
    $.fn[pluginName] = function(options, parameters) {
        options = (typeof options === 'undefined')? { url: {}} : options;
        var self = this;
        function getData(callback){
            if (options.url) {
                if (typeof options.url.getAll !== 'undefined' && options.url.getAll !== '' && self.length > 0) {
                    $.ajax({
                        url: options.url.getAll,
                        dataType: 'json',
                        success: function(data){
                            callback(data);
                        }
                    });
                } else {
                    return callback();
                };
            } else {
                return callback();
            };
        };
        
        return getData(function(data){
            options.allData = data;
            return self.each(function() {
                var element = $(this);
                var element_data = element.data(pluginName);
                if (element_data) {
                    if (eval('typeof ' + element_data[options]) === 'function') {
                        element_data[options](parameters);
                    };
                } else {
                    var instance = new local_namespace[pluginName](this, options);
                    element.data(pluginName, instance);
                };
            });
        });
    };
})(jQuery, window, document);