var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');
var waterfall     = require('async-waterfall');

function PostJobHandler() {

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
    }

    function bindPostJobEvent() {
        var _form_name = '#jsJobForm';
        var _form      = $(_form_name);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var locationType1 = _form.find('#locationType1');
                var locationType2 = _form.find('#locationType2');

                var _location_type = '';
                if(locationType1.attr('checked')) {
                    _location_type = locationType1.val();
                }
                if(locationType2.attr('checked')) {
                    _location_type = locationType2.val();
                }

                var _obj = {
                    name         :_form.find('.js_title').val(),
                    recruiter_id :_form.find('.js_recruiter_id').val(),
                    job_type     :_form.find('.js_job_type').val(),
                    salary_min   :_form.find('.js-input-from').val(),
                    salary_max   :_form.find('.js-input-to').val(),
                    location_type:_location_type
                };

                ApiUtil.makeAjaxRequest('/api/qa-jobs', '', 'POST', '', _obj, function(_res) {
                    if(!_res.error && _res.data) {
                        postJobCategory(_res.data.id, _form);
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
        });
    }

    function postJobCategory(_job_id, _form) {
        var _obj = {
            qa_job_id  :_job_id,
            category_id:_form.find('.js_category').val()
        };
        ApiUtil.makeAjaxRequest('/api/qa-job/categories', '', 'POST', '', _obj, function(_res) {
            if(!_res.error && _res.data) {
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
                    work_week:_form.find('.js_work_week').val(),
                    holidays :_form.find('.js_holidays').val(),
                    desc     :_form.find('.js_desc').val()
                };

                ApiUtil.makeAjaxRequest('/api/qa-jobs/' + _job_id, '', 'PUT', '', _obj, function(_res) {
                    if(!_res.error && _res.data) {

                        postJobTechnologies(_job_id, _form)
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
        });
    }

    function postJobTechnologies(_job_id, _form) {
        var _technologies = _form.find('.js_technologies').val();
        if(_technologies) {
            waterfall(_technologies.map(function(arrayItem) {
                return function(lastItemResult, CB) {
                    if(!CB) {
                        CB             = lastItemResult;
                        lastItemResult = null;
                    }
                    var _obj = {
                        qa_job_id    :_job_id,
                        technology_id:arrayItem
                    };

                    ApiUtil.makeAjaxRequest('/api/qa-job/technologies', '', 'POST', '', _obj, function(_res) {
                        CB(null, []);
                    });
                }
            }), function(err, result) {
                window.location.href = '/post-job/company/' + _job_id;
            });
        }
    }

    function bindPostJobCompanyEvent() {
        var _form_name = '.jsJobCompanyForm';
        var _form      = $(_form_name);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _job_id = $('.js_job_id').val();

                var _obj = {
                    company_id:$('.js_company_id').val()
                };

                ApiUtil.makeAjaxRequest('/api/qa-jobs/' + _job_id, '', 'PUT', '', _obj, function(_res) {
                    if(!_res.error && _res.data) {
                        window.location.href = '/';
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
        });

        $('.jsSubmitCompanyFormBtn').click(function() {
            _form.submit();
        })
    }

    return {
        init        :function() {
            bindCommonClickEvents();
            bindPostJobEvent();
        },
        initWorkInfo:function() {
            bindPostJobWorkInfoEvent();
            $('.js_technologies').select2({
                tags           :true,
                tokenSeparators:[',']
            });
        },
        initCompany :function() {
            bindPostJobCompanyEvent();
            $('.js_company_benefit').select2({
                tags           :true,
                tokenSeparators:[',']
            });
            $('.js_select2').select2({});
        }
    }
}

module.exports = PostJobHandler();