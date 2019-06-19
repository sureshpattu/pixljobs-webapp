var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');

function ApplicantSignUpHandler() {

    function readURL(input) {
        if(input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('.js_img_pre_holder').attr('src', e.target.result);
                $('.js_img_pre_holder').removeClass('hide');
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    function uploadImage(_ele, _cb) {
        var formData = new FormData();
        formData.append('photo', _ele[0].files[0]);
        ApiUtil.makeFileUploadRequest('/api/applicant/avatar/upload', '', 'POST', '', formData,
            function(_res_path) {
                _cb(_res_path);
            });
    }

    function bindApplicantSignUpEvent() {
        var _form_name = '#jsSignUpApplicantForm';
        var _form      = $(_form_name);
        _form.unbind().submit(function(e) {
            e.preventDefault();
            console.log(_form_name);
            if(FormValidator.validateForm(_form_name)) {
                var obj             = {
                    name           :_form.find('.js_name').val(),
                    qualification  :_form.find('.js_qualification').val(),
                    institution    :_form.find('.js_institution').val(),
                    designation    :_form.find('.js_designation').val(),
                    company        :_form.find('.js_company').val(),
                    current_salary :_form.find('.js_cur_salary').val(),
                    expected_salary:_form.find('.js_anual_salary').val(),
                    mobile         :_form.find('.js_mobile').val() || '0',
                    email          :_form.find('.js_email').val(),
                    password       :_form.find('.js_password').val(),
                    gender         :_form.find('.js_gender').val(),
                    exp_month      :_form.find('.js_exp_month').val(),
                    exp_year       :_form.find('.js_exp_year').val(),
                    resume         :_form.find('.js_input_file').val()
                };
                var _img_pre_holder = _form.find('.js_input_profile_file');
                uploadImage(_img_pre_holder, function(_res_path) {
                    if(!_res_path.error && _res_path.data) {
                        obj.photo      = _res_path.data.file;
                        obj.photo_type = _res_path.data.file_type;
                    }
                    ApiUtil.makeAjaxRequest('/api/applicant-auth/register', '', 'POST', '', obj, function(_res) {
                        if(!_res.error) {
                            window.location.href = '/applicant-account'
                        } else {
                            alert(_res.message || 'Something went wrong!');
                        }
                    });
                })

            }
        });
    }

    function bindApplicantEditEvent() {
        var _form_name = '#jsSignUpApplicantForm';
        var _form      = $(_form_name);
        console.log(_form);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            console.log(_form_name);
            if(FormValidator.validateForm(_form_name)) {
                var obj      = {
                    name           :_form.find('.js_name').val(),
                    qualification  :_form.find('.js_qualification').val(),
                    institution    :_form.find('.js_institution').val(),
                    designation    :_form.find('.js_designation').val(),
                    company        :_form.find('.js_company').val(),
                    current_salary :_form.find('.js_cur_salary').val(),
                    expected_salary:_form.find('.js_anual_salary').val(),
                    mobile         :_form.find('.js_mobile').val() || '0',
                    email          :_form.find('.js_email').val(),
                    password       :_form.find('.js_password').val(),
                    gender         :_form.find('.js_gender').val(),
                    exp_month      :_form.find('.js_exp_month').val(),
                    exp_year       :_form.find('.js_exp_year').val()
                };
                var callback = function(_res) {
                    if(!_res.error) {
                        window.location.href = '/applicant-account'
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                };
                ApiUtil.makeAjaxRequest('/api/applicant', '', 'PUT', '', obj, callback);
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
            } else {
                $('#freshDetails').removeClass('hide');
                $('#expDetails').addClass('hide');
            }
        });

        $('#selectExpYear').change(function() {
            var selectedItem = $(this).val();
            if(selectedItem.valueOf() > 0) {
                $('#freshDetails').addClass('hide');
                $('#expDetails').removeClass('hide');
            } else {
                $('#freshDetails').removeClass('hide');
                $('#expDetails').addClass('hide');
            }
        });

        $('.js_input_profile_file').change(function() {
            readURL(this);
        });

    }

    return {
        init    :function() {
            bindCommonClickEvents();
            bindApplicantSignUpEvent();
        },
        initEdit:function() {
            bindApplicantEditEvent();
        }
    }
}

module.exports = ApplicantSignUpHandler();