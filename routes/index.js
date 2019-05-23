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

router.get('/search', function(req, res) {
    res.render('search');
});

router.get('/post/job_work', function(req, res) {
    res.render('postjob_work');
});

router.get('/post/job_company', function(req, res) {
    res.render('postjob_company');
});

router.get('/post/job_info', function(req, res) {
    res.render('postjob_info');
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

router.get('/signup-recruiter', function(req, res) {
    res.render('signup_recruiter');
});

router.get('/signup-fresh', function(req, res) {
    res.render('signup_fresh');
});

router.get('/signup-exp', function(req, res) {
    res.render('signup_exp');
});

router.get('/fresher-account', function(req, res) {
    res.render('fresher_account');
});

router.get('/exp-account', function(req, res) {
    res.render('experience_account');
});

router.get('/recruiter-profile', function(req, res) {
    res.render('recruiter_profile');
});

router.get('/job-info', function(req, res) {
    res.render('job_info');
});

router.get('/form-template', function(req, res) {
    res.render('form_template');
});

module.exports = router;
