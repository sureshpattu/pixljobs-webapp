var ApiUtil           = require('../utils/apiUtil');
var FormValidator     = require('../utils/formValidator');
var utils             = require('../utils/common');
var async             = require('async');
var _                 = require('underscore');
var HandlebarHelpers = require('../utils/handlebar_helpers');

function EditMedContentHandler() {
    $('.js_select2').select2({});
    var _form_name = '#js_med_content_form';
    var _form      = $(_form_name);
    var _lang      = 'en';

    function readURL(input, _ele) {
        if(input.files && input.files[0]) {
            var reader    = new FileReader();
            reader.onload = function(e) {
                var _size = input.files[0].size;
                if(_size < 1048576) {
                    _ele.parent().find('.img_preview_holder').attr('src', e.target.result);
                    _ele.parent().addClass('active');
                } else {
                    alert('File must be select less than 1 MB');
                }
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    function uploadImage(_ele, _id, _cb) {
        var formData = new FormData();
        formData.append('photo', _ele[0].files[0]);
        ApiUtil.makeFileUploadRequest('/api/conditions-file/image-upload/' + _id, '', 'POST', '', formData,
            function(_res_path) {
                _cb(_res_path);
            });
    }

    function symptomsEvents() {
        $('.js_symptoms').off('change').on('change', function() {
            if($(this).val()) {
                var _html = Handlebars.partials['symptoms_select'];
                $('.js_symptoms_group')
                    .append(_html);
                symptomsEvents();
            }
        });
    }

    function problemsEvents() {
        $('.js_problems').off('change').on('change', function() {
            if($(this).val()) {
                var _html = Handlebars.partials['problems_select'];
                $('.js_problems_group')
                    .append(_html);
                problemsEvents();
            }
        });
    }

    function submitForm(_cb) {
        var _file_ele_1 = _form.find('.js_img_one');
        var _file_ele_2 = _form.find('.js_img_two');
        var _file_ele_3 = _form.find('.js_img_three');
        var _id         = _form.find('.js_data_id').val();
        var _cond_id    = _id;
        var _sym        = [];
        var _pro        = [];

        var _cnd_url = '/api/conditions/' + _id;
        var _sym_url = '/api/conditions/add/symptoms/' + _id;
        var _pro_url = '/api/conditions/add/problems/' + _id;

        if(_lang === 'te') {
            _cnd_url = '/api/conditions-telugu/' + _id;
            _sym_url = '/api/conditions-telugu/add/symptoms/' + _id;
            _pro_url = '/api/conditions-telugu/add/problems/' + _id;
            _cond_id = _form.find('.js_cond_id').val();
        }

        if(_lang === 'hin') {
            _cnd_url = '/api/conditions-hindi/' + _id;
            _sym_url = '/api/conditions-hindi/add/symptoms/' + _id;
            _pro_url = '/api/conditions-hindi/add/problems/' + _id;
            _cond_id = _form.find('.js_cond_id').val();
        }

        var _obj = {
            name       :_form.find('.js_name').val(),
            desc       :_form.find('.js_desc').val(),
            risks      :_form.find('.js_risks').val(),
            treatment  :_form.find('.js_treatment').val(),
            diagnosis  :_form.find('.js_diagnosis').val(),
            preventions:_form.find('.js_prevention').val(),
            web_links  :_form.find('.js_web_link').val()
        };

        ApiUtil.makeAjaxRequest(_cnd_url, '', 'PUT', '', _obj, function(_res) {
            if(!_res.error) {
                async.parallel([
                    function(callback) {
                        if(_file_ele_1.val()) {
                            uploadImage(_file_ele_1, _cond_id, function(_res_path) {
                                callback(null, _res_path);
                            });
                        } else {
                            callback(null, null);
                        }
                    },
                    function(callback) {
                        if(_file_ele_2.val()) {
                            uploadImage(_file_ele_2, _cond_id, function(_res_path) {
                                callback(null, _res_path);
                            });
                        } else {
                            callback(null, null);
                        }
                    },
                    function(callback) {
                        if(_file_ele_3.val()) {
                            uploadImage(_file_ele_3, _cond_id, function(_res_path) {
                                callback(null, _res_path);
                            });
                        } else {
                            callback(null, null);
                        }
                    }
                ], function(err, results) {
                    _form.find('.js_symptoms').each(function() {
                        if($(this).val()) {
                            _sym.push({
                                name  :$(this).val(),
                                status:$(this).parent().find('.js_role_check').prop('checked') ? 'inactive' : 'active'
                            });
                        }
                    });
                    _form.find('.js_problems').each(function() {
                        if($(this).val()) {
                            _pro.push($(this).val());
                        }
                    });
                    _sym = _.compact(_sym);
                    _sym = _.uniq(_sym);
                    _pro = _.compact(_pro);
                    _pro = _.uniq(_pro);
                    if(_sym && _sym.length) {
                        ApiUtil.makeAjaxRequest(_sym_url, '', 'POST', '',
                            {symptoms:_sym},
                            function(_res) {
                                if(!_res.error) {
                                    if(_pro && _pro.length) {
                                        ApiUtil.makeAjaxRequest(_pro_url, '', 'POST',
                                            '',
                                            {problems:_pro}, function(_res) {
                                                if(!_res.error) {
                                                    if(_cb) {
                                                        _cb();
                                                    } else {
                                                        alert('Data updated successfully!');
                                                    }
                                                } else {
                                                    alert(
                                                        _res.message || 'Something went wrong while adding symptoms!');
                                                }
                                            });
                                    } else {
                                        if(_cb) {
                                            _cb();
                                        } else {
                                            alert('Data updated successfully!');
                                        }
                                    }
                                } else {
                                    alert(_res.message || 'Something went wrong while adding symptoms!');
                                }
                            });
                    } else if(_pro && _pro.length) {
                        ApiUtil.makeAjaxRequest(_pro_url, '', 'POST',
                            '',
                            {problems:_pro}, function(_res) {
                                if(!_res.error) {
                                    alert('Data updated successfully!');
                                    if(_cb) {
                                        _cb();
                                    }
                                } else {
                                    alert(
                                        _res.message || 'Something went wrong while adding symptoms!');
                                }
                            });
                    } else {
                        if(_cb) {
                            _cb();
                        } else {
                            alert('Data updated successfully!');
                        }
                    }
                });
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function bindMedContentEvent() {
        _form = $(_form_name);
        _form.unbind('submit');
        _form.submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                submitForm();
            }
            return false;
        });

        _form.find('.js_img_one,.js_img_two,.js_img_three').unbind('change');

        _form.find('.js_img_one').change(function() {
            readURL(this, $(this));
        });

        _form.find('.js_img_two').change(function() {
            readURL(this, $(this));
        });

        _form.find('.js_img_three').change(function() {
            readURL(this, $(this));
        });

        _form.find('.js_remove_img').off('click').on('click', function() {
            var _id   = $(this).data('id');
            var _this = $(this);
            ApiUtil.makeAjaxRequest('/api/conditions-file/' + _id, '', 'DELETE', '', '', function(_res) {
                if(!_res.error) {
                    alert('Image removed successfully!');
                    _this.parent().removeClass('active');
                } else {
                    alert(_res.message || 'Something went wrong');
                }
            });
        });

        symptomsEvents();
        problemsEvents();
    }

    function loadTelugu(_id) {
        ApiUtil.makeAjaxRequest('/api/conditions/' + _id, '', 'GET', '', '', function(_cond) {
            if(!_cond.error) {
                ApiUtil.makeAjaxRequest('/api/conditions-telugu/fetch-by/conditions/' + _id, '', 'GET', '',
                    '',
                    function(_res) {
                        if(!_res.error) {
                            var _html = Handlebars.partials['content_edit_telugu_form'](
                                {data:_res.data, language:'Telugu', cond:_cond.data});
                            $('.js_cond_name').html(_res.data.name);
                            $('#js_med_content_form').html(_html);
                            $('textarea').each(function() {
                                auto_grow(this)
                            });
                            bindMedContentEvent();
                        } else {
                            alert('No conditions found');
                        }
                    });
            } else {
                alert('No conditions found');
            }
        });
    }

    function loadHindi(_id) {
        ApiUtil.makeAjaxRequest('/api/conditions/' + _id, '', 'GET', '', '', function(_cond) {
            if(!_cond.error) {
                ApiUtil.makeAjaxRequest('/api/conditions-hindi/fetch-by/conditions/' + _id, '', 'GET', '',
                    '',
                    function(_res) {
                        if(!_res.error) {
                            var _html = Handlebars.partials['content_edit_hindi_form'](
                                {data:_res.data, language:'Hindi', cond:_cond.data});
                            $('.js_cond_name').html(_res.data.name);
                            $('#js_med_content_form').html(_html);
                            $('textarea').each(function() {
                                auto_grow(this)
                            });
                            bindMedContentEvent();
                        } else {
                            alert('No conditions found');
                        }
                    });
            } else {
                alert('No conditions found');
            }
        });
    }

    function loadEnglish(_id) {
        ApiUtil.makeAjaxRequest('/api/conditions/' + _id, '', 'GET', '', '', function(_res) {
            if(!_res.error) {
                var _html = Handlebars.partials['content_edit_form']({data:_res.data});
                $('.js_cond_name').html(_res.data.name);
                $('#js_med_content_form').html(_html);
                $('textarea').each(function() {
                    auto_grow(this)
                });
                bindMedContentEvent();
            } else {
                alert('No conditions found');
            }
        });
    }

    return {
        init:function() {
            var _id;
            var _list = $('.js_cond_list');

            bindMedContentEvent();

            _list.on('click', function() {
                _id = $(this).data('id');
                $('.js_cond_list').removeClass('active');
                $(this).addClass('active');
                bootbox.confirm({
                    message    :'Please save changes before you leave',
                    className  :'normal_alert_box',
                    closeButton:false,
                    buttons    :{
                        cancel :{
                            label    :'No',
                            className:'btn-lg btn-default btn_cancel'
                        },
                        confirm:{
                            label    :'Yes',
                            className:'btn btn-lg btn-success btn_confirm'
                        }
                    },
                    callback   :function(result) {
                        if(result) {
                            if(FormValidator.validateForm(_form_name)) {
                                submitForm(function() {
                                    if(_lang === 'te') {
                                        loadTelugu(_id);
                                    } else if(_lang === 'hin') {
                                        loadHindi(_id);
                                    } else {
                                        loadEnglish(_id);
                                    }
                                });
                            }
                        } else {
                            if(_lang === 'te') {
                                loadTelugu(_id);
                            } else if(_lang === 'hin') {
                                loadHindi(_id);
                            } else {
                                loadEnglish(_id);
                            }
                        }
                    }
                });
            });

            $('.js_save_form').on('click', function() {
                if(FormValidator.validateForm(_form_name)) {
                    submitForm();
                }
            });

            $('.js_lang').change(function() {
                if($(this).val() && $(this).val() === 'telugu') {
                    _lang = 'te';
                    _id   = $('.js_cond_list.active').data('id');
                    loadTelugu(_id);
                }
                if($(this).val() && $(this).val() === 'hindi') {
                    _lang = 'hin';
                    _id   = $('.js_cond_list.active').data('id');
                    loadHindi(_id);
                }
                if($(this).val() && $(this).val() === 'english') {
                    _lang = 'en';
                    _id   = $('.js_cond_list.active').data('id');
                    loadEnglish(_id);
                }
            });

            if(_list.eq(0)) {
                _id = _list.eq(0).data('id');
                $('.js_cond_list').removeClass('active');
                _list.eq(0).addClass('active');
                if(_lang === 'te') {
                    loadTelugu(_id);
                } else if(_lang === 'hin') {
                    loadHindi(_id);
                } else {
                    loadEnglish(_id);
                }
            }
        }
    }
}

module.exports = EditMedContentHandler();