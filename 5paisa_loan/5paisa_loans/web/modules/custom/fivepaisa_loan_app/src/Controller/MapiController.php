<?php
/**
 * @file
 * Contains \Drupal\fivepaisa_loan_app\Controller\MapiController.
 */

namespace Drupal\fivepaisa_loan_app\Controller;

use Drupal\Core\Controller\ControllerBase;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Controller routines for mapi routes.
 */
class MapiController extends ControllerBase {

  /**
   * Callback for `my-api/get.json` API method.
   */
  /*public function get_example( Request $request ) {

    $response['data'] = 'Some test data to return';
    $response['method'] = 'GET';

    return new JsonResponse( $response );
  }*/

  /**
   * Callback for `my-api/put.json` API method.
   */
  /*public function put_example( Request $request ) {

    $response['data'] = 'Some test data to return';
    $response['method'] = 'PUT';

    return new JsonResponse( $response );
  }*/

  /**
   * Callback for `mapi/emi-calculator-post.json` API method.
   */
  public function post_emi_calculator( Request $request ) {

    // This condition checks the `Content-type` and makes sure to 
    // decode JSON string from the request body into array.
    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
      if(empty($data["P"]) || empty($data["i"]) || empty($data["n"])){
        $response["message"] = "Input values are missing";
        $response["status"] = "error";
      } else {
        $tableArr = [];
        $yearlyTableArr = [];
        $tempArr = [];
        $principalAmt = str_replace(",", "", $data["P"]);
        $interestRate = $data["i"];
        $tenureMnths = $data["n"];
        $interestRatePerMnth = $interestRate/12/100;
        $totalInterestAmt = 0;
        $yearlyInterestAmt = 0;
        $yearlyPrincipalPaidAmt = 0;
        $dividentVal = ($principalAmt * $interestRatePerMnth * pow((1+$interestRatePerMnth), $tenureMnths));
        $divisorVal = (pow((1+$interestRatePerMnth),$tenureMnths)-1);
        $monthlyEmi = round($dividentVal/$divisorVal,2);
        $y=1;
        for ($x = 1; $x <= $tenureMnths; $x++) {
          $tableArr[$x]['monthlyInterest'] = $interestRatePerMnth;
          $tableArr[$x]['principalAmt'] = $principalAmt;
          $tableArr[$x]['interestAmt'] = $totInterestAmt = $yrInterestAmt = round($interestRatePerMnth * $principalAmt,2);
          $tableArr[$x]['principalPaid'] = $yrPrincipalPaidAmt =  round($monthlyEmi - $tableArr[$x]['interestAmt'],2);
          $tableArr[$x]['closingPrincipal'] = round($principalAmt - $tableArr[$x]['principalPaid'],2);
          $totalInterestAmt = $totalInterestAmt + $totInterestAmt;
          $yearlyPrincipalPaidAmt = $yearlyPrincipalPaidAmt + $yrPrincipalPaidAmt;
          $yearlyInterestAmt = $yearlyInterestAmt + $yrInterestAmt;
          if(round($tableArr[$x]['closingPrincipal'])==0){
            $tableArr[$x]['closingPrincipal'] = 0;
          }
          $principalAmt = $tableArr[$x]['closingPrincipal'];

          if($x%12 == 0){
            $yearlyTableArr[$y]["year"] = $y;
            $yearlyTableArr[$y]["monthlyEmi"] = round($yearlyInterestAmt,2)+round($yearlyPrincipalPaidAmt,2);
            $yearlyTableArr[$y]["yearlyInterest"] = round($yearlyInterestAmt,2);
            $yearlyTableArr[$y]["yearlyPrincipal"] = round($yearlyPrincipalPaidAmt,2);
            $yearlyTableArr[$y]["outstandingBalance"] = round($principalAmt,2);
            $yearlyTableArr[$y]["emiText"] = "EMI x 12";
            $yrInterestAmt = 0;
            $yearlyInterestAmt = 0;
            $yrPrincipalPaidAmt = 0;
            $yearlyPrincipalPaidAmt = 0;
            $y++;
          } else if($x==$tenureMnths){
            $yearlyTableArr[$y]["year"] = $y;
            $yearlyTableArr[$y]["monthlyEmi"] = round($yearlyInterestAmt,2)+round($yearlyPrincipalPaidAmt,2);
            $yearlyTableArr[$y]["yearlyInterest"] = round($yearlyInterestAmt,2);
            $yearlyTableArr[$y]["yearlyPrincipal"] = round($yearlyPrincipalPaidAmt,2);
            $yearlyTableArr[$y]["outstandingBalance"] = round($principalAmt,2);
            $yearlyTableArr[$y]["emiText"] = "EMI x ".$tenureMnths;
            $yrInterestAmt = 0;
            $yearlyInterestAmt = 0;
            $yrPrincipalPaidAmt = 0;
            $yearlyPrincipalPaidAmt = 0;
          }
        }

        $response['monthlyEmi'] = $monthlyEmi;
        $response['principalAmt'] = round(str_replace(",", "", $data["P"]),2);
        $response['totalInterestAmt'] = round($totalInterestAmt,2);
        $response['totalPayment'] = round($response['principalAmt'] + $response['totalInterestAmt'],2);
        $response['yearlyData'] = $yearlyTableArr;
      }
    } else {
      $response["message"] = "Error in headers";
      $response["status"] = "error";
    }

    $response['data'] = $tableArr;
    $response['method'] = 'POST';

    return new JsonResponse( $response );
  }

  /**
   * Callback for `my-api/delete.json` API method.
   */
  /*public function delete_example( Request $request ) {

    $response['data'] = 'Some test data to return';
    $response['method'] = 'DELETE';

    return new JsonResponse( $response );
  }*/

}