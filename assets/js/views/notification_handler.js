var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');
var async         = require('async');

function NotificationHandler() {
    var _checkedArr = [];

    function bindCommonClickEvents() {

        var _check_all_notification = $('.js_check_all_notifications');
        var _check_notification     = $('.js_check_notification');
        _check_all_notification.click(function() {
            if($(this).prop('checked')) {
                _check_notification.each(function() {
                    $(this).prop('checked', true);
                    _checkedArr.push($(this).val());
                });
            } else {
                _check_notification.each(function() {
                    $(this).prop('checked', false);
                    var _index = _checkedArr.indexOf($(this).val());
                    if(_index !== -1) {
                        _checkedArr.splice(_index, 1);
                    }
                });
                _checkedArr = _.uniq(_checkedArr);
            }
        });
        _check_notification.click(function() {
            _check_all_notification.prop('checked', false);
            if($(this).prop('checked')) {
                _checkedArr.push($(this).val());
            } else {
                var _index = _checkedArr.indexOf($(this).val());
                if(_index !== -1) {
                    _checkedArr.splice(_index, 1);
                }
            }
        });

        $('.js_check_all_notifications ').change(function() {
            if($(this).prop('checked')) {
                $('.js_check_notification.unread').prop('checked', true);
            } else {
                $('.js_check_notification.unread').prop('checked', false);
            }
        });

        $('.js_select2').select2({});

        $('.js_input_profile_file').change(function() {
            readURL(this);
        });

        $('.js_panel_title.unread').click(function() {
            var _this            = $(this);
            var _notification_id = $(this).data('notification_id');

            var _obj = {
                status:'read'
            };
            ApiUtil.makeAjaxRequest('/api/notifications/' + _notification_id, '', 'PUT', '', _obj, function(_res) {
                if(!_res.error && _res.data) {
                    //window.location.href = '/notifications';
                    //alert('message read');
                } else {
                    alert(_res.message || 'Something went wrong!');
                }
            });
        });

        $('.js_panel_title').click(function() {
            var _this            = $(this);
            var _parent          = $(this).closest('.js_main_card_sec');
            var _swiperContainer = _parent.find('.swiper-container');
            var _swiperData      = _swiperContainer.data('swiper');

            if(!_this.hasClass('collapsed')) {
                _parent.find('.js_panel_title').addClass('read');

            } else {
                _parent.find('.js_more_btn_link').removeClass('hide');
                _parent.find('.js_open_card').addClass('hide');
                _parent.find('.js_reopen_card').addClass('hide');
                _parent.find('.js_total_application_txt').addClass('application');
            }
        });

    }

    return {
        init:function() {
            bindCommonClickEvents();
        }
    }
}

module.exports = NotificationHandler();