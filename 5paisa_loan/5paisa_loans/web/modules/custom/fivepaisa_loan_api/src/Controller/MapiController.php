<?php
/**
 * @file
 * Contains \Drupal\fivepaisa_loan_api\Controller\MapiController.
 */

namespace Drupal\fivepaisa_loan_api\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\DependencyInjection\ContainerInterface;
use GuzzleHttp\ClientInterface;

use Drupal\Component\Render\FormattableMarkup;
use GuzzleHttp\Exception\GuzzleException;
use Spipu\Html2Pdf\Html2Pdf;
use Dompdf\Dompdf;
/**
 * Controller routines for mapi routes.
 */
class MapiController extends ControllerBase {

  /**
   * Guzzle\Client instance.
   *
   * @var \GuzzleHttp\ClientInterface
   */
  protected $httpClient;
  public $apiMode;
  public $apiEndpoint;
  public $apiUsername;
  public $apiPassword;
  public $head;
  /**
   * {@inheritdoc}
   */
  public function __construct(ClientInterface $http_client) {
    $this->httpClient = $http_client;
    $config = \Drupal::config('fivepaisa_loan_app.adminsettings');
    $this->apiMode = $config->get('mode');
    $config2 = \Drupal::config('fivepaisa_loan_api.adminsettings');
    if($this->apiMode == 1){            // For Development
      $this->apiEndpoint = $config->get('development_api_url');
      $this->apiUsername = $config2->get('api_username');
      $this->apiPassword = $config2->get('api_password');
      $this->head = [
            "product" => $config2->get('product'),
            "source" => $config2->get('source'),
            "sourcedBy" => $config2->get('sourcedby'),
            "key" => $config2->get('headerkey'),
            "appVersion" => $config2->get('appversion'),
            "ipAddress" => "100.0.0.0"
          ];
    } else if($this->apiMode == 2){     // For Production
      $this->apiEndpoint = $config->get('production_api_url');
      $this->apiUsername = $config2->get('prod_api_username');
      $this->apiPassword = $config2->get('prod_api_password');
      $this->head = [
            "product" => $config2->get('prod_product'),
            "source" => $config2->get('prod_source'),
            "sourcedBy" => $config2->get('prod_sourcedby'),
            "key" => $config2->get('prod_headerkey'),
            "appVersion" => $config2->get('prod_appversion'),
            "ipAddress" => "100.0.0.0"
          ];
    }
    
  }

