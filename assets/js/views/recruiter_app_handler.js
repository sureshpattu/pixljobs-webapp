var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');

function RecruiterAppHandler() {
    var _query = {
        page :0,
        limit:10
    };

    function loadMoreApplications() {
        _query.page = _query.page + 1;

        var callback = function(resData) {
            if(!resData.error) {
                var _length = resData.data.result.length;

                if(_length) {
                    var _html = Handlebars.partials['applicant_card_row']({
                        data:resData.data.result
                    });
                    $('.js_cards_wrap').append(_html);
                }

                if(resData.data.pages >= (_query.page + 1)) {
                    $('.js_load_more_btn').addClass('hide');
                } else {
                    $('.js_load_more_btn').removeClass('hide');
                }

            }
        };
        ApiUtil.makeAjaxRequest('/api/jobs/search', '', 'POST', '', _query, callback);
    }

    function bindClickEvents() {
        $('.js_load_more_btn').click(function() {
            loadMoreApplications();
        });

        $('.js_more_btn_link').click(function() {
            var _this   = $(this);
            var _parent = $(this).closest('.js_main_card_sec');
            _parent.find('.js_panel_title').trigger('click');
            if(_this.hasClass('collapsed')) {
                _this.removeClass('hide');
            } else {
                _this.addClass('hide');
            }
        });

        $('.js_panel_title').click(function() {
            var _this   = $(this);
            var _parent = $(this).closest('.js_main_card_sec');

            if(!_this.hasClass('collapsed')) {
                _parent.find('.js_more_btn_link').addClass('hide');
                _parent.find('.js_reopen_card').removeClass('hide');
                _parent.find('.js_total_application_txt').removeClass('application');
            } else {
                _parent.find('.js_more_btn_link').removeClass('hide');
                _parent.find('.js_open_card').addClass('hide');
                _parent.find('.js_reopen_card').addClass('hide');
                _parent.find('.js_total_application_txt').addClass('application');
            }

        });

        $('.js_open_card').click(function() {
            var _this   = $(this);
            var _parent = $(this).closest('.js_main_card_sec');
            _parent.find('.js_panel_title').trigger('click');
        });

        $('.js_reopen_card').click(function() {
            var _this   = $(this);
            var _parent = $(this).closest('.js_main_card_sec');
            _parent.find('.js_panel_title').trigger('click');
        });

        $('.js_main_card_sec').each(function(i) {
            var _swiper = new Swiper('.js_applicant_card_swiper_' + i, {
                slidesPerView :2,
                spaceBetween  :18,
                observer      :true,
                observeParents:true,
                navigation    :{
                    nextEl:'.js_applicant_card_swiper_next_' + i,
                    prevEl:'.js_applicant_card_swiper_prev_' + i
                },
                breakpoints   :{
                    767:{
                        slidesPerView:1,
                        spaceBetween :30
                    }
                }
            });
            $('.js_applicant_card_swiper_' + i).data('swiper', _swiper);
        });
    }

    return {
        init:function() {
            bindClickEvents();
        }
    }
}

module.exports = RecruiterAppHandler();