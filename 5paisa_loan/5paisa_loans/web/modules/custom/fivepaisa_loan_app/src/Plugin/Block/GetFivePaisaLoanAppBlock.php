<?php

    namespace Drupal\fivepaisa_loan_app\Plugin\Block;

    use Drupal\Core\Block\BlockBase;

   /**
     * Provides a 'Lend Smart with Five Paisa' block.
     *
     * @Block(
     *   id = "get_fivepaisa_loan_app_block",
     *   admin_label = @Translation("Get FivePaisa Loan App Block"),
     *   category = @Translation("Loan App Module Blocks")
     * )
    */
    class GetFivePaisaLoanAppBlock extends BlockBase {

     /**
      * {@inheritdoc}
     */
     public function build() {

       $form = \Drupal::formBuilder()->getForm('Drupal\fivepaisa_loan_app\Form\GetFivePaisaLoanForm');

       return $form;
     }
   }