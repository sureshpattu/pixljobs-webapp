var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');

function RecruiterHandler() {
    function uploadImage(_ele, _cb) {
        var formData = new FormData();
        formData.append('photo', _ele[0].files[0]);
        ApiUtil.makeFileUploadRequest('/api/recruiter/photo/upload', '', 'POST', '', formData,
            function(_res_path) {
                _cb(_res_path);
            });
    }

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

    function bindRecruiterEvent() {
        $('.js_select2').select2({});
        var _form_name = '#jsSignUpRecruitForm';
        var _form      = $(_form_name);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            console.log('clicked');
            if(FormValidator.validateForm(_form_name)) {
                var obj             = {
                    name           :_form.find('.js_name').val(),
                    email          :_form.find('.js_email').val(),
                    password       :_form.find('.js_password').val(),
                    gender         :_form.find('.js_gender').val(),
                    designation    :_form.find('.js_designation').val(),
                    company        :_form.find('.js_company_name').val() || '0',
                    industry_id    :_form.find('.js_industry').val(),
                    company_size   :_form.find('.js_company_size').val(),
                    company_url    :_form.find('.js_company_url').val(),
                    about_company  :_form.find('.js_about_company').val(),
                    company_benefit:_form.find('.js_company_benefit').val()

                };
                var _img_pre_holder = _form.find('.js_input_profile_file');
                if(_img_pre_holder.files.length !== 0) {
                    uploadImage(_img_pre_holder, function(_res_path) {
                        if(!_res_path.error && _res_path.data) {
                            obj.photo      = _res_path.data.file;
                            obj.photo_type = _res_path.data.file_type;
                        }
                        postRegisterAPI(obj);
                    })
                } else {
                    postRegisterAPI(obj);
                }
            }
        });
    }

    function postRegisterAPI(_obj) {
        ApiUtil.makeAjaxRequest('/api/recruiter-auth/register', '', 'POST', '', _obj, function(_res) {
            if(!_res.error) {
                window.location.href = '/login'
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function bindCommonClickEvents() {
        $('.js_input_profile_file').change(function() {
            readURL(this);
        });
        $('.js_company_benefit').select2({
            tags:true
        });
    }

    return {
        init:function() {
            bindCommonClickEvents();
            bindRecruiterEvent();
        }
    }
}

module.exports = RecruiterHandler();