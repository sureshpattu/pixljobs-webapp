var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');
var waterfall     = require('async-waterfall');
var async         = require('async');

function PostJobHandler() {
    var _editor_quill;

    function bindCommonClickEvents() {
        $('.js_select2').select2({});
        var $range     = $('.js-range-slider'),
            $inputFrom = $('.js-input-from'),
            $inputTo   = $('.js-input-to'),
            instance,
            min        = 0,
            max        = 3000000,
            from       = 0,
            to         = 0;

        $range.ionRangeSlider({
            type              :'double',
            min               :min,
            max               :max,
            from              :0,
            to                :500000,
            prefix            :'Rp. ',
            onStart           :updateInputs,
            onChange          :updateInputs,
            step              :50000,
            prettify_enabled  :true,
            prettify_separator:'.',
            values_separator  :' - ',
            force_edges       :true

        });

        instance = $range.data('ionRangeSlider');

        function updateInputs(data) {
            from = data.from;
            to   = data.to;

            $inputFrom.prop('value', from);
            $inputTo.prop('value', to);
        }

        $inputFrom.on('input', function() {
            var val = $(this).prop('value');

            // validate
            if(val < min) {
                val = min;
            } else if(val > to) {
                val = to;
            }

            instance.update({
                from:val
            });
        });

        $inputTo.on('input', function() {
            var val = $(this).prop('value');

            // validate
            if(val < from) {
                val = from;
            } else if(val > max) {
                val = max;
            }

            instance.update({
                to:val
            });
        });

        $('.js_job_requirements').select2({
            tags           :true,
            tokenSeparators:[',']
        });

        var _date = new Pikaday({
            field   :document.getElementById('jsEndDate'),
            format  :'MM/DD/YYYY',
            toString:function(date, format) {
                var day   = date.getDate();
                var month = date.getMonth() + 1;
                var year  = date.getFullYear();
                return month + '-' + day + '-' + year;
            }
        });

        _editor_quill = new Quill('#descEditor', {
            placeholder:'Description...',
            theme      :'snow'
        });

        var _salary_inputs = $('.js_fixed_salary, .js-input-from, .js-input-to');
        $('.js_fixed_salary').on('keyup', function() {
            var _this = $(this);
            $('.js-input-from, .js-input-to').val(_this.val());
        });
        $('.js_salary_not_decided').on('click', function() {
            var _this = $(this);
            if(_this.prop('checked')) {
                _salary_inputs.val('');
                _salary_inputs.attr('disabled', 'disabled');
            } else {
                _salary_inputs.removeAttr('disabled');
            }
        });
    }

    function bindPostJobEvent() {
        var _form_name = '#jsJobForm';
        var _form      = $(_form_name);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _recruiter_id = _form.find('.js_recruiter_id').val();
                var locationType1 = _form.find('#locationType1');
                var locationType2 = _form.find('#locationType2');

                var _location_type = '';
                if(locationType1.attr('checked')) {
                    _location_type = 'office';
                }
                if(locationType2.attr('checked')) {
                    _location_type = 'remote';
                }

                var _obj = {
                    name          :_form.find('.js_title').val(),
                    recruiter_id  :_recruiter_id,
                    exp_year      :_form.find('.js_exp_year').val(),
                    exp_month     :_form.find('.js_exp_month').val(),
                    position_count:_form.find('.js_position_count').val(),
                    end_date      :_form.find('.js_end_date').val(),
                    status        :'inProgress',
                    location_type :_location_type,
                    street        :_form.find('.js_street').val(),
                    area_in       :_form.find('.js_area_in').val(),
                    area          :_form.find('.js_area').val(),
                    locality      :_form.find('.js_locality').val(),
                    city          :_form.find('.js_city').val(),
                    state         :_form.find('.js_state').val(),
                    pin           :_form.find('.js_postal_code').val(),
                    country       :_form.find('.js_country').val()
                };

                if($('.js_salary_not_decided').prop('checked')) {
                    _obj.is_salary = false;
                } else {
                    _obj.salary_min = _form.find('.js-input-from').val();
                    _obj.salary_max = _form.find('.js-input-to').val();
                }

                if(_editor_quill.getText().length) {
                    _obj.desc = _editor_quill.root.innerHTML;

                    ApiUtil.makeAjaxRequest('/api/qa-jobs', '', 'POST', '', _obj, function(_qaJobRes) {
                        if(!_qaJobRes.error && _qaJobRes.data) {
                            var _adminObj = {
                                recruiter_id:_recruiter_id,
                                qa_job_id   :_qaJobRes.data.id,
                                msg         :'New job posted'
                            };
                            ApiUtil.makeAjaxRequest('/api/admin-notifications', '', 'POST', '', _adminObj,
                                function(_res) {
                                    postJobRequirements(_qaJobRes.data.id, _form);
                                });
                        } else {
                            alert(_qaJobRes.message || 'Something went wrong!');
                        }
                    });
                } else {
                    $($('#descEditor').parent()).addClass('error-field')
                }
            }
        });
    }

    function postJobRequirements(_job_id, _form) {
        var _obj = {
            qa_job_id   :_job_id,
            requirements:_form.find('.js_job_requirements').val() || []
        };
        ApiUtil.makeAjaxRequest('/api/requirements', '', 'POST', '', _obj, function(_res) {
            if(!_res.error) {
                window.location.href = '/post-job/info/' + _job_id;
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function bindPostJobWorkInfoEvent() {
        var _form_name = '#jsJobInfoForm';
        var _form      = $(_form_name);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _job_id = _form.find('.js_job_id').val();

                var _obj = {
                    work_week      :_form.find('.js_work_week').val(),
                    holidays       :_form.find('.js_holidays').val(),
                    education_level:_form.find('.js_edu_level').val(),
                    urgent_status  :_form.find('.js_urgent_status').val(),
                    job_type       :_form.find('.js_job_type').val()
                };

                ApiUtil.makeAjaxRequest('/api/qa-jobs/' + _job_id, '', 'PUT', '', _obj, function(_res) {
                    if(!_res.error && _res.data) {

                        postJobCategory(_job_id, _form)
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
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

    function postJobCategory(_job_id, _form) {
        var _obj = {
            qa_job_id  :_job_id,
            category_id:_form.find('.js_category').val()
        };
        ApiUtil.makeAjaxRequest('/api/qa-job/categories', '', 'POST', '', _obj, function(_res) {
            if(!_res.error && _res.data) {
                postJobTechnologies(_job_id, _form);
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function postJobTechnologies(_job_id, _form) {
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
                qa_job_id   :_job_id,
                technologies:_technologies
            };
            ApiUtil.makeAjaxRequest('/api/qa-job/technologies', '', 'POST', '', _obj, function(_res) {
                if(!_res.error) {
                    window.location.href = '/post-job/company/' + _job_id;
                } else {
                    alert(_res.message || 'Something went wrong!');
                }
            });
        }
    }

    function bindPostJobCompanyEvent() {
        $('.js_company_benefit').select2({
            tags           :true,
            tokenSeparators:[',']
        });

        $('.jsSubmitExistingCompanyBtn').click(function() {
            _company_check_box.each(function(index, ele) {
                console.log(index, ele);
                var _this = $(ele);
                if(_this.prop('checked')) {
                    var _company_id = _this.data('cid');
                    updateJobCompany(_company_id);
                    return false;
                }
            });
        });

        $('.jsSubmitCompanyBtn').click(function() {
            $('#jsJobCompanyForm').submit();
        });

        var _company_check_box = $('.js_company_check_box');
        if(_company_check_box) {
            _company_check_box.click(function() {
                var _this = $(this);
                if(_this.prop('checked')) {
                    _company_check_box.prop('checked', false);
                    _this.prop('checked', true);
                } else {
                    _company_check_box.prop('checked', false);
                    _this.prop('checked', false);
                }
            });

            $('.js_add_new_company_btn').click(function() {
                _company_check_box.prop('checked', false);
                $('.js_forms_wrap').removeClass('hide');
                $(this).addClass('hide');

                $('.jsSubmitCompanyBtn').removeClass('hide');
                $('.jsSubmitExistingCompanyBtn').addClass('hide');
                $('.js_select2').select2({});
            });
        }

        $('.js_input_c_logo_file').change(function() {
            var _this      = $(this);
            var _parent    = _this.closest('.upload_sec');
            var _file_name = _this.val().replace(/.*[\/\\]/, '');

            if(_this.val()) {
                _parent.addClass('preview');
                _parent.find('.file_name').html(_file_name);
            }
            readURL(this);
        });

        $('.js_remove_file').click(function() {
            var _this   = $(this);
            var _parent = _this.closest('.upload_sec');
            _parent.removeClass('preview');
        });
    }

    function readURL(input) {
        if(input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('.js_company_logo_preview').attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    function updateJobCompany(_company_id) {
        var _job_id = $('.js_job_id').val();

        var _obj = {
            company_id:_company_id,
            status    :'pending'
        };
        ApiUtil.makeAjaxRequest('/api/qa-jobs/' + _job_id, '', 'PUT', '', _obj, function(_res) {
            if(!_res.error && _res.data) {
                alert('Your job post request received it will be verified by our admin we will update you soon!');
                window.location.href = '/';
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function bindPostJobCompanyFormEvent() {
        var _form_name = '#jsJobCompanyForm';
        var _form      = $(_form_name);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            //console.log('hi');
            if(FormValidator.validateForm(_form_name)) {
                var _company_obj = {
                    recruiter_id:$('.js_user_id').val(),
                    name        :_form.find('.js_company_name').val() || '0',
                    industry_id :_form.find('.js_industry').val(),
                    size        :_form.find('.js_company_size').val(),
                    url         :_form.find('.js_company_url').val(),
                    about       :_form.find('.js_about_company').val(),
                    street      :_form.find('.js_street').val(),
                    area        :_form.find('.js_area').val(),
                    city        :_form.find('.js_city').val(),
                    state       :_form.find('.js_state').val(),
                    pin         :_form.find('.js_postal_code').val(),
                    country     :_form.find('.js_country').val(),
                    email       :_form.find('.js_candidate_email').val()
                };

                ApiUtil.makeAjaxRequest('/api/companies', '', 'POST', '', _company_obj, function(_res) {
                    if(!_res.error && _res.data) {
                        uploadFiles(_res.data.id, _form)
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
        });
    }

    function uploadFiles(company_id, _form) {
        var _input_file = _form.find('.js_input_c_logo_file');
        if(_input_file.val()) {
            var formData = new FormData();
            formData.append('photo', _input_file[0].files[0]);
            ApiUtil.makeFileUploadRequest('/api/companies/photo/upload/' + company_id, '', 'POST', '',
                formData,
                function(_res_path) {
                    postCompanyBenefits(company_id, _form);
                });
        } else {
            postCompanyBenefits(company_id, _form);
        }
    }

    function postCompanyBenefits(company_id, _form) {
        var _company_obj = {
            company_id:company_id,
            benefits  :_form.find('.js_company_benefit').val() || []
        };

        ApiUtil.makeAjaxRequest('/api/benefits', '', 'POST', '', _company_obj, function(_res) {
            if(!_res.error) {
                updateJobCompany(company_id);
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    return {
        init        :function() {
            bindCommonClickEvents();
            bindPostJobEvent();
        },
        initWorkInfo:function() {
            bindPostJobWorkInfoEvent();
            bindTechnologyClickEvents();
            $('.js_select2').select2({});
            $('.js_technologies').select2({
                tags           :true,
                tokenSeparators:[',']
            });

            $(document).click(function(e) {
                if(!$(e.target).hasClass('search_enabled')) {
                    $('.js_tech_search_dropdown_list').addClass('hide');
                }
            });

        },
        initCompany :function() {
            bindPostJobCompanyEvent();
            bindPostJobCompanyFormEvent();
            $('.js_industry').select2();
            $('.js_company_size').select2();
        }
    }
}

module.exports = PostJobHandler();