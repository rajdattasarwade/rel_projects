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
jQuery(document).ready(function(){
  
  var userid = jQuery("#userid").val();
  var token = jQuery("#token").val();
  var keyVals = { "userid":userid }; 

  jQuery('#logoutBtn').click(function(event){
    window.open(ajaxApiUrlOrigin+"/dashboard-logout","_self");
  });

  var pathUrlAllow = window.location.href.indexOf('/overview');
  if(pathUrlAllow>0){

  	var windowHt = jQuery(window).outerHeight();
    var tbodyHt = windowHt - 350;

  	var table = jQuery('#MonthlyEMI').DataTable({
	    "searching": false,
	    "ordering": false,
	    "lengthChange": false,
	    "paging": false,
	    "info": false,
	    "scrollY": tbodyHt,
	    "scrollCollapse": true,
	    /*dom: 'Bfrtip',
	      buttons: [
	        'excel', 
	        'pdf'
	      ]*/
	  });
  
 	jQuery.ajax({
	    type: 'POST',
	    url: ajaxApiUrlOrigin+"/mapi/borroweroverview.json", 
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
	      //console.log(result);
	      if(parseInt(result.head.statusCode)==0){
	      	if(result.body!=null){
	      		jQuery("#loanAmount").html(iconrupee+" "+result.body.loanAmount);
		        jQuery("#monthlyEMI").html(iconrupee+" "+result.body.monthlyEMI);
		        jQuery("#loanBalance").html(iconrupee+" "+result.body.loanBalance);
		        jQuery("#roi").html(result.body.roi+"%");
		        jQuery("#tenure").html(result.body.tenure+" months");
		        jQuery("#numberofEMIRemaining").html(result.body.numberofEMIRemaining+" EMI");
		        jQuery("#nextEMIDate").html(result.body.nextEMIDate.substring(0,10));
		        table.clear().draw();
		        jQuery.each(result.body.emiSummary, function(key, value) {
	              table.row.add([
	                value.emiDate,
	                value.emiAmount ,
	                value.principal ,
	                value.interest,
	                value.status 
	              ]).draw();
	            });
	      	}
	      } 
	    }
	});
  keyVals['usertype'] = "B";

  jQuery.ajax({
      type: 'POST',
      url: ajaxApiUrlOrigin+"/mapi/stageinformation.json", 
      headers: { 'FivePLoan': token },
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
        console.log(result);
        if(parseInt(result.head.statusCode)==0){
          
        } 
      }
  });
  }

  var pathUrlAllow = window.location.href.indexOf('/contact-us');
  if(pathUrlAllow>0){
    jQuery("#dashboardborrowercontactus").submit(function(event){
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

var pathUrlAllow = window.location.href.indexOf('/loan-payment');
if(pathUrlAllow>0){
    jQuery('td input[type="checkbox"]').attr("disabled", true);
    jQuery('td #row-1').removeAttr("disabled");
    jQuery('td #row-1').prop('checked', true);
    jQuery('#paynowbtn').prop('disabled', true);

    jQuery('th #all').on('change', function() {     
            jQuery('td input[type="checkbox"]').prop('checked', jQuery(this).prop("checked"));  
            if(jQuery(this).prop('checked')==true){
              jQuery('td input[type="checkbox"]').attr("disabled", true);
              jQuery('#totalAmountPayEmiOverdue').html(iconrupee+jQuery('#paynowtotalamount').val());
              jQuery('#finalpayamt').val(jQuery('#paynowtotalamount').val());
              jQuery('#paynowbtn').prop('disabled', false);
            } else {
              jQuery('td input[type="checkbox"]').attr("disabled", true);
              jQuery('td #row-1').removeAttr("disabled");
              jQuery('#totalAmountPayEmiOverdue').html(iconrupee+ "0");
              jQuery('#paynowbtn').prop('disabled', true);
            }
            console.log(jQuery("#EMIOverdueTbl tbody").find("td.dataTables_empty").length);
            if(jQuery("#EMIOverdueTbl tbody").find("td.dataTables_empty").length>=1){
              jQuery('#totalAmountPayEmiOverdue').html(iconrupee+ "0");
              jQuery('#paynowbtn').prop('disabled', true);
            }
      
    });

    jQuery( "#paynowbtn" ).click(function() {
      keyVals['transactionamount'] = jQuery('#finalpayamt').val();
      keyVals['loanid'] = jQuery('#loanId-0').val();
      jQuery.ajax({
        type: 'POST',
        url: ajaxApiUrlOrigin+"/mapi/borrowerpaynow.json",
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
            window.open(result.body.returnUrl,"_self");
          } 
        }
      });
    });

    jQuery( "#foreclosurepaynowbtn" ).click(function() {
      keyVals['transactionamount'] = jQuery('#foreclosurefinalpayamt').val();
      keyVals['loanid'] = jQuery('#loanId-0').val();
      jQuery.ajax({
        type: 'POST',
        url: ajaxApiUrlOrigin+"/mapi/borrowerpaynow.json",
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
            window.open(result.body.returnUrl,"_self");
          } 
        }
      });
    });

    ForeclosureTab();
    jQuery("#Foreclosure-link").click(function(){
      var cacheForeclosure = jQuery('#cacheForeclosure').val();
      if(parseInt(cacheForeclosure)===0){
        jQuery.ajax({
          type: 'POST',
          url: ajaxApiUrlOrigin+"/mapi/borrowerforeclosure.json",
          headers: { 'FivePLoan': token },
          data: JSON.stringify(keyVals),
          contentType:"application/json; charset=utf-8",
          dataType: "json",
          beforeSend: function() {
             jQuery('.loader').show();
          },
          complete: function(){
             jQuery('.loader').hide();
             jQuery('#cacheForeclosure').val(1);
          },
          success: function(result){      
            if(parseInt(result.head.statusCode)==0){
              jQuery("#principalOutstanding").html(result.body.principalOutstanding);
              jQuery("#overduePrincipal").html(result.body.overduePrincipal);
              jQuery("#overdueInterest").html(result.body.overdueInterest);
              jQuery("#penalCharges").html(result.body.penalCharges);
              jQuery("#brokenPeriodInterest").html(result.body.brokenPeriodInterest);
              jQuery("#prepaymentCharges").html(result.body.prepaymentCharges);
              jQuery("#chequeDefaultCharges").html(result.body.chequeDefaultCharges);
              jQuery("#otherCharges").html(result.body.otherCharges);
              jQuery("#totalAmountPayable").html(iconrupee+result.body.totalAmountPayable);
              jQuery("#foreclosurefinalpayamt").val(result.body.totalAmountPayable);
            } else {
              jQuery('#ForeclosureTbl tbody').html('<tr><td colspan="2" style="text-align:center;">No outstanding loans</td></tr>');
              jQuery('#Foreclosure .panel_sticky_footer').hide();
            }
          }
        });
      }
    });

    jQuery.ajax({
      type: 'POST',
      url: ajaxApiUrlOrigin+"/mapi/borroweremioverdue.json",
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
            var totalAmountPay = 0;
            jQuery.each(result.body, function(key, value) {
              totalAmountPay = totalAmountPay + parseFloat(value.totalOutstandingPayableAmount);
              var trHtml = `<tr id="trRowNo-${value.rowNo}">
                        <td class="selection">
                          <div class="btn-checkbox">
                            <input type="checkbox" id="row-${value.rowNo}">
                            <label for="row-${value.rowNo}" class="checkbox"></label>
                          </div>
                        </td>
                        <td>${value.date}</td>
                        <td>${value.outstandingEMIAmount}</td>
                        <td>${value.outstandingBounceCharge}</td>
                        <td>${value.outstandingPenalty}</td>
                        <input type="hidden" id="rowNo-${key}" value="${value.rowNo}">
                        <input type="hidden" id="loanAmount-${key}" value="${value.loanAmount}">
                        <input type="hidden" id="dueDate-${key}" value="${value.dueDate}">
                        <input type="hidden" id="emiid-${key}" value="${value.emiid}">
                        <input type="hidden" id="loanId-${key}" value="${value.loanId}">
                        <input type="hidden" id="totalOutstandingPayableAmount-${key}" value="${value.totalOutstandingPayableAmount}">
                      </tr>`;
              jQuery('#EMIOverdueTbl tbody').append(trHtml);
            });
            var payAmt = Number((Math.floor(totalAmountPay * 100) / 100).toFixed(2));
            jQuery('#paynowtotalamount').val(payAmt);
            payAmt = 0;
            jQuery('#totalAmountPayEmiOverdue').html(iconrupee+payAmt);
            
            EMIOverdue();
            jQuery('td input[type="checkbox"]').attr("disabled", true);
            jQuery('td #row-1').removeAttr("disabled");
            
        } 
      }
    });


      jQuery(document).on('change', 'td input[type="checkbox"]', function() {
          var indexid = jQuery(this).attr("id").split("-"); 
          var indexRow = parseInt(indexid[1])+1;
          jQuery('td #row-'+indexRow).removeAttr("disabled");

          if(jQuery(this).prop('checked')==false){
            var checkboxLength = jQuery( 'td input[type="checkbox"]' ).length;
            for (var i = indexRow; i <= checkboxLength; i++) {
              jQuery('td #row-'+i ).attr("disabled", true);
              jQuery('td #row-'+i ).prop("checked", false);
            }
          }
          var checkedVal = false;
          var allCheckVal = true;
          var totalCheckboxAmountPayable = 0;
          jQuery( 'td input[type="checkbox"]' ).each(function( index ) {
            if(jQuery( this ).prop('checked')==true){
              var checkedTotPayAmt = jQuery('#totalOutstandingPayableAmount-'+ (parseInt(index))).val();
              checkedVal = true;
              totalCheckboxAmountPayable = totalCheckboxAmountPayable+parseFloat(checkedTotPayAmt);
            }
            if(jQuery( this ).prop('checked')==false){
              allCheckVal = false;
            }
          });
          var payAmt = Number((Math.floor(totalCheckboxAmountPayable * 100) / 100).toFixed(2));
          jQuery('#totalAmountPayEmiOverdue').html(iconrupee+payAmt);
          jQuery('#finalpayamt').val(payAmt);
          if(checkedVal==true){
            jQuery('#paynowbtn').prop('disabled', false);
          } else {
            jQuery('#paynowbtn').prop('disabled', true);
          }
          if(allCheckVal==true){
            jQuery('th #all').prop('checked', true);
          } else {
            jQuery('th #all').prop('checked', false);
          }
      });

      function ForeclosureTab(){
        // DataTables initialisation
        var windowHt = jQuery(window).outerHeight();
        var tbodyHt = windowHt - 420;

        var table = jQuery('#ForeclosureTbl').DataTable({
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
    
        jQuery(".dt-buttons").prepend("<h6>Download</h6>");

        // jQuery(".dataTables_scrollBody").outerHeight(tbodyHt);
        jQuery(".dataTables_scrollBody").mCustomScrollbar({
          theme:"dark",
          autoHideScrollbar: false,
        });
      }

      function EMIOverdue(){
        // DataTables initialisation
        var windowHt = jQuery(window).outerHeight();
        var tbodyHt = windowHt - 260;

        var table = jQuery('#EMIOverdueTbl').DataTable({
          "searching": false,
          "ordering": false,
          "lengthChange": false,
          "paging": false,
          "info": false,
          "scrollY":        tbodyHt,
          "scrollCollapse": true,
        });

        // jQuery(".dataTables_scrollBody").css("height",tbodyHt);
        jQuery(".dataTables_scrollBody").mCustomScrollbar({
          theme:"dark",
          autoHideScrollbar: false,
        });
      }

  }

});


  var pathUrlAllow = window.location.href.indexOf('/account-statement');
  if(pathUrlAllow>0){
    var fromDate, toDate;
    var userid = jQuery("#userid").val();
    var token = jQuery("#token").val();
    var loanid = jQuery("#loanid").val();
    var keyVals = { "userid":userid, "loanid": loanid }; 

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

    fromDate = new DateTime(jQuery('#from'), {
        format: 'DD/MM/YYYY'
    });
    toDate = new DateTime(jQuery('#to'), {
      format: 'DD/MM/YYYY'
    });

    jQuery(document).ready(function() {
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
        "scrollCollapse": true
        /*dom: 'Bfrtip',
        buttons: [
          'pdf'
        ]*/
      });

      // Refilter the table
      jQuery('#from, #to').on('change', function () {
          //table.draw();
      });

      /*jQuery(".dt-buttons").prepend("<h6>Download</h6>");*/

      // jQuery(".dataTables_scrollBody").outerHeight(tbodyHt);
      jQuery(".dataTables_scrollBody").mCustomScrollbar({
        theme:"dark",
        autoHideScrollbar: false,
      });
      var tableTemplate = "";
      jQuery.ajax({
        type: 'POST',
        url: ajaxApiUrlOrigin+"/mapi/borroweraccountstatement.json", 
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
             if(result.body.accountSummary.length==0){
               tableTemplate = `<tr>
                      <td colspan="3" style="text-align:center;">No records found.</td>
                    </tr>`;
               jQuery('#StatementTbl tbody').html(tableTemplate);
             } else {
               jQuery.each(result.body.accountSummary, function(key, value) {
                tableTemplate += `<tr>
                        <td width="30%">${value.valueDate}</td>
                        <td width="50%" class="desc"><div class="text">${value.particulars}</div></td>
                        <td width="20%"><i class="icon-rupee"></i>${value.balance}</td>
                      </tr>`;
              });
              jQuery('#StatementTbl tbody').html(tableTemplate);
             }
             
          } else {
            tableTemplate = `<tr>
                      <td colspan="3" style="text-align:center;">No records found.</td>
                    </tr>`;
            jQuery('#StatementTbl tbody').html(tableTemplate);
          }
        }
      });

    });

    jQuery(document).on('click', '#dateGoBtn', function(){
      event.preventDefault();
      jQuery("div.dt-datetime").remove();
      var fromDatepicker = jQuery('#from').val();
      var toDatepicker = jQuery('#to').val();
      jQuery('#from').blur();
      jQuery('#to').blur();
      var fDate = fromDatepicker.split('/');
      var tDate = toDatepicker.split('/');
      //var fTimestamp = new Date(dArr[1] + "-" + dArr[0] + "-" + dArr[2]).getTime();
      var d1 = new Date(fDate[2]+'-'+fDate[1]+'-'+fDate[0]).getTime()/1000;
      var d2 = new Date(tDate[2]+'-'+tDate[1]+'-'+tDate[0]).getTime()/1000;
      if(fromDatepicker!="" && toDatepicker!=""){
        var tableTemplate = "";
        jQuery.ajax({
          type: 'POST',
          url: ajaxApiUrlOrigin+"/mapi/borroweraccountstatement.json", 
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
               
               jQuery.each(result.body.accountSummary, function(key, value) {
                 var currIterationDate = value.valueDate.split('/');
                 var currRowDate = new Date(currIterationDate[2]+'-'+currIterationDate[1]+'-'+currIterationDate[0]).getTime()/1000;
                //console.log(d1+"<="+currRowDate+" && "+  d2+">="+currRowDate);
                if(d1<=currRowDate && d2>=currRowDate){
                  tableTemplate += `<tr>
                        <td width="30%">${value.valueDate}</td>
                        <td width="50%" class="desc"><div class="text">${value.particulars}</div></td>
                        <td width="20%"><i class="icon-rupee"></i>${value.balance}</td>
                      </tr>`;
                }
              });
              jQuery('#StatementTbl tbody').html(tableTemplate);
            }  else {
              tableTemplate = `<tr>
                        <td colspan="3">No records found.</td>
                      </tr>`;
              jQuery('#StatementTbl tbody').html(tableTemplate);
            }
          }
        });
      }
    });

    jQuery(".dt-buttons").click(function(event){
      event.preventDefault();
      console.log("download pdf btn hit");
      jQuery("#downloadPDFform").attr("action",ajaxApiUrlOrigin+"/mapi/borroweraccountstatementdownload.json?_format=json");
      var downloadUrl = ajaxApiUrlOrigin+"/mapi/borroweraccountstatementdownload.json?_format=json&"+"userid="+userid+"&loanid="+loanid+"&token="+token;
      window.open(downloadUrl, "_blank");
      //jQuery('form#downloadPDFform').trigger('submit');

    });

  }

jQuery(document).ajaxStop(function() {
  jQuery('.loader').hide();
});


/*jQuery(window).on('load', function(){ 
  if(jQuery("div.dt-buttons")){
    jQuery("div.dt-buttons").attr("style","cursor:pointer;");
    jQuery("div.dt-buttons").click(function(){
      var input = jQuery(this).find('button');
      input.trigger('click');
    });
  }
});*/

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