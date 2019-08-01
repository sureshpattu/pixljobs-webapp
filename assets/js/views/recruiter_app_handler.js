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

        $('.js_match_height').matchHeight({byRow:true});

        $('.js_close_job_btn').click(function() {
            var _this              = $(this);
            var _parent            = _this.closest('.js_main_card_sec');
            var _reopen_job_btn    = _parent.find('.js_reopen_job_btn');
            var _open_close_status = _parent.find('.js_open_close_status');
            var _obj               = {
                action:'closed'
            };

            ApiUtil.makeAjaxRequest(
                '/api/recruiter/job/action/' + _parent.data('qa_job_id') + '/' + _parent.data('job_id'),
                '',
                'POST',
                '', _obj,
                function(_res) {
                    if(!_res.error) {
                        _this.addClass('hide');
                        _reopen_job_btn.removeClass('hide');

                        _open_close_status.removeClass('open');
                        _open_close_status.find('span').html('CLOSED');
                    } else {
                        alert(_res.error || 'something went wrong!');
                    }
                });

        });

        $('.js_reopen_job_btn').click(function() {
            var _this              = $(this);
            var _parent            = _this.closest('.js_main_card_sec');
            var _close_job_btn     = _parent.find('.js_close_job_btn');
            var _open_close_status = _parent.find('.js_open_close_status');

            var _obj = {
                action:'open'
            };

            ApiUtil.makeAjaxRequest(
                '/api/recruiter/job/action/' + _parent.data('qa_job_id') + '/' + _parent.data('job_id'),
                '',
                'POST',
                '', _obj,
                function(_res) {
                    if(!_res.error) {
                        _this.addClass('hide');
                        _close_job_btn.removeClass('hide');

                        _open_close_status.addClass('open');
                        _open_close_status.find('span').html('OPEN');
                    } else {
                        alert(_res.error || 'something went wrong!');
                    }
                });
        });

        $('.js_panel_title').click(function() {
            var _this   = $(this);
            var _parent = $(this).closest('.js_main_card_sec');

            $('.js_match_height').matchHeight({remove:true});
            $('.js_match_height').matchHeight({byRow:true});
            $.fn.matchHeight._update();
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