<?php
/**
 * @file
 * Contains \Drupal\fivepaisa_loan_app\Form\ModeSettingsForm.
 */

namespace Drupal\fivepaisa_loan_app\Form;
use Drupal\Core\Form\ConfigFormBase;  
use Drupal\Core\Form\FormStateInterface;  

class ModeSettingsForm extends ConfigFormBase {  
	/**  
   * {@inheritdoc}  
   */  
  protected function getEditableConfigNames() {  
    return [  
      'fivepaisa_loan_app.adminsettings',  
    ];  
  }  

  /**  
   * {@inheritdoc}  
   */  
  public function getFormId() {  
    return 'fivepaisa_loan_app_mode_settings_form';  
  } 

	/**  
	* {@inheritdoc}  
	*/  
  public function buildForm(array $form, FormStateInterface $form_state) {  
    $config = $this->config('fivepaisa_loan_app.adminsettings');  

    $form['mode'] = array(
		'#type' => 'radios',
		'#title' => t('Select your mode'),
		'#description' => t('Development or Production'),
		'#options' => array(1 => 'Development',2 => 'Production'),
		'#default_value' => $config->get('mode'), 
	);

    $form['development_api_url'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('Development Api Url'),  
      '#description' => $this->t('Development Api Url'),  
      '#default_value' => $config->get('development_api_url'),  
    ];

    $form['production_api_url'] = [  
      '#type' => 'textfield',  
      '#title' => $this->t('Production Api Url'),  
      '#description' => $this->t('Production Api Url'),  
      '#default_value' => $config->get('production_api_url'),  
    ];  

    return parent::buildForm($form, $form_state);  
  } 

  /**  
   * {@inheritdoc}  
   */  
  public function submitForm(array &$form, FormStateInterface $form_state) {  
    parent::submitForm($form, $form_state);  

    $this->config('fivepaisa_loan_app.adminsettings')  
      ->set('mode', $form_state->getValue('mode'))
      ->set('development_api_url', $form_state->getValue('development_api_url'))
      ->set('production_api_url', $form_state->getValue('production_api_url'))  
      ->save();  
  } 

} 

