'use strict';

const express = require('express');
const router = express.Router();
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

router.post('/applicant', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/applicant', function(_response) {
        res.json(_response);
    });
});

//Recruiters APIs
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

router.post('/recruit', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/recruit', function(_response) {
        res.json(_response);
    });
});

router.post('/applicant', function(req, res, next) {
    helper_utils.makeApiRequest(req, 'POST', '/applicant', function(_response) {
        setUserCookies(_response, res);
    });
});


module.exports = router;
