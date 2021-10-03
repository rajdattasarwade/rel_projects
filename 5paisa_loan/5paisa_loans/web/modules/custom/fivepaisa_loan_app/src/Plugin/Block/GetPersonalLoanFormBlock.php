<?php

    namespace Drupal\fivepaisa_loan_app\Plugin\Block;

    use Drupal\Core\Block\BlockBase;

   /**
     * Provides a 'Get Personal Loan Form' block.
     *
     * @Block(
     *   id = "get_personal_loan_form_block",
     *   admin_label = @Translation("Get Personal Loan Form Block"),
     *   category = @Translation("Loan App Module Blocks")
     * )
    */
    class GetPersonalLoanFormBlock extends BlockBase {

     /**
      * {@inheritdoc}
     */
     public function build() {

       $form = \Drupal::formBuilder()->getForm('Drupal\fivepaisa_loan_app\Form\GetPersonalLoanForm');

       return $form;
     }
   }