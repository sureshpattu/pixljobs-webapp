var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');

function ResetHandler() {
    function bindResetPasswordFormEvent() {
        var _form_name = '#resetPasswordForm';
        var _form      = $(_form_name);
        _form.submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _new_pass     = _form.find('.js_new_password').val();
                var _confirm_pass = _form.find('.js_con_password').val();
                var user_id       = _form.find('.js_user_id').val();
                var _obj          = {};

                if(_new_pass === _confirm_pass) {
                    _obj = {
                        user_id :user_id,
                        password:_new_pass
                    };
                    postAppResetPassword(_obj, _form);
                } else {
                    alert('Confirm password not matched!');
                }
            }
            return false;
        });

    }

    function bindChangeEmailFormEvent() {
        var _form_name = '#changeEmailForm';
        var _form      = $(_form_name);
        _form.submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _old_email = _form.find('.js_old_email').val();
                var _new_email = _form.find('.js_new_email').val();
                var user_id    = _form.find('.js_data_id').val();
                var _obj       = {
                    user_id:user_id,
                    email  :_new_email
                };
                postApplicantChangeEmail(_obj, _form);
            }
            return false;
        });

    }

    function postAppResetPassword(obj, formEle) {
        var callback = function(data) {
            if(!data.error && data.data) {
                window.location.href = '/applicant-account';
            } else {
                formEle.find('.js_server_error').removeClass('hide');
                formEle.find('.js_server_error_msg').html(data.msg);
            }
        };
        ApiUtil.makeAjaxRequest('/api/applicant/reset-password/' + obj.user_id, '', 'POST', '', obj, callback);
    }

    function postApplicantChangeEmail(obj, formEle) {
        var callback = function(data) {
            if(!data.error && data.data) {
                //window.location.href = '/applicant-account';
            } else {
              alert("something went wrong   ");
            }
        };
        ApiUtil.makeAjaxRequest('/api/applicant/change-email/' + obj.user_id, '', 'POST', '', obj, callback);
    }

    return {
        initAppResetPassword:function() {
            bindResetPasswordFormEvent();
        },
        initEmailChange     :function() {
            bindChangeEmailFormEvent();
        }
    };
}

module.exports = ResetHandler();