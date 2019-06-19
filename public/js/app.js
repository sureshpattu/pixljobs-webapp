(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
window.PopupPage               = require('./utils/popupHandler');
window.LoginHandler            = require('./views/login_handler');
window.RecruiterHandler        = require('./views/recruiter_handler');
window.ApplicantSignUpHandler  = require('./views/applicant_handler');
window.RecruiterProfileHandler = require('./views/recruiter_profile_handler');
window.PostJobHandler          = require('./views/post_job_handler');
},{"./utils/popupHandler":5,"./views/applicant_handler":6,"./views/login_handler":7,"./views/post_job_handler":8,"./views/recruiter_handler":9,"./views/recruiter_profile_handler":10}],2:[function(require,module,exports){
var qs = require('querystring');

module.exports = {
    makeAjaxRequest:function(url, query, method, dataType, data, callback) {
        if(!url) {
            return false;
        }

        //adding query with url
        url = qs.stringify(query) ? (url + '?' + qs.stringify(query)) : url;

        var reqObj = {
            url     :url,
            method  :method,
            dataType:dataType,
            data    :data,
            success :function(res) {
                if(res.responseText) {
                    callback(JSON.parse(res.responseText));
                } else {
                    callback(res)
                }
            },
            error   :function(err) {
                if(err.responseText) {
                    callback(JSON.parse(err.responseText));
                } else {
                    callback(err)
                }
            }
        };

        //Make ajax request with given details
        $.ajax(reqObj);
    },

    makeFileUploadRequest:function(url, query, method, dataType, data, callback) {
        if(!url) {
            return false;
        }

        //adding query with url
        url = qs.stringify(query) ? (url + '?' + qs.stringify(query)) : url;

        //Make ajax request with given details
        $.ajax({
            url        :url,
            method     :'POST',
            data       :data,
            contentType:false,
            processData:false,
            success    :function(res) {
                if(res.responseText) {
                    callback(JSON.parse(res.responseText));
                } else {
                    callback(res)
                }
            },
            error      :function(err) {
                if(err.responseText) {
                    callback(JSON.parse(err.responseText));
                } else {
                    callback(err)
                }
            }
        });
    }
};
},{"querystring":13}],3:[function(require,module,exports){
exports.clearForm = function(formId) {
    $(formId).find('input').val(' ');
    $(formId).find('select').val(' ');
    $(formId).find('textarea').val(' ');
    $(formId).find('input[type="checkbox"]').removeAttr('checked');
    $(formId).find('input[type="radio"]').removeAttr('checked');
};

exports.getParameterByName = function(name, url) {
    if(!url) url = window.location.href;
    name        = name.replace(/[\[\]]/g, '\\$&');
    var regex   = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if(!results) return null;
    if(!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

exports.showVideo = function(video_id, page_name, class_name) {
    var _popup_html = Handlebars.partials[page_name]();
    PopupPage.init(_popup_html, '', false, '');
    $('.cd-popup-container').addClass(class_name);
};

exports.showLoader = function(text, options, _html) {
    var Html = Handlebars.partials['page_loader']({html:_html, text:text});
    $('body').append(Html).addClass('popup-visible');
};

exports.hideLoader = function() {
    $('#windowLoaderPopup').remove();
    $('body').removeClass('popup-visible');
};


exports.initProfileImageCropper = function(formId, _previewEle, imageId, _cb) {
    var image                = document.getElementById(imageId);
    var cropBoxData;
    var canvasData;
    var cropper;
    var inputElement         = $(formId).find('.js_file_input');
    var submitElement        = $(formId).find('.js_submit_img');
    var closeBtnElement      = $(formId).find('.js_img_popup_close');
    var previewEle           = $(_previewEle).find('.js_upload_icon_cont');
    var previewBackEle       = $(_previewEle).find('.js_img_pre_holder');
    var _input_profile_photo = $(_previewEle).find('.js_input_profile_photo');

    function readURL(input, preview_ele) {
        if(input.files && input.files[0]) {
            var reader    = new FileReader();
            reader.onload = function(e) {
                $(preview_ele).attr('src', e.target.result);
                if(cropper) {
                    cropper.destroy();
                }
                cropper = new Cropper(image, {
                    autoCropArea:0.5,
                    aspectRatio :1 / 1,
                    ready       :function() {
                        cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
                    }
                });
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    inputElement.change(function() {
        if(this.files[0].size < 5580960) {
            readURL(this, $(this).data('preview'));
        } else {
            alert('file must be select less than 5 MB')
        }
    });

    submitElement.off('click').on('click', function() {
        previewEle.addClass('hide');
        closeBtnElement.trigger('click');
        previewBackEle.attr('src', cropper.getCroppedCanvas().toDataURL('image/png'));
        previewBackEle.removeClass('hide');

        if(_cb) {
            _cb();
        }
    })
};

},{}],4:[function(require,module,exports){
module.exports = {
    validateForm: function (formId) {
        var _this = this;
        var status = true;

        function markError(element, errorMsgId) {
            var className = '.' + errorMsgId;
            $(formId).find(className).show();
            element.addClass('error-field');
            status = false;
            return false;
        }

        function unMarkError(element, errorMsgId) {
            var className = '.' + errorMsgId;
            $(formId).find(className).hide();
            element.removeClass('error-field');
        }

        function validateFieldType(fieldType, element, elementVal, errorMsgId) {
            if (typeof _this[fieldType] === 'function') {
                return _this[fieldType](elementVal, element) ? unMarkError(element, errorMsgId) : markError(element, errorMsgId);
            }
            return false;
        }

        $(formId + ' .required').each(function () {
            var element = $(this);
            var elementVal = $(this).val();
            var errorMsgId = element.attr('data-errormsg');
            var validateList = element.attr('data-groupname');
            var isElementsNeedValidation = false;

            if (elementVal === '' && !validateList) {
                markError(element, errorMsgId);
                return;
            }

            $.each(_this.getAllFieldsToValidate(), function (index, value) {
                if (element.hasClass(value)) {
                    isElementsNeedValidation = true;
                    validateFieldType(value, element, elementVal, errorMsgId);
                }
            });

            if (!isElementsNeedValidation) {
                unMarkError(element, errorMsgId);
            }
        });
        return status;
    },

    getAllFieldsToValidate: function () {
        return ['isValidEmail', 'isValidMobileNumber', 'isNumber', 'isLengthOk', 'numberInRange', 'isValidResetPassword', 'isEqualTo', 'isCardNo', 'validateList'];
    },

    isNumber: function (input) {
        return !isNaN(input);
    },

    numberInRange: function (input, element) {
        var inputInt = Number(input);
        var min = $(element).data('min');
        var max = $(element).data('max');
        if (!this.isNumber(input)) {
            return false;
        }
        return inputInt >= min && inputInt <= max;
    },

    isLengthOk: function (input, element) {
        var minLength = element.data('minlength');
        var maxLength = element.prop('maxlength');
        return input.length >= minLength && input.length <= maxLength;
    },

    isValidEmail: function (email) {
        var emailRegex = /^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    },

    isValidUserName: function (userName) {
        userName = userName.trim();
        return userName.length >= 4;
    },

    isValidAmount: function (amount) {
        var amountRegex = /^[1-9]\d+$/;
        return amountRegex.test(amount);
    },

    isValidMobileNumber: function (mobileNumber) {
        var mobileNumberTrimmed = mobileNumber.trim();
        var minlength = 10;
        var specialCharRegex = /^[\w{./\\(),'}:?®©-]+$/;
        var isValidNumber = mobileNumberTrimmed > 0;
        var hasSpecialChars = specialCharRegex.test(mobileNumberTrimmed);
        var isSatisfyLenth = mobileNumberTrimmed.length >= minlength;
        return (isValidNumber && hasSpecialChars && isSatisfyLenth);
    },

    isEqualTo: function (password, element) {
        var equalField = element.data('equalto');
        return $(equalField).val() === password;
    },

    isCardNo: function (input, element) {
        var inputEdited = input.replace(/ /g, '');
        var minLength = element.data('minlength');
        var maxLength = element.prop('maxlength');
        return inputEdited.length >= minLength && inputEdited.length <= maxLength;
    },

    validateList: function (input, element) {
        var groupName = element.data('groupname');
        var status = false;
        $('[name="' + groupName + '"]').each(function () {
            if ($(this).is(':checked')) {
                status = true;
                return;
            }
        });
        return status;
    }
};

},{}],5:[function(require,module,exports){
function PopupPage() {

    function bindClickEvents(_allow_close) {
        //open popup
        $('.cd-popup-trigger').off('click').on('click', function (event) {
            event.preventDefault();
            $('body').addClass('popup-visible');
            $('.cd-popup').addClass('is-visible');
        });

        if (!_allow_close) {
            //close popup
            $('.cd-popup').off('click').on('click', function (event) {
                if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup-close-icon') ||
                    ($(event.target).is('.cd-popup') && !$(".email_sign_up_pop_up").is(":visible"))) {
                    event.preventDefault();
                    $('body').removeClass('popup-visible').css('overflow-y', 'inherit');
                    $(this).removeClass('is-visible');
                    $("#windowPopup").remove();
                }
            });
            //close popup when clicking the esc keyboard button
            $(document).keyup(function (event) {
                if (event.which === '27' && !$(".email_sign_up_pop_up").is(":visible")) {
                    $('body').removeClass('popup-visible').css('overflow-y', 'inherit');
                    $('.cd-popup').removeClass('is-visible');
                    $("#windowPopup").remove();
                }
            });
        }
    }

    return {
        init: function (html, cb, _allow_close, theme) {
            $("#windowPopup").remove();
            var tmpl = Handlebars.partials['popup'];
            $('body').append(tmpl({
                html: html,
                dont_allow_close: _allow_close,
                theme: theme
            })).css('overflow-y', 'hidden');
            bindClickEvents(_allow_close);
            if (cb) {
                cb();
            }
        },
        close: function () {
            $('body').removeClass('popup-visible').css('overflow-y', 'inherit');
            $('.cd-popup').removeClass('is-visible');
            $("#windowPopup").remove();
        }
    }
}

module.exports = PopupPage();

},{}],6:[function(require,module,exports){
var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');

function ApplicantSignUpHandler() {

    function readURL(input) {
        if(input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('.js_img_pre_holder').attr('src', e.target.result);
                $('.js_img_pre_holder').removeClass('hide');
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    function uploadImage(_ele, _cb) {
        var formData = new FormData();
        formData.append('photo', _ele[0].files[0]);
        ApiUtil.makeFileUploadRequest('/api/applicant/photo/upload', '', 'POST', '', formData,
            function(_res_path) {
                _cb(_res_path);
            });
    }

    function bindApplicantSignUpEvent() {
        var _form_name = '#jsSignUpApplicantForm';
        var _form      = $(_form_name);
        _form.unbind().submit(function(e) {
            e.preventDefault();
            console.log(_form_name);
            if(FormValidator.validateForm(_form_name)) {
                var obj             = {
                    name           :_form.find('.js_name').val(),
                    qualification  :_form.find('.js_qualification').val(),
                    institution    :_form.find('.js_institution').val(),
                    designation    :_form.find('.js_designation').val(),
                    company        :_form.find('.js_company').val(),
                    current_salary :_form.find('.js_cur_salary').val(),
                    expected_salary:_form.find('.js_anual_salary').val(),
                    mobile         :_form.find('.js_mobile').val() || '0',
                    email          :_form.find('.js_email').val(),
                    password       :_form.find('.js_password').val(),
                    gender         :_form.find('.js_gender').val(),
                    exp_month      :_form.find('.js_exp_month').val(),
                    exp_year       :_form.find('.js_exp_year').val(),
                    resume         :_form.find('.js_input_file').val()
                };
                var _img_pre_holder = _form.find('.js_input_profile_file');
                if(_img_pre_holder.val()) {
                    uploadImage(_img_pre_holder, function(_res_path) {
                        if(!_res_path.error && _res_path.data) {
                            obj.photo      = _res_path.data.file;
                            obj.photo_type = _res_path.data.file_type;
                        }
                        postRegisterAPI(obj);
                    })
                } else {
                    postRegisterAPI(obj);
                }

            }
        });
    }

    function postRegisterAPI(_obj) {
        ApiUtil.makeAjaxRequest('/api/applicant-auth/register', '', 'POST', '', _obj, function(_res) {
            if(!_res.error) {
                window.location.href = '/applicant-account'
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function bindApplicantEditEvent() {
        var _form_name = '#jsApplicantEditForm';
        var _form      = $(_form_name);
        console.log(_form);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            console.log(_form_name);
            if(FormValidator.validateForm(_form_name)) {
                var obj      = {
                    name           :_form.find('.js_name').val(),
                    qualification  :_form.find('.js_qualification').val(),
                    institution    :_form.find('.js_institution').val(),
                    designation    :_form.find('.js_designation').val(),
                    company        :_form.find('.js_company').val(),
                    current_salary :_form.find('.js_cur_salary').val(),
                    expected_salary:_form.find('.js_anual_salary').val(),
                    mobile         :_form.find('.js_mobile').val() || '0',
                    email          :_form.find('.js_email').val(),
                    password       :_form.find('.js_password').val(),
                    gender         :_form.find('.js_gender').val(),
                    exp_month      :_form.find('.js_exp_month').val(),
                    exp_year       :_form.find('.js_exp_year').val()
                };
                var callback = function(_res) {
                    if(!_res.error) {
                        window.location.href = '/applicant-account'
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                };
                ApiUtil.makeAjaxRequest('/api/applicant', '', 'PUT', '', obj, callback);
            }
        });
    }

    function bindCommonClickEvents() {
        $('.js_select2').select2({});

        $('#selectExpMonth').change(function() {
            var selectedItem = $(this).val();
            if(selectedItem > 0) {
                $('#freshDetails').addClass('hide');
                $('#expDetails').removeClass('hide');
            } else {
                $('#freshDetails').removeClass('hide');
                $('#expDetails').addClass('hide');
            }
        });

        $('#selectExpYear').change(function() {
            var selectedItem = $(this).val();
            if(selectedItem.valueOf() > 0) {
                $('#freshDetails').addClass('hide');
                $('#expDetails').removeClass('hide');
            } else {
                $('#freshDetails').removeClass('hide');
                $('#expDetails').addClass('hide');
            }
        });

        $('.js_input_profile_file').change(function() {
            readURL(this);
        });

    }

    return {
        init    :function() {
            bindCommonClickEvents();
            bindApplicantSignUpEvent();
        },
        initEdit:function() {
            bindApplicantEditEvent();
        }
    }
}

module.exports = ApplicantSignUpHandler();
},{"../utils/apiUtil":2,"../utils/common":3,"../utils/formValidator":4}],7:[function(require,module,exports){
var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');

function LoginHandler() {
    function bindApplicantLoginEvent() {
        var _form_name = '#jsApplicantLoginForm';
        var _form      = $(_form_name);
        _form.submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _obj = {
                    email   :_form.find('.js_email').val(),
                    password:_form.find('.js_password').val()
                };
                ApiUtil.makeAjaxRequest('/api/applicant-auth/login', '', 'POST', '', _obj, function(_res) {
                    if(!_res.error) {
                        window.location.href = '/applicant-account';
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
            return false;
        });

    }

    function bindRecruiterLoginEvent() {
        var _form_name = '#jsRecruiterLoginForm';
        var _form      = $(_form_name);
        _form.submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _obj = {
                    email   :_form.find('.js_email').val(),
                    password:_form.find('.js_password').val()
                };
                ApiUtil.makeAjaxRequest('/api/recruiter-auth/login', '', 'POST', '', _obj, function(_res) {
                    if(!_res.error) {
                        window.location.href = '/recruiter';
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
            return false;
        });

    }

    function bindForgotPasswordFormEvent() {
        var isApplicant = true;
        var _form_name  = '#forgotPasswordForm';
        var _form       = $(_form_name);
        _form.submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _obj = {
                    email:_form.find('.js_email').val()
                };

                var _api_url = '/api/applicant-auth/forgot/password';
                if(!isApplicant) {
                    _api_url = '/api/recruiter-auth/forgot/password';
                }
                ApiUtil.makeAjaxRequest(_api_url, '', 'POST', '', _obj, function(_res) {
                    if(!_res.error) {
                        alert(_res.message);
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
            return false;
        });

        var _applicant_tab = $('.js_applicant_tab');
        var _recruiter_tab = $('.js_recruiter_tab');

        _applicant_tab.on('click', function() {
            _applicant_tab.addClass('active');
            _recruiter_tab.removeClass('active');
            isApplicant = true;

        });

        _recruiter_tab.on('click', function() {
            _applicant_tab.removeClass('active');
            _recruiter_tab.addClass('active');
            isApplicant = false;
        });
    }


    function bindResetPasswordFormEvent() {
        var _form_name  = '#resetPasswordForm';
        var _form       = $(_form_name);
        _form.submit(function(e) {
            e.preventDefault();
            if (FormValidator.validateForm(_form_name)) {
                var _new_pass = _form.find('.js_new_passwd').val();
                var _confirm_pass = _form.find('.js_confirm_passwd').val();
                var user_id = _form.find('.js_user_id').val();
                var _obj = {};

                if (_new_pass === _confirm_pass) {
                    _obj = {
                        password: _new_pass,
                    };
                    postResetPassword(_obj, _form);
                } else {
                    _form.find('.js_server_error').removeClass('hide');
                    _form.find('.js_server_error_msg').html('Confirm password not matched!');
                    _form.find('.js_confirm_passwd').addClass('error');
                }
            }
            return false;
        });

    }

    function postResetPassword(obj, formEle) {
        var callback = function (data) {
            if (data && data._id) {
                window.location.href = '/logout';
            } else {
                formEle.find('.js_server_error').removeClass('hide');
                formEle.find('.js_server_error_msg').html(data.msg);
            }
        };
        ApiUtil.makeAjaxRequest('/api/applicant/reset-password/' + obj.user_id, '', 'POST', '', obj, callback);
    }

    function bindCommonClickEvents() {
        var _recruiterLoginForm = $('#jsRecruiterLoginForm');
        var _applicantLoginForm = $('#jsApplicantLoginForm');

        var _applicant_tab = $('.js_applicant_tab');
        var _recruiter_tab = $('.js_recruiter_tab');

        _applicant_tab.on('click', function() {
            _applicantLoginForm.removeClass('hide');
            _recruiterLoginForm.addClass('hide');

            _applicant_tab.addClass('active');
            _recruiter_tab.removeClass('active');

        });

        _recruiter_tab.on('click', function() {
            _applicantLoginForm.addClass('hide');
            _recruiterLoginForm.removeClass('hide');

            _applicant_tab.removeClass('active');
            _recruiter_tab.addClass('active');
        });
    }

    return {
        init              :function() {
            bindCommonClickEvents();
            bindApplicantLoginEvent();
            bindRecruiterLoginEvent();
        },
        initForgotPassword:function() {
            bindForgotPasswordFormEvent();
        },
        initResetPassword:function() {
            bindResetPasswordFormEvent();
        },
    };
}

module.exports = LoginHandler();
},{"../utils/apiUtil":2,"../utils/formValidator":4}],8:[function(require,module,exports){
var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');

function PostJobHandler() {

    function bindPostJobEvent() {
        $('.js_select2').select2({});
        var _form_name = '#jsJobForm';
        var _form      = $(_form_name);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var locationType1 = _form.find('#locationType1');
                var locationType2 = _form.find('#locationType2');

                var _location_type = '';
                if(locationType1.attr('checked')) {
                    _location_type = locationType1.val();
                }
                if(locationType2.attr('checked')) {
                    _location_type = locationType2.val();
                }

                var _obj = {
                    name         :_form.find('.js_title').val(),
                    category_id  :_form.find('.js_category').val(),
                    recruiter_id :_form.find('.js_recruiter_id').val(),
                    job_type     :_form.find('.js_job_type').val(),
                    salary_min   :_form.find('.js-input-from').val(),
                    salary_max   :_form.find('.js-input-to').val(),
                    location_type:_location_type
                };

                ApiUtil.makeAjaxRequest('/api/qa-jobs', '', 'POST', '', _obj, function(_res) {
                    if(!_res.error && _res.data) {
                       // window.location.href = '/post-job/info'
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
        });
    }

    function bindCommonClickEvents() {
        $('.js_select2').select2({});
        var $range     = $('.js-range-slider'),
            $inputFrom = $('.js-input-from'),
            $inputTo   = $('.js-input-to'),
            instance,
            min        = 0,
            max        = 3000000,
            from       = 0,
            to         = 0;

        $range.ionRangeSlider({
            type              :'double',
            min               :min,
            max               :max,
            from              :0,
            to                :500000,
            prefix            :'Rp. ',
            onStart           :updateInputs,
            onChange          :updateInputs,
            step              :50000,
            prettify_enabled  :true,
            prettify_separator:'.',
            values_separator  :' - ',
            force_edges       :true

        });

        instance = $range.data('ionRangeSlider');

        function updateInputs(data) {
            from = data.from;
            to   = data.to;

            $inputFrom.prop('value', from);
            $inputTo.prop('value', to);
        }

        $inputFrom.on('input', function() {
            var val = $(this).prop('value');

            // validate
            if(val < min) {
                val = min;
            } else if(val > to) {
                val = to;
            }

            instance.update({
                from:val
            });
        });

        $inputTo.on('input', function() {
            var val = $(this).prop('value');

            // validate
            if(val < from) {
                val = from;
            } else if(val > max) {
                val = max;
            }

            instance.update({
                to:val
            });
        });
    }

    return {
        init:function() {
            bindCommonClickEvents();
            bindPostJobEvent();
        }
    }
}

module.exports = PostJobHandler();
},{"../utils/apiUtil":2,"../utils/common":3,"../utils/formValidator":4}],9:[function(require,module,exports){
var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');

function RecruiterHandler() {
    function uploadImage(_ele, _cb) {
        var formData = new FormData();
        formData.append('photo', _ele[0].files[0]);
        ApiUtil.makeFileUploadRequest('/api/recruiter/photo/upload', '', 'POST', '', formData,
            function(_res_path) {
                _cb(_res_path);
            });
    }

    function readURL(input) {
        if(input.files && input.files[0]) {
            var reader          = new FileReader();
            var _img_pre_holder = $('.js_img_pre_holder');

            reader.onload = function(e) {
                _img_pre_holder.attr('src', e.target.result);
                _img_pre_holder.removeClass('hide');
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    function bindRecruiterEvent() {
        $('.js_select2').select2({});
        var _form_name = '#jsSignUpRecruitForm';
        var _form      = $(_form_name);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _user_obj       = {
                    name       :_form.find('.js_name').val(),
                    email      :_form.find('.js_email').val(),
                    password   :_form.find('.js_password').val(),
                    gender     :_form.find('.js_gender').val(),
                    designation:_form.find('.js_designation').val()
                };
                var _img_pre_holder = _form.find('.js_input_profile_file');

                ApiUtil.makeAjaxRequest('/api/recruiter-auth/register', '', 'POST', '', _user_obj, function(_res) {
                    if(!_res.error && _res.data) {
                        if(_img_pre_holder.val()) {
                            uploadImage(_img_pre_holder, function(_res_path) {
                                updateUserPhoto(_res.data.id, _res_path);
                            })
                        }
                        postCompanyDetails(_res.data.id, _form);

                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
        });
    }

    function updateUserPhoto(user_id, _res_path) {
        if(!_res_path.error && _res_path.data) {

            var _obj = {
                photo     :_res_path.data.file,
                photo_type:_res_path.data.file_type
            };

            ApiUtil.makeAjaxRequest('/api/recruiter/' + user_id, '', 'PUT', '', _obj, function(_res) {
                if(_res.error) {
                    alert(_res.message || 'Something went wrong!');
                }
            });
        }
    }

    function postCompanyDetails(user_id, _form) {
        var _company_obj = {
            recruiter_id:user_id,
            name        :_form.find('.js_company_name').val() || '0',
            industry_id :_form.find('.js_industry').val(),
            size        :_form.find('.js_company_size').val(),
            url         :_form.find('.js_company_url').val(),
            about       :_form.find('.js_about_company').val(),
            street      :_form.find('.js_street').val(),
            area        :_form.find('.js_area').val(),
            city        :_form.find('.js_city').val(),
            state       :_form.find('.js_state').val(),
            pin         :_form.find('.js_pin').val(),
            country     :_form.find('.js_country').val()
        };

        ApiUtil.makeAjaxRequest('/api/companies', '', 'POST', '', _company_obj, function(_res) {
            if(!_res.error && _res.data) {
                postCompanyBenefits(_res.data.id, _form)
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function postCompanyBenefits(company_id, _form) {
        var _company_obj = {
            company_id:company_id,
            benefits  :_form.find('.js_company_benefit').val() || []
        };

        ApiUtil.makeAjaxRequest('/api/benefits', '', 'POST', '', _company_obj, function(_res) {
            if(!_res.error) {
                window.location.href = '/recruiter'
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function bindCommonClickEvents() {
        $('.js_input_profile_file').change(function() {
            readURL(this);
        });
        $('.js_company_benefit').select2({
            tags           :true,
            tokenSeparators:[',']
        });
    }

    return {
        init:function() {
            bindCommonClickEvents();
            bindRecruiterEvent();
        }
    }
}

module.exports = RecruiterHandler();
},{"../utils/apiUtil":2,"../utils/common":3,"../utils/formValidator":4}],10:[function(require,module,exports){
var ApiUtil = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils = require('../utils/common');

function RecruiterProfileHandler() {
    function bindRecruiterProfileEvent() {
        $('.js_select2').select2({});
        var _form_name = '#jsSignUpRecruitForm';
        var _form = $(_form_name);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            var _id = _form.find('.js_data_id').val();
            if(FormValidator.validateForm(_form_name)) {
                var obj = {
                    name           :_form.find('.js_name').val(),
                    email          :_form.find('.js_email').val(),
                    password       :_form.find('.js_password').val(),
                    gender         :_form.find('.js_gender').val(),
                    designation    :_form.find('.js_designation').val(),
                    company        :_form.find('.js_company_name').val() || '0',
                    industry       :_form.find('.js_industry').val(),
                    company_size   :_form.find('.js_company_size').val(),
                    company_url    :_form.find('.js_company_url').val(),
                    about_company  :_form.find('.js_about_company').val(),
                    company_benefit:_form.find('.js_company_benefit').val()

                };
                console.log(obj);
                var callback = function(_res) {
                    if(!_res.error) {
                        window.location.href = '/recruiter'
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                };
                ApiUtil.makeAjaxRequest('/api/recruiter/' + _id, '', 'PUT', '', obj, callback);
            }
        });
    }

    return {
        init    :function() {
            bindRecruiterProfileEvent();
        },
        initView:function(_land_ids) {
            _lang_ids_arr = _land_ids;
            utils.initProfileImageCropper('#profileImageCropperModal', '.js_profile_img_wrap', 'userPicPreviewImage',
                function() {
                    $('.js_prof_pic_load_img').removeClass('hide');
                    ApiUtil.makeAjaxRequest('/api/avatar/upload', '', 'POST', '',
                        {src:$('.js_img_pre_holder').attr('src')}, function(_res) {
                            $('.js_prof_pic_load_img').addClass('hide');

                        });
                });

        }
    }
}

module.exports = RecruiterProfileHandler();
},{"../utils/apiUtil":2,"../utils/common":3,"../utils/formValidator":4}],11:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],12:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],13:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":11,"./encode":12}]},{},[1]);
