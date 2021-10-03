jQuery(document).ready(function(){

  jQuery(".main_wrapper").mCustomScrollbar({
    theme:"dark",
    autoHideScrollbar: true,
  });

  jQuery(".btn-humburger").click(function(){
    jQuery(".sidebar").toggleClass("slide");
    jQuery("body").toggleClass("menu-open");
  });

  jQuery(document).mouseup(function(e) 
  {
      var nav = jQuery(".sidebar");

      // if the target of the click isn't the container nor a descendant of the container
      if (!nav.is(e.target) && nav.has(e.target).length === 0) 
      {
          jQuery(".sidebar").removeClass("slide");
          jQuery("body").removeClass("menu-open");
      }
  });

});