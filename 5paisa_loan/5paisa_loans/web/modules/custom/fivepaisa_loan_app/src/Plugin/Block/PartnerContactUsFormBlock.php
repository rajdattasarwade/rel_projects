<?php

    namespace Drupal\fivepaisa_loan_app\Plugin\Block;

    use Drupal\Core\Block\BlockBase;

   /**
     * Provides a 'Partner contact us form' block.
     *
     * @Block(
     *   id = "partner_contact_us_form_block",
     *   admin_label = @Translation("Partner Contact Us Form Block"),
     *   category = @Translation("Loan App Module Blocks")
     * )
    */
    class PartnerContactUsFormBlock extends BlockBase {

     /**
      * {@inheritdoc}
     */
     public function build() {

       $form = \Drupal::formBuilder()->getForm('Drupal\fivepaisa_loan_app\Form\PartnerContactUs');

       return $form;
     }
   }