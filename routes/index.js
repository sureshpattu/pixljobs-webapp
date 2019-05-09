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

router.get('/postjob_work', function(req, res) {
    res.render('postjob_work');
});

router.get('/postjob_company', function(req, res) {
    res.render('postjob_company');
});

router.get('/postjob_info', function(req, res) {
    res.render('postjob_info');
});

router.get('/job-applicant', function(req, res) {
    res.render('job_applicant');
});

module.exports = router;
