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
                    dob            :_form.find('.js_dob').val(),
                    exp_month      :_form.find('.js_exp_month').val(),
                    exp_year       :_form.find('.js_exp_year').val(),
                    current_city   :_form.find('.js_city').val(),
                    home_city      :_form.find('.js_home_city').val()
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
                    postCities(_applicant_id, _form)
                } else {
                    alert(_res.message || 'Something went wrong!');
                }
            });
        }
    }

    function postCities(_applicant_id, _form) {
        var _cities_wrap = _form.find('.js_cities_wrap');
        var _cities      = [];

        if(_cities_wrap.children().length) {
            $('.js_city_row').each(function(i, ele) {
                var _this       = $(this);
                var _city_input = _this.find('.js_search_city');

                _cities.push({
                    id  :_city_input.data('tid'),
                    city:_city_input.val()
                })
            });
            var _obj = {
                applicant_id:_applicant_id,
                cities      :_cities
            };
            ApiUtil.makeAjaxRequest('/api/applicant/cities', '', 'POST', '', _obj, function(_res) {
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

        var date = new Date();
        date.setDate(date.getDate());
        date.setFullYear(date.getFullYear() - 18);

        var date2 = new Date();
        date2.setDate(date.getDate());
        date2.setFullYear(date.getFullYear() - 100);

        var _date = new Pikaday({
            field      :document.getElementById('jsDOB'),
            yearRange  :[date2.getFullYear(), date.getFullYear()],
            maxDate    :new Date((date.getMonth() + 1) + '/' + (date.getDate()) + '/' + (date.getFullYear())),
            defaultDate:new Date((date.getMonth() + 1) + '/' + (date.getDate()) + '/' + (date.getFullYear())),
            format     :'MM/DD/YYYY',
            toString   :function(date, format) {
                var day   = date.getDate();
                var month = date.getMonth() + 1;
                var year  = date.getFullYear();
                return day + '/' + month + '/' + year;
            }
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

    function highlightCityInputStrings(_search_val, _parent) {
        if(_search_val.length !== 0) {
            var search_value  = '',
                search_regexp = '';

            _parent.find('.js_city_search_dropdown_list ul li a').each(function() {
                search_value  = _search_val.toUpperCase();
                search_regexp = new RegExp(search_value, 'i');
                $(this).html(
                    $(this)
                        .html()
                        .replace(search_regexp, '<span style=\'font-weight: 800\'>' + search_value + '</span>'));
            });
        }
        $('.js_city_search_item').off('click').on('click', function() {
            var _this              = $(this);
            var _search_input_city = _this.closest('.js_city_row').find('.js_search_city');
            _search_input_city.val(_this.data('name'));
            _search_input_city.data('tid', _this.data('tid'));
        });
    }

    function searchCities(_ele) {
        var _search_val = _ele.val();
        var _query      = {
            query:_search_val,
            page :0,
            limit:10
        };
        ApiUtil.makeAjaxRequest('/api/cities/search', '', 'POST', '', _query, function(_res) {
            if(!_res.error) {
                var _html = Handlebars.partials['city_search_list']({
                    data:_res.data.result
                });
                _ele.parent().find('.js_city_search_dropdown_list').html(_html);
                highlightCityInputStrings(_search_val, _ele.parent());
                if(_res.data.result.length) {
                    _ele.data('tid', '');
                    _ele.data('name', '');
                }
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function bindCityClickEvents() {

        $('.js_add_city').off('click').on('click', function() {
            var _html = Handlebars.partials['city_row']();
            $('.js_cities_wrap').append(_html);
            bindCityClickEvents();
        });

        $('.js_remove_city').off('click').on('click', function() {
            $(this).closest('.js_city_row').remove();
        });

        var _search_city = $('.js_search_city');
        _search_city.off('keyup').on('keyup', function() {
            var _this = $(this);
            if(_this.val().length > 0) {
                searchCities(_this);
            } else {
                _this.val('');
                _search_city.parent().find('.js_city_search_dropdown_list').html('');
            }
        });
        _search_city.off('focus').on('focus', function() {
            $(this).parent().find('.js_city_search_dropdown_list').removeClass('hide');
        });
    }

    function bindHomeAddressClickEvents() {
        function fillAddress(place, element) {
            if(place) {

                element.find('.js_home_area,.js_home_locality,.js_home_city,.js_home_state,.js_home_country').val('');
                $('.js_home_place_id').val(place.place_id);
                $('.js_home_full_address').val(place.formatted_address);
                for(var i = 0; i < place.address_components.length; i++) {
                    switch(place.address_components[i].types[0]) {
                        case 'route':
                            element.find('.js_home_street').val(place.address_components[i].long_name);
                            break;
                        case 'sublocality_level_2':
                            element.find('.js_home_area_in').val(place.address_components[i].long_name);
                            break;
                        case 'sublocality_level_1':
                            element.find('.js_home_area').val(place.address_components[i].long_name);
                            break;
                        case 'locality':
                            element.find('.js_home_locality').val(place.address_components[i].long_name);
                            break;
                        case 'administrative_area_level_2':
                            element.find('.js_home_city').val(place.address_components[i].long_name);
                            break;
                        case 'administrative_area_level_1':
                            element.find('.js_home_state').val(place.address_components[i].long_name);
                            break;
                        case 'country':
                            element.find('.js_home_country').val(place.address_components[i].long_name);
                            break;
                        case 'postal_code':
                            element.find('.js_home_postal_code').val(place.address_components[i].long_name);
                            break;
                    }
                }
            }
        }

        var profile_address_autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('homeAdAddress')));
        $('#glAdAddress').on('focus', function() {
            $(this).attr('autocomplete', 'nope');
        });
        profile_address_autocomplete.addListener('place_changed', function() {
            var place = profile_address_autocomplete.getPlace();
            fillAddress(place, $('body'));
        });
    }

    return {
        init:function() {
            bindCommonClickEvents();
            bindHomeAddressClickEvents();
            bindApplicantEditEvent();
            bindTechnologyClickEvents();
            bindLanguageClickEvents();
            bindCityClickEvents();
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