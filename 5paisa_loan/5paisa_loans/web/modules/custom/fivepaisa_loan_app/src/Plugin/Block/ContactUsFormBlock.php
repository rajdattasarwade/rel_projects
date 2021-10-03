<?php

    namespace Drupal\fivepaisa_loan_app\Plugin\Block;

    use Drupal\Core\Block\BlockBase;

   /**
     * Provides a 'Lend Smart with Five Paisa' block.
     *
     * @Block(
     *   id = "contact_us_form_block",
     *   admin_label = @Translation("Contact Us Form Block"),
     *   category = @Translation("Loan App Module Blocks")
     * )
    */
    class ContactUsFormBlock extends BlockBase {

     /**
      * {@inheritdoc}
     */
     public function build() {

       $form = \Drupal::formBuilder()->getForm('Drupal\fivepaisa_loan_app\Form\ContactUs');

       return $form;
     }
   }