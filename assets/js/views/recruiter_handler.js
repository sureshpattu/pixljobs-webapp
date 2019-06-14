var ApiUtil = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils = require('../utils/common');

function RecruiterHandler() {
    function bindRecruiterEvent() {
        $('.js_select2').select2({});
        var _form_name = '#jsSignUpRecruitForm';
        var _form = $(_form_name);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var obj = {
                    name           :_form.find('.js_name').val(),
                    designation    :_form.find('.js_designation').val(),
                    company        :_form.find('.js_company_name').val() || '0',
                    industry       :_form.find('.js_industry').val(),
                    company_size   :_form.find('.js_company_size').val(),
                    company_url    :_form.find('.js_company_url').val(),
                    about_company  :_form.find('.js_about_company').val(),
                    company_benefit:_form.find('.js_company_benefit').val(),
                    email          :_form.find('.js_email').val(),
                    password       :_form.find('.js_password').val(),
                    gender         :_form.find('.js_gender').val()
                };
                console.log(obj);
                var callback = function(_res) {
                    if(!_res.error) {
                        window.location.href = '/'
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                };
                ApiUtil.makeAjaxRequest('/api/recruiter-auth/register', '', 'POST', '', obj, callback);
            }
        });
    }

    return {
        init:function() {
            bindRecruiterEvent();
        }
    }
}

module.exports = RecruiterHandler();