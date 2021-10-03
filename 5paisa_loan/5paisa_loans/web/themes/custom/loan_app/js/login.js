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

var counter = 30;
function startCounter(){
  jQuery('span.time').show();
  var interval = setInterval(function() {
    counter--;
    if (counter <= 0) {
        jQuery('span.time').hide();
        clearInterval(interval);
        return;
    }else{
      jQuery('.timer').text(counter);
    }
}, 1000);
}

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

jQuery( "#dob" ).datepicker();

jQuery("#viaPassword").click(function(){
  jQuery("#otpField").hide();
  jQuery(".login_error_message").hide();
  jQuery(".login_error_message").text("");
  jQuery("#PasswordLogin").show();
  jQuery("#OtpLogin").hide();
  jQuery("#viaPassword").hide();
  jQuery("#viaOTP").show();
  jQuery("#btnOtp").hide();
  jQuery("#btnLogin").show();
  jQuery("#callFlag").val("pass");
  jQuery("#mobno").val("");
});

jQuery("#viaOTP").click(function(){
  jQuery(".login_error_message").hide();
  jQuery(".login_error_message").text("");
  jQuery("#PasswordLogin").hide();
  jQuery("#OtpLogin").show();
  jQuery("#viaPassword").show();
  jQuery("#viaOTP").hide();
  jQuery("#btnOtp").show();
  jQuery("#btnLogin").hide();
  jQuery("#callFlag").val("otp");
  jQuery(".inputEmailError").hide();
  jQuery(".inputPwdError").hide();
  jQuery(".inputDobError").hide();
  jQuery("#emailclient").val("");
  jQuery("#password").val("");
  jQuery("#dob").val("");
});

jQuery("#btnSubmit").click(function(){
  jQuery(".login_error_message").hide();
  jQuery(".login_error_message").text("");
  jQuery("#signUpForm").hide();
  jQuery("#btnSubmit").hide();
  jQuery("#msgSent").fadeIn();
});

jQuery('[data-toggle="toast"]').click(function(){
  var target = jQuery(this).attr("data-target");
  jQuery(target).fadeIn().addClass("in");
  setTimeout(function(){
    jQuery('.toastModal').fadeOut().removeClass("in");
  },4000);
});

jQuery( "#loginform" ).submit(function( event ) {
  event.preventDefault();
  jQuery(".login_error_message").hide();
  var callFlag = jQuery("#callFlag").val();
  //console.log(callFlag);
  
  if(callFlag=="otp"){
    var mobno = jQuery("#mobno").val();
    var otpinput = jQuery("#otpinput").val();
    var keyVals = { "mobno":mobno,"otp":otpinput };
    if(otpinput.length>0){
      jQuery.ajax({
        type: 'POST',
        url: ajaxApiUrlOrigin+"/mapi/verifyotp.json", 
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
          //console.log(result);
          if(parseInt(result.head.statusCode)==0){
            jQuery(".login_error_message").hide();
            //location.href = ajaxApiUrlOrigin;
            if(result.body.userType=="L"){
              location.href = ajaxApiUrlOrigin+"/dashboard/lender/overview";
            } else if(result.body.userType=="B"){
              location.href = ajaxApiUrlOrigin+"/dashboard/borrower/overview";
            }
          } else {
            /*jQuery('#otpField').hide();
            jQuery('#btnOtp').show();
            jQuery('#btnLogin').hide();*/
            jQuery(".login_error_message").show();
            jQuery(".login_error_message").text(result.head.statusMessage.message);
          }
        }
      });
    } else {
      setTimeout(function(){
        jQuery(".login_error_message").show();
        jQuery(".login_error_message").text("Please enter otp");
      },4000); 
    }
  } else if(callFlag=="pass"){
    var username = jQuery("#emailclient").val();
    var password = jQuery("#password").val();
    var dob = jQuery("#dob").val();
    var ulErrorMsg = `<ul>`;
    jQuery(".inputEmailError").hide();
    jQuery(".inputPwdError").hide();
    jQuery(".inputDobError").hide();

    if(username==""){
      //jQuery("#emailclient").addClass("is-invalid");
      ulErrorMsg += '<li>Please enter Client Code / Email ID</li>';
      jQuery(".inputEmailError").show();
    }
    if(password==""){
      //jQuery("#password").addClass("is-invalid");
      ulErrorMsg += '<li>Please enter Password</li>';
      jQuery(".inputPwdError").show();
    }
    if(dob==""){
      //jQuery("#dob").addClass("is-invalid");
      ulErrorMsg += '<li>Please enter Date of Birth</li>';
      jQuery(".inputDobError").show();
    }
    ulErrorMsg += '</ul>';

    var keyVals = { "username":username,"password":password, "dob": dob };
    if(username!="" && password!="" && dob!=""){
      jQuery.ajax({
        type: 'POST',
        url: ajaxApiUrlOrigin+"/mapi/loginwithpassword.json", 
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
          //console.log(result);
          if(parseInt(result.head.statusCode)==0){
            jQuery(".login_error_message").hide();
            //location.href = ajaxApiUrlOrigin;
            if(result.body.userType=="L"){
              location.href = ajaxApiUrlOrigin+"/dashboard/lender/overview";
            } else if(result.body.userType=="B"){
              location.href = ajaxApiUrlOrigin+"/dashboard/borrower/overview";
            }
          } else {
            jQuery(".login_error_message").show();
            jQuery(".login_error_message").text(result.head.statusMessage.message);
          }
        }
      });
    } 
    
  }

  
});

