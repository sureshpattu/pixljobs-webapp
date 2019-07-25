var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');
var async         = require('async');

function ApplicantSignUpHandler() {
    var _img_pre_holder = $('.js_img_pre_holder');

    function readURL(input) {
        if(input.files && input.files[0]) {
            var reader    = new FileReader();
            reader.onload = function(e) {
                _img_pre_holder.attr('src', e.target.result);
                _img_pre_holder.removeClass('hide');
                $('.js_profile_img_txt').addClass('hide');
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    function bindApplicantSignUpEvent() {
        var _form_name = '#jsSignUpApplicantForm';
        var _form      = $(_form_name);
        _form.unbind().submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _obj = {
                    name            :_form.find('.js_name').val(),
                    qualification   :_form.find('.js_qualification').val(),
                    institution     :_form.find('.js_institution').val(),
                    designation     :_form.find('.js_designation').val(),
                    company         :_form.find('.js_company').val(),
                    current_salary  :_form.find('.js_cur_salary').val(),
                    expected_salary :_form.find('.js_anual_salary').val(),
                    mobile          :_form.find('.js_mobile').val() || '0',
                    mobile_code     :_form.find('.js_mobile_code').val(),
                    email           :_form.find('.js_email').val(),
                    password        :_form.find('.js_password').val(),
                    gender          :_form.find('.js_gender').val(),
                    exp_month       :_form.find('.js_exp_month').val(),
                    exp_year        :_form.find('.js_exp_year').val(),
                    institution_city:_form.find('.js_institution_city').val(),
                    current_city    :_form.find('.js_city').val(),
                    relocation      :_form.find('.js_relocation_checkbox').prop('checked')
                };
                ApiUtil.makeAjaxRequest('/api/applicant-auth/register', '', 'POST', '', _obj, function(_res) {
                    if(!_res.error) {
                        uploadFiles(_form, _res.data.id);
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });

            }
        });
    }

    function uploadFiles(_form, applicant_id) {
        async.parallel([
            function(callback) {
                var _input_file = _form.find('.js_input_profile_file');
                if(_input_file.val()) {
                    var formData = new FormData();
                    formData.append('photo', _input_file[0].files[0]);
                    ApiUtil.makeFileUploadRequest('/api/applicant/photo/upload/' + applicant_id, '', 'POST', '',
                        formData,
                        function(_res_path) {
                            callback(null, null);
                        });
                } else {
                    callback(null, null);
                }
            },
            function(callback) {
                var _input_file = _form.find('.js_input_resume_file');
                if(_input_file.val()) {
                    var formData = new FormData();
                    formData.append('photo', _input_file[0].files[0]);
                    ApiUtil.makeFileUploadRequest('/api/applicant/resume/upload/' + applicant_id, '', 'POST', '',
                        formData,
                        function(_res_path) {
                            callback(null, null);
                        });
                } else {
                    callback(null, null);
                }
            }
        ], function(err, results) {
            postTechnologies(applicant_id, _form);
        });
    }

    function postTechnologies(_applicant_id, _form) {
        var _technologies_wrap = _form.find('.js_technologies_wrap');
        var _technologies      = [];

        if(_technologies_wrap.children().length) {
            $('.js_technology_row').each(function(i, ele) {
                var _this       = $(this);
                var _tech_input = _this.find('.js_search_tech');
                var _tech_level = _this.find('.js_tech_level');

                _technologies.push({
                    id   :_tech_input.data('tid'),
                    name :_tech_input.val(),
                    level:_tech_level.val()
                })
            });
            var _obj = {
                applicant_id:_applicant_id,
                technologies:_technologies
            };
            ApiUtil.makeAjaxRequest('/api/applicant/technologies', '', 'POST', '', _obj, function(_res) {
                if(!_res.error) {
                    postLanguages(_applicant_id, _form)
                } else {
                    alert(_res.message || 'Something went wrong!');
                }
            });
        }
    }

    function postLanguages(_applicant_id, _form) {
        var _languages_wrap = _form.find('.js_languages_wrap');
        var _languages      = [];

        if(_languages_wrap.children().length) {
            $('.js_language_row').each(function(i, ele) {
                var _this       = $(this);
                var _lang_input = _this.find('.js_search_language');
                var _lang_level = _this.find('.js_language_level');

                _languages.push({
                    id   :_lang_input.data('tid'),
                    name :_lang_input.val(),
                    level:_lang_level.val()
                })
            });
            var _obj = {
                applicant_id:_applicant_id,
                languages   :_languages
            };
            ApiUtil.makeAjaxRequest('/api/applicant/languages', '', 'POST', '', _obj, function(_res) {
                if(!_res.error) {
                    window.location.href = '/applicant-account';
                } else {
                    alert(_res.message || 'Something went wrong!');
                }
            });
        }
    }

    function bindCommonClickEvents() {
        $('.js_select2').select2({});

        $('#selectExpMonth').change(function() {
            var selectedItem = $(this).val();
            if(selectedItem > 0) {
                $('#freshDetails').addClass('hide');
                $('#expDetails').removeClass('hide');

                $('.js_qualification').removeClass('required');

                $('.js_designation').addClass('required');
                $('.js_company').addClass('required');
                $('.js_cur_salary').addClass('required');

                $('.js_exp_detail_sec').removeClass('hide');
                $('.js_fresh_detail_sec').addClass('hide');

            } else {
                $('#freshDetails').removeClass('hide');
                $('#expDetails').addClass('hide');

                $('.js_qualification').addClass('required');

                $('.js_designation').removeClass('required');
                $('.js_company').removeClass('required');
                $('.js_cur_salary').removeClass('required');

                $('.js_exp_detail_sec').addClass('hide');
                $('.js_fresh_detail_sec').removeClass('hide');
            }
        });

        $('#selectExpYear').change(function() {
            var selectedItem = $(this).val();
            if(selectedItem.valueOf() > 0) {
                $('#freshDetails').addClass('hide');
                $('#expDetails').removeClass('hide');

                $('.js_qualification').removeClass('required');

                $('.js_designation').addClass('required');
                $('.js_company').addClass('required');
                $('.js_cur_salary').addClass('required');

                $('.js_exp_detail_sec').removeClass('hide');
                $('.js_fresh_detail_sec').addClass('hide');

            } else {
                $('#freshDetails').removeClass('hide');
                $('#expDetails').addClass('hide');

                $('.js_qualification').addClass('required');

                $('.js_designation').removeClass('required');
                $('.js_company').removeClass('required');
                $('.js_cur_salary').removeClass('required');

                $('.js_exp_detail_sec').addClass('hide');
                $('.js_fresh_detail_sec').removeClass('hide');
            }
        });

        $('.js_input_profile_file').change(function() {
            readURL(this);
        });

        $('.js_input_resume_file').change(function() {
            var _this      = $(this);
            var _parent    = _this.closest('.upload_sec');
            var _file_name = _this.val().replace(/.*[\/\\]/, '');

            if(_this.val()) {
                _parent.addClass('preview');
                _parent.find('.file_name').html(_file_name);
            }
        });

        $('.js_remove_file').click(function() {
            var _this   = $(this);
            var _parent = _this.closest('.upload_sec');
            _parent.removeClass('preview');
        });

    }

    function highlightInputStrings(_search_val, _parent) {
        if(_search_val.length !== 0) {
            var search_value  = '',
                search_regexp = '';

            _parent.find('.js_tech_search_dropdown_list ul li a').each(function() {
                search_value  = _search_val.toUpperCase();
                search_regexp = new RegExp(search_value, 'i');
                $(this).html(
                    $(this)
                        .html()
                        .replace(search_regexp, '<span style=\'font-weight: 800\'>' + search_value + '</span>'));
            });
        }
        $('.js_tech_search_item').off('click').on('click', function() {
            var _this              = $(this);
            var _search_input_tech = _this.closest('.js_technology_row').find('.js_search_tech');
            _search_input_tech.val(_this.data('name'));
            _search_input_tech.data('tid', _this.data('tid'));
        });
    }

    function searchTechnologies(_ele) {
        var _search_val = _ele.val();
        var _query      = {
            query:_search_val,
            page :0,
            limit:10
        };
        ApiUtil.makeAjaxRequest('/api/technologies/search', '', 'POST', '', _query, function(_res) {
            if(!_res.error) {
                var _html = Handlebars.partials['technology_search_list']({
                    data:_res.data.result
                });
                _ele.parent().find('.js_tech_search_dropdown_list').html(_html);
                highlightInputStrings(_search_val, _ele.parent());
                if(_res.data.result.length) {
                    _ele.data('tid', '');
                    _ele.data('name', '');
                }
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function bindTechnologyClickEvents() {
        $('.js_tech_level').select2({});

        $('.js_add_technology').off('click').on('click', function() {
            var _html = Handlebars.partials['technology_row']();
            $('.js_technologies_wrap').append(_html);
            bindTechnologyClickEvents();
        });

        $('.js_remove_technology').off('click').on('click', function() {
            $(this).closest('.js_technology_row').remove();
        });

        var _search_tech = $('.js_search_tech');
        _search_tech.off('keyup').on('keyup', function() {
            var _this = $(this);
            if(_this.val().length > 0) {
                searchTechnologies(_this);
            } else {
                _this.val('');
                _search_tech.parent().find('.js_tech_search_dropdown_list').html('');
            }
        });
        _search_tech.off('focus').on('focus', function() {
            $(this).parent().find('.js_tech_search_dropdown_list').removeClass('hide');
        });
    }

    function highlightLanguageInputStrings(_search_val, _parent) {
        if(_search_val.length !== 0) {
            var search_value  = '',
                search_regexp = '';

            _parent.find('.js_language_search_dropdown_list ul li a').each(function() {
                search_value  = _search_val.toUpperCase();
                search_regexp = new RegExp(search_value, 'i');
                $(this).html(
                    $(this)
                        .html()
                        .replace(search_regexp, '<span style=\'font-weight: 800\'>' + search_value + '</span>'));
            });
        }
        $('.js_language_search_item').off('click').on('click', function() {
            var _this                  = $(this);
            var _search_input_language = _this.closest('.js_language_row').find('.js_search_language');
            _search_input_language.val(_this.data('name'));
            _search_input_language.data('tid', _this.data('tid'));
        });
    }

    function searchLanguages(_ele) {
        var _search_val = _ele.val();
        var _query      = {
            query:_search_val,
            page :0,
            limit:10
        };
        ApiUtil.makeAjaxRequest('/api/languages/search', '', 'POST', '', _query, function(_res) {
            if(!_res.error) {
                var _html = Handlebars.partials['language_search_list']({
                    data:_res.data.result
                });
                _ele.parent().find('.js_language_search_dropdown_list').html(_html);
                highlightLanguageInputStrings(_search_val, _ele.parent());
                if(_res.data.result.length) {
                    _ele.data('tid', '');
                    _ele.data('name', '');
                }
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function bindLanguageClickEvents() {
        $('.js_language_level').select2({});

        $('.js_add_language').off('click').on('click', function() {
            var _html = Handlebars.partials['language_row']();
            $('.js_languages_wrap').append(_html);
            bindLanguageClickEvents();
        });

        $('.js_remove_language').off('click').on('click', function() {
            $(this).closest('.js_language_row').remove();
        });

        var _search_language = $('.js_search_language');
        _search_language.off('keyup').on('keyup', function() {
            var _this = $(this);
            if(_this.val().length > 0) {
                searchLanguages(_this);
            } else {
                _this.val('');
                _search_language.parent().find('.js_language_search_dropdown_list').html('');
            }
        });
        _search_language.off('focus').on('focus', function() {
            $(this).parent().find('.js_language_search_dropdown_list').removeClass('hide');
        });
    }

    return {
        init    :function() {
            bindCommonClickEvents();
            bindApplicantSignUpEvent();
            bindTechnologyClickEvents();
            bindLanguageClickEvents();

            $(document).click(function(e) {
                if(!$(e.target).hasClass('search_enabled')) {
                    $('.js_tech_search_dropdown_list').addClass('hide');
                    $('.js_language_search_dropdown_list').addClass('hide');
                }
            });
        },
        initEdit:function() {
            bindApplicantEditEvent();
            $('.js_select2').select2({});
        }
    }
}

module.exports = ApplicantSignUpHandler();