var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');

function RecruiterCompanyHandler() {

    function bindCompanyFormEvent() {

        $('.jsCompanyForm').unbind().submit(function(e) {
            e.preventDefault();
            var _form       = $(this);
            var _company_id = _form.data('company-id');
            var _form_name  = '#' + _form.attr('id');

            if(FormValidator.validateForm(_form_name)) {
                var _company_obj = {
                    recruiter_id:$('.js_recruiter_id').val(),
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
                    email       :_form.find('.js_email').val(),
                    country     :_form.find('.js_country').val()
                };

                ApiUtil.makeAjaxRequest('/api/companies/' + _company_id, '', 'PUT', '', _company_obj, function(_res) {
                    if(!_res.error) {
                        postCompanyBenefits(_company_id, _form)
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
                uploadPhoto(_form, company_id);
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function uploadPhoto(_form, _company_id) {
        var _input_file    = _form.find('.js_input_c_logo_file');
        var _existing_file = _form.find('.js_existing_logo');
        if(_input_file.val()) {
            if(_existing_file.val()) {
                ApiUtil.makeAjaxRequest('/api/companies/photo/' + _existing_file.val(), '', 'DELETE', '', '',
                    function(_res_path) {
                        if(_res_path.error) {
                            postPhoto(_form, _company_id);
                        } else {
                            postPhoto(_form, _company_id);
                        }
                    });
            } else {
                postPhoto(_form, _company_id);
            }
        }
    }

    function postPhoto(_form, _company_id) {
        var _input_file = _form.find('.js_input_c_logo_file');
        if(_input_file.val()) {
            var formData = new FormData();
            formData.append('photo', _input_file[0].files[0]);
            ApiUtil.makeFileUploadRequest('/api/companies/photo/upload/' + _company_id, '', 'POST', '',
                formData, function(err, results) {
                    alert('Company details updated successfully!');
                });
        }
    }

    function bindClickEvents() {

        var _select2         = $('.js_select2');
        var _company_benefit = $('.js_company_benefit');
        _select2.select2({});
        _company_benefit.select2({
            tags           :true,
            tokenSeparators:[',']
        });
        $('.js_panel_title').click(function() {
            $('.select2-container--default').css({
                width:'100%'
            });
        });
        var _company_check_box = $('.js_company_checkbox');
        _company_check_box.click(function() {
            var _this = $(this);
            var _obj  = {};
            if(_this.prop('checked')) {
                _company_check_box.prop('checked', false);
                _this.prop('checked', true);

                _obj = {
                    default_company_id:_this.data('id')
                };

            } else {
                _company_check_box.prop('checked', false);
                _this.prop('checked', false);

                _obj = {
                    default_company_id:''
                };
            }

            ApiUtil.makeAjaxRequest('/api/recruiter/' + _this.data('recruiter-id'), '', 'PUT', '', _obj,
                function(_res) {
                    if(!_res.error) {
                        alert('Default company updated successfully.');
                    } else {
                        alert(_res.message || 'Something went wrong!');
                    }
                });

        });

        $('.js_input_c_logo_file').change(function() {
            var _this      = $(this);
            var _parent    = _this.closest('.upload_sec');
            var _file_name = _this.val().replace(/.*[\/\\]/, '');

            if(_this.val()) {
                _parent.addClass('preview');
                _parent.find('.file_name').html(_file_name);
            }
            readURL(this);
        });
    }

    function readURL(input) {
        if(input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('.js_company_logo_preview').attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    return {
        init:function() {
            bindClickEvents();
            bindCompanyFormEvent();
        }
    }
}

module.exports = RecruiterCompanyHandler();