   /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('http_client')
    );
  }
  
  public function loginwithpassword( Request $request ) {

    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
      if(empty($data["username"]) || empty($data["password"]) || empty($data['dob'])){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
      } else {
        $apiUrl = $this->apiEndpoint."/v4/login/5paisa-existinguser-login";
        $body["Head"] = $this->head;
        
        $body["Body"] = [
          "ClientCode" => $data['username'],
          "Password" => $data['password'],
          "DOB" => $data['dob'],
          //"ClientCode" => "pL6ci9sOb19zXdVeXM247A==",
          //"Password" => "+PMtfej7whK6g0HsvdF53Q==",
          //"DOB" => "YAftqUV3rrXnbuCkD9Z+LA==",
          "Is5pConcernAgreed" => "Y",
          "PromoCode" => null
        ];
        $options = json_encode($body);
        //echo $apiUrl; exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options);
        $response = json_decode($make_call, true);
        if($response['head']['statusCode']==0){
          /*$tempstore = \Drupal::service('tempstore.private')->get('usersession');
          $tempstore->set('userid', $response["body"]["registrationId"]);
          $tempstore->set('name', $response["body"]["name"]);
          $tempstore->set('token', $response["body"]["token"]);
          $tempstore->set('usertype', $response["body"]["userType"]);
          $tempstore->set('stageId', $response["body"]["stageId"]);
          $tempstore->set('is5PCustomer', $response["body"]["is5PCustomer"]);
          $tempstore->set('isBankVerified', $response["body"]["isBankVerified"]);
          $tempstore->set('isAuthenticated', $response["body"]["isAuthenticated"]);*/
          $session = $request->getSession();
          $session->set('userid', $response["body"]["registrationId"]);
          $session->set('name', $response["body"]["name"]);
          $session->set('token', $response["body"]["token"]);
          $session->set('usertype', $response["body"]["userType"]);
          $session->set('stageId', $response["body"]["stageId"]);
          $session->set('is5PCustomer', $response["body"]["is5PCustomer"]);
          $session->set('isBankVerified', $response["body"]["isBankVerified"]);
          $session->set('isAuthenticated', $response["body"]["isAuthenticated"]);
        }
      }
    } else {
      $response['head']["statusMessage"] = array("message"=>"Error in headers");
      $response['head']["statusCode"] = "403";
    }
    return new JsonResponse($response);
  }


  public function forgotpassword( Request $request ) {

    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
      if(empty($data["emailclient"])){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
      } else {
        $apiUrl = $this->apiEndpoint."/v1/login/forgot-password-otp-generation";
        $body["Head"] = $this->head;

        $body["Body"] = [
          "UserId" => "52715111"
          //"UserId" => $data["emailclient"]
        ];
        $options = json_encode($body);
        //echo $apiUrl; exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options);
        $response = json_decode($make_call, true);
      }
    } else {
      $response['head']["statusMessage"] = array("message"=>"Error in headers");
      $response['head']["statusCode"] = "403";
    }
    return new JsonResponse($response);
  }

  public function resetpassword( Request $request ) {

    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
      if(empty($data["emailclient"]) || empty($data["newpassword"])  || empty($data["otp"])){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
      } else {
        $apiUrl = $this->apiEndpoint."/v1/login/5paisa-change-password";
        $body["Head"] = $this->head;

        $body["Body"] = [
          //"UserId" => "52715111"
          "UserId" => $data["emailclient"],
          "NewPassword" => $data["newpassword"],
          "Token" => $data['otp']
        ];
        $options = json_encode($body);
        //echo $apiUrl; exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options);
        $response = json_decode($make_call, true);
      }
    } else {
      $response['head']["statusMessage"] = array("message"=>"Error in headers");
      $response['head']["statusCode"] = "403";
    }
    return new JsonResponse($response);
  }
  
  public function loginwithotp( Request $request ) {

    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
      if(empty($data["mobno"])){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
      } else {
        $apiUrl = $this->apiEndpoint."/v2/login/send-otp";
        $body["Head"] = $this->head;
        $body["Head"]["source"] = "mob";
        $body["Head"]["sourcedBy"] = "mob";

        $body["Body"] = [
          //"UserId" => "52715111"
          "ApplicationName" => "P2P",
          "UserId" => $data["mobno"],
          "EmailID" => "",
          "Requester" => "login"
        ];
        $options = json_encode($body);
        //echo $apiUrl; exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options);
        $response = json_decode($make_call, true);
      }
    } else {
      $response['head']["statusMessage"] = array("message"=>"Error in headers");
      $response['head']["statusCode"] = "403";
    }
    return new JsonResponse($response);
  }

  public function verifyotp( Request $request ) {

    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
      if(empty($data["mobno"]) && empty($data["otp"])){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
      } else {
        $apiUrl = $this->apiEndpoint."/v2/login/verify-otp";
        $body["Head"] = $this->head;

        $body["Body"] = [
          "Otp" => $data["otp"],
          "MobileNo" => $data["mobno"],
          "Requester" => "login"
        ];
        $options = json_encode($body);
        //echo $apiUrl; exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options);
        $response = json_decode($make_call, true);
        if($response['head']['statusCode']==0){
          /*$tempstore = \Drupal::service('tempstore.private')->get('usersession');
          $tempstore->set('userid', $response["body"]["registrationID"]);
          $tempstore->set('name', $response["body"]["name"]);
          $tempstore->set('token', $response["body"]["token"]);
          $tempstore->set('usertype', $response["body"]["userType"]);
          $tempstore->set('stageId', $response["body"]["stageId"]);
          $tempstore->set('is5PCustomer', $response["body"]["is5PCustomer"]);
          $tempstore->set('isBankVerified', $response["body"]["isBankVerified"]);
          $tempstore->set('isAuthenticated', $response["body"]["isAuthenticated"]);*/
          $session = $request->getSession();
          $session->set('userid', $response["body"]["registrationID"]);
          $session->set('name', $response["body"]["name"]);
          $session->set('token', $response["body"]["token"]);
          $session->set('usertype', $response["body"]["userType"]);
          $session->set('stageId', $response["body"]["stageId"]);
          $session->set('is5PCustomer', $response["body"]["is5PCustomer"]);
          $session->set('isBankVerified', $response["body"]["isBankVerified"]);
          $session->set('isAuthenticated', $response["body"]["isAuthenticated"]);
        }
      }
    } else {
      $response['head']["statusMessage"] = array("message"=>"Error in headers");
      $response['head']["statusCode"] = "403";
    }
    return new JsonResponse($response);
  }

  // This api will give disbursed,locked and available amount for Investment Summary Section
  public function lenderinvestmentsummary( Request $request ) {
    //echo "<helloooo>"; print_r('hasdfasdf'); exit;
    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
      if(empty($data["userid"]) && empty($request->headers->get( 'FivePLoan' ))){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
      } else {
        $apiUrl = $this->apiEndpoint."/v1/lender/investment-summary";
        $body["Head"] = $this->head;

        $body["Body"] = [
          "RegistrationId" => $data["userid"]
        ];
        $headers = "FivePLoan: ".$request->headers->get( 'FivePLoan' );
        $options = json_encode($body);
        //echo $apiUrl; exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options, $headers);
        $response = json_decode($make_call, true);
      }
    } else {
      $response['head']["statusMessage"] = array("message"=>"Error in headers");
      $response['head']["statusCode"] = "403";
    }
    return new JsonResponse($response);
  }

  // This api will give currentValue field for Investment Summary Section
  public function lenderinvestmentsummaryv2( Request $request ) {
    //echo "<helloooo>"; print_r('hasdfasdf'); exit;
    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
      if(empty($data["userid"]) && empty($request->headers->get( 'FivePLoan' ))){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
      } else {
        $apiUrl = $this->apiEndpoint."/v2/lender/investment-summary";
        $body["Head"] = $this->head;

        $body["Body"] = [
          "RegistrationId" => $data["userid"]
        ];
        $headers = "FivePLoan: ".$request->headers->get( 'FivePLoan' );
        $options = json_encode($body);
        //echo $apiUrl; exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options, $headers);
        $response = json_decode($make_call, true);
        // In resposne will get current value field
      }
    } else {
      $response['head']["statusMessage"] = array("message"=>"Error in headers");
      $response['head']["statusCode"] = "403";
    }
    return new JsonResponse($response);
  }

  public function lenderdisbursementsummary( Request $request ) {
    //echo "<helloooo>"; print_r('hasdfasdf'); exit;
    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
      if(empty($data["userid"]) && empty($request->headers->get( 'FivePLoan' ))){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
      } else {
        $apiUrl = $this->apiEndpoint."/v1/lender/investment-summary-details";
        $body["Head"] = $this->head;

        $body["Body"] = [
          "RegistrationId" => $data["userid"]
        ];
        $headers = "FivePLoan: ".$request->headers->get( 'FivePLoan' );
        $options = json_encode($body);
        //echo $apiUrl; exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options, $headers);
        $response = json_decode($make_call, true);
      }
    } else {
      $response['head']["statusMessage"] = array("message"=>"Error in headers");
      $response['head']["statusCode"] = "403";
    }
    return new JsonResponse($response);
  }

  public function lendermonthlyemidetails( Request $request ) {
    //echo "<helloooo>"; print_r('hasdfasdf'); exit;
    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
      if(empty($data["userid"]) && empty($request->headers->get( 'FivePLoan' ))){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
      } else {
        $apiUrl = $this->apiEndpoint."/v4/lender/lender-upcomingemi-details-download";
        $body["Head"] = $this->head;

        if(!isset($data['pageindex'])){
          $data['pageindex'] = 1;
        }
        if(!isset($data['pagesize'])){
          $data['pagesize'] = 50;
        }

        $body["Body"] = [
          "RegistrationId" => $data["userid"],
          "LoanID"=> "",
          "Month"=> date('F'),
          "Year"=> date('Y'),
          "PageIndex"=> $data['pageindex'],
          "PageSize"=> $data['pagesize'],
          "IsDownload"=> null,
          "Param1"=> "",
          "Param2"=> "",
          "Param3"=> ""
        ];
        $headers = "FivePLoan: ".$request->headers->get( 'FivePLoan' );
        $options = json_encode($body);
        //echo $apiUrl; exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options, $headers);
        $response = json_decode($make_call, true);
      }
    } else {
      $response['head']["statusMessage"] = array("message"=>"Error in headers");
      $response['head']["statusCode"] = "403";
    }
    return new JsonResponse($response);
  }

  public function lendermonthlyemidetailsdownload( Request $request ) {
    
    if(empty($_REQUEST["userid"]) && empty($_REQUEST["token"])){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
        echo json_encode($response); exit;
      } else {
        $apiUrl = $this->apiEndpoint."/download/lender-emi-list";
        $body["Head"] = $this->head;

        if(!isset($_REQUEST['pageindex'])){
          $_REQUEST['pageindex'] = 1;
        }
        if(!isset($_REQUEST['pagesize'])){
          $_REQUEST['pagesize'] = 50;
        }

        $body["Body"] = [
          "RegistrationId" => $_REQUEST["userid"],
          "LoanID"=> "",
          "Month"=> date('F'),
          "Year"=> date('Y'),
          "PageIndex"=> $_REQUEST['pageindex'],
          "PageSize"=> $_REQUEST['pagesize'],
          "IsDownload"=> null,
          "Param1"=> "",
          "Param2"=> "",
          "Param3"=> ""
        ];

        $headers = "FivePLoan: ".$_REQUEST["token"];
        $options = json_encode($body);
        //echo $apiUrl; exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options, $headers);
        $response = json_decode($make_call, true);
        //echo "<pre>"; print_r($response['body']['downLoadContent']); exit;
        //$html2pdf = new Html2Pdf('P','A4','en', false, 'UTF-8', array(mL, mT, mR, mB)); 
        /*$html2pdf = new Html2Pdf(); 
        $html2pdf->writeHTML($response['body']['downLoadContent']);
        $html2pdf->output('montly-emi-details.pdf', 'D');*/
        // instantiate and use the dompdf class
        $dompdf = new Dompdf();
        $dompdf->loadHtml($response['body']['downLoadContent']);

        // (Optional) Setup the paper size and orientation
        $dompdf->setPaper('A4', 'landscape');

        // Render the HTML as PDF
        $dompdf->render();

        // Output the generated PDF to Browser
        $dompdf->stream();
        exit;
      }
  }


  public function lenderaccountstatementget( Request $request ) {
    //echo "<helloooo>"; print_r('hasdfasdf'); exit;
    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
      if(empty($data["userid"]) && empty($request->headers->get( 'FivePLoan' ))){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
      } else {
        $apiUrl = $this->apiEndpoint."/v2/common/get-account-statement";
        $body["Head"] = $this->head;

        if(!isset($data['pageindex'])){
          $data['pageindex'] = 1;
        }
        if(!isset($data['pagesize'])){
          $data['pagesize'] = 50;
        }

        /*$body["Body"] = [
          "RegistrationID" => $data["userid"],
          "FilterValue" => "principal",
          "FromDate" => $data['fromdate'],
          "ToDate" => $data['todate'],
          "PageIndex" => $data['pageindex'],
          "PageSize" => $data['pagesize'],
          "IsDownload" => null,
          "Param1" => "",
          "Param2" => "",
          "Param3" => ""
        ];*/
        $body["Body"] = [
          "RegistrationID"=>$data["userid"],
          "FilterValue"=>"principal",
          "FromDate"=>$data['fromdate'],
          "ToDate"=>$data['todate'],
          "PageIndex"=>$data['pageindex'],
          "PageSize"=>$data['pagesize'],
          "IsDownload"=>null,
          "Param1"=>"",
          "Param2"=>"",
          "Param3"=>""
        ];
        
        $headers = "FivePLoan: ".$request->headers->get( 'FivePLoan' );
        $options = json_encode($body, JSON_UNESCAPED_SLASHES);
        //echo $options; exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options, $headers);
        $response = json_decode($make_call, true);
      }
    } else {
      $response['head']["statusMessage"] = array("message"=>"Error in headers");
      $response['head']["statusCode"] = "403";
    }
    return new JsonResponse($response);
  }

  public function lenderaccountstatementdownload( Request $request ) {
    //echo "<helloooo>"; print_r($_POST); exit;
      if(empty($_REQUEST["userid"]) && empty($_REQUEST["token"])){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
        echo json_encode($response); exit;
      } else {
        $apiUrl = $this->apiEndpoint."/download/get-account-statement";
        $body["Head"] = $this->head;

        if(!isset($_REQUEST['pageindex'])){
          $_REQUEST['pageindex'] = 1;
        }
        if(!isset($_REQUEST['pagesize'])){
          $_REQUEST['pagesize'] = 50;
        }

        if(isset($_REQUEST['fromDatepickerDate']) && empty($_REQUEST['fromDatepickerDate'])){
          $_REQUEST['fromDatepickerDate'] = null;
        }
        if(isset($_REQUEST['toDatepickerDate']) && empty($_REQUEST['toDatepickerDate'])){
          $_REQUEST['toDatepickerDate'] = null;
        }

        $body["Body"] = [
          "RegistrationID" => $_REQUEST["userid"],
          "FromDate" => $_REQUEST['fromDatepickerDate'],
          "ToDate" => $_REQUEST['toDatepickerDate'],
          "PageIndex" => $_REQUEST['pageindex'],
          "PageSize" => $_REQUEST['pagesize'],
          "IsDownLoad" => "Y"
        ];

        $headers = "FivePLoan: ".$_REQUEST["token"];
        $options = json_encode($body);
        //echo $apiUrl; exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options, $headers);
        $response = json_decode($make_call, true);
        //echo "<pre>"; print_r($response); exit;
        /*$html2pdf = new Html2Pdf('P','A4','en', false, 'UTF-8', array(mL, mT, mR, mB)); 
        $html2pdf->writeHTML($response['body']['downLoadContent']);
        $html2pdf->output('account-statement.pdf', 'D');*/
        $dompdf = new Dompdf();
        $dompdf->loadHtml($response['body']['downLoadContent']);

        // (Optional) Setup the paper size and orientation
        $dompdf->setPaper('A4', 'landscape');

        // Render the HTML as PDF
        $dompdf->render();

        // Output the generated PDF to Browser
        $dompdf->stream();
        exit;
      }
  }

  public function lendercontactus( Request $request ) {
    //echo "<helloooo>"; print_r('hasdfasdf'); exit;
    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
      if(empty($data["message"]) && empty($data["name"]) && empty($data["userid"])){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
      } else {
        $connection = \Drupal::service('database');
        $result = $connection->insert('contactus')
        ->fields(['name', 'registrationid', 'message', 'usertype'])
        ->values([
          'name' => $data["name"],
          'registrationid' => $data["userid"],
          'message' => $data["message"],
          'usertype' => $data["usertype"],
          'email' => isset($data["email"]) ? $data['email'] : null
        ])
        ->execute();
        $response['head']["statusMessage"] = array("message"=>"Your query is submitted successfully!");
        $response['head']["statusCode"] = "0";
      }
    } else {
      $response['head']["statusMessage"] = array("message"=>"Error in headers");
      $response['head']["statusCode"] = "403";
    }
    return new JsonResponse($response);
  }

  public function lenderportfolioperformance( Request $request ) {
    //echo "<helloooo>"; print_r('hasdfasdf'); exit;
    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
      if(empty($data["userid"]) && empty($request->headers->get( 'FivePLoan' ))){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
      } else {
        $apiUrl = $this->apiEndpoint."/v1/lender/lender-portfolio-performance-details";
        $body["Head"] = $this->head;

        $body["Body"] = [
          "RegistrationId" => $data["userid"],
          "Param1" => "",
          "Param2" => "",
          "Param3" => ""
        ];
        $headers = "FivePLoan: ".$request->headers->get( 'FivePLoan' );
        $options = json_encode($body);
        //echo $apiUrl; exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options, $headers);
        $response = json_decode($make_call, true);
        // In resposne will get current value field
      }
    } else {
      $response['head']["statusMessage"] = array("message"=>"Error in headers");
      $response['head']["statusCode"] = "403";
    }
    return new JsonResponse($response);
  }

  public function lenderriskallocationgraph( Request $request ) {
    //echo "<helloooo>"; print_r('hasdfasdf'); exit;
    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
      if(empty($data["userid"]) && empty($data["portfoliotype"]) && empty($request->headers->get( 'FivePLoan' ))){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
      } else {
        $apiUrl = $this->apiEndpoint."/v1/lender/risk-wise-distribution";
        $body["Head"] = $this->head;

        $body["Body"] = [
          "RegistrationId" => $data["userid"],
          "PortfolioName" => $data["portfoliotype"]
        ];
        $headers = "FivePLoan: ".$request->headers->get( 'FivePLoan' );
        $options = json_encode($body);
        //echo $apiUrl; exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options, $headers);
        $response = json_decode($make_call, true);
        // In resposne will get current value field
      }
    } else {
      $response['head']["statusMessage"] = array("message"=>"Error in headers");
      $response['head']["statusCode"] = "403";
    }
    return new JsonResponse($response);
  }

  public function logout( Request $request ) {

    /*$tempstore = \Drupal::service('tempstore.private')->get('usersession');
    $tempstore->delete('userid');
    $tempstore->delete('name');
    $tempstore->delete('token');
    $tempstore->delete('usertype');
    $tempstore->delete('stageId');
    $tempstore->delete('is5PCustomer');
    $tempstore->delete('isBankVerified');
    $tempstore->delete('isAuthenticated');*/
    $session = $request->getSession();
    $session->remove('userid');
    $session->remove('name');
    $session->remove('token');
    $session->remove('usertype');
    $session->remove('stageId');
    $session->remove('is5PCustomer');
    $session->remove('isBankVerified');
    $session->remove('isAuthenticated');

    $response['head']["statusMessage"] = array("message"=>"Session deleted! user is logged out.");
    $response['head']["statusCode"] = "0";
    return new JsonResponse($response);
  }

  public function borroweroverview( Request $request ) {
    //echo "<helloooo>"; print_r('hasdfasdf'); exit;
    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
      if(empty($data["userid"]) && empty($request->headers->get( 'FivePLoan' ))){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
      } else {
        $apiUrl = $this->apiEndpoint."/v3/borrower/borrower-summary";
        $body["Head"] = $this->head;

        if(!isset($data['pageindex'])){
          $data['pageindex'] = 1;
        }
        if(!isset($data['pagesize'])){
          $data['pagesize'] = 50;
        }

        $body["Body"] = [
          "RegistrationId" => $data["userid"],
          "PageIndex" => $data['pageindex'],
          "PageSize" => $data['pagesize']
        ];
        $headers = "FivePLoan: ".$request->headers->get( 'FivePLoan' );
        $options = json_encode($body);
        //echo $apiUrl; exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options, $headers);
        $response = json_decode($make_call, true);
        $session = $request->getSession();
        //$session->set('loanid', $response["body"]["loanId"]);
      }
    } else {
      $response['head']["statusMessage"] = array("message"=>"Error in headers");
      $response['head']["statusCode"] = "403";
    }
    return new JsonResponse($response);
  }

  public function borrowernoc( Request $request ) {
    $session = $request->getSession();
    if(empty($_REQUEST["userid"]) && empty($_REQUEST["token"])){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
        echo json_encode($response); exit;
      } else {
        $apiUrl = $this->apiEndpoint."/download/loan-noc";
        $body["Head"] = $this->head;

        $body["Body"] = [
          "RegistrationId" => $_REQUEST["userid"],
          "LoanID"=> $_SESSION["loanid"],
          //"LoanID"=> "A569920442",
        ];
        /*if($_REQUEST["userid"]=="51591974"){
          $body["Body"]["LoanID"] = "A569920442";
        } else if($_REQUEST["userid"]=="51774687"){
          $body["Body"]["LoanID"] = "A506399877";
        }*/
        $headers = "FivePLoan: ".$_REQUEST["token"];
        $options = json_encode($body);
        //echo $apiUrl; exit;
        //echo "<pre>"; print_r($_SESSION); print_r($session->get("loanid")); print_r($body); print_r($options); exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options, $headers);
        $content = $make_call;
        $response = json_decode($make_call, true);
        //echo json_last_error(); exit;
        if (json_last_error() === 0) {
            // JSON is valid
          $url = Url::fromRoute('entity.node.canonical', ['node' => 67]);
          $returnResponse = new RedirectResponse($url->toString());
          
          $session->set('nocmsg', "File not found");
          return $returnResponse;
        } else {
          $path = 'sites/default/files/pdf/noc.pdf';
          // save PDF buffer
          file_put_contents($path, $content);

          // ensure we don't have any previous output
          if(headers_sent()){
              exit("PDF stream will be corrupted - there is already output from previous code.");
          }

          header('Cache-Control: public, must-revalidate, max-age=0'); // HTTP/1.1
          header('Pragma: public');
          header('Expires: Sat, 26 Jul 1997 05:00:00 GMT'); // Date in the past
          header('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT');

          // force download dialog
          header('Content-Type: application/force-download');
          header('Content-Type: application/octet-stream', false);
          header('Content-Type: application/download', false);

          // use the Content-Disposition header to supply a recommended filename
          header('Content-Disposition: attachment; filename="'.basename($path).'";');
          header('Content-Transfer-Encoding: binary');
          header('Content-Length: '.filesize($path));
          header('Content-Type: application/pdf', false);

          // send binary stream directly into buffer rather than into memory
          readfile($path);

          // make sure stream ended
          exit();
        }
      }
  }

  public function borroweremioverdue( Request $request ) {
    //echo "<helloooo>"; print_r('hasdfasdf'); exit;
    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
      if(empty($data["userid"]) && empty($request->headers->get( 'FivePLoan' ))){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
      } else {
        $apiUrl = $this->apiEndpoint."/v1/borrower/loan-outstanding-amount";
        $body["Head"] = $this->head;

        $body["Body"] = [
          "RegistrationID" => $data["userid"]
        ];
        $headers = "FivePLoan: ".$request->headers->get( 'FivePLoan' );
        $options = json_encode($body);
        //echo $apiUrl; exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options, $headers);
        $response = json_decode($make_call, true);
      }
    } else {
      $response['head']["statusMessage"] = array("message"=>"Error in headers");
      $response['head']["statusCode"] = "403";
    }
    return new JsonResponse($response);
  }

  public function borrowerforeclosure( Request $request ) {
    //echo "<helloooo>"; print_r('hasdfasdf'); exit;
    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
      if(empty($data["userid"]) && empty($request->headers->get( 'FivePLoan' ))){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
      } else {
        $apiUrl = $this->apiEndpoint."/v3/borrower/borrower-preclosure-request";
        $body["Head"] = $this->head;

        if(!isset($data['pageindex'])){
          $data['pageindex'] = 1;
        }
        if(!isset($data['pagesize'])){
          $data['pagesize'] = 50;
        }

        $body["Body"] = [
          "RegistrationID" => $data["userid"]
        ];
        $headers = "FivePLoan: ".$request->headers->get( 'FivePLoan' );
        $options = json_encode($body);
        //echo $apiUrl; exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options, $headers);
        $response = json_decode($make_call, true);
      }
    } else {
      $response['head']["statusMessage"] = array("message"=>"Error in headers");
      $response['head']["statusCode"] = "403";
    }
    return new JsonResponse($response);
  }


  public function borrowerpaynow( Request $request ) {
    //echo "<helloooo>"; print_r('hasdfasdf'); exit;
    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
      if(empty($data["userid"]) && empty($request->headers->get( 'FivePLoan' )) && empty($data["transactionamount"]) && empty($data["loanid"]) ){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
      } else {
        $apiUrl = $this->apiEndpoint."/v1/single-signin";
        $body["head"] = $this->head;
        $body["head"]["source"] = "5paisa";
        $body["head"]["sourcedBy"] = "Mobile";

        $body["Body"] = [
          "RegistrationId" => $data["userid"],
          "ProcessName" => "paytm",
          "ProcessParameters" => [
            "TransactionAmount" => $data['transactionamount'],
            "TransLoanId" => $data['loanid'],
            "SubProcessName" => "os-emi",
          ]
        ];
        $headers = "FivePLoan: ".$request->headers->get( 'FivePLoan' );
        $options = json_encode($body);
        //echo $apiUrl; exit;
        //echo "<helloooo>"; print_r($options); exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options, $headers);
        $response = json_decode($make_call, true);
      }
    } else {
      $response['head']["statusMessage"] = array("message"=>"Error in headers");
      $response['head']["statusCode"] = "403";
    }
    return new JsonResponse($response);
  }


  public function borroweraccountstatement( Request $request ) {
    //echo "<helloooo>"; print_r('hasdfasdf'); exit;
    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
      if(empty($data["userid"]) && empty($request->headers->get( 'FivePLoan' )) && empty($data["loanid"]) ){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
      } else {
        $apiUrl = $this->apiEndpoint."/borrower/get-account-statement";
        $body["Head"] = $this->head;

        $body["Body"] = [
          "RegistrationID" => $data["userid"],
          "LoanID" => $data['loanid']
        ];
        $headers = "FivePLoan: ".$request->headers->get( 'FivePLoan' );
        $options = json_encode($body);
        //echo $apiUrl; exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options, $headers);
        $response = json_decode($make_call, true);
      }
    } else {
      $response['head']["statusMessage"] = array("message"=>"Error in headers");
      $response['head']["statusCode"] = "403";
    }
    return new JsonResponse($response);
  }

  public function borroweraccountstatementdownload( Request $request ) {
    //echo "<helloooo>"; print_r($_POST); exit;
      if(empty($_REQUEST["userid"]) && empty($_REQUEST["token"]) && empty($_REQUEST["loanid"])){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
        echo json_encode($response); exit;
      } else {
        $apiUrl = $this->apiEndpoint."/download/borrower-get-account-statement";
        $body["Head"] = $this->head;

        $body["Body"] = [
          "RegistrationID" => $_REQUEST["userid"],
          "LoanID" => $_REQUEST['loanid']
        ];

        $headers = "FivePLoan: ".$_REQUEST["token"];
        $options = json_encode($body);
        //echo $_REQUEST['token']."<br/>";
        //echo $options; exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options, $headers);
        $response = json_decode($make_call, true);
        //echo "<pre>"; print_r($response); exit;
        $html2pdf = new Html2Pdf('P','A4','en', false, 'UTF-8', array(mL, mT, mR, mB)); 
        $html2pdf->writeHTML($response['body']['downLoadContent']);
        $html2pdf->output('account-statement.pdf', 'D');
        exit;
      }
  }

  public function stageinformation( Request $request ) {
    //echo "<helloooo>"; print_r('hasdfasdf'); exit;
    if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
      $data = json_decode( $request->getContent(), TRUE );
      $request->request->replace( is_array( $data ) ? $data : [] );
      if(empty($data["userid"]) && empty($request->headers->get( 'FivePLoan' ))){
        $response['head']["statusMessage"] = array("message"=>"Input values are missing");
        $response['head']["statusCode"] = "403";
      } else {
        $apiUrl = $this->apiEndpoint."/v1/borrower/stage-information";
        $body["Head"] = $this->head;

        $body["Body"] = [
          "registrationId" => $data["userid"],
          "UserType" => $data['usertype'],
          "StageId" => 8
        ];
        $headers = "FivePLoan: ".$request->headers->get( 'FivePLoan' );
        $options = json_encode($body);
        //echo $apiUrl; exit;
        $make_call = $this->callAPI("POST",$apiUrl, $options, $headers);
        $response = json_decode($make_call, true);
        $session = $request->getSession();
        //$session->set('loanid', $response["body"]["loanID"]);
        $_SESSION["loanid"] = $response["body"]["loanID"];
      }
    } else {
      $response['head']["statusMessage"] = array("message"=>"Error in headers");
      $response['head']["statusCode"] = "403";
    }
    return new JsonResponse($response);
  }

  public function callAPI($method, $url, $data, $headers = false){
     $curl = curl_init();
     $userpwd = $this->apiUsername.":".$this->apiPassword;
     switch ($method){
        case "POST":
           curl_setopt($curl, CURLOPT_POST, 1);
           if ($data)
              curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
           break;
        case "PUT":
           curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
           if ($data)
              curl_setopt($curl, CURLOPT_POSTFIELDS, $data);                              
           break;
        default:
           if ($data)
              $url = sprintf("%s?%s", $url, http_build_query($data));
     }
     // OPTIONS:
     curl_setopt($curl, CURLOPT_URL, $url);
     curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        $headers
     ));
     curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
     curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
     curl_setopt($curl, CURLOPT_USERPWD, $userpwd);
     // EXECUTE:
     $result = curl_exec($curl);
     $response['head']["statusMessage"] = array("message"=>"No response in curl call");
     $response['head']["statusCode"] = "404";
     if(!$result){ return json_encode($response);  }
     curl_close($curl);
     return $result;
  }
}