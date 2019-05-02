var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var _             = require('underscore');
var async         = require('async');
var waterfall     = require('async-waterfall');

function AddMedContentHandler() {

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

    function submitForm(_form) {
        var _file_ele_1 = _form.find('.js_img_one');
        var _file_ele_2 = _form.find('.js_img_two');
        var _file_ele_3 = _form.find('.js_img_three');

        var _obj = {
            name       :_form.find('.js_name').val(),
            desc       :_form.find('.js_desc').val(),
            risks      :_form.find('.js_risks').val(),
            treatment  :_form.find('.js_treatment').val(),
            diagnosis  :_form.find('.js_diagnosis').val(),
            preventions:_form.find('.js_prevention').val(),
            web_links  :_form.find('.js_web_link').val()
        };

        ApiUtil.makeAjaxRequest('/api/conditions', '', 'POST', '', _obj, function(_res) {
            if(!_res.error) {
                var _cond_id = _res.data.id;
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
                    var _sym = [];
                    var _pro = [];
                    $('.js_symptoms').each(function() {
                        if($(this).val()) {
                            _sym.push({
                                name  :$(this).val(),
                                status:$(this).parent().find('.js_role_check').prop('checked') ? 'inactive' : 'active'
                            });
                        }
                    });
                    $('.js_problems').each(function() {
                        if($(this).val()) {
                            _pro.push($(this).val());
                        }
                    });
                    _sym = _.compact(_sym);
                    _sym = _.uniq(_sym);
                    _pro = _.compact(_pro);
                    _pro = _.uniq(_pro);
                    if(_sym && _sym.length) {
                        ApiUtil.makeAjaxRequest('/api/conditions/add/symptoms/' + _cond_id, '', 'POST', '',
                            {symptoms:_sym},
                            function(_res) {
                                if(!_res.error) {
                                    if(_pro && _pro.length) {
                                        ApiUtil.makeAjaxRequest('/api/conditions/add/problems/' + _cond_id, '', 'POST',
                                            '',
                                            {problems:_pro}, function(_res) {
                                                if(!_res.error) {
                                                    window.location.href = '/';
                                                } else {
                                                    alert(
                                                        _res.message || 'Something went wrong while adding symptoms!');
                                                }
                                            });
                                    } else {
                                        window.location.href = '/';
                                    }
                                } else {
                                    alert(_res.message || 'Something went wrong while adding symptoms!');
                                }
                            });
                    } else if(_pro && _pro.length) {
                        ApiUtil.makeAjaxRequest('/api/conditions/add/problems/' + _cond_id, '', 'POST', '',
                            {problems:_pro}, function(_res) {
                                if(!_res.error) {
                                    window.location.href = '/';
                                } else {
                                    alert(_res.message || 'Something went wrong while adding symptoms!');
                                }
                            });
                    } else {
                        window.location.href = '/';
                    }
                });
            } else {
                alert(_res.message || 'Something went wrong!');
            }
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

    function bindMedContentEvent() {
        var _form_name = '#js_med_content_form';
        var _form      = $(_form_name);

        _form.submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                submitForm(_form);
            }
            return false;
        });

        $('.js_img_one').change(function() {
            readURL(this, $(this));
        });

        $('.js_img_two').change(function() {
            readURL(this, $(this));
        });

        $('.js_img_three').change(function() {
            readURL(this, $(this));
        });

        $('.js_save_form').on('click', function() {
            if(FormValidator.validateForm(_form_name)) {
                submitForm(_form);
            }
        });

        symptomsEvents();
        problemsEvents();
    }

    return {
        init:function() {
            bindMedContentEvent();
        }
    }
}

module.exports = AddMedContentHandler();