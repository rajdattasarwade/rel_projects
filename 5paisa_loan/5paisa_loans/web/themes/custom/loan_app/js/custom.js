 var hostOrigin = document.location.origin;
 var localhost = false;
 var development = false;
 var preproduction = true;
 var production = false;
 var ajaxApiUrlOrigin = document.location.origin;
 if(production===true){
   ajaxApiUrlOrigin = document.location.origin;
 } else if(preproduction===true){
   ajaxApiUrlOrigin = document.location.origin;
 } else if(development===true){
   ajaxApiUrlOrigin = document.location.origin+"/5P/loans";
 } else if(localhost===true){
   ajaxApiUrlOrigin = "http://localhost/5paisa_loan/5paisa_loans/web";
 }

jQuery(document).ready(function(){

    jQuery('#lend_borrow-nav a[data-toggle="pill"]').click(function(){
        var targetTab = jQuery(this).attr("data-target-tab");
        jQuery(".main-tab-content > .tab-pane").removeClass("show active");
        jQuery(targetTab).addClass("show active");
    });

    var headerHeight = jQuery("header.header").outerHeight();
    jQuery("body").css("padding-top",headerHeight);

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

      jQuery(".sub_menu li a").click(function(){
        jQuery(".page_nav").fadeOut();
        jQuery(".btn-humburger").removeClass("crossed");
      });
      
      jQuery(".footer .accordian .heading").click(function(){
        jQuery(this).parent().find("ul").slideToggle();
        jQuery(this).parent().toggleClass("active");
        jQuery(this).parents(".column").siblings(".column").find(".accordian ul").slideUp();
        jQuery(this).parents(".column").siblings(".column").find(".accordian").removeClass("active");
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
              dots: true
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              variableWidth: true,
              dots: true
            }
          }
        ]
      }).on('setPosition', function (event, slick) {
        slick.$slides.css('height', slick.$slideTrack.height() + 'px');
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
    });

    jQuery('.popular_articles > .row').slick({
      dots: true,
      infinite: true,
      arrows: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 4000,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
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
            dots: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            dots: true
          }
        }
      ]
    }).on('setPosition', function (event, slick) {
      slick.$slides.css('height', slick.$slideTrack.height() + 'px');
    });

    jQuery(".tab-content .panel_header").click(function(){
      var target = jQuery(this).attr("data-target");
      jQuery("#"+target).toggleClass("show active");
      jQuery("#"+target).siblings(".tab-pane").removeClass("show active");
    });


    jQuery(document).on('click','#contactusBtn',function(){
      //alert('hi');
      var fullname = jQuery("#Name").val();
      var email = jQuery("#EMAIL").val();
      var message = jQuery("#MESSAGE").val();
      /*if( jQuery('#contact-error').length ){
        jQuery("#contact-error").remove();
      }*/
      jQuery("#contact-fullname-error").hide();
      jQuery("#contact-email-error").hide();
      jQuery("#contact-message-error").hide();
      jQuery(".form-input").removeClass('filled');
      
      var error=false;

      if(fullname==""){
        error = true;
        jQuery("#contact-fullname-error").show();
      }
      if(email==""){
        error = true;
        jQuery("#contact-email-error").show();
      }
      if(message==""){
        error = true;
        jQuery("#contact-message-error").show();
      }

      var reg_name_fullname = /^[a-zA-Z\s]*$/;                     
      if(!reg_name_fullname.test(fullname)){ //              
          error = true;
          jQuery("#contact-fullname-error").show();
      }
      if(fullname.length<3){
          error = true;
          jQuery("#contact-fullname-error").show();
          jQuery("#contact-fullname-error").text("Full Name should have minimum 3 characters");
      }
      if(ValidateEmail(email)==false){
        error = true;
        jQuery("#contact-email-error").show();
      }


      if(error==false){
        jQuery("#contact-fullname-error").hide();
        jQuery("#contact-email-error").hide();
        jQuery("#contact-message-error").hide();
        var keyVals = {};
        keyVals['name'] = fullname;
        keyVals['message'] = message;
        keyVals['usertype'] = "F";
        keyVals['email'] = email;
        keyVals['userid'] = uuid();

        jQuery.ajax({
          type: 'POST',
          url: ajaxApiUrlOrigin+"/mapi/lendercontactus.json",
          data: JSON.stringify(keyVals),
          contentType:"application/json; charset=utf-8",
          dataType: "json",
          beforeSend: function() {
             jQuery('.loader').show();
          },
          complete: function(){
             jQuery('.loader').hide();
          },
          success: function(result){      
            if(parseInt(result.head.statusCode)==0){
              //location.href = ajaxApiUrlOrigin;
              jQuery(".success_message").show();
              jQuery(".error_message").hide();
              jQuery(".success_message").html("Query Submitted Successfully!");
              jQuery(".form-input").removeClass('filled');
              jQuery("#Name").val("");
              jQuery("#EMAIL").val("");
              jQuery("#MESSAGE").val("");
              /*setTimeout(function(){ 
                jQuery(".success_message").hide(); 
              }, 10000);*/
            } 
          }
        });
      }

    });


});

jQuery(window).on('load', function(){ 
  jQuery(".slick-slider").each(function(){
    var navLength = jQuery(this).find(".slick-dots li").length;
    if(navLength < 2){
      jQuery(this).find(".slick-dots").hide();
    }
  });
  jQuery("div.card-header").append("<button class='btn-accordian'></button>");
  var pathUrlAllow = window.location.href.indexOf('blogs/');
  if(pathUrlAllow > 0){
    var currBlogDate = jQuery('.blog_desc .date span').html();currBlogDate.substring(5,15);
    currBlogDate = currBlogDate.substring(5,15);
    const blogDateArr = currBlogDate.split("/");
    jQuery('.blog_desc .date span').html(blogDateArr[1]+"-"+blogDateArr[0]+"-"+blogDateArr[2]);
    console.log(blogDateArr);
  }
  
});





function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
  return (false)
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
