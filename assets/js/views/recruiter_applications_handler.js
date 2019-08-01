var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');

function RecruiterApplicationsHandler() {

    function shortListCandidate() {
        var application_id = $('.js_application_id').val();
        var _obj           = {
            status:'shortlisted'
        };
        ApiUtil.makeAjaxRequest(
            '/api/job-applications/status/' + application_id, '',
            'POST', '', _obj, function(_res) {
                if(!_res.error) {
                    alert(_res.message);
                } else {
                    alert(_res.message || 'Something went wrong!');
                }
            });

    }

    function bindClickEvents() {

        $('.js_shortlist').click(function() {
            shortListCandidate(this);
        });

    }

    return {
        init:function() {
            bindClickEvents();
        }
    }
}

module.exports = RecruiterApplicationsHandler();