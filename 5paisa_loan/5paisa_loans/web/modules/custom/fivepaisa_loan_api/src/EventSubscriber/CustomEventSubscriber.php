<?php

namespace Drupal\fivepaisa_loan_api\EventSubscriber;

use Drupal\Core\Url;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
//use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class CustomEventSubscriber implements EventSubscriberInterface {

  /*public function checkForRedirection(GetResponseEvent $event) {
    if ($event->getRequest()->query->get('redirect-me')) {
      $event->setResponse(new RedirectResponse('http://example.com/'));
    }
  }*/

  /**
   * {@inheritdoc}
   */
  /*public static function getSubscribedEvents() {
    $events[KernelEvents::REQUEST][] = array('checkForRedirection');
    return $events;
  }*/

  public function checkForCustomRedirect(RequestEvent $event) {    
    $request = $event->getRequest(); 
    $route_name = $request->attributes->get('_route');
    $current_path = \Drupal::service('path.current')->getPath();
    $request = \Drupal::request();
    $session = $request->getSession();
    $sessionToken = $session->get("token");
    $sessionUserType = $session->get("usertype");

    if($current_path === '/node/60' || $current_path === '/node/61' || $current_path === '/node/62' || $current_path === '/node/63' || $current_path === '/node/64') {
      //echo "enter"; echo $sessionToken; exit;
      if(empty($sessionToken)){
      	$url = Url::fromRoute('entity.node.canonical', ['node' => 59]);
          $event->setResponse(new RedirectResponse($url->toString()));
      }
    } elseif ($current_path === '/node/59') {
      if(!empty($sessionToken)){
        if($sessionUserType=="L"){
          $url = Url::fromRoute('entity.node.canonical', ['node' => 60]);
          $event->setResponse(new RedirectResponse($url->toString()));
        } elseif($sessionUserType=="B") {
          $url = Url::fromRoute('entity.node.canonical', ['node' => 66]);
          $event->setResponse(new RedirectResponse($url->toString()));
        } 
      }
    } elseif ($current_path==='/node/65') {
      $request->getSession()->clear();
      $url = Url::fromRoute('<front>');
      $event->setResponse(new RedirectResponse($url->toString()));
    }

    if($sessionUserType=="L"){
      if($current_path === '/node/66' || $current_path === '/node/67' || $current_path === '/node/68' || $current_path === '/node/69' || $current_path === '/node/71') {
          $url = Url::fromRoute('entity.node.canonical', ['node' => 72]);
          $event->setResponse(new RedirectResponse($url->toString()));
      }
    } elseif ($sessionUserType=="B") {
      if($current_path === '/node/60' || $current_path === '/node/61' || $current_path === '/node/62' || $current_path === '/node/63' || $current_path === '/node/64') {
          $url = Url::fromRoute('entity.node.canonical', ['node' => 72]);
          $event->setResponse(new RedirectResponse($url->toString()));
      }
    }
    
  }
      
  /**
  * {@inheritdoc}
  */
  public static function getSubscribedEvents() {
    return [KernelEvents::REQUEST => [['checkForCustomRedirect']]];
  }

}