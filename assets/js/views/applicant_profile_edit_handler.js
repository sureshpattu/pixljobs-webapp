var ApiUtil = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils = require('../utils/common');
var async = require('async');

function ApplicantSignUpHandler() {
    var _img_pre_holder = $('.js_img_pre_holder');

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                _img_pre_holder.attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    function bindApplicantEditEvent() {
        var _form_name = '#jsApplicantEditForm';
        var _form = $(_form_name);

        _form.unbind().submit(function (e) {
            e.preventDefault();
            if (FormValidator.validateForm(_form_name)) {
                var obj = {
                    name: _form.find('.js_name').val(),
                    qualification: _form.find('.js_qualification').val(),
                    institution: _form.find('.js_institution').val(),
                    designation: _form.find('.js_designation').val(),
                    company: _form.find('.js_company').val(),
                    current_salary: _form.find('.js_cur_salary').val(),
                    expected_salary: _form.find('.js_anual_salary').val(),
                    mobile: _form.find('.js_mobile').val() || '0',
                    email: _form.find('.js_email').val(),
                    password: _form.find('.js_password').val(),
                    gender: _form.find('.js_gender').val(),
                    exp_month: _form.find('.js_exp_month').val(),
                    exp_year: _form.find('.js_exp_year').val()
                };

                console.log(obj);
                var callback = function (_res) {
                    if (!_res.error) {
                        uploadPhoto(_form, _res.data.id);
                        uploadResume(_form, _res.data.id);
                        alert('Data updated successfully!');
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                };
                ApiUtil.makeAjaxRequest('/api/applicant', '', 'PUT', '', obj, callback);
            }
        });
    }

    function uploadPhoto(_form, applicant_id) {
        var _input_file = _form.find('.js_input_profile_file');
        var _existing_file = _form.find('.js_existing_profile_photo');
        if (_input_file.val()) {
            if (_existing_file.val()) {
                ApiUtil.makeAjaxRequest('/api/applicant/photo/' + _existing_file.val(), '', 'DELETE', '','',
                    function (_res_path) {
                        if (_res_path.error) {
                            updatePhoto(_form, applicant_id);
                        }
                        else {
                            updatePhoto(_form, applicant_id);
                        }
                        window.location.href = '/applicant-account'
                    });
            }else{
                updatePhoto(_form, applicant_id);
            }
        }
    }

    function uploadResume(_form, applicant_id) {
        var _input_file = _form.find('.js_input_resume_file');
        var _existing_file = _form.find('.js_existing_resume_file');
        if (_input_file.val()) {
            console.log(_input_file.val());
            if (_existing_file.val()) {
                console.log(_existing_file.val());
                ApiUtil.makeAjaxRequest('/api/applicant/resume/' + _existing_file.val(), '', 'DELETE', '','',
                    function (_res_path) {
                        if (_res_path.error) {
                            updateResume(_form, applicant_id);
                        }
                        else {
                            updateResume(_form, applicant_id);
                        }
                        window.location.href = '/applicant-account'
                    });
            }else{
                updateResume(_form, applicant_id);
            }
        }
    }


    function updatePhoto(_form, applicant_id) {
        var _input_file = _form.find('.js_input_profile_file');
        if (_input_file.val()) {
            var formData = new FormData();
            formData.append('photo', _input_file[0].files[0]);
            ApiUtil.makeFileUploadRequest('/api/applicant/photo/upload/' + applicant_id, '', 'POST', '',
                formData, function (err, results) {
                    // window.location.href = '/applicant-account'
                    alert('Photo updated successfully!');
                });
        }
    }

    function updateResume(_form, applicant_id) {
        var _input_file = _form.find('.js_input_resume_file');
        if (_input_file.val()) {
            var formData = new FormData();
            formData.append('photo', _input_file[0].files[0]);
            ApiUtil.makeFileUploadRequest('/api/applicant/resume/upload/' + applicant_id, '', 'POST', '',
                formData, function (err, results) {
                    // window.location.href = '/applicant-account'
                    alert('Resume updated successfully!');
                });
        }
    }


    function bindCommonClickEvents() {
        $('.js_select2').select2({});

        $('#selectExpMonth').change(function () {
            var selectedItem = $(this).val();
            if (selectedItem > 0) {
                $('#freshDetails').addClass('hide');
                $('#expDetails').removeClass('hide');

                $('.js_qualification').removeClass('required');

                $('.js_designation').addClass('required');
                $('.js_company').addClass('required');
                $('.js_cur_salary').addClass('required');

                $('.js_exp_detail_sec').removeClass('hide');
                $('.js_fresh_detail_sec').addClass('hide');

            } else {
                $('#freshDetails').removeClass('hide');
                $('#expDetails').addClass('hide');

                $('.js_qualification').addClass('required');

                $('.js_designation').removeClass('required');
                $('.js_company').removeClass('required');
                $('.js_cur_salary').removeClass('required');

                $('.js_exp_detail_sec').addClass('hide');
                $('.js_fresh_detail_sec').removeClass('hide');
            }
        });

        $('#selectExpYear').change(function () {
            var selectedItem = $(this).val();
            if (selectedItem.valueOf() > 0) {
                $('#freshDetails').addClass('hide');
                $('#expDetails').removeClass('hide');

                $('.js_qualification').removeClass('required');

                $('.js_designation').addClass('required');
                $('.js_company').addClass('required');
                $('.js_cur_salary').addClass('required');

                $('.js_exp_detail_sec').removeClass('hide');
                $('.js_fresh_detail_sec').addClass('hide');

            } else {
                $('#freshDetails').removeClass('hide');
                $('#expDetails').addClass('hide');

                $('.js_qualification').addClass('required');

                $('.js_designation').removeClass('required');
                $('.js_company').removeClass('required');
                $('.js_cur_salary').removeClass('required');

                $('.js_exp_detail_sec').addClass('hide');
                $('.js_fresh_detail_sec').removeClass('hide');
            }
        });

        $('.js_input_profile_file').change(function () {
            readURL(this);
        });

        $('.js_input_resume_file').change(function () {
            readURL(this);
        });
    }

    return {
        init: function () {
            bindCommonClickEvents();
            bindApplicantEditEvent();
            $('.js_select2').select2({});
        }
    }
}

module.exports = ApplicantSignUpHandler();