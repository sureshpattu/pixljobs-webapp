const express      = require('express');
const router       = express.Router();
const verify       = require('../config/verify');
const async        = require('async');
const helper_utils = require('./util/common');

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/logout', function(req, res) {
    res.clearCookie('pixljob_user_id');
    res.clearCookie('pixljob_user_token');
    res.redirect('/login');
});

router.get('/register', function(req, res) {
    res.render('register');
});

router.get('/form-template', function(req, res) {
    res.render('form_template');
});

router.get('/forgot-password', function(req, res) {
    res.render('forgot_password');
});

router.get('/reset-password', function(req, res) {
    res.render('reset_password');
});

router.get('/job-applicant-one', function(req, res) {
    res.render('job_applicant_one');
});

router.get('/exp-account', function(req, res) {
    res.render('experience_account');
});

//Applicant routes ----------------------------------------------------------------------------------------------------
router.get('/sign-up/applicant', function(req, res) {
    res.render('sign_up_applicant');
});

router.get('/applicant/forgot/password/:token', function(req, res) {
    req.body.reset_token = req.params.token;
    helper_utils.makeApiRequest(req, 'POST', '/applicant-auth/forgot/password/token', function(_response) {
        if(_response.error) {
            res.render('login');
        } else {
            res.render('reset_password', {user_id:_response.data.id});
        }

    });
});

router.get('/applicant/email/verify/:token', function(req, res) {
    req.email_token = req.params.token;
    helper_utils.makeApiRequest(req, 'POST', '/applicant-auth/verify/email/token', function(_response) {
        var is_email_verified = false;
        if(!_response.error && _response.data) {
            is_email_verified = _response.data.is_email_verified;
        }
        res.render('login', {
            is_email_verified:is_email_verified
        });

    });
});
router.get('/', function(req, res) {
    async.parallel([
        function(callback) {
            req.body.user_id = req.cookies.pixljob_user_id;
            req.body.token   = req.cookies.pixljob_user_token;
            helper_utils.makeApiRequest(req, 'POST', '/auth/user', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'POST', '/jobs/search', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/categories', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/jobs/count/job-type', function(_res) {
                callback(null, _res);
            });
        }
    ], function(err, results) {
        res.render('search', {
            user          :!results[0].error ? results[0].data : null,
            data          :!results[1].error ? results[1].data : [],
            categories    :!results[2].error ? results[2].data : [],
            job_type_count:!results[3].error ? results[3].data : []
        });
    });
});

router.get('/applicant-account', verify.isApplicantLoggedIn, function(req, res) {
    async.parallel([
        function(callback) {
            req.body.user_id = req.cookies.pixljob_user_id;
            req.body.token   = req.cookies.pixljob_user_token;
            helper_utils.makeApiRequest(req, 'POST', '/auth/user', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/applicant/' + req.cookies.pixljob_user_id,
                function(_res) {
                    callback(null, _res);
                });
        }
    ], function(err, results) {
        let is_experience = false;
        if(results[0] && results[0].data && (results[0].data.exp_year > 0 || results[0].data.exp_month > 0)) {
            is_experience = true;
        }
        res.render('applicant_account', {
            user:!results[0].error ? results[0].data : [],
            data:!results[1].error ? results[1].data : [],
            exp :is_experience
        });
    });
});

