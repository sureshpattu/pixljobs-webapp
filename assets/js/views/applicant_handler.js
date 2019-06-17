var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');

function ApplicantSignUpHandler() {
    function bindApplicantSignUpEvent() {

        $('.js_select2').select2({});
        var _form_name = '#jsSignUpApplicantForm';
        var _form      = $(_form_name);
        console.log(_form);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            console.log(_form_name);
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
                    email          :_form.find('.js_email').val(),
                    password       :_form.find('.js_password').val(),
                    gender         :_form.find('.js_gender').val(),
                    exp_month      :_form.find('.js_exp_month').val(),
                    exp_year       :_form.find('.js_exp_year').val(),
                    resume         :_form.find('.js_input_file').val()
                };
                console.log(obj);
                var callback = function(_res) {
                    if(!_res.error) {
                        window.location.href = '/applicant-account'
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                };
                ApiUtil.makeAjaxRequest('/api/applicant-auth/register', '', 'POST', '', obj, callback);
            }
        });
    }

    function bindApplicantEditEvent() {

        $('.js_select2').select2({});
        var _form_name = '#jsSignUpApplicantForm';
        var _form      = $(_form_name);
        console.log(_form);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            console.log(_form_name);
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
                    email          :_form.find('.js_email').val(),
                    password       :_form.find('.js_password').val(),
                    gender         :_form.find('.js_gender').val(),
                    exp_month      :_form.find('.js_exp_month').val(),
                    exp_year       :_form.find('.js_exp_year').val()
                };
                console.log(obj);
                var callback = function(_res) {
                    if(!_res.error) {
                        window.location.href = '/applicant-account'
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                };
                ApiUtil.makeAjaxRequest('/api/applicant-auth/register', '', 'POST', '', obj, callback);
            }
        });
    }

    return {
        init    :function() {
            bindApplicantSignUpEvent();
        },
        initEdit:function() {
            bindApplicantEditEvent();
        },
        initView:function(_land_ids) {
            _lang_ids_arr = _land_ids;
            utils.initProfileImageCropper('#profileImageCropperModal', '.js_profile_img_wrap', 'userPicPreviewImage',
                function() {
                    $('.js_prof_pic_load_img').removeClass('hide');
                    ApiUtil.makeAjaxRequest('/api/avatar/upload', '', 'POST', '',
                        {src:$('.js_img_pre_holder').attr('src')}, function(_res) {
                            $('.js_prof_pic_load_img').addClass('hide');

                        });
                });

        }
    }
}

module.exports = ApplicantSignUpHandler();