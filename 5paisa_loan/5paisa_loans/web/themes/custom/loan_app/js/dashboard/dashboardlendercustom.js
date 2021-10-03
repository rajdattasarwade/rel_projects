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

var iconrupee='<i class="icon-rupee"></i>';

/*var doc = new jsPDF();
var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};*/

var pathUrlAllow = window.location.href.indexOf('/account-statement');
if(pathUrlAllow>0){
  var fromDate, toDate;
  // Custom filtering function which will search data in column four between two values
  jQuery.fn.dataTable.ext.search.push(
      function( settings, data, dataIndex ) {
          var min = fromDate.val();
          var max = toDate.val();
          var date = new Date( data[4] );
    
          if (
              ( min === null && max === null ) ||
              ( min === null && date <= max ) ||
              ( min <= date   && max === null ) ||
              ( min <= date   && date <= max )
          ) {
              return true;
          }
          return false;
      }
  );
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

jQuery(document).ready(function(){
  
  var userid = jQuery("#userid").val();
  var token = jQuery("#token").val();
  var keyVals = { "userid":userid };  

  jQuery('#logoutBtn').click(function(event){
    window.open(ajaxApiUrlOrigin+"/dashboard-logout","_self");
    /*jQuery.ajax({
      type: 'POST',
      url: ajaxApiUrlOrigin+"/mapi/logout.json", 
      headers: { 'FivePLoan': token },
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
          location.href = ajaxApiUrlOrigin;
        } 
      }
    });*/
  });

  var pathUrlAllow = window.location.href.indexOf('/overview');
  if(pathUrlAllow > 0){

      var windowHt = jQuery(window).outerHeight();
      var tbodyHt = windowHt - 350;

      var table = jQuery('#MonthlyEMI').DataTable({
        "searching": false,
        "ordering": false,
        "lengthChange": false,
        "paging": false,
        "info": false,
        "scrollY":        tbodyHt,
        "scrollCollapse": true,
        /*dom: 'Bfrtip',
          buttons: [
            'excel', 
            'pdf'
          ]*/
      });
      //jQuery(".dt-buttons").prepend("<h6>Download</h6>");

      // $(".dataTables_scrollBody").outerHeight(tbodyHt);
      jQuery(".dataTables_scrollBody").mCustomScrollbar({
        theme:"dark",
        autoHideScrollbar: false,
      });

      jQuery('.summary_sec>.row').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      });
      jQuery.ajax({
        type: 'POST',
        url: ajaxApiUrlOrigin+"/mapi/lenderinvestmentsummary.json", 
        headers: { 'FivePLoan': token },
        data: JSON.stringify(keyVals),
        contentType:"application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function() {
           jQuery('.loader').show();
        },
        complete: function(){
           //jQuery('.loader').hide();
        },
        success: function(result){
          //console.log(result);
          if(parseInt(result.head.statusCode)==0){
             jQuery("#disbursedAmount").html(iconrupee+" "+result.body.investmentSummaryResponseData.disbursedAmount);
             jQuery("#lockedAmount").html(iconrupee+" "+result.body.investmentSummaryResponseData.lockedAmount);
             jQuery("#availableAmount").html(iconrupee+" "+result.body.investmentSummaryResponseData.availableAmount);
          } 
        }
      });

      jQuery.ajax({
        type: 'POST',
        url: ajaxApiUrlOrigin+"/mapi/lenderinvestmentsummaryv2.json", 
        headers: { 'FivePLoan': token },
        data: JSON.stringify(keyVals),
        contentType:"application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function() {
           jQuery('.loader').show();
        },
        complete: function(){
           //jQuery('.loader').hide();
        },
        success: function(result){
          //console.log(result);
          if(parseInt(result.head.statusCode)==0){
             jQuery("#currentValue").html(iconrupee+" "+result.body.currentValue);
          } 
        }
      });


      jQuery.ajax({
        type: 'POST',
        url: ajaxApiUrlOrigin+"/mapi/lenderdisbursementsummary.json", 
        headers: { 'FivePLoan': token },
        data: JSON.stringify(keyVals),
        contentType:"application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function() {
           jQuery('.loader').show();
        },
        complete: function(){
           //jQuery('.loader').hide();
        },
        success: function(result){
          //console.log(result);
          if(parseInt(result.head.statusCode)==0){
             jQuery("#totalInvestment").html(iconrupee+" "+result.body.totalInvestment);
             jQuery("#principalRecovered").html(iconrupee+" "+result.body.principalRecovered);
             jQuery("#interestReceived").html(iconrupee+" "+result.body.interestReceived);
             jQuery("#expectedReturn").html(result.body.expectedReturn + " %");
             jQuery("#principalLost").html(iconrupee+" "+result.body.principalLost);
          } 
        }
      });


      jQuery.ajax({
        type: 'POST',
        url: ajaxApiUrlOrigin+"/mapi/lendermonthlyemidetails.json", 
        headers: { 'FivePLoan': token },
        data: JSON.stringify(keyVals),
        contentType:"application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function() {
           jQuery('.loader').show();
        },
        complete: function(){
           //jQuery('.loader').hide();
        },
        success: function(result){      
          if(parseInt(result.head.statusCode)==0){
             console.log();
             jQuery.each(result.body, function(key, value) {
              table.row.add( [
                monthNames[parseInt(value.emiDate.substring(3, 5))-1],
                value.borrowerName ,
                value.emiAmount ,
                value.status 
              ]).draw();
            });
          } 
        }
      });

      jQuery("#downloadOverviewPdfBtn").click(function(event){
        event.preventDefault();
        console.log("overview 2 download pdf btn hit");
        /*jQuery("#downloadPDFform").attr("action",ajaxApiUrlOrigin+"/mapi/lendermonthlyemidetailsdownload.json?_format=json");*/
        //jQuery('form#downloadOverviewPDFform').submit();
        var downloadUrl = ajaxApiUrlOrigin+"/mapi/lendermonthlyemidetailsdownload.json?_format=json&"+"userid="+userid+"&token="+token+"&pageindex=1&pagesize=20";
        window.open(downloadUrl,"_blank");
      });
   }
  
  var pathUrlAllow = window.location.href.indexOf('/account-statement');
  if(pathUrlAllow>0){

    // Create date inputs
    fromDate = new DateTime(jQuery('#from'), {
        format: 'YYYY-MM-DD'
    });
    toDate = new DateTime(jQuery('#to'), {
      format: 'YYYY-MM-DD'
    });

    /*jQuery( "#from" ).blur(function() {
      alert( "from called" );
    });
    jQuery( "#to" ).blur(function() {
      alert( "To Called" );
    });*/
    // DataTables initialisation
    var windowHt = jQuery(window).outerHeight();
    var tbodyHt = windowHt - 250;

    var table = jQuery('#StatementTbl').DataTable({
      "searching": false,
      "ordering": false,
      "lengthChange": false,
      "paging": false,
      "info": false,
      "scrollY":        tbodyHt,
      "scrollCollapse": true,
      /*dom: 'Bfrtip',
      buttons: [
        'excel', 'pdf'
      ]*/
    });

    // Refilter the table
    /*jQuery('#from, #to').on('change', function () {
        table.draw();
    });*/

    //jQuery(".dt-buttons").prepend("<h6>Download</h6>");

    // jQuery(".dataTables_scrollBody").outerHeight(tbodyHt);
    jQuery(".dataTables_scrollBody").mCustomScrollbar({
      theme:"dark",
      autoHideScrollbar: false,
    });

    jQuery.ajax({
        type: 'POST',
        url: ajaxApiUrlOrigin+"/mapi/lenderaccountstatementget.json", 
        headers: { 'FivePLoan': token },
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
             
             jQuery.each(result.body, function(key, value) {
              table.row.add( [
                value.createdDate,
                value.remark ,
                value.transType ,
                value.amount
                /*value.tranStatus */
              ]).draw();
            });
          } 
        }
      });

    jQuery(document).on('click', '#dateGoBtn', function(){
    //jQuery("#dateGoBtn").click(function(event){
      event.preventDefault();
      jQuery("div.dt-datetime").remove();
      console.log("date go btn hit");
      var fromDatepicker = jQuery('#from').val();
      var toDatepicker = jQuery('#to').val();
      jQuery('#from').blur();
      jQuery('#to').blur();
      if(fromDatepicker!="" && toDatepicker!=""){
        keyVals["fromdate"] = fromDatepicker.toString();
        keyVals["todate"] = toDatepicker.toString();
        table.clear().draw();
        jQuery.ajax({
          type: 'POST',
          url: ajaxApiUrlOrigin+"/mapi/lenderaccountstatementget.json", 
          headers: { 'FivePLoan': token },
          data: JSON.stringify(keyVals),
          contentType:"application/json; charset=utf-8",
          dataType: "json",
          beforeSend: function() {
             jQuery('.loader').show();
             jQuery("div.dt-datetime").remove();
          },
          complete: function(){
             jQuery('.loader').hide();
             jQuery("div.dt-datetime").remove();
          },
          success: function(result){      
            if(parseInt(result.head.statusCode)==0){
               
               jQuery.each(result.body, function(key, value) {
                table.row.add( [
                  value.createdDate,
                  value.remark ,
                  value.transType ,
                  value.amount,
                  value.tranStatus 
                ]).draw();
              });
            } else {
              table.clear().draw();
            }
          }
        });
      }
    });

    jQuery(".dt-buttons").click(function(event){
      event.preventDefault();
      console.log("download pdf btn hit");
      var fromDatepicker = jQuery('#from').val();
      var toDatepicker = jQuery('#to').val();
      jQuery('#fromDatepickerDate').val(fromDatepicker);
      jQuery('#toDatepickerDate').val(toDatepicker);
      jQuery("#downloadPDFform").attr("action",ajaxApiUrlOrigin+"/mapi/lenderaccountstatementdownload.json?_format=json");
      var downloadUrl = ajaxApiUrlOrigin+"/mapi/lenderaccountstatementdownload.json?_format=json&"+"userid="+userid+"&fromDatepickerDate="+fromDatepicker+"&toDatepickerDate="+toDatepicker+"&token="+token+"&pageindex=1&pagesize=20";
      window.open(downloadUrl, "_blank");
      //jQuery('form#downloadPDFform').trigger('submit');

    });
  }

  var pathUrlAllow = window.location.href.indexOf('/contact-us');
  if(pathUrlAllow>0){
    jQuery("#dashboardlendercontactus").submit(function(event){
      event.preventDefault();
      jQuery(".success_message").hide();
      jQuery(".error_message").hide();
      jQuery(".success_message").html("");
      jQuery(".error_message").html("");
      keyVals['name'] = jQuery("#name").val();
      keyVals['message'] = jQuery("#MESSAGE").val();
      keyVals['usertype'] = jQuery("#usertype").val();
      if(jQuery("#MESSAGE").val()!=""){
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
              jQuery("#MESSAGE").val("");
              /*setTimeout(function(){ 
                jQuery(".success_message").hide(); 
                jQuery("#MESSAGE").val("");
              }, 10000);*/
            } 
          }
        });
      } else {
        jQuery(".success_message").hide();
        jQuery(".error_message").show();
        jQuery(".error_message").html("Please enter a message");
        setTimeout(function(){ 
                jQuery(".error_message").hide(); 
              }, 10000);
      }
      

    });
  }
});