router.get('/applicant/applications', verify.isApplicantLoggedIn, function(req, res) {
    async.parallel([
        function(callback) {
            req.body.user_id = req.cookies.pixljob_user_id;
            req.body.token   = req.cookies.pixljob_user_token;
            helper_utils.makeApiRequest(req, 'POST', '/auth/user', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/applicant/' + req.cookies.pixljob_user_id, function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            req.body.applicant_id = req.cookies.pixljob_user_id;
            helper_utils.makeApiRequest(req, 'POST', '/job-applications/search', function(_res) {
                callback(null, _res);
            });
        }
    ], function(err, results) {
        res.render('applicant_applications', {
            user        :!results[0].error ? results[0].data : [],
            data        :!results[1].error ? results[1].data : [],
            applications:!results[2].error ? results[2].data : []
        });
    });
});

router.get('/job-info/:id', function(req, res) {
    async.parallel([
        function(callback) {
            req.body.user_id = req.cookies.pixljob_user_id;
            req.body.token   = req.cookies.pixljob_user_token;
            helper_utils.makeApiRequest(req, 'POST', '/auth/user', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/jobs/' + req.params.id, function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            req.body.applicant_id = req.cookies.pixljob_user_id;
            req.body.job_id       = req.params.id;
            helper_utils.makeApiRequest(req, 'POST', '/job-applications/check', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            req.body.limit = 3;
            helper_utils.makeApiRequest(req, 'POST', '/jobs/search', function(_res) {
                callback(null, _res);
            });
        }
    ], function(err, results) {
        res.render('job_info', {
            user        :!results[0].error ? results[0].data : [],
            data        :!results[1].error ? results[1].data : [],
            is_applied  :!results[2].error ? (!!results[2].data) : false,
            similar_jobs:!results[3].error ? results[3].data : false,
            applicant_id:req.cookies.pixljob_user_id,
            job_id      :req.params.id
        });
    });
});

//recruiter routes ----------------------------------------------------------------------------------------------------
router.get('/sign-up/recruiter', function(req, res) {
    async.parallel([
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/industries', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/benefits', function(_res) {
                callback(null, _res);
            });
        }
    ], function(err, results) {
        res.render('sign_up_recruiter', {
            industries:!results[0].error ? results[0].data : [],
            benefits  :!results[1].error ? results[1].data : []
        });
    });
});

router.get('/recruiter/email/verify/:token', function(req, res) {
    req.email_token = req.params.token;
    helper_utils.makeApiRequest(req, 'POST', '/recruiter-auth/verify/email/token', function(_response) {
        var is_email_verified = false;
        if(!_response.error && _response.data) {
            is_email_verified = _response.data.is_email_verified;
        }
        res.render('login', {
            is_email_verified:is_email_verified
        });
    });
});

router.get('/recruiter/forgot/password/:token', function(req, res) {
    req.body.reset_token = req.params.token;
    helper_utils.makeApiRequest(req, 'POST', '/recruiter-auth/forgot/password/token', function(_response) {
        if(_response.error) {
            res.render('login');
        } else {
            res.render('reset_password', {user_id:_response.data.id});
        }

    });
});

router.get('/recruiter', verify.isRecruiterLoggedIn, function(req, res) {
    async.parallel([
        function(callback) {
            req.body.user_id = req.cookies.pixljob_user_id;
            req.body.token   = req.cookies.pixljob_user_token;
            helper_utils.makeApiRequest(req, 'POST', '/auth/user', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/recruiter/fetch-full/' + req.cookies.pixljob_user_id,
                function(_res) {
                    callback(null, _res);
                });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/industries', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/benefits', function(_res) {
                callback(null, _res);
            });
        }
    ], function(err, results) {
        var _companies = [];
        if(results[0] && !results[0].error && results[0].data) {
            _companies = results[0].data.companies;
        }
        res.render('recruiter_profile', {
            companies :_companies,
            user      :!results[0].error ? results[0].data : [],
            data      :!results[1].error ? results[1].data : [],
            industries:!results[2].error ? results[2].data : [],
            benefits  :!results[3].error ? results[3].data : [],
            user_id   :req.cookies.pixljob_user_id
        });
    });
});

router.get('/post-job', verify.isRecruiterLoggedIn, function(req, res) {
    async.parallel([
        function(callback) {
            req.body.user_id = req.cookies.pixljob_user_id;
            req.body.token   = req.cookies.pixljob_user_token;
            helper_utils.makeApiRequest(req, 'POST', '/auth/user', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/categories', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/requirements', function(_res) {
                callback(null, _res);
            });
        }
    ], function(err, results) {
        res.render('post_job_work', {
            user        :!results[0].error ? results[0].data : [],
            categories  :!results[1].error ? results[1].data : [],
            requirements:!results[2].error ? results[2].data : [],
            recruiter_id:req.cookies.pixljob_user_id
        });
    });
});

