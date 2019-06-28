'use strict';

const express      = require('express');
const router       = express.Router();
const helper_utils = require('./util/common');

function setUserCookies(_response, res) {
    if(_response && !_response.error && _response.data) {
        res.clearCookie('pixljob_user_id');
        res.clearCookie('pixljob_user_token');
        res.cookie('pixljob_user_id', _response.data.id, {maxAge:30 * 24 * 60 * 60 * 1000});
        res.cookie('pixljob_user_token', _response.data.token, {maxAge:30 * 24 * 60 * 60 * 1000});
        res.json(_response);
    } else {
        res.json(_response);
    }
}

//applicants APIs
router.post('/applicant-auth/register', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/applicant-auth/register', function(_response) {
        setUserCookies(_response, res);
    });
});

router.post('/applicant-auth/login', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/applicant-auth/login', function(_response) {
        setUserCookies(_response, res);
    });
});

router.post('/applicant-auth/forgot/password', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/applicant-auth/forgot/password', function(_response) {
        res.json(_response);
    });
});

router.post('/applicant-auth/forgot/password/token', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/applicant-auth/forgot/password/token', function(_response) {
        res.json(_response);
    });
});

router.post('/applicant', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/applicant/' + req.cookies.pixljob_user_id, function(_response) {
        res.json(_response);
    });
});

router.put('/applicant', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'PUT', '/applicant/' + req.cookies.pixljob_user_id, function(_response) {
        res.json(_response);
    });
});

router.post('/applicant/photo/upload', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'IMAGE-UPLOAD', '/applicant/photo/upload', function(_response) {
        res.json(_response);
    });
});

router.get('/applicant/photo/:image', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'IMAGE', '/applicant/photo/' + req.params.image, '', res);
});

//Recruiters APIs-----------------------------------------------------------------------------------------------------
router.post('/recruiter-auth/register', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/recruiter-auth/register', function(_response) {
        setUserCookies(_response, res);
    });
});

router.post('/recruiter-auth/login', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/recruiter-auth/login', function(_response) {
        setUserCookies(_response, res);
    });
});

router.post('/recruiter-auth/forgot/password', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/recruiter-auth/forgot/password', function(_response) {
        res.json(_response);
    });
});

router.post('/recruiter-auth/forgot/password/token', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/recruiter-auth/forgot/password/token', function(_response) {
        res.json(_response);
    });
});

router.post('/recruiter', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/recruiter/' + req.cookies.pixljob_user_id, function(_response) {
        res.json(_response);
    });
});

router.put('/recruiter/:id', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'PUT', '/recruiter/' + req.params.id, function(_response) {
        res.json(_response);
    });
});

router.post('/recruiter/photo/upload', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'IMAGE-UPLOAD', '/recruiter/photo/upload', function(_response) {
        res.json(_response);
    });
});

router.get('/recruiter/photo/:image', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'IMAGE', '/recruiter/photo/' + req.params.image, '', res);
});

router.post('/companies', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/companies', function(_response) {
        res.json(_response);
    });
});

router.put('/companies', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'PUT', '/companies/' + req.cookies.pixljob_user_id, function(_response) {
        res.json(_response);
    });
});

router.post('/benefits', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/benefits', function(_response) {
        res.json(_response);
    });
});

router.put('/benefits', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'PUT', '/benefits/' + req.cookies.pixljob_user_id, function(_response) {
        res.json(_response);
    });
});

router.post('/qa-jobs', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/qa-jobs', function(_response) {
        res.json(_response);
    });
});

router.post('/qa-jobs/search', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/qa-jobs/search', function(_response) {
        res.json(_response);
    });
});

router.put('/qa-jobs/:id', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'PUT', '/qa-jobs/' + req.params.id, function(_response) {
        res.json(_response);
    });
});

router.post('/qa-job/technologies', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/qa-job/technologies', function(_response) {
        res.json(_response);
    });
});

router.post('/qa-job/categories', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/qa-job/categories', function(_response) {
        res.json(_response);
    });
});

router.post('/job-applications', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/job-applications', function(_response) {
        res.json(_response);
    });
});

router.post('/job-applications/check', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/job-applications/check', function(_response) {
        res.json(_response);
    });
});

router.get('/job-applications/:id', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'GET', '/job-applications/' + req.params.id, function(_response) {
        res.json(_response);
    });
});

router.post('/requirements', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/requirements', function(_response) {
        res.json(_response);
    });
});

router.put('/requirements', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'PUT', '/requirements/' + req.cookies.pixljob_user_id, function(_response) {
        res.json(_response);
    });
});

module.exports = router;
