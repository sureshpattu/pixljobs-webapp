var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');

function PostJobHandler() {

    function bindRecruiterEvent() {
        $('.js_select2').select2({});
        var _form_name = '#jsJobForm';
        var _form      = $(_form_name);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                //locationType1
                //locationType2
                var _user_obj       = {
                    name       :_form.find('.js_title').val(),
                    category_id:_form.find('.js_category').val(),
                    job_type   :_form.find('.js_job_type').val(),
                    salary_min :_form.find('.js-input-from').val(),
                    salary_max :_form.find('.js-input-to').val()
                };
                var _img_pre_holder = _form.find('.js_input_profile_file');

                ApiUtil.makeAjaxRequest('/api/recruiter-auth/register', '', 'POST', '', _user_obj, function(_res) {
                    if(!_res.error && _res.data) {
                        if(_img_pre_holder.val()) {
                            uploadImage(_img_pre_holder, function(_res_path) {
                                updateUserPhoto(_res.data.id, _res_path);
                            })
                        }
                        postCompanyDetails(_res.data.id, _form);

                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
        });
    }

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

    return {
        init:function() {
            bindCommonClickEvents();
            bindRecruiterEvent();
        }
    }
}

module.exports = PostJobHandler();