var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');

function LoginHandler() {
    function bindLoginEvent() {
        var _form_name = '#jsLoginForm';
        var _form      = $(_form_name);
        _form.submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _obj = {
                    email   :_form.find('.js_email').val(),
                    password:_form.find('.js_password').val()
                };
                ApiUtil.makeAjaxRequest('/api/auth/login', '', 'POST', '', _obj, function(_res) {
                    if(!_res.error) {
                        window.location.href = '/';
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
            return false;
        });
    }

    return {
        init:function() {
            bindLoginEvent();
        }
    };
}

module.exports = LoginHandler();