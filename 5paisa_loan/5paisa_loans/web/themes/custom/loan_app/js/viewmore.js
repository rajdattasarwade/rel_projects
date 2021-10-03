jQuery(function () {
    jQuery(".blog_list .column").hide();
    jQuery(".blog_list .column").slice(0, 6).show();
    jQuery(".btn-view_more").on('click', function (e) {
        e.preventDefault();
        jQuery(".blog_list .column:hidden").slice(0, 4).fadeIn();
        if (jQuery(".blog_list .column:hidden").length == 0) {
            jQuery(".btn-view_more").fadeOut('slow');
        }
    });
});