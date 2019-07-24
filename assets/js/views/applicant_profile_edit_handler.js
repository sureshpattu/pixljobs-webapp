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
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    function bindApplicantEditEvent() {
        var _form_name = '#jsApplicantEditForm';
        var _form      = $(_form_name);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var obj = {
                    name           :_form.find('.js_name').val(),
                    qualification  :_form.find('.js_qualification').val(),
                    institution    :_form.find('.js_institution').val(),
                    designation    :_form.find('.js_designation').val(),
                    company        :_form.find('.js_company').val(),
                    current_salary :_form.find('.js_cur_salary').val(),
                    expected_salary:_form.find('.js_anual_salary').val(),
                    mobile         :_form.find('.js_mobile').val() || '0',
                    mobile_code    :_form.find('.js_mobile_code').val(),
                    email          :_form.find('.js_email').val(),
                    password       :_form.find('.js_password').val(),
                    gender         :_form.find('.js_gender').val(),
                    exp_month      :_form.find('.js_exp_month').val(),
                    exp_year       :_form.find('.js_exp_year').val(),
                    current_city   :_form.find('.js_city').val()
                };

                var callback = function(_res) {
                    if(!_res.error) {
                        uploadPhoto(_form, _res.data.id);
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                };
                ApiUtil.makeAjaxRequest('/api/applicant', '', 'PUT', '', obj, callback);
            }
        });
    }

    function uploadPhoto(_form, applicant_id) {
        var _input_file    = _form.find('.js_input_profile_file');
        var _existing_file = _form.find('.js_existing_profile_photo');
        if(_input_file.val()) {
            if(_existing_file.val()) {
                ApiUtil.makeAjaxRequest('/api/applicant/photo/' + _existing_file.val(), '', 'DELETE', '', '',
                    function(_res_path) {
                        if(_res_path.error) {
                            updatePhoto(_form, applicant_id);
                        } else {
                            updatePhoto(_form, applicant_id);
                        }
                    });
            } else {
                updatePhoto(_form, applicant_id);
            }
        } else {
            uploadResume(_form, applicant_id);
        }
    }

    function updatePhoto(_form, applicant_id) {
        var _input_file = _form.find('.js_input_profile_file');
        if(_input_file.val()) {
            var formData = new FormData();
            formData.append('photo', _input_file[0].files[0]);
            ApiUtil.makeFileUploadRequest('/api/applicant/photo/upload/' + applicant_id, '', 'POST', '',
                formData, function(err, results) {
                    window.location.href = '/applicant-account';
                    uploadResume(_form, applicant_id);
                });
        } else {
            uploadResume(_form, applicant_id);
        }
    }

    function uploadResume(_form, applicant_id) {
        var _input_file    = _form.find('.js_input_resume_file');
        var _existing_file = _form.find('.js_existing_resume_file');
        if(_input_file.val()) {
            if(_existing_file.val()) {
                ApiUtil.makeAjaxRequest('/api/applicant/resume/' + _existing_file.val(), '', 'DELETE', '', '',
                    function(_res_path) {
                        if(_res_path.error) {
                            updateResume(_form, applicant_id);
                        } else {
                            updateResume(_form, applicant_id);
                        }
                    });
            } else {
                updateResume(_form, applicant_id);
            }
        } else {
            postJobTechnologies(applicant_id, _form);
        }
    }

    function updateResume(_form, applicant_id) {
        var _input_file = _form.find('.js_input_resume_file');
        if(_input_file.val()) {
            var formData = new FormData();
            formData.append('photo', _input_file[0].files[0]);
            ApiUtil.makeFileUploadRequest('/api/applicant/resume/upload/' + applicant_id, '', 'POST', '',
                formData, function(err, results) {
                    window.location.href = '/applicant-account'
                });
        } else {
            postJobTechnologies(applicant_id, _form);
        }
    }

    function postJobTechnologies(_applicant_id, _form) {
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
                    alert('Data updated successfully.');
                    window.location.href = '/applicant-account';
                } else {
                    alert(_res.message || 'Something went wrong!');
                }
            });
        }
    }

    function verifyEmail() {
        var _obj = {
            email:$('.js_email').val()
        };
        ApiUtil.makeAjaxRequest('/api/applicant-auth/verify/email', '', 'POST', '', _obj, function(_res) {
            if(!_res.error) {
                alert(_res.message);
                //window.location.href = '/applicant-account';
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });

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

        $('.js_verify_email').click(function() {
            verifyEmail(this);
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
        init:function() {
            bindCommonClickEvents();
            bindApplicantEditEvent();
            bindTechnologyClickEvents();
            bindLanguageClickEvents();
            $('.js_select2').select2({});

            $(document).click(function(e) {
                if(!$(e.target).hasClass('search_enabled')) {
                    $('.js_tech_search_dropdown_list').addClass('hide');
                    $('.js_language_search_dropdown_list').addClass('hide');
                }
            });
        }
    }
}

module.exports = ApplicantSignUpHandler();