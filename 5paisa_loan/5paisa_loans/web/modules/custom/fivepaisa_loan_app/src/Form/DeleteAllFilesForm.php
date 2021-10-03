<?php
/**
 * @file
 * Contains \Drupal\fivepaisa_loan_app\Form\DeleteAllFilesForm.
 */

namespace Drupal\fivepaisa_loan_app\Form;
use Drupal\Core\Form\ConfigFormBase;  
use Drupal\Core\Form\FormStateInterface;  

class DeleteAllFilesForm extends ConfigFormBase {  
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
    return 'fivepaisa_loan_app_delete_all_files_settings_form';  
  } 

	/**  
	* {@inheritdoc}  
	*/  
  public function buildForm(array $form, FormStateInterface $form_state) {  
    $config = $this->config('fivepaisa_loan_app.adminsettings');  

    $form['files_mode'] = array(
		'#type' => 'radios',
		'#title' => t('Select your mode'),
		'#description' => t('Development or Production'),
		'#options' => array(1 => 'Development',2 => 'Production'),
		'#default_value' => $config->get('mode'), 
	);

    return parent::buildForm($form, $form_state);  
  } 

  /**  
   * {@inheritdoc}  
   */  
  public function submitForm(array &$form, FormStateInterface $form_state) {  
    parent::submitForm($form, $form_state);  
    $path = getcwd();
    echo $path."<br>";
    echo dirname(__DIR__); // prints '/home/public_html/'
    echo dirname(__FILE__);
    $this->config('fivepaisa_loan_app.adminsettings')  
      ->set('files_mode', $form_state->getValue('files_mode'))
      ->save();  
  } 

} 

