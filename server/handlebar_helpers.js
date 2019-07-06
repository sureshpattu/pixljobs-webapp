'use strict';

const moment = require('moment');
const _      = require('underscore');

exports.ifCond = function(v1, operator, v2, options) {
    switch(operator) {
        case '==':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
};
exports.inc    = function(value, options) {
    return parseInt(value) + 1;
};

exports.checkIndexOf = function(arr, v1, options) {
    if(arr) {
        if(arr.length) {
            if(arr.indexOf(v1) > -1) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    }
};

exports.truncateText = function(text, max) {
    if(text) {
        max = Number(max);
        if(text.length > max)
            return text.substring(0, max) + '...';
        else
            return text;
    } else {
        return '';
    }
};

exports.formatDate = function(dateString, format) {
    if(dateString && format) {
        return moment(dateString).format(format)
    } else {
        return ''
    }
};

exports.formatCommentDate = function(d) {
    let hour24 = d.getHours() % 12;
    let hour   = (hour24 === 0) ? 12 : hour24;
    let date   = d.getDate();
    let month  = d.getMonth() + 1;
    let year   = d.getFullYear();
    let minute = d.getMinutes();
    let second = d.getSeconds();
    return date + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
};

exports.counterReverse = function(start, end, block) {
    var accum = '';
    var i;

    for(i = start; i >= end; --i) {
        accum = accum + block.fn(i);
    }

    return accum;
};

exports.countDateTime = function(dateString) {
    if(dateString) {
        return moment(dateString, 'YYYYMMDD').fromNow();
    } else {
        return ''
    }
};

exports.checkArrayOfObjectVal = function(_id, arr, options) {
    if(_id && arr && arr.length) {
        var isPresent = false;
        for(var i = 0; i < arr.length; i++) {
            _.mapObject(arr[i], function(val, key) {
                if(_id === val) {
                    isPresent = true;
                }
            });
        }
        return isPresent ? options.fn(this) : options.inverse(this);
    } else {
        return options.inverse(this);
    }
};

exports.getFileExtension = function(filename) {
    if(filename) {
        var _split = filename.split('.');
        return _split[1];
    } else {
        return '';
    }
};

exports.truncateTextSpace = function(text, max) {
    if(text) {
        text = text.replace(/\s/g, '');
        max  = Number(max);
        if(text.length > max)
            return text.substring(0, max) + '...';
        else
            return text;
    } else {
        return '';
    }
};