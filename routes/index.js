const express      = require('express');
const router       = express.Router();
const verify       = require('../config/verify');
const async        = require('async');
const helper_utils = require('./util/common');

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/logout', function(req, res) {
    res.clearCookie('med_cond_user_token');
    res.clearCookie('med_cond_user_id');
    res.redirect('/login');
});

router.get('/register', function(req, res) {
    res.render('register');
});

router.get('/', function(req, res) {
    res.render('search');
});

router.get('/post-job', function(req, res) {
    res.render('post_job_work');
});

router.get('/post-job/company', function(req, res) {
    res.render('post_job_company');
});

router.get('/post-job/info', function(req, res) {
    res.render('post_job_info');
});

router.get('/job-applicant-one', function(req, res) {
    res.render('job_applicant_one');
});

router.get('/job-applicant-two', function(req, res) {
    res.render('job_applicant_two');
});

router.get('/job-recruiter', function(req, res) {
    res.render('job_recruiter', {
        data:[{}, {}, {}, {}]
    });
});

router.get('/sign-up/recruiter', function(req, res) {
    res.render('sign_up_recruiter');
});

router.get('/sign-up/applicant', function(req, res) {
    res.render('sign_up_applicant', {
        data:[{}, {}, {}, {}]
    });
});

router.get('/applicant-account', function(req, res) {
    helper_utils.makeApiRequest(req, 'GET', '/applicant/' + req.cookies.pixljob_user_id, function(_response) {
        let is_experience = false;
        if(_response.data.exp_year > 0 || _response.data.exp_month > 0) {
            is_experience = true;
        }
        res.render('applicant_account', {
            data:_response.data,
            exp :is_experience
        });
    });
});

router.get('/exp-account', function(req, res) {
    res.render('experience_account');
});

router.get('/recruiter', function(req, res) {
    helper_utils.makeApiRequest(req, 'GET', '/recruiter/' + req.cookies.pixljob_user_id, function(_response) {
        res.render('recruiter_profile', {
            data:_response.data
        });
    });
});

router.get('/job-info', function(req, res) {
    res.render('job_info');
});

router.get('/form-template', function(req, res) {
    res.render('form_template');
});

router.get('/forgot-password', function(req, res) {
    res.render('forgot_password');
});
module.exports = router;
