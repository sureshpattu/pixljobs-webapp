var ApiUtil       = require('../utils/apiUtil');
var FormValidator = require('../utils/formValidator');

function GoogleAddressHandler() {

    function bindClickEvents() {
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
            bindClickEvents();
        }
    };
}

module.exports = GoogleAddressHandler();