jQuery('#forgotpassBtn').click(function(event){
  jQuery(".forgotpass_error_message").hide();
  console.log('forgot pass submit');
  var emailclient = jQuery('#fgtemailclient').val();
  if(emailclient.length > 0){
    var keyVals = { "emailclient":emailclient };
    jQuery.ajax({
        type: 'POST',
        url: ajaxApiUrlOrigin+"/mapi/forgotpassword.json", 
        data: JSON.stringify(keyVals),
        contentType:"application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function() {
           jQuery('.fa-spinner').show();
        },
        complete: function(){
           jQuery('.fa-spinner').hide();
        },
        success: function(result){
          //console.log(result);
          //result.head.statusCode = 0;
          if(parseInt(result.head.statusCode)==0){
            jQuery(".forgotpass_error_message").hide();
            jQuery("#forgotpassCloseBtn").click()
            jQuery('#resetPwModal').modal()
          } else {
            jQuery(".forgotpass_error_message").show();
            jQuery(".forgotpass_error_message").text(result.head.statusMessage.message);
          }
        }
      });
  } else {
    jQuery(".forgotpass_error_message").show();
    jQuery(".forgotpass_error_message").text("Please enter Client Code/Email ID");
  }

});


jQuery('#resetPwdBtn').click(function(event){
  jQuery(".resetpass_error_message").hide();
  console.log('reset pass submit');
  var emailclient = jQuery('#resetpwdemailclient').val();
  var newpassword = jQuery('#newpassword').val();
  var resetotp = jQuery('#resetotp').val();
  if(emailclient.length > 0 && newpassword.length > 0 && resetotp.length > 0){
    var keyVals = { "emailclient":emailclient, "newpassword": newpassword, "otp": resetotp};
    jQuery.ajax({
        type: 'POST',
        url: ajaxApiUrlOrigin+"/mapi/resetpassword.json", 
        data: JSON.stringify(keyVals),
        contentType:"application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function() {
           //jQuery('.loader').show();
        },
        complete: function(){
           //jQuery('.loader').hide();
        },
        success: function(result){
          //console.log(result);
           //result.head.statusCode = 0;
          if(parseInt(result.head.statusCode)==0){
            jQuery(".resetpass_error_message").hide();
            jQuery("#resetPasswordCloseBtn").click();
            jQuery('#successModal').modal();
          } else {
            jQuery(".resetpass_error_message").show();
            jQuery(".resetpass_error_message").text(result.head.statusMessage.message);
          }
        }
      });
  } else {
    jQuery(".resetpass_error_message").show();
    jQuery(".resetpass_error_message").text("Please enter all input values");
  }

});

jQuery(".resend_otp_link").on("click",function(){ 
  jQuery(".resetpass_error_message").hide();
  console.log("resend otp link");
  var emailclient = jQuery('#resetpwdemailclient').val();
  if(emailclient.length>0){
    var keyVals = { "emailclient":emailclient };
    jQuery.ajax({
        type: 'POST',
        url: ajaxApiUrlOrigin+"/mapi/forgotpassword.json", 
        data: JSON.stringify(keyVals),
        contentType:"application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function() {
           //jQuery('.loader').show();
        },
        complete: function(){
           //jQuery('.loader').hide();
        },
        success: function(result){
          console.log("reset success modal message toast");
          //result.head.statusCode = 0;
          if(parseInt(result.head.statusCode)==0){
            jQuery(".resetpass_error_message").hide();
            //console.log("success message");
            jQuery('#resetpass_success_message').show();
            //jQuery(".successMessageToast").fadeIn().addClass("in");
            setTimeout(function(){
              //jQuery('.successMessageToast').fadeOut().removeClass("in");
              jQuery('#resetpass_success_message').hide();
            },4000);
          } else {
            jQuery(".resetpass_error_message").show();
            jQuery(".resetpass_error_message").text(result.head.statusMessage.message);
          }
        }
      });
  } else {
    jQuery(".resetpass_error_message").show();
    jQuery(".resetpass_error_message").text("Please enter Client Code / Email ID");
  }
});

jQuery("#btnOtp").click(function(event){
  event.preventDefault();
  jQuery(".login_error_message").hide();
  jQuery("#btnLogin").hide();
  jQuery("#btnOtp").show();
  jQuery("#callFlag").val("otp");
  var mobno = jQuery("#mobno").val();
  if(mobno.length>0 && mobno.length<=10){
    if(isNaN(mobno)){
      jQuery(".login_error_message").show();
      jQuery(".login_error_message").text("Please enter a valid mobile number");
    } else if(mobno.length!=10){
      jQuery(".login_error_message").show();
      jQuery(".login_error_message").text("Please enter a valid mobile number");
    } 
    else {
      var keyVals = { "mobno":mobno };
      jQuery.ajax({
        type: 'POST',
        url: ajaxApiUrlOrigin+"/mapi/loginwithotp.json", 
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
          //console.log(result);
          if(parseInt(result.head.statusCode)==0){
            jQuery(".login_error_message").hide();
            jQuery("#otpField").show();
            startCounter();
            jQuery("#btnLogin").show();
            jQuery("#btnOtp").hide();
          } else {
            jQuery("#btnLogin").hide();
            jQuery("#btnOtp").show();
            jQuery("#otpField").hide();
            jQuery(".login_error_message").show();
            jQuery(".login_error_message").text(result.head.statusMessage.message);
          }
        }
      });
    }
  } else {
    jQuery("#otpField").hide();
    jQuery("#btnLogin").hide();
    jQuery("#btnOtp").show();
    jQuery(".login_error_message").show();
    jQuery(".login_error_message").text("Please enter a valid mobile number");
  }
});


window.onload = () => {
 const myInput = document.getElementById('mobno');
 myInput.onpaste = e => e.preventDefault();
 const otpinput = document.getElementById('otpinput');
 otpinput.onpaste = e => e.preventDefault(); 
}