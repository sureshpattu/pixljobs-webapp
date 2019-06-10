'use strict';

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

module.exports = function(router) {
    router.post('/api/auth/register', function(req, res, next) {
        helper_utils.makeApiRequest(req, 'POST', '/auth/register', function(_response) {
            setUserCookies(_response, res);
        });
    });

    router.post('/api/auth/login', function(req, res, next) {
        helper_utils.makeApiRequest(req, 'POST', '/auth/login', function(_response) {
            setUserCookies(_response, res);
        });
    });

    router.post('/api/recruit', function(req, res, next) {
        helper_utils.makeApiRequest(req, 'POST', '/recruit', function(_response) {
            setUserCookies(_response, res);
        });
    });

    router.post('/api/conditions-file/image-upload/:id', function(req, res, next) {
        helper_utils.makeApiRequest(req, 'IMAGE-UPLOAD', '/conditions-file/image-upload/' + req.params.id,
            function(_response) {
                res.json(_response);
            });
    });

    router.get('/cdn/img/conditions/photo/:image', function(req, res, next) {
        helper_utils.makeApiRequest(req, 'IMAGE', '/conditions-file/photo/' + req.params.image, '', res);
    });
};