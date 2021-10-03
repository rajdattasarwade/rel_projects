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

      var nodeUrlAllow = window.location.href.indexOf('node/35');
      var pathUrlAllow = window.location.href.indexOf('personal-loan-emi-calculator');
      Highcharts.setOptions({
        colors: ['#42CA8B', '#FFB73F' , '#C4284E']
      });
      var Piechart, ColumnChart;

      //Piechart = new Highcharts.Chart({
      var pieChartOptions = {
        chart: {
            renderTo: 'CalculatorView',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 300,
        },
        title: false,
        setOptions: {
          colors: ['#50B432', '#ED561B']
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Amount',
            colorByPoint: true,
            data: []
        }]
      };

      Highcharts.setOptions({

        lang: {
          decimalPoint: '.',
          thousandsSep: ','
        },
      });

      //ColumnChart = new Highcharts.Chart({
      var chartype = {
            zoomType: 'xy'
        }
        var chartitle = {
            text: 'Your Loan Repayment Schedule'
        }
        var chartxaxis = [{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            crosshair: true
        }]
        var chartyaxis = [{ // Primary yAxis
            labels: {
                format: '₹{value}',
                style: {
                    color: '#3D4051'
                }
            },
            title: {
                text: 'Balance Amount',
                style: {
                    color: '#3D4051'
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'EMI Payment / Year',
                style: {
                    color: '#3D4051'
                }
            },
            labels: {
                format: '₹{value}',
                style: {
                    color: '#3D4051'
                }
            },
            opposite: true
        }]
        var chartooltip = {
            shared: true
        }
        var chartlegend = {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
        }
        var plotoptions = {
          column: {
                stacking: 'normal'
            },
            series: {
              label: {
                  connectorAllowed: false
              },
              marker: {
                enabled: true,
                radius: 5
              },
              pointStart: 2021,
              showInLegend: false, 
          }
        }
        var chartseries = [{
            name: 'Principal',
            type: 'column',
            yAxis: 1,
            data: [],
            tooltip: {
              valuePrefix: ' ₹'
            },
            stackLabels: {
                formatter: function () {
                        return '' + Highcharts.numberFormat(this.total, 2, ',', ' ');
                },
                enabled: true
            }

        }, 
      {
        name: 'Interest',
            type: 'column',
            yAxis: 1,
            data: [],
            tooltip: {
              valuePrefix: ' ₹'
            },
            stackLabels: {
                formatter: function () {
                        return '' + Highcharts.numberFormat(this.total, 2, ',', '');
                },
                enabled: true
            }
        },
        {
            name: 'Balance Amount',
            type: 'spline',
            data: [],
            tooltip: {
                valuePrefix: '₹'
            }
        }];

        var columnChartOptions = {
            chart: chartype,
            title: chartitle,
            xAxis: chartxaxis,
            yAxis:chartyaxis,
            tooltip: chartooltip,
            legend:chartlegend,
            series: chartseries,
            plotOptions: plotoptions,
        };
        // http://kidsysco.github.io/jquery-ui-month-picker/
        //var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        //var d = new Date();
        //var monthName=months[d.getMonth()]; 
        //var currYear=d.getFullYear();
        /*if(nodeUrlAllow > 0 || pathUrlAllow > 0){
          jQuery('#MonthPicker').MonthPicker({
            SelectedMonth: monthName+", "+currYear,
            MinMonth: 1,
            MonthFormat: 'MM, yy', // Short month name, Full year.
            AltFormat: '@', // Unix time stamp.
            AltField: '#serverValue' // Selector for hidden input.
          });
        }*/
        


      function loanRangeSlider(id, min, max, from, step) {
        
        jQuery(id).ionRangeSlider({
            min: min,
            max: max,
            from: from,
            grid: false,
            step: step,
            prettify_separator: ",",
            onStart: function () {
                var $inp = jQuery(id);
                var from = $inp.prop("value"); // reading input value
                //console.log("onstart"+from);
                var irsSingle = jQuery(id).parents(".range-slider-wrap").find(".irs-single").text();
                //console.log(irsSingle);
                //jQuery(id).parent(".range-slider-wrap").find(".form-control").val(irsSingle);
                jQuery(id).parent(".range-slider-wrap").find(".form-control").val(from);
            },
            onChange: function () {
                var $inp = jQuery(id);
                var from = $inp.prop("value"); // reading input value
                //console.log("onchange"+from);
                var irsSingle = jQuery(id).parents(".range-slider-wrap").find(".irs-single").text();
                jQuery(id).parent(".range-slider-wrap").find(".form-control").val(from);
            },
            onFinish: function() {
              var $inp = jQuery(id);
              var from = $inp.prop("value"); // reading input value
              //console.log("onfinish"+from);
              var irsSingle = jQuery(id).parents(".range-slider-wrap").find(".irs-single").text();
              jQuery(id).parent(".range-slider-wrap").find(".form-control").val(from);
              emiCalculate(pieChartOptions,columnChartOptions, nodeUrlAllow, pathUrlAllow);
            }
        });

        var $input = jQuery(id).parent().find(".form-control");
        $input.on("input", function() {

            var irsMin = jQuery(this).parents(".range-slider-wrap").find(".left_value").text(),
                irsMax = jQuery(this).parents(".range-slider-wrap").find(".right_value").text();

            var id = jQuery(this).parents(".range-slider-wrap").find(".js-range-slider");

            instance = jQuery(id).data("ionRangeSlider");
            console.log(instance);

            var val = jQuery(this).prop("value");
            instance.update({
                from: val
            });
            
        });

        $input.on("blur", function() {
          emiCalculate(pieChartOptions,columnChartOptions, nodeUrlAllow, pathUrlAllow);
        });
    }

      loanRangeSlider("#LoanAmt", 20000, 1000000, 100000,  10000 );
      loanRangeSlider("#InterestRate", 10, 36, 18,  0.25 );
      loanRangeSlider("#Tenure", 3, 60, 24,  1 );

      emiCalculate(pieChartOptions,columnChartOptions, nodeUrlAllow, pathUrlAllow);
  });

    function emiCalculate(pieChartOptions,columnChartOptions, nodeUrlAllow, pathUrlAllow){
      

      var loanAmt = jQuery("#LoanAmt").parent(".range-slider-wrap").find(".form-control").val();
      var interestRate = jQuery("#InterestRate").parent(".range-slider-wrap").find(".form-control").val();
      var tenureMnths = jQuery("#Tenure").parent(".range-slider-wrap").find(".form-control").val();
      var keyVals = { "P":loanAmt,"i":interestRate, "n":tenureMnths }
      jQuery.ajax({
        type: 'POST',
        url: ajaxApiUrlOrigin+"/mapi/emi-calculator-post.json", 
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
          jQuery("#monthlyEmiDiv").html("₹ "+result.monthlyEmi);
          jQuery("#principalAmtDiv").html("₹ "+result.principalAmt);
          jQuery("#interestAmtDiv").html("₹ "+result.totalInterestAmt);
          jQuery("#totalPaymentDiv").html("₹ "+result.totalPayment);
          /*chart.series[0].addPoint({ name: "Principal", y: result.principalAmt});
          chart.series[0].addPoint({ name: "Interest", y: result.totalInterestAmt});*/
          pieChartOptions.series[0].data = [];
          pieChartOptions.series[0].data.push({
                name: 'Principal',
                y: parseFloat(result.principalAmt),
                sliced: false,
                selected: false
            });  

          pieChartOptions.series[0].data.push({
                name: 'Interest',
                y: parseFloat(result.totalInterestAmt)
            });

          chart = new Highcharts.Chart(pieChartOptions);

          if(nodeUrlAllow > 0 || pathUrlAllow > 0){
            //console.log(columnChartOptions.series);
            columnChartOptions.series[0].data = [];
            columnChartOptions.series[1].data = [];
            columnChartOptions.series[2].data = [];
            //console.log(columnChartOptions);
            var tableBody = "";
            tableBody += "<thead><tr><th>Year</th><th>"+result.yearlyData[1].emiText+"</th><th>Interest (Yearly)</th><th>Principal (Yearly)</th><th>Outstanding Balance</th></tr></thead><tbody>"
            //console.log(result.yearlyData);
            for (let [key, value] of Object.entries(result.yearlyData)) {
              var tdHtml= "<tr><td>"+value.year+"</td><td>"+value.monthlyEmi+"</td><td>"+value.yearlyInterest+"</td><td>"+value.yearlyPrincipal+"</td><td>"+value.outstandingBalance+"</td></tr>";
              tableBody += tdHtml;
              columnChartOptions.series[0].data.push(value.yearlyPrincipal);
              columnChartOptions.series[1].data.push(value.yearlyInterest);
              columnChartOptions.series[2].data.push(value.outstandingBalance);
            };
            jQuery('#ScheduleGraph').highcharts(columnChartOptions);
            jQuery('#repaymentScheduleTable').html(tableBody);
          }
        }
      });
    }

    /*function addZeroes(num) {
    // Convert input string to a number and store as a variable.
        var value = Number(num);      
    // Split the input string into two arrays containing integers/decimals
        var res = num.split(".");     
    // If there is no decimal point or only one decimal place found.
        if(res.length == 1 || res[1].length < 3) { 
    // Set the number to two decimal places
            value = value.toFixed(2);
        }
    // Return updated or original number.
    return value;
    }*/

    /*function addZeroes(num) {
       return num.toLocaleString("en", {useGrouping: false, minimumFractionDigits: 2})
    }*/

    function isNumberKey(evt){
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if (charCode == 46 || (charCode >= 48 || charCode <= 57)){
        return true;
      }
      return false;
    }