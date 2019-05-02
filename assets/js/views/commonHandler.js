function CommonPage() {

    var setHeight = function () {
        var height = $(window).height();
        $('.full-height').css('height', (height));
        $('.page-wrapper').css('min-height', (height));

        var verticalTab = $(".vertical-tab");
        if (verticalTab.length > 0) {
            for (var i = 0; i < verticalTab.length; i++) {
                var $this = $(verticalTab[i]);
                $this.find('ul.nav').css(
                    'min-height', ''
                );
                $this.find('.tab-content').css(
                    'min-height', ''
                );
                height = $this.find('ul.ver-nav-tab').height();
                $this.find('ul.nav').css(
                    'min-height', height + 40
                );
                $this.find('.tab-content').css(
                    'min-height', height + 40
                );
            }
        }
    };

    function EventsToFireOnWindowReady() {

        var toolTipEle = $('[data-toggle="tooltip"]');
        if (toolTipEle.length > 0) {
            toolTipEle.tooltip();
        }

        var popOverEle = $('[data-toggle="popover"]');
        if (popOverEle.length > 0) {
            popOverEle.popover()
        }

        var progressAnim = $('.progress-anim');
        if (progressAnim.length > 0) {
            for (var i = 0; i < progressAnim.length; i++) {
                var $this = $(progressAnim[i]);
                $this.waypoint(function () {
                    var progressBar = $(".progress-anim .progress-bar");
                    for (var i = 0; i < progressBar.length; i++) {
                        $this = $(progressBar[i]);
                        $this.css("width", $this.attr("aria-valuenow") + "%");
                    }
                }, {
                    triggerOnce: true,
                    offset: 'bottom-in-view'
                });
            }
        }

        /*Sidebar Navigation*/
        $("#toggle_nav_btn").on("click", function () {
            $(".wrapper").toggleClass('slide-nav-toggle');
            return false;
        });

        $("#open_right_sidebar").on("click", function () {
            $(".wrapper").toggleClass('open-right-sidebar');
            return false;
        });

        $('.nicescroll-bar').slimscroll({height: '100%', color: '#3cb878', disableFadeOut: true});
        $('.message-nicescroll-bar').slimscroll({height: '320px', color: '#3cb878'});
    }

    return {
        init: function () {
            var user_name_arr = '';
            $(window).on("resize", function () {
                setHeight();
            }).resize();

            EventsToFireOnWindowReady();

            $('.la-anim-1').addClass('la-animate');
            $.get('/user/details', function (data) {
                if (!data.err) {
                    user_name_arr = data.data.name.split('');
                    $('.js_profile_link_global').attr('href', '/profile/settings/' + data.data.user_id);
                    $('.js_user_name_first_char').html(user_name_arr[0]);
                }
            });
        },
        closePreLoader: function () {
            $(".preloader-it").delay(500).fadeOut("slow");
        },
    }
}

module.exports = CommonPage();
