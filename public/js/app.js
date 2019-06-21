(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
window.PopupPage                   = require('./utils/popupHandler');
window.LoginHandler                = require('./views/login_handler');
window.RecruiterHandler            = require('./views/recruiter_handler');
window.ApplicantSignUpHandler      = require('./views/applicant_handler');
window.RecruiterProfileEditHandler = require('./views/recruiter_profile_edit_handler');
window.PostJobHandler              = require('./views/post_job_handler');
},{"./utils/popupHandler":5,"./views/applicant_handler":6,"./views/login_handler":7,"./views/post_job_handler":8,"./views/recruiter_handler":9,"./views/recruiter_profile_edit_handler":10}],2:[function(require,module,exports){
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
},{"querystring":15}],3:[function(require,module,exports){
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
var waterfall     = require('async-waterfall');

function PostJobHandler() {

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

    function bindPostJobEvent() {
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
                    recruiter_id :_form.find('.js_recruiter_id').val(),
                    job_type     :_form.find('.js_job_type').val(),
                    salary_min   :_form.find('.js-input-from').val(),
                    salary_max   :_form.find('.js-input-to').val(),
                    location_type:_location_type
                };

                ApiUtil.makeAjaxRequest('/api/qa-jobs', '', 'POST', '', _obj, function(_res) {
                    if(!_res.error && _res.data) {
                        postJobCategory(_res.data.id, _form);
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
        });
    }

    function postJobCategory(_job_id, _form) {
        var _obj = {
            qa_job_id  :_job_id,
            category_id:_form.find('.js_category').val()
        };
        ApiUtil.makeAjaxRequest('/api/qa-job/categories', '', 'POST', '', _obj, function(_res) {
            if(!_res.error && _res.data) {
                window.location.href = '/post-job/info/' + _job_id;
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function bindPostJobWorkInfoEvent() {
        var _form_name = '#jsJobInfoForm';
        var _form      = $(_form_name);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _job_id = _form.find('.js_job_id').val();

                var _obj = {
                    work_week:_form.find('.js_work_week').val(),
                    holidays :_form.find('.js_holidays').val(),
                    desc     :_form.find('.js_desc').val()
                };

                ApiUtil.makeAjaxRequest('/api/qa-jobs/' + _job_id, '', 'PUT', '', _obj, function(_res) {
                    if(!_res.error && _res.data) {

                        postJobTechnologies(_job_id, _form)
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
            }
        });
    }

    function postJobTechnologies(_job_id, _form) {
        var _technologies = _form.find('.js_technologies').val();
        if(_technologies) {
            waterfall(_technologies.map(function(arrayItem) {
                return function(lastItemResult, CB) {
                    if(!CB) {
                        CB             = lastItemResult;
                        lastItemResult = null;
                    }
                    var _obj = {
                        qa_job_id    :_job_id,
                        technology_id:arrayItem
                    };

                    ApiUtil.makeAjaxRequest('/api/qa-job/technologies', '', 'POST', '', _obj, function(_res) {
                        CB(null, []);
                    });
                }
            }), function(err, result) {
                window.location.href = '/post-job/company/' + _job_id;
            });
        }
    }

    function bindPostJobCompanyEvent() {

        $('.js_company_benefit').select2({
            tags           :true,
            tokenSeparators:[',']
        });
        $('.js_select2').select2({});

        var _company_check_box = $('.js_company_check_box');
        _company_check_box.click(function() {
            var _this = $(this);
            if(_this.prop('checked')) {
                _company_check_box.prop('checked', false);
                _this.prop('checked', true);
            } else {
                _company_check_box.prop('checked', false);
                _this.prop('checked', false);
            }
        });

        $('.js_add_new_company_btn').click(function() {
            _company_check_box.prop('checked', false);
            $('.js_forms_wrap').removeClass('hide');
            $(this).addClass('hide');
        });

        $('.jsSubmitCompanyFormBtn').click(function() {
            var _isNewCompany = false;
            _company_check_box.each(function(index, ele) {
                if(ele.prop('checked' && ele.data('id'))) {
                    var _company_id = ele.data('id');
                    updateJobCompany(_company_id);
                    return false;
                } else {
                    _isNewCompany = true;
                }
            });
            if(_isNewCompany) {
                postCompanyDetails();
            }
        });
    }

    function updateJobCompany(_company_id) {
        var _job_id = $('.js_job_id').val();

        var _obj = {
            company_id:_company_id
        };
        ApiUtil.makeAjaxRequest('/api/qa-jobs/' + _job_id, '', 'PUT', '', _obj, function(_res) {
            if(!_res.error && _res.data) {
                window.location.href = '/';
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function postCompanyDetails() {
        var _form_name = '.jsJobCompanyForm';
        var _form      = $(_form_name);

        _form.unbind().submit(function(e) {
            e.preventDefault();
            if(FormValidator.validateForm(_form_name)) {
                var _company_obj = {
                    recruiter_id:$('.js_user_id').val(),
                    name        :_form.find('.js_company_name').val() || '0',
                    industry_id :_form.find('.js_industry').val(),
                    size        :_form.find('.js_company_size').val(),
                    url         :_form.find('.js_company_url').val(),
                    about       :_form.find('.js_about_company').val(),
                    //street      :_form.find('.js_street').val(),
                    //area        :_form.find('.js_area').val(),
                    //city        :_form.find('.js_city').val(),
                    //state       :_form.find('.js_state').val(),
                    //pin         :_form.find('.js_pin').val(),
                    //country     :_form.find('.js_country').val()
                };

                ApiUtil.makeAjaxRequest('/api/companies', '', 'POST', '', _company_obj, function(_res) {
                    if(!_res.error && _res.data) {
                        postCompanyBenefits(_res.data.id, _form)
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });
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
                window.location.href = '/';
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    return {
        init        :function() {
            bindCommonClickEvents();
            bindPostJobEvent();
        },
        initWorkInfo:function() {
            bindPostJobWorkInfoEvent();
            $('.js_technologies').select2({
                tags           :true,
                tokenSeparators:[',']
            });
        },
        initCompany :function() {
            bindPostJobCompanyEvent();
        }
    }
}

module.exports = PostJobHandler();
},{"../utils/apiUtil":2,"../utils/common":3,"../utils/formValidator":4,"async-waterfall":11}],9:[function(require,module,exports){
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
        init    :function() {
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

function RecruiterProfileEditHandler() {
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

    function bindRecruiterEditEvent() {
        $('.js_select2').select2({});
        var _form_name = '#jsEditRecruitForm';
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

                var callback = function(_res) {
                    if(!_res.error) {
                        if(_img_pre_holder.val()) {
                            uploadImage(_img_pre_holder, function(_res_path) {
                                updateUserPhoto(_res.data.id, _res_path);
                            })
                        }
                        updateCompanyDetails(_res.data.id, _form);
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                };
                ApiUtil.makeAjaxRequest('/api/recruiter', '', 'PUT', '', _user_obj, callback);
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

    function updateCompanyDetails(user_id, _form) {
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

        ApiUtil.makeAjaxRequest('/api/companies', '', 'PUT', '', _company_obj, function(_res) {
            if(!_res.error && _res.data) {
                updateCompanyBenefits(_res.data.id, _form)
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function updateCompanyBenefits(company_id, _form) {
        var _company_obj = {
            company_id:company_id,
            benefits  :_form.find('.js_company_benefit').val() || []
        };

        ApiUtil.makeAjaxRequest('/api/benefits', '', 'PUT', '', _company_obj, function(_res) {
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
        initEdit    :function() {
            bindCommonClickEvents();
            bindRecruiterEditEvent();
        }
    }
}

module.exports = RecruiterProfileEditHandler();
},{"../utils/apiUtil":2,"../utils/common":3,"../utils/formValidator":4}],11:[function(require,module,exports){
(function (process,setImmediate){
// MIT license (by Elan Shanker).
(function(globals) {
  'use strict';

  var nextTick = function (fn) {
    if (typeof setImmediate === 'function') {
      setImmediate(fn);
    } else if (typeof process !== 'undefined' && process.nextTick) {
      process.nextTick(fn);
    } else {
      setTimeout(fn, 0);
    }
  };

  var makeIterator = function (tasks) {
    var makeCallback = function (index) {
      var fn = function () {
        if (tasks.length) {
          tasks[index].apply(null, arguments);
        }
        return fn.next();
      };
      fn.next = function () {
        return (index < tasks.length - 1) ? makeCallback(index + 1): null;
      };
      return fn;
    };
    return makeCallback(0);
  };
  
  var _isArray = Array.isArray || function(maybeArray){
    return Object.prototype.toString.call(maybeArray) === '[object Array]';
  };

  var waterfall = function (tasks, callback) {
    callback = callback || function () {};
    if (!_isArray(tasks)) {
      var err = new Error('First argument to waterfall must be an array of functions');
      return callback(err);
    }
    if (!tasks.length) {
      return callback();
    }
    var wrapIterator = function (iterator) {
      return function (err) {
        if (err) {
          callback.apply(null, arguments);
          callback = function () {};
        } else {
          var args = Array.prototype.slice.call(arguments, 1);
          var next = iterator.next();
          if (next) {
            args.push(wrapIterator(next));
          } else {
            args.push(callback);
          }
          nextTick(function () {
            iterator.apply(null, args);
          });
        }
      };
    };
    wrapIterator(makeIterator(tasks))();
  };

  if (typeof define !== 'undefined' && define.amd) {
    define([], function () {
      return waterfall;
    }); // RequireJS
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = waterfall; // CommonJS
  } else {
    globals.asyncWaterfall = waterfall; // <script>
  }
})(this);

}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":12,"timers":16}],12:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":13,"./encode":14}],16:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":12,"timers":16}]},{},[1]);
