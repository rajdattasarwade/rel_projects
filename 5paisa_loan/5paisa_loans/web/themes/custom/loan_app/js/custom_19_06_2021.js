jQuery(document).ready(function(){

    jQuery('#lend_borrow-nav a[data-toggle="pill"]').click(function(){
        var targetTab = jQuery(this).attr("data-target-tab");
        jQuery(".main-tab-content > .tab-pane").removeClass("show active");
        jQuery(targetTab).addClass("show active");
    });

    var headerHeight = jQuery("header.header").outerHeight();
    jQuery("body").css("padding-top",headerHeight + 50);

    jQuery(window).scroll(function(){
      if (jQuery(this).scrollTop() > 100){
              jQuery('header').addClass("stick");
          }
      else{
          jQuery('header').removeClass("stick");
      }
    });

    jQuery(".btn-humburger").click(function(){
      jQuery(".page_nav").fadeToggle();
      jQuery(this).toggleClass("crossed");
      jQuery("body").toggleClass("menu-open");
    });

    if(jQuery(window).width() < 767){
      jQuery(".menu-item-has-childrens > a").click(function(e){
        e.preventDefault();
        jQuery(this).parent().toggleClass("active");
        jQuery(this).parent().find(".sub_menu").slideToggle();
      });
    }

    jQuery('.three_slide_carousal').slick({
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              variableWidth: true,
            }
          }
        ]
      }).on('setPosition', function (event, slick) {
        slick.$slides.css('height', slick.$slideTrack.height() + 'px');
    });

    jQuery(".footer .accordian .heading").click(function(){
      jQuery(this).parent().find("ul").slideToggle();
      jQuery(this).parent().toggleClass("active");
      jQuery(this).parents(".column").siblings(".column").find("ul").slideUp();
      jQuery(this).parents(".column").siblings(".column").find(".accordian").removeClass("active");
    });

    jQuery("a.smooth_scroll").on('click', function(event) {

      event.preventDefault();
      var target = jQuery(this).attr("href");
      jQuery('html, body').animate({
          scrollTop: jQuery(target).find(".startPoint").offset().top
      }, 800);

      if(jQuery(window).width() < 767){
        jQuery(".btn-humburger").click();
      }
      
    });

    jQuery(".scroll-top").on('click', function(event) {

      event.preventDefault();
      jQuery('html, body').animate({
          scrollTop: jQuery("body").offset().top
      }, 800);
      
    });

    jQuery('.float-label input').focus(function () {
      jQuery(this).parents('.form-group').addClass('focused');
    });

    jQuery('.float-label input').blur(function () {
      var inputValue = jQuery(this).val();
      if (inputValue == "") {
          jQuery(this).removeClass('filled');
          jQuery(this).parents('.form-group').removeClass('focused');
      } else {
          jQuery(this).addClass('filled');
      }
    })

});

jQuery(window).load(function(){
  jQuery(".slick-slider").each(function(){
    var navLength = jQuery(this).find(".slick-dots li").length;
    if(navLength < 2){
      jQuery(this).find(".slick-dots").hide();
    }
  });

  jQuery("div.card-header").append("<button class='btn-accordian'></button>");
});