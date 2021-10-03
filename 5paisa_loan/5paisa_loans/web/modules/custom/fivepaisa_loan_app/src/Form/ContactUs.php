<?php
/**
 * @file
 * Contains \Drupal\fivepaisa_loan_app\Form\ContactUs.
 */
namespace Drupal\fivepaisa_loan_app\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

class ContactUs extends FormBase {
  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'contact_us_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    $form['contact_full_name'] = array(
      '#type' => 'textfield',
      '#title' => t('Full Name *'),
      '#required' => TRUE,
      /*'#prefix' => '<div class="input_field"><span class="prefix">+91</span>',
      '#suffix' => '</div><p class="note">We we need: PAN NO., Aadhar Card, Bank Account No.</p>',*/
    );

    $form['contact_email'] = array(
      '#type' => 'textfield',
      '#title' => t('Email *'),
      '#required' => TRUE,
      /*'#prefix' => '<div class="input_field"><span class="prefix">+91</span>',
      '#suffix' => '</div><p class="note">We we need: PAN NO., Aadhar Card, Bank Account No.</p>',*/
    );

    /*$form['contact_mobile_no'] = array(
      '#type' => 'textfield',
      '#title' => t('Mobile Number'),
      '#required' => TRUE,
    );*/

    $form['contact_message'] = array(
      '#type' => 'textfield',
      '#title' => t('Message *'),
      '#required' => TRUE,
      /*'#prefix' => '<div class="input_field"><span class="prefix">+91</span>',
      '#suffix' => '</div><p class="note">We we need: PAN NO., Aadhar Card, Bank Account No.</p>',*/
    );

    $form['actions']['#type'] = 'actions';
    $form['actions']['submit'] = array(
      '#type' => 'submit',
      '#value' => $this->t('Proceed'),
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

public function validateForm(array &$form, FormStateInterface $form_state) {
  if (!preg_match("/^[a-zA-Z-' ]*$/",$form_state->getValue('contact_full_name'))) {
    $form_state->setErrorByName('contact_full_name', $this->t('Only letters and white space allowed in full name.'));
  }
  if (!filter_var($email, $form_state->getValue('contact_email'))) {
    $form_state->setErrorByName('contact_email', $this->t('Please enter a valid email.'));
  }
}

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

    drupal_set_message($this->t('@contact_full_name ,Your details is being submitted!', array('@contact_full_name' => $form_state->getValue('contact_full_name'))));
    
  }
}