var pathUrlAllow = window.location.href.indexOf('/portfolio-performance');
if(pathUrlAllow>0){

  var portfolioTitle = "#portfolioTitle#";
  var totalLoanAmt = "#totalLoanAmt#";
  var locked = "#locked#";
  var disbursed = "#disbursed#";
  var noofborrowers = "#noofborrowers#";
  var returns = "#returns#";
  var lowriskallocid = "#lowriskallocid#";
  var medriskallocid = "#medriskallocid#";
  var highriskallocid = "#highriskallocid#";
  var remAmount = "#remAmount#";

  var replacements = {
    portfolioTitle: "",
    totalLoanAmt: "",
    locked: "",
    disbursed: "",
    noofborrowers: "",
    returns: "",
    lowriskallocid: "",
    medriskallocid: "",
    highriskallocid: "",
    remAmount: "",
  };

  var portFoliotemplate = "";
  portFoliotemplate = '<section class="panel porfolio-panel mb-25">'+
                        '<div class="row m-lr-0 border-right-columns">'+
                          '<div class="col-lg-6">'+
                            '<article class="article">'+
                            '<div class="article_title">'+portfolioTitle+
                            '</div>'+
                            '<div class="article_body">'+
                              '<div class="total_loan_amt">'+
                                '<div class="row align-items-center justify-content-center">'+
                                '<div class="col-auto col-icon">'+
                                '<div class="icon-wrapper">'+
                                '<img width="60" height="60" src="'+ajaxApiUrlOrigin+'/themes/custom/loan_app/images/piggy-bank.png" alt="">'+
                                '</div>'+
                                '</div>'+
                                  '<div class="col-auto">'+
                                    '<h6 class="label_heading">Total Loan Amount</h6>'+
                                    '<h5 class="label_value"><i class="icon-rupee"></i>'+totalLoanAmt+'</h5>'+
                                  '</div>'+
                                '</div>'+
                                '</div>'+
                                '<div class="progress_view d-flex">'+
                                  '<div class="slot founded" style="width: 25%;">'+
                                    '<span class="bar"></span>'+
                                    '<span class="label">'+disbursed+' Funded</span>'+
                                  '</div>'+
                                  '<div class="slot locked" style="width: 25%;">'+
                                    '<span class="bar"></span>'+
                                    '<span class="label">'+locked+' Locked</span>'+
                                  '</div>'+
                                  '<div class="slot remaining" style="width: 50%;">'+
                                    '<span class="bar"></span>'+
                                    '<span class="label">'+remAmount+' Remaining</span>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="attr-value">'+
                                    '<div class="row text-center m-lr-10">'+
                                      '<div class="col">'+
                                        '<h5 class="label_value"><i class="icon-rupee"></i> '+locked+'</h5>'+
                                        '<h5 class="label_heading">Locked</h5>'+
                                      '</div>'+
                                      '<div class="col">'+
                                        '<h5 class="label_value"><i class="icon-rupee"></i> '+disbursed+'</h5>'+
                                        '<h5 class="label_heading">Disbursed</h5>'+
                                      '</div>'+
                                      '<div class="col">'+
                                        '<h5 class="label_value">'+noofborrowers+'</h5>'+
                                        '<h5 class="label_heading">No. of Borrowers</h5>'+
                                      '</div>'+
                                      '<div class="col">'+
                                        '<h5 class="label_value">'+returns+'</h5>'+
                                        '<h5 class="label_heading">Return</h5>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                  '</div>'+
                            '</article>'+
                          '</div>'+
                          '<div class="col-lg-6">'+
                  '<article class="article allocation">'+
                    '<div class="article_title">'+
                      'Portfolio Allocation'+
                    '</div>'+
                    '<div class="article_body">'+
                      '<div class="graphs">'+
                        '<div class="row">'+
                          '<div class="col-4">'+
                            '<div style="height:150px" class="" id="'+lowriskallocid+'-LowRisk"></div>'+
                          '</div>'+
                          '<div class="col-4">'+
                            '<div style="height:150px" class="" id="'+medriskallocid+'-MedRisk"></div>'+
                          '</div>'+
                          '<div class="col-4">'+
                            '<div style="height:150px" class="" id="'+highriskallocid+'-HighRisk"></div>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                      '<ul class="legends">'+
                        '<li><b class="bullet" style="background:#33d4c1;"></b>Disbursed</li>'+
                        '<li><b class="bullet" style="background:#2381fd;"></b>Locked</li>'+
                        '<li><b class="bullet" style="background:#f5a623;"></b>Pending</li>'+
                      '</ul>'+
                    '</div>'+
                  '</article>'+
                '</div>'+
              '</div>'+
            '</section>'

  jQuery(function() {
      var userid = jQuery("#userid").val();
      var token = jQuery("#token").val();
      var keyVals = { "userid":userid }; 
      
      jQuery('#portfolio-container').html("");
      jQuery.ajax({
        type: 'POST',
        url: ajaxApiUrlOrigin+"/mapi/lenderportfolioperformance.json",
        headers: { 'FivePLoan': token },
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
           jQuery('.loader').show();
           var graphAjaxCallLength = result.body.length;
           jQuery.each(result.body, function(key, value) {
              replacements['portfolioTitle'] = value.portfolioType;
              replacements['totalLoanAmt'] = value.investedAmount;
              replacements['locked'] = value.lockedAmount;
              replacements['disbursed'] = value.disbursedAmount;
              replacements['noofborrowers'] = value.noOfBorrowers;
              replacements['returns'] = value.returns;
              replacements['lowriskallocid'] = "allocation"+(parseInt(key)+1);
              replacements['medriskallocid'] = "allocation"+(parseInt(key)+1);
              replacements['highriskallocid'] = "allocation"+(parseInt(key)+1);
              replacements['remAmount'] = value.remAmount;
              var result = portFoliotemplate.replace(/#([^#]+)#/g, (match, key) => {
                // If there's a replacement for the key, return that replacement with a `<br />`. Otherwise, return a empty string.
                return replacements[key] !== undefined
                  ? "" + replacements[key]
                  : "";
              });
              jQuery('#portfolio-container').append(result);

              keyVals['portfoliotype'] = value.portfolioType;
              jQuery.ajax({
                  type: 'POST',
                  url: ajaxApiUrlOrigin+"/mapi/lenderriskallocationgraph.json",
                  headers: { 'FivePLoan': token },
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
                      if(result.body!=null){
                       // start of all charts
                       Highcharts.setOptions({
                          colors: ['#33d4c1', '#2381fd', '#f5a623']
                        });

                        // Create the chart
                        chart = new Highcharts.Chart({
                            chart: {
                                renderTo: "allocation"+(parseInt(key)+1)+"-LowRisk",
                                type: 'pie'
                            },
                            title: {
                                text: 'Low Risk'
                            },
                            plotOptions: {
                              pie: {
                                shadow: true,
                                dataLabels: {
                                  enabled: true,
                                  useHTML : true,
                                  format : this.y +' %',
                                },
                              }
                            },
                            tooltip: {
                                formatter: function() {
                                    return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
                                }
                            },
                            series: [{
                                name: 'Browsers',
                                data: [["Disbursed",result.body.lowInvestedPercentage],["Locked",result.body.lowLockedPercentage],["Pending",result.body.lowRemainingPercentage]],
                                size: '100%',
                                innerSize: '50%',
                                showInLegend:false,
                                dataLabels: {
                                    enabled: false
                                }
                            }]
                        });

                        // Create the chart
                        chart = new Highcharts.Chart({
                            chart: {
                                renderTo: "allocation"+(parseInt(key)+1)+"-MedRisk",
                                type: 'pie'
                            },
                            title: {
                                text: 'Medium Risk'
                            },
                            plotOptions: {
                              pie: {
                                shadow: true,
                                dataLabels: {
                                  enabled: true,
                                  useHTML : true,
                                  format : 'abc',
                                },
                              }
                            },
                            tooltip: {
                                formatter: function() {
                                    return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
                                }
                            },
                            series: [{
                                name: 'Browsers',
                                data: [["Disbursed",result.body.mediumInvestedPercentage],["Locked",result.body.mediumLockedPercentage],["Pending",result.body.mediumRemainingPercentage]],
                                size: '100%',
                                innerSize: '50%',
                                showInLegend:false,
                                dataLabels: {
                                    enabled: false
                                }
                            }]
                        });

                        // Create the chart
                        chart = new Highcharts.Chart({
                            chart: {
                                renderTo: "allocation"+(parseInt(key)+1)+"-HighRisk",
                                type: 'pie'
                            },
                            title: {
                                text: 'High Risk'
                            },
                            plotOptions: {
                              pie: {
                                shadow: true,
                                dataLabels: {
                                  enabled: true,
                                  useHTML : true,
                                  format : 'abc',
                                },
                              }
                            },
                            tooltip: {
                                formatter: function() {
                                    return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
                                }
                            },
                            series: [{
                                name: 'Browsers',
                                data: [["Disbursed",result.body.highInvestedPercentage],["Locked",result.body.highLockedPercentage],["Pending",result.body.highRemainingPercentage]],
                                size: '100%',
                                innerSize: '50%',
                                showInLegend:false,
                                dataLabels: {
                                    enabled: false
                                }
                            }]
                        });
                        // End of all Charts
                        /*console.log(graphAjaxCallLength+" == "+(parseInt(key)+1));
                        if(parseInt(graphAjaxCallLength) == (parseInt(key)+1)){
                          jQuery('.loader').hide();
                        }*/
                      } // End if of result.body!=null
                      jQuery('ul.legends').html('<li><b class="bullet" style="background:#33d4c1;"></b>Disbursed</li><li><b class="bullet" style="background:#2381fd;"></b>Locked</li><li><b class="bullet" style="background:#f5a623;"></b>Pending</li>');
                    }  // End if of result.head.statusCode == 0
                  }
                });

           });
          } 
        }
      });

      

  });
}

jQuery(document).ajaxStop(function() {
  // place code to be executed on completion of last outstanding ajax call here
  //alert('All ajax calls are run');
  jQuery('.loader').hide();
});


function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function genPDF(htmlcontent)
{
   html2canvas(htmlcontent,{
     onrendered:function(canvas){

     var img=canvas.toDataURL("image/png");
     var doc = new jsPDF();
     doc.addImage(img,'JPEG',20,20);
     doc.save('test.pdf');
     }

   });

}

function isDateKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode >= 47 && charCode <= 57)){
      return true;
    }
    return false;
}


window.onload = () => {
 var pathUrlAllow = window.location.href.indexOf('/account-statement');
 if(pathUrlAllow>0){
     const myInput = document.getElementById('from');
     myInput.onpaste = e => e.preventDefault();
     const otpinput = document.getElementById('to');
     otpinput.onpaste = e => e.preventDefault(); 
 }
}