router.get('/post-job-edit/:id', verify.isRecruiterLoggedIn, function(req, res) {
    async.parallel([
        function(callback) {
            req.body.user_id = req.cookies.pixljob_user_id;
            req.body.token   = req.cookies.pixljob_user_token;
            helper_utils.makeApiRequest(req, 'POST', '/auth/user', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/categories', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/qa-jobs/' + req.params.id, function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/requirements', function(_res) {
                callback(null, _res);
            });
        }
    ], function(err, results) {
        res.render('post_job_work_edit', {
            user        :!results[0].error ? results[0].data : [],
            categories  :!results[1].error ? results[1].data : [],
            data        :!results[2].error ? results[2].data : [],
            requirements:!results[3].error ? results[3].data : [],
            recruiter_id:req.cookies.pixljob_user_id,
            job_id      :req.params.id
        });
    });
});

router.get('/post-job/info/:id', verify.isRecruiterLoggedIn, function(req, res) {
    async.parallel([
        function(callback) {
            req.body.user_id = req.cookies.pixljob_user_id;
            req.body.token   = req.cookies.pixljob_user_token;
            helper_utils.makeApiRequest(req, 'POST', '/auth/user', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/technologies', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/qa-jobs/' + req.params.id, function(_res) {
                callback(null, _res);
            });
        }
    ], function(err, results) {
        res.render('post_job_info', {
            user        :!results[0].error ? results[0].data : [],
            technologies:!results[1].error ? results[1].data : [],
            job_data    :!results[2].error ? results[2].data : [],
            job_id      :req.params.id
        });
    });
});

router.get('/post-job/company/:id', verify.isRecruiterLoggedIn, function(req, res) {
    async.parallel([
        function(callback) {
            req.body.user_id = req.cookies.pixljob_user_id;
            req.body.token   = req.cookies.pixljob_user_token;
            helper_utils.makeApiRequest(req, 'POST', '/auth/user', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/recruiter/fetch-full/' + req.cookies.pixljob_user_id,
                function(_res) {
                    callback(null, _res);
                });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/industries', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/benefits', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/qa-jobs/' + req.params.id, function(_res) {
                callback(null, _res);
            });
        }
    ], function(err, results) {
        var _companies = [];
        if(results[1] && !results[1].error && results[1].data) {
            _companies = results[1].data.companies;
        }
        res.render('post_job_company', {
            companies :_companies,
            user      :!results[0].error ? results[0].data : [],
            industries:!results[2].error ? results[2].data : [],
            benefits  :!results[3].error ? results[3].data : [],
            job_data  :!results[4].error ? results[4].data : [],
            job_id    :req.params.id,
            user_id   :req.cookies.pixljob_user_id
        });
    });
});

router.get('/recruiter/applications', verify.isRecruiterLoggedIn, function(req, res) {
    async.parallel([
        function(callback) {
            req.body.user_id = req.cookies.pixljob_user_id;
            req.body.token   = req.cookies.pixljob_user_token;
            helper_utils.makeApiRequest(req, 'POST', '/auth/user', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/recruiter/fetch-full/' + req.cookies.pixljob_user_id,
                function(_res) {
                    callback(null, _res);
                });
        },
        function(callback) {
            req.body.recruiter_id = req.cookies.pixljob_user_id;
            helper_utils.makeApiRequest(req, 'POST', '/jobs/recruiter/search',
                function(_res) {
                    callback(null, _res);
                });
        }
    ], function(err, results) {
        var _companies = [];
        if(results[1] && !results[1].error && results[1].data) {
            _companies = results[1].data.companies;
        }

        let is_experience = false;
        if(results[0] && results[0].data && (results[0].data.exp_year > 0 || results[0].data.exp_month > 0)) {
            is_experience = true;
        }
        res.render('job_recruiter', {
            companies:_companies,
            user     :!results[0].error ? results[0].data : [],
            data     :!results[1].error ? results[1].data : [],
            jobs     :!results[2].error ? results[2].data : [],
            exp      :is_experience
        });
    });
});

