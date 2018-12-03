/*============================================
    Project Name : MedLine
    Company Name : G-Projects
    Company URL: https://themeforest.net/user/g-projects
    Project Description: Medical Care is a Modern HTML template
============================================*/

/*============================================
    START TABLE OF CONTENT
==============================================
    1.  Remove # From URL
    2.  Camera Slider
    3.  News Carusel
    4.  Accordion
    5.  Doctors Filters
    6.  Magnific Popup
    7.  Ajax Contact Form
    8.  Fix Navbar
    9.  Back To Top Button
    10. Page Preloader
    11. Wow JS
    12. Google Map
==============================================
    END TABLE OF CONTENT
============================================*/

"use strict";

$(document).ready(function () {
    /*--------------------------------------------
    1. Remove # From URL
    --------------------------------------------*/
    $('a[href="#"]').on('click', function (e) {
        e.preventDefault();
    });

    /*--------------------------------------------
    2. Camera Slider
    --------------------------------------------*/
    if ($("section").hasClass('slider')) {
        $("#camera_wrap_1").camera({
            alignment: 'center',
            autoAdvance: false,
            mobileAutoAdvance: true,
            barDirection: 'leftToRight',
            barPosition: 'bottom',
            loader: 'none',
            opacityOnGrid: false,
            cols: 12,
            height: '50%',
            playPause: false,
            pagination: false,
            imagePath: 'plugins/camera/images/'
        });
    }

    /*--------------------------------------------
    3. News Carusel
    --------------------------------------------*/
    $("#news-carousel, #comments-carousel").carousel({
        interval: false
    });

    /*--------------------------------------------
    4. Accordion
    --------------------------------------------*/
    var $active = $("#accordion .panel-collapse.in, #accordion-faqs .panel-collapse.in")
        .prev()
        .addClass("active");
    $active
        .find("a")
        .append("<span class=\"fa fa-minus pull-right\"></span>");
    $("#accordion .panel-heading, #accordion-faqs .panel-heading")
        .not($active)
        .find('a')
        .prepend("<span class=\"fa fa-plus pull-right\"></span>");
    $("#accordion, #accordion-faqs").on("show.bs.collapse", function (e) {
        $("#accordion .panel-heading.active")
            .removeClass("active")
            .find(".fa")
            .toggleClass("fa-plus fa-minus");
        $(e.target)
            .prev()
            .addClass("active")
            .find(".fa")
            .toggleClass("fa-plus fa-minus");
    });
    $("#accordion, #accordion-faqs").on("hide.bs.collapse", function (e) {
        $(e.target)
            .prev()
            .removeClass("active")
            .find(".fa")
            .removeClass("fa-minus")
            .addClass("fa-plus");
    });

    /*--------------------------------------------
    5. Doctors Filters
    --------------------------------------------*/
    var $grid = $('#doctors-grid');
    $grid.shuffle({
        itemSelector: '.doctors-grid',
        speed: 500
    });
    $('#doctors-filter li a').on('click', function () {
        $('#doctors-filter li a').removeClass('active');
        $(this).addClass('active');
        var groupName = $(this).attr('data-group');
        $grid.shuffle('shuffle', groupName);
    });

    /*--------------------------------------------
    6. Magnific Popup
    --------------------------------------------*/
    $('.gallery-grid').magnificPopup({
        delegate: 'a.zoom',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    /*--------------------------------------------
    7. Ajax Contact Form
    --------------------------------------------*/
    $(".contact-form").on('submit', function () {
        var rd = this;
        var url = "sendemail.php";
        $.ajax({
            type: "POST",
            url: url,
            data: $(".contact-form").serialize(),
            success: function (data) {
                $(rd).prev().text(data.message).fadeIn().delay(3000).fadeOut();
            }
        });
        return false;
    });

    /*--------------------------------------------
    8. Fix Navbar
    --------------------------------------------*/
    $('#nav').affix({
        offset: {
            top: $('header').height() - $('#nav').height()
        }
    });
    $('body').scrollspy({target: '#nav'});
    /*--------------------------------------------
    9. Back To Top Button
    --------------------------------------------*/
    $(window).on('scroll', function (){
        if($(window).scrollTop() > 300){
            $("#back-to-top").fadeIn(500);
        } else{
            $("#back-to-top").fadeOut(500);
        }
    });
    $('#back-to-top, .back-to-top').on('click', function(e) {
        $('html, body').animate({ scrollTop:0 }, '800');
        return false;
    });

    /*--------------------------------------------
    10. Page Preloader
    --------------------------------------------*/
    $(window).on('load', function (){
        $("#loading").fadeOut(500);
    });

    /*--------------------------------------------
    11. Wow JS
    --------------------------------------------*/
    new WOW().init();

});

/*--------------------------------------------
12. Google Map
--------------------------------------------*/
function initMap() {
    // Create a new StyledMapType object, passing it an array of styles,
    // And the name to be displayed on the map type control.
    var styledMapType = new google.maps.StyledMapType(
        [
            {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#e0efef"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "hue": "#1900ff"
                    },
                    {
                        "color": "#00ddff"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": 700
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#009bdb"
                    }
                ]
            }
        ],
        {name: 'Styled Map'});
    // Create a map object, and include the MapTypeId to add
    // To the map type control.
    var myLatlng = new google.maps.LatLng(31.2468161,121.4310646);
    var mapOptions = {
        zoom: 12,
        center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Hello World!"
    });
    // To add the marker to the map, call setMap();
    marker.setMap(map);
    // Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
}