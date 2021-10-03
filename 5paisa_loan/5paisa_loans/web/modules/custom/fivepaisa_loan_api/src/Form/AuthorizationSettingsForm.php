<?php
/**
 * @file
 * Contains \Drupal\fivepaisa_loan_api\Form\AuthorizationSettingsForm.
 */

namespace Drupal\fivepaisa_loan_api\Form;
use Drupal\Core\Form\ConfigFormBase;  
use Drupal\Core\Form\FormStateInterface;  

class AuthorizationSettingsForm extends ConfigFormBase {  
	/**  
   * {@inheritdoc}  
   */  
  protected function getEditableConfigNames() {  
    return [  
      'fivepaisa_loan_api.adminsettings',  
    ];  
  }  

  /**  
   * {@inheritdoc}  
   */  
  public function getFormId() {  
    return 'fivepaisa_loan_api_authorization_settings_form';  
  } 

	/**  
	* {@inheritdoc}  
	*/  
  public function buildForm(array $form, FormStateInterface $form_state) {  
    $config = $this->config('fivepaisa_loan_api.adminsettings');  
  
    // Development Section Start
    $form['headergroup'] = array(
      '#type' => 'fieldset',
      '#title' => t('Development Api Section'),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,  
    );
    
    $form['headergroup']['basicauth'] = array(
      '#type' => 'fieldset',
      '#title' => t('Basic Authentication'),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,  
    );

    $form['headergroup']['headsection'] = array(
      '#type' => 'fieldset',
      '#title' => t('Head Section'),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,  
    );

    $form['headergroup']['basicauth']['api_username'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('Api Username'),  
      '#description' => $this->t('Api Username for api authorization'),  
      '#default_value' => $config->get('api_username'),  
    ];

    $form['headergroup']['basicauth']['api_password'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('Api Password'),  
      '#description' => $this->t('Api Password for api authorization'),  
      '#default_value' => $config->get('api_password'),  
    ];  

    $form['headergroup']['headsection']['product'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('Product'),  
      '#description' => $this->t('Header section product key'),  
      '#default_value' => $config->get('product'),  
    ];

    $form['headergroup']['headsection']['source'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('Source'),  
      '#description' => $this->t('Header section source key'),  
      '#default_value' => $config->get('source'),  
    ]; 

    $form['headergroup']['headsection']['sourcedby'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('Source'),  
      '#description' => $this->t('Header section sourcedBy key'),  
      '#default_value' => $config->get('sourcedby'),  
    ]; 

    $form['headergroup']['headsection']['headerkey'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('Key'),  
      '#description' => $this->t('Header section key'),  
      '#default_value' => $config->get('headerkey'),  
    ];

    $form['headergroup']['headsection']['headerkey'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('Key'),  
      '#description' => $this->t('Header section key'),  
      '#default_value' => $config->get('headerkey'),  
    ];

    $form['headergroup']['headsection']['appversion'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('App Version'),  
      '#description' => $this->t('Header section appversion key'),  
      '#default_value' => $config->get('appversion'),  
    ];

    $form['headergroup']['headsection']['ip'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('IP'),  
      '#description' => $this->t('Header section ip key'),  
      '#default_value' => $config->get('ip'),  
    ];

    // Development Section End


    // Production Section Start
    $form['prodheadergroup'] = array(
      '#type' => 'fieldset',
      '#title' => t('Production Api Section'),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,  
    );
    
    $form['prodheadergroup']['basicauth'] = array(
      '#type' => 'fieldset',
      '#title' => t('Basic Authentication'),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,  
    );

    $form['prodheadergroup']['headsection'] = array(
      '#type' => 'fieldset',
      '#title' => t('Head Section'),
      '#collapsible' => FALSE,
      '#collapsed' => FALSE,  
    );

    $form['prodheadergroup']['basicauth']['prod_api_username'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('Api Username'),  
      '#description' => $this->t('Api Username for api authorization'),  
      '#default_value' => $config->get('prod_api_username'),  
    ];

    $form['prodheadergroup']['basicauth']['prod_api_password'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('Api Password'),  
      '#description' => $this->t('Api Password for api authorization'),  
      '#default_value' => $config->get('prod_api_password'),  
    ];  

    $form['prodheadergroup']['headsection']['prod_product'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('Product'),  
      '#description' => $this->t('Header section product key'),  
      '#default_value' => $config->get('prod_product'),  
    ];

    $form['prodheadergroup']['headsection']['prod_source'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('Source'),  
      '#description' => $this->t('Header section source key'),  
      '#default_value' => $config->get('prod_source'),  
    ]; 

    $form['prodheadergroup']['headsection']['prod_sourcedby'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('Source'),  
      '#description' => $this->t('Header section sourcedBy key'),  
      '#default_value' => $config->get('prod_sourcedby'),  
    ]; 

    $form['prodheadergroup']['headsection']['prod_headerkey'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('Key'),  
      '#description' => $this->t('Header section key'),  
      '#default_value' => $config->get('prod_headerkey'),  
    ];

    $form['prodheadergroup']['headsection']['prod_appversion'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('App Version'),  
      '#description' => $this->t('Header section appversion key'),  
      '#default_value' => $config->get('prod_appversion'),  
    ];

    $form['prodheadergroup']['headsection']['prod_ip'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('IP'),  
      '#description' => $this->t('Header section ip key'),  
      '#default_value' => $config->get('prod_ip'),  
    ];
    // Production Section Start

    return parent::buildForm($form, $form_state);  
  } 

  /**  
   * {@inheritdoc}  
   */  
  public function submitForm(array &$form, FormStateInterface $form_state) {  
    parent::submitForm($form, $form_state);  

    $this->config('fivepaisa_loan_api.adminsettings')  
      ->set('api_username', $form_state->getValue('api_username'))
      ->set('api_password', $form_state->getValue('api_password')) 
      ->set('product', $form_state->getValue('product')) 
      ->set('source', $form_state->getValue('source')) 
      ->set('sourcedby', $form_state->getValue('sourcedby')) 
      ->set('headerkey', $form_state->getValue('headerkey')) 
      ->set('appversion', $form_state->getValue('appversion'))
      ->set('ip', $form_state->getValue('ip')) 
      ->set('prod_api_username', $form_state->getValue('prod_api_username'))
      ->set('prod_api_password', $form_state->getValue('prod_api_password')) 
      ->set('prod_product', $form_state->getValue('prod_product')) 
      ->set('prod_source', $form_state->getValue('prod_source')) 
      ->set('prod_sourcedby', $form_state->getValue('prod_sourcedby')) 
      ->set('prod_headerkey', $form_state->getValue('prod_headerkey')) 
      ->set('prod_appversion', $form_state->getValue('prod_appversion'))
      ->set('prod_ip', $form_state->getValue('prod_ip'))    
      ->save();  
  } 

} 

