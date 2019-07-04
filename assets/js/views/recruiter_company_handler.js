var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');
var utils         = require('../utils/common');

function RecruiterCompanyHandler() {

    function bindCompanyFormEvent() {

        $('.jsCompanyForm').unbind().submit(function(e) {
            e.preventDefault();
            var _form       = $(this);
            var _company_id = _form.data('company-id');
            var _form_name  = '#' + _this.attr('id');

            if(FormValidator.validateForm(_form_name)) {
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
                window.location.href = '/recruiter'
            } else {
                alert(_res.message || 'Something went wrong!');
            }
        });
    }

    function bindClickEvents() {
        $('.js_company_benefit').select2({
            tags           :true,
            tokenSeparators:[',']
        });
        $('.js_gender').select2();
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
    }

    return {
        init:function() {
            bindClickEvents();
            bindCompanyFormEvent();
        }
    }
}

module.exports = RecruiterCompanyHandler();