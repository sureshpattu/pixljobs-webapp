var ApiUtil           = require('../utils/apiUtil');
var FormValidator     = require('../utils/formValidator');
var utils             = require('../utils/common');
var HandlebarsHelpers = require('../utils/handlebar_helpers');

function JobSearchHandler() {
    var _job_list_wrap = $('.js_job_list_wrap'),
        _query         = {
            page :0,
            limit:10
        },
        _jobTypeArr    = [],
        _setTimeout    = null,
        _isPageLoad    = false;

    function searchJobs() {
        if(_jobTypeArr.length) {
            _query.job_type = _jobTypeArr;
        } else {
            delete _query.job_type;
        }
        _query.page  = 0;
        var callback = function(resData) {
            if(!resData.error) {
                var _length = resData.data.result.length;
                var _html   = Handlebars.partials['job_search_card']({
                    data:resData.data.result
                });
                _job_list_wrap.html(_html);
                $('[data-toggle="popover"]').popover();

                $('.js_total_jobs_txt').html(resData.data.total);
                if(_length >= 10) {
                    $('.js_load_more_btn').removeClass('hide');
                } else {
                    $('.js_load_more_btn').addClass('hide');
                }

            }
        };
        ApiUtil.makeAjaxRequest('/api/jobs/search', '', 'POST', '', _query, callback);
    }

    function loadMoreJobs() {
        if(_jobTypeArr.length) {
            _query.job_type = _jobTypeArr;
        }
        _query.page = _query.page + 1;

        var callback = function(resData) {
            if(!resData.error) {
                var _length = resData.data.result.length;

                if(_length) {
                    var _html = Handlebars.partials['job_search_card']({
                        data:resData.data.result
                    });
                    _job_list_wrap.append(_html);
                    $('[data-toggle="popover"]').popover();
                }

                if(resData.data.pages >= (_query.page + 1)) {
                    $('.js_load_more_btn').addClass('hide');
                } else {
                    $('.js_load_more_btn').removeClass('hide');
                }

            }
        };
        ApiUtil.makeAjaxRequest('/api/jobs/search', '', 'POST', '', _query, callback);
    }

    function searchByLocation() {
        var _val = $('.js_input_location').val();
        if(_val) {
            _query.street   = $('.js_street').val();
            _query.area_in  = $('.js_area_in').val();
            _query.area     = $('.js_area').val();
            _query.locality = $('.js_locality').val();
            _query.city     = $('.js_city').val();
            _query.state    = $('.js_state').val();
            _query.country  = $('.country').val();
            _query.pin      = $('.js_postal_code').val();
            if(_query.street || _query.area_in || _query.area || _query.locality || _query.city || _query.state ||
                _query.country || _query.pin) {
                searchJobs();
            }
        } else {
            delete _query.street;
            delete _query.area_in;
            delete _query.area;
            delete _query.locality;
            delete _query.city;
            delete _query.state;
            delete _query.country;
            delete _query.pin;
            searchJobs();
            clearGoogleAddress();
        }
    }

    function bindClickEvents() {
        $('.js_select2').select2({});

        $('[data-toggle="popover"]').popover();

        $('.js_search_input').on('keyup', function(e) {
            var _val = $(this).val();
            if(_val) {
                _query.query = _val;
                searchJobs();
            } else {
                delete _query.query;
                searchJobs();
            }
        });

        $('.js_job_type_checkbox').click(function() {
            var _this = $(this);
            if(_this.prop('checked')) {
                _jobTypeArr.push(_this.data('val'))
            } else {
                var index = _jobTypeArr.indexOf(_this.data('val'));
                if(index > -1) {
                    _jobTypeArr.splice(index, 1);
                }
            }
            searchJobs();
        });

        $('.js_category').on('change', function() {
            var _val = $(this).val();
            if(_val) {
                _query.category_id = _val;
            } else {
                delete _query.category_id;
            }
            searchJobs();
        });

        $('.js_remote_loc').click(function() {
            var _this = $(this);
            if(_this.prop('checked')) {
                _query.location_type = 'remote';
            } else {
                delete _query.location_type;
            }
            searchJobs();
        });

        $('.js_load_more_btn').click(function() {
            loadMoreJobs();
        });

        $('.js_input_location').on('keyup', function(e) {
            var _val = $(this).val();
            if(!_val) {
                delete _query.street;
                delete _query.area_in;
                delete _query.area;
                delete _query.locality;
                delete _query.city;
                delete _query.state;
                delete _query.country;
                delete _query.pin;
                searchJobs();
                clearGoogleAddress();
            }

        });

        $('.js_reset_category').click(function() {
            $('.js_category').val('').trigger('change');
        });

        $('.js_reset_location').click(function() {
            $('.js_input_location').val('');
            $('.js_remote_loc').prop('checked', false);
            delete _query.city;
            delete _query.location_type;
            searchJobs();
        });

        $('.js_reset_jobType').click(function() {
            $('.js_job_type_checkbox').prop('checked', false);
            _jobTypeArr = [];
            searchJobs();
        });

    }

    function clearGoogleAddress() {
        $('.js_street').val('');
        $('.js_area_in').val('');
        $('.js_area').val('');
        $('.js_locality').val('');
        $('.js_city').val('');
        $('.js_state').val('');
        $('.country').val('');
        $('.js_postal_code').val('');
        $('.js_full_address').val('');
        $('.js_place_id').val('');
    }

    function salaryMinMaxTimeOut(from, to) {
        if(_setTimeout) {
            clearTimeout(_setTimeout);
        }
        _setTimeout = setTimeout(function() {
            _query.salary_min = from;
            _query.salary_max = to;
            searchJobs();
        }, 1500);
    }

    function updateInputs(data) {
        var from = data.from;
        var to   = data.to;

        $('.js-input-from').prop('value', from);
        $('.js-input-to').prop('value', to);

        if(_isPageLoad) {
            salaryMinMaxTimeOut(from, to);
        }
        _isPageLoad = true;
    }

    function bindRangeSlider() {
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

    function bindGooglePlaceSeacrhClickEvents() {
        function fillAddress(place, element) {
            if(place) {
                element.find('.js_area,.js_locality,.js_city,.js_state,.js_country').val('');
                $('.js_place_id').val(place.place_id);
                $('.js_full_address').val(place.formatted_address);
                for(var i = 0; i < place.address_components.length; i++) {
                    switch(place.address_components[i].types[0]) {
                        case 'route':
                            element.find('.js_street').val(place.address_components[i].long_name);
                            break;
                        case 'sublocality_level_2':
                            element.find('.js_area_in').val(place.address_components[i].long_name);
                            break;
                        case 'sublocality_level_1':
                            element.find('.js_area').val(place.address_components[i].long_name);
                            break;
                        case 'locality':
                            element.find('.js_locality').val(place.address_components[i].long_name);
                            break;
                        case 'administrative_area_level_2':
                            element.find('.js_city').val(place.address_components[i].long_name);
                            break;
                        case 'administrative_area_level_1':
                            element.find('.js_state').val(place.address_components[i].long_name);
                            break;
                        case 'country':
                            element.find('.js_country').val(place.address_components[i].long_name);
                            break;
                        case 'postal_code':
                            element.find('.js_postal_code').val(place.address_components[i].long_name);
                            break;
                    }
                }
                searchByLocation();
            }
        }

        var profile_address_autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('glAdAddress')));
        $('#glAdAddress').on('focus', function() {
            $(this).attr('autocomplete', 'nope');
        });
        profile_address_autocomplete.addListener('place_changed', function() {
            var place = profile_address_autocomplete.getPlace();
            fillAddress(place, $('body'));
        });
    }

    return {
        init:function() {
            bindRangeSlider();
            bindClickEvents();
            bindGooglePlaceSeacrhClickEvents();
        }
    }
}

module.exports = JobSearchHandler();