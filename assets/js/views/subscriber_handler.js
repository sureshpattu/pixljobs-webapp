var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');

function SubscriberHandler() {

    function fetchMobileCode(_ele, _cb) {
        ApiUtil.makeAjaxRequest('/api/country-code', '', 'GET', '', '', function(_res) {
            if(!_res.error) {
                _cb(_res);
            } else {
                alert('Something went wrong!');
            }
        });
    }

    function bindSubscriberFormEvent() {
        $('.js_select2').select2({});
        $('.js_subscribe_form').submit(function(e) {
            e.preventDefault();
            var _form = $(this);
            if(FormValidator.validateForm('.js_subscribe_form')) {

                var _obj = {
                    name       :_form.find('.js_name').val(),
                    mobile     :_form.find('.js_mobile').val(),
                    mobile_code:_form.find('.js_mobile_code').val(),
                    email      :_form.find('.js_email').val(),
                    user_id    :_form.find('.js_user_id').val(),
                    url:window.location.href,
                };


                ApiUtil.makeAjaxRequest('/api/subscriber', '', 'POST', '', _obj, function(_res) {
                    if(_res && !_res.error) {
                        alert("Thank you for the subscription");
                        window.location.reload();
                    } else {
                        alert('something went wrong');
                    }
                });

            }
        });

    }

    function bindCommonClickEvents() {
        $('.js_input_profile_file').change(function() {
            readURL(this);
        });
        $('.js_company_benefit').select2({
            tags           :true,
            tokenSeparators:[',']
        });
    }

    function openFormPopup(_obj) {
        var _html = Handlebars.partials['add_subscriber_form'](_obj);
        PopupPage.init(_html, '', function() {
            _obj.status === 'View' ? disableForm() : bindSubscriberFormEvent();
        });
    }

    return {
        init:function() {
            bindCommonClickEvents();
            $('.js_add_subscriber').click(function() {
                fetchMobileCode($(this), function(_res) {
                    openFormPopup({
                        data  :_res.data,
                    });

                });
            });
        }
    }
}

module.exports = SubscriberHandler();