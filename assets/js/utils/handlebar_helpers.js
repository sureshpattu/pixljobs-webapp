var moment = require('moment');
var _      = require('underscore');

Handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
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
});

Handlebars.registerHelper('checkIndexOf', function(arr, v1, options) {
    if(arr) {
        if(arr.length) {
            if(arr.indexOf(v1) > -1) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    }
});

Handlebars.registerHelper('counter', function(start, limit, block) {
    var accum = '';
    var i;

    for(i = start; i <= limit; ++i) {
        accum = accum + block.fn(i);
    }

    return accum;
});
Handlebars.registerHelper('counterReverse', function(start, end, block) {
    var accum = '';
    var i;

    for(i = start; i >= end; --i) {
        accum = accum + block.fn(i);
    }

    return accum;
});

Handlebars.registerHelper('countFullStar', function(rating) {
    rating       = parseFloat(rating);
    var fraction = rating - Math.floor(rating);

    return fraction <= 0.5 ? Math.floor(rating) : Math.ceil(rating);
});

Handlebars.registerHelper('countHalfStar', function(rating) {
    rating       = parseFloat(rating);
    var fraction = rating - Math.floor(rating);

    return fraction <= 0.5 && fraction > 0 ? 1 : 0;
});

Handlebars.registerHelper('countEmptyStar', function(rating) {
    var fraction = rating - Math.floor(rating);

    return fraction <= 0.5 && fraction > 0 ? 4 - Math.floor(rating) : 5 - Math.ceil(rating);
});

Handlebars.registerHelper('truncateText', function(text, max) {
    if(text) {
        max = Number(max);
        if(text.length > max)
            return text.substring(0, max) + '...';
        else
            return text;
    } else
        return '';

});

Handlebars.registerHelper('removeSpaceAndLink', function(text) {
    text = text.split(' ');
    text = text.join('_').toLocaleLowerCase();
    return text;
});

Handlebars.registerHelper('removeSpaceAndLinkByHyphen', function(text) {
    text = text.split(' ');
    text = text.join('-').toLocaleLowerCase();
    return text;
});

Handlebars.registerHelper('inc', function(value, options) {
    return parseInt(value) + 1;
});

Handlebars.registerHelper('checkIndexOf', function(arr, v1, options) {
    if(arr) {
        if(arr.length) {
            if(arr.indexOf(v1) > -1) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    }
});

Handlebars.registerHelper('formatDate', function(dateString, format) {
    if(dateString && format) {
        return moment(dateString).format(format)
    } else {
        return ''
    }
});

Handlebars.registerHelper('cleanString', function(text) {
    if(text) {
        text = text.toString();
        text = text.split(' ');
        text = text.join('_').toLocaleLowerCase();
    }
    return text;
});

Handlebars.registerHelper('cleanStringForUrl', function(_str) {
    if(_str) {
        _str = _str.replace(/\s/g, '-');
    }
    return (_str);
});

Handlebars.registerHelper('countDateTime', function(dateString) {
    if(dateString) {
        return moment(dateString, 'YYYYMMDD').fromNow();
    } else {
        return ''
    }
});

Handlebars.registerHelper('ifDateDiff', function(date1, _diff, options) {
    if(date1) {
        var a = moment(date1);
        var b = moment(new Date());
        return (b.diff(a, 'days') <= _diff) ? options.fn(this) : options.inverse(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('checkArrayOfObjectVal', function(_id, arr, options) {
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
});

Handlebars.registerHelper('getFileExtension', function(filename) {
    if(filename) {
        var _split = filename.split('.');
        return _split[1];
    } else {
        return '';
    }
});

Handlebars.registerHelper('truncateTextSpace', function(text, max) {
    if(text) {
        text = text.replace(/\s/g, '');
        max  = Number(max);
        if(text.length > max)
            return text.substring(0, max);
        else
            return text;
    } else {
        return '';
    }
});

Handlebars.registerHelper('truncateMsgTitle', function(text, max) {
    if(text) {
        var regex_1    = /- PUBLISHED/i;
        var regex_2    = /- UNPUBLISHED/i;
        var regex_3    = /- REJECTED/i;
        var _splitTxt  = [];
        var _searchTxt = '';

        if(regex_1.test(text)) {
            _searchTxt = '- PUBLISHED';
        } else if(regex_2.test(text)) {
            _searchTxt = '- UNPUBLISHED';
        } else if(regex_3.test(text)) {
            _searchTxt = '- REJECTED';
        }

        _splitTxt = text.split(_searchTxt);

        max = Number(max);
        if(_splitTxt[0].length > max)
            return _splitTxt[0].substring(0, max) + '... ' + _searchTxt;
        else
            return text;

    } else {
        return '';
    }
});

Handlebars.registerHelper('counter', function(start, end, block) {
    var accum = '';
    var i;

    for(i = start; i <= end; i++) {
        accum = accum + block.fn(i);
    }

    return accum;
});

Handlebars.registerHelper('formatCurrency', function(amount) {
    if(amount) {
        return (amount).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    } else {
        return '0';
    }
});