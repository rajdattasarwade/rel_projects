<?php

namespace Drupal\fivepaisa_loan_api\Routing;

use Drupal\Core\Routing\RouteSubscriberBase;
use Symfony\Component\Routing\RouteCollection;

/**
 * Listens to the dynamic route events.
 */
class RouteSubscriber extends RouteSubscriberBase {

  /**
   * {@inheritdoc}
   */
  protected function alterRoutes(RouteCollection $collection) {
    // Define custom access for '/user/login'.
    /*if ($route = $collection->get('user.login')) {
      $route->setRequirement('_custom_access', 'Drupal\example\Access\StandardAccessCheck::access');
    }
    // Define custom access for '/user/logout'.
    if ($route = $collection->get('user.logout')) {
      $route->setRequirement('_custom_access', 'example.services_access_checker::access');
    }
  }*/

    /*$request = \Drupal::request();
    $session = $request->getSession();*/
    //echo "<pre>"; print_r($session->get('token'));
    //print_r($collection->all()); 
    /*foreach ($collection->all() as $route) {
      if (strpos($route->getPath(), '/node/60') === 0) {
        $route->setRequirement('_custom_access_check', 'Drupal\fivepaisa_loan_api\Access\CustomAccessCheck::access');
        //$route->setRequirement('_access', 'FALSE');
      }
    }*/
    //exit;

  }

}