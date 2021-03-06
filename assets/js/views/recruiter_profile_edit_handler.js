var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');

function RecruiterProfileEditHandler() {
    // function uploadImage(_ele, _cb) {
    //     var formData = new FormData();
    //     formData.append('photo', _ele[0].files[0]);
    //     ApiUtil.makeFileUploadRequest('/api/recruiter/photo/upload', '', 'POST', '', formData,
    //         function (_res_path) {
    //             _cb(_res_path);
    //         });
    // }

    // function readURL(input) {
    //     if (input.files && input.files[0]) {
    //         var reader = new FileReader();
    //         var _img_pre_holder = $('.js_img_pre_holder');
    //
    //         reader.onload = function (e) {
    //             _img_pre_holder.attr('src', e.target.result);
    //             _img_pre_holder.removeClass('hide');
    //         };
    //
    //         reader.readAsDataURL(input.files[0]);
    //     }
    // }

    var _img_pre_holder = $('.js_img_pre_holder');

    function readURL(input) {
        if(input.files && input.files[0]) {
            var reader    = new FileReader();
            reader.onload = function(e) {
                _img_pre_holder.attr('src', e.target.result);
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

                var _job_id = _form.find('.js_data_id').val();

                var _user_obj = {
                    name       :_form.find('.js_name').val(),
                    designation:_form.find('.js_designation').val(),
                    gender     :_form.find('.js_gender').val(),
                    mobile     :_form.find('.js_mobile').val()
                };

                // var callback = function (_res) {
                //     if (!_res.error) {
                //         uploadPhoto(_form, _res.data.id);
                //         // updateCompanyDetails(_form, _res.data.id);
                //         alert('Recruiter details updated successfully!');
                //     } else {
                //         alert(_res.message || 'Something went wrong!');
                //     }
                // };
                // ApiUtil.makeAjaxRequest('/api/recruiter/' + _job_id, '', 'PUT', '', _user_obj, callback);

                console.log(_user_obj);
                var callback = function(_res) {
                    if(!_res.error) {
                        uploadPhoto(_form, _res.data.id);
                        alert('Data updated successfully!');
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                };
                ApiUtil.makeAjaxRequest('/api/recruiter/' + _job_id, '', 'PUT', '', _user_obj, callback);
            }
        });
    }

    function uploadPhoto(_form, user_id) {
        console.log(user_id);
        var _input_file    = _form.find('.js_input_profile_file');
        var _existing_file = _form.find('.js_existing_profile_photo');
        if(_input_file.val()) {
            console.log(_input_file.val());
            if(_existing_file.val()) {
                ApiUtil.makeAjaxRequest('/api/recruiter/photo/' + _existing_file.val(), '', 'DELETE', '', '',
                    function(_res_path) {
                        if(_res_path.error) {
                            updatePhoto(_form, user_id);
                        } else {
                            updatePhoto(_form, user_id);
                        }
                    });
            } else {
                updatePhoto(_form, user_id);
            }
        }
    }

    function updatePhoto(_form, user_id) {
        var _input_file = _form.find('.js_input_profile_file');
        if(_input_file.val()) {
            var formData = new FormData();
            formData.append('photo', _input_file[0].files[0]);
            ApiUtil.makeFileUploadRequest('/api/recruiter/photo/upload/' + user_id, '', 'POST', '',
                formData, function(err, results) {
                    alert('data updated successfully!');
                });
        }
    }

    // function updateCompanyDetails(user_id, _form) {
    //     var _company_obj = {
    //         recruiter_id: user_id,
    //         name: _form.find('.js_company_name').val() || '0',
    //         industry_id: _form.find('.js_industry').val(),
    //         size: _form.find('.js_company_size').val(),
    //         url: _form.find('.js_company_url').val(),
    //         about: _form.find('.js_about_company').val(),
    //         street: _form.find('.js_street').val(),
    //         area: _form.find('.js_area').val(),
    //         city: _form.find('.js_city').val(),
    //         state: _form.find('.js_state').val(),
    //         pin: _form.find('.js_pin').val(),
    //         country: _form.find('.js_country').val()
    //     };
    //
    //     ApiUtil.makeAjaxRequest('/api/companies', '', 'PUT', '', _company_obj, function (_res) {
    //         if (!_res.error && _res.data) {
    //             updateCompanyBenefits(_res.data.id, _form)
    //         } else {
    //             alert(_res.message || 'Something went wrong!');
    //         }
    //     });
    // }

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
        initEdit:function() {
            bindCommonClickEvents();
            bindRecruiterEditEvent();
        }
    }
}

module.exports = RecruiterProfileEditHandler();