router.get('/recruiter/companies', verify.isRecruiterLoggedIn, function(req, res) {
    async.parallel([
        function(callback) {
            req.body.user_id = req.cookies.pixljob_user_id;
            req.body.token   = req.cookies.pixljob_user_token;
            helper_utils.makeApiRequest(req, 'POST', '/auth/user', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/recruiter/fetch-full/' + req.cookies.pixljob_user_id,
                function(_res) {
                    callback(null, _res);
                });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/industries', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            helper_utils.makeApiRequest(req, 'GET', '/benefits', function(_res) {
                callback(null, _res);
            });
        }
    ], function(err, results) {
        res.render('companies', {
            user      :!results[0].error ? results[0].data : [],
            data      :!results[1].error ? results[1].data : [],
            industries:!results[2].error ? results[2].data : [],
            benefits  :!results[3].error ? results[3].data : []
        });
    });
});

router.get('/recruiter/notification', verify.isRecruiterLoggedIn, function(req, res) {
    async.parallel([
        function(callback) {
            req.body.user_id = req.cookies.pixljob_user_id;
            req.body.token   = req.cookies.pixljob_user_token;
            helper_utils.makeApiRequest(req, 'POST', '/auth/user', function(_res) {
                callback(null, _res);
            });
        },
        function(callback) {
            req.body.recruiter_id = req.cookies.pixljob_user_id;
            helper_utils.makeApiRequest(req, 'POST', '/notifications/fetchAll',
                function(_res) {
                    callback(null, _res);
                });
        }
    ], function(err, results) {
        var _companies = [];
        if(results[1] && !results[1].error && results[1].data) {
            _companies = results[1].data.companies;
        }
        res.render('notifications', {
            companies:_companies,
            user     :!results[0].error ? results[0].data : [],
            data     :!results[1].error ? results[1].data : []
        });
    });
});

router.get('/recruiter/change-password', function(req, res) {
    async.parallel([
        function(callback) {
            req.body.user_id = req.cookies.pixljob_user_id;
            req.body.token   = req.cookies.pixljob_user_token;
            helper_utils.makeApiRequest(req, 'POST', '/auth/user', function(_res) {
                callback(null, _res);
            });
        }
    ], function(err, results) {
        res.render('recruiter_change_password', {
            user   :!results[0].error ? results[0].data : null,
            user_id:req.cookies.pixljob_user_id
        });
    });
});

router.get('/recruiter/change-email', function(req, res) {
    res.render('recruiter_change_email');
});

router.get('/applicant/preferences', function(req, res) {
    async.parallel([
        function(callback) {
            req.body.user_id = req.cookies.pixljob_user_id;
            req.body.token   = req.cookies.pixljob_user_token;
            helper_utils.makeApiRequest(req, 'POST', '/auth/user', function(_res) {
                callback(null, _res);
            });
        }
    ], function(err, results) {
        res.render('applicant_preferences', {
            user:!results[0].error ? results[0].data : null
        });
    });
});

router.get('/applicant/change-password', function(req, res) {
    async.parallel([
        function(callback) {
            req.body.user_id = req.cookies.pixljob_user_id;
            req.body.token   = req.cookies.pixljob_user_token;
            helper_utils.makeApiRequest(req, 'POST', '/auth/user', function(_res) {
                callback(null, _res);
            });
        }
    ], function(err, results) {
        res.render('applicant_change_password', {
            user   :!results[0].error ? results[0].data : null,
            user_id:req.cookies.pixljob_user_id
        });
    });
});

router.get('/applicant/change-email', function(req, res) {
    res.render('applicant_change_email');
});

module.exports = router;
