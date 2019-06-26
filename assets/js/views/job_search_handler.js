var ApiUtil           = require('../utils/apiUtil');
var FormValidator     = require('../utils/formValidator');
var utils             = require('../utils/common');
var HandlebarsHelpers = require('../utils/handlebar_helpers');

function JobSearchHandler() {
    var _job_list_wrap = $('.js_job_list_wrap');
    var _query         = {};
    var _jobTypeArr    = [];

    function searchJobs() {

        if(_jobTypeArr.length) {
            _query.job_type = _jobTypeArr;
        }
        var callback = function(resData) {
            if(!resData.error) {
                var _res_found = resData.data.length;
                var _html      = Handlebars.partials['job_search_card']({
                    data:resData.data.result
                });
                _job_list_wrap.html(_html);
            }
        };
        ApiUtil.makeAjaxRequest('/api/qa-jobs/search', '', 'POST', '', _query, callback);
    }

    function bindClickEvents() {
        $('.js_select2').select2({});

        $('.js_search_input').on('keyup', function(e) {
            var _val = $(this).val();
            if(_val) {
                _query.query = _val;
                searchJobs();
            } else {
                delete _query.query;
            }
        });

        $('.js_job_type_checkbox').click(function() {
            var _this = $(this);
            if(_this.prop('checked')) {
                _jobTypeArr.push(_this.data('val'))
            } else {
                var index = _jobTypeArr.indexOf(_this.data('val'));
                if(index > -1) {
                    _jobTypeArr.splice(index, 1);
                }
            }
            searchJobs();
        });
    }

    return {
        init:function() {
            bindClickEvents();
        }
    }
}

module.exports = JobSearchHandler();