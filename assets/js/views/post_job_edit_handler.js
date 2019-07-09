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

        $('.js_job_requirements').select2({
            tags           :true,
            tokenSeparators:[',']
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
                    _location_type = locationType1.val();
                }
                if(locationType2.attr('checked')) {
                    _location_type = locationType2.val();
                }

                var _job_id = _form.find('.js_job_id').val();

                var _obj = {
                    name           :_form.find('.js_title').val(),
                    recruiter_id   :_recruiter_id,
                    job_type       :_form.find('.js_job_type').val(),
                    salary_min     :_form.find('.js-input-from').val(),
                    salary_max     :_form.find('.js-input-to').val(),
                    exp_year       :_form.find('.js_exp_year').val(),
                    exp_month      :_form.find('.js_exp_month').val(),
                    position_count :_form.find('.js_position_count').val(),
                    end_date       :_form.find('.js_end_date').val(),
                    education_level:_form.find('.js_edu_level').val(),
                    urgent_status  :_form.find('.js_urgent_status').val(),
                    location_type  :_location_type
                };

                ApiUtil.makeAjaxRequest('/api/qa-jobs/' + _job_id, '', 'PUT', '', _obj, function(_qaJobRes) {
                    if(!_qaJobRes.error && _qaJobRes.data) {
                        var _adminObj = {
                            recruiter_id:_recruiter_id,
                            qa_job_id   :_qaJobRes.data.id,
                            msg         :'Job details updated'
                        };
                        ApiUtil.makeAjaxRequest('/api/admin-notifications', '', 'POST', '', _adminObj, function(_res) {
                            postJobCategory(_qaJobRes.data.id, _form);
                        });
                    } else {
                        alert(_qaJobRes.message || 'Something went wrong!');
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
                postJobRequirements(_job_id, _form);
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function postJobRequirements(_qa_job_id, _form) {
        var _obj = {
            qa_job_id   :_qa_job_id,
            requirements:_form.find('.js_job_requirements').val() || []
        };
        ApiUtil.makeAjaxRequest('/api/requirements', '', 'POST', '', _obj, function(_res) {
            if(!_res.error) {
                window.location.href = '/post-job/info/' + _qa_job_id;
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    return {
        init:function() {
            bindCommonClickEvents();
            bindPostJobEvent();
        }
    }
}

module.exports = PostJobHandler();