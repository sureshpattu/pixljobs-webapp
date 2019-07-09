var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');

function ApplicantAppHandler() {

    function bindCommonClickEvents() {

        var applications_list_wrap = $('.applications_list_wrap'),
            _query         = {
                page :0,
                limit:10
            },
            _notifyTypeArr    = [];

        function loadMoreApplications() {
            if(_notifyTypeArr.length) {
                _query.job_type = _notifyTypeArr;
            }
            _query.page = _query.page + 1;
            _query.applicant_id = $('.js_data_id').val();

            var callback = function(resData) {
                if(!resData.error) {
                    var _length = resData.data.result.length;

                    if(_length) {
                        var _html = Handlebars.partials['job_application']({
                            data:resData.data.result
                        });
                        applications_list_wrap.append(_html);
                    }

                    if(resData.data.pages >= (_query.page + 1)) {
                        $('.js_load_more_btn').addClass('hide');
                    } else {
                        $('.js_load_more_btn').removeClass('hide');
                    }

                }
            };
            ApiUtil.makeAjaxRequest('/api/job-applications/search', '', 'POST', '', _query, callback);
        }


        $('.js_load_more_btn').click(function() {
            loadMoreApplications();
        });

    }

    return {
        init:function() {
            bindCommonClickEvents();
        }
    }
}

module.exports = ApplicantAppHandler();