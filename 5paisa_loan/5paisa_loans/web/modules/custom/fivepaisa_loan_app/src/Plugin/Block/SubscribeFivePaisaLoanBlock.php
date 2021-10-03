<?php

    namespace Drupal\fivepaisa_loan_app\Plugin\Block;

    use Drupal\Core\Block\BlockBase;

   /**
     * Provides a 'Subscribe FivePaisa Loan Community' block.
     *
     * @Block(
     *   id = "subscribe_fivepaisa_loan_block",
     *   admin_label = @Translation("Subscribe FivePaisa Loan Block"),
     *   category = @Translation("Loan App Module Blocks")
     * )
    */
    class SubscribeFivePaisaLoanBlock extends BlockBase {

     /**
      * {@inheritdoc}
     */
     public function build() {

       $form = \Drupal::formBuilder()->getForm('Drupal\fivepaisa_loan_app\Form\PreferredLandingBorrowing');

       return $form;
     }
   }