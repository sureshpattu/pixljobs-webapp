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
