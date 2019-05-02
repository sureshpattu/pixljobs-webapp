'use strict';

const helper_utils = require('../routes/util/common');

function checkLogin(req, cb) {
    if(req.cookies && req.cookies.med_cond_user_token && req.cookies.med_cond_user_id) {
        req.body = {
            id   :req.cookies.med_cond_user_id,
            token:req.cookies.med_cond_user_token
        };
        helper_utils.makeApiRequest(req, 'POST', '/auth/login/check', function(_response) {
            cb(_response);
        });
    } else {
        cb({error:true, msg:'User Not Logged in'});
    }
}

exports.clearUserCookie = function(req, res, next) {
    res.clearCookie('med_cond_user_token');
    res.clearCookie('med_cond_user_id');
    next();
};

function clearCookie(req, res) {
    res.clearCookie('med_cond_user_token');
    res.clearCookie('med_cond_user_id');
}

exports.isLoggedIn = function(req, res, next) {
    let userActivateUrlRegx = new RegExp('^\/user\/activate\/[0-9,a-z,A-Z^)]*');
    if(req.path === '/login' ||
        req.path === '/user/login' || userActivateUrlRegx.test(req.path) ||
        req.path === '/logout' || req.path === '/user/checkLogin') {
        next();
    } else {
        checkLogin(req, function(data) {
            if(data.error) {
                clearCookie(req, res);
                res.redirect('/login?ref=' + req.originalUrl);
            } else {
                res.cookie('med_cond_user_token', data.data.token);
                res.cookie('med_cond_user_id', data.data.id);
                next();
            }
        });
    }
};

exports.isSuperAdmin = function(req, res, next) {
    checkLogin(req, function(data) {
        if(data.err) {
            res.redirect('/login?ref=' + req.originalUrl);
        } else {
            if(data.data.user_type === '1') {
                next();
            } else {
                res.redirect('/login?user_permission_error=true&ref=' + req.originalUrl);
            }
        }
    });
};