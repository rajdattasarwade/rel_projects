<?php
/**
 * @file
 * Contains \Drupal\fivepaisa_loan_app\Form\PartnerContactUs.
 */
namespace Drupal\fivepaisa_loan_app\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

class PartnerContactUs extends FormBase {
  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'partner_contact_us_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    $form['partner_contact_full_name'] = array(
      '#type' => 'textfield',
      '#title' => t('Full Name'),
      '#required' => TRUE,
      /*'#prefix' => '<div class="input_field"><span class="prefix">+91</span>',
      '#suffix' => '</div><p class="note">We we need: PAN NO., Aadhar Card, Bank Account No.</p>',*/
    );

    $form['partner_contact_email'] = array(
      '#type' => 'textfield',
      '#title' => t('Email'),
      '#required' => TRUE,
      /*'#prefix' => '<div class="input_field"><span class="prefix">+91</span>',
      '#suffix' => '</div><p class="note">We we need: PAN NO., Aadhar Card, Bank Account No.</p>',*/
    );

    $form['partner_contact_mobile_no'] = array(
      '#type' => 'textfield',
      '#title' => t('Mobile Number'),
      '#required' => TRUE,
    );

    $form['partner_contact_message'] = array(
      '#type' => 'textfield',
      '#title' => t('Message'),
      '#required' => TRUE,
      /*'#prefix' => '<div class="input_field"><span class="prefix">+91</span>',
      '#suffix' => '</div><p class="note">We we need: PAN NO., Aadhar Card, Bank Account No.</p>',*/
    );

    $form['actions']['#type'] = 'actions';
    $form['actions']['submit'] = array(
      '#type' => 'submit',
      '#value' => $this->t('Send'),
      '#button_type' => 'primary',
    );
    return $form;
  }

  /**
   * Validate the select field of the form
   * 
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   * 
   */

  public function validateForm(array &$form, FormStateInterface $form_state){
    //parent::validateForm($form, $form_state);
    
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

    /*drupal_set_message($this->t('@employee_name ,Your application is being submitted!', array('@emp_name' => $form_state->getValue('employee_name'))));*/
    
  }
}