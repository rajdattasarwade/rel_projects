<?php

    namespace Drupal\fivepaisa_loan_app\Plugin\Block;

    use Drupal\Core\Block\BlockBase;
    use Drupal\Core\Form\FormStateInterface;
    use Drupal\file\Entity\File;
    
   /**
     * Provides a 'Personal loan for 5 paisa form' block.
     *
     * @Block(
     *   id = "personal_loan_form_block",
     *   admin_label = @Translation("Personal Loan Form Block"),
     *   category = @Translation("Loan App Module Blocks")
     * )
    */
    class PersonalLoanFormBlock extends BlockBase {

    public function blockForm($form, FormStateInterface $formState)
     {
        $form['body'] = array(
                '#type' => 'text_format',
                '#title' => t('Body'),
                '#description' => t('Main body'),
                '#format' => 'full_html',
                '#rows' => 50,
                '#default_value' => isset($this->configuration['body']['value']) ? $this->configuration['body']['value'] : ''
            );

        $form['image'] = array(
                '#type' => 'managed_file',
                '#upload_location' => 'public://upload/customblock',
                '#title' => t('Image'),
                '#upload_validators' => array(
                    'file_validate_extensions' => array('gif png jpg jpeg'),
                    'file_validate_size' => array(25600000),
                  ),
                '#default_value' => isset($this->configuration['image']) ? $this->configuration['image'] : '',
                '#description' => t('The image to display'),
                '#required' => true
            );
    
            return $form;
     }

     public function blockSubmit($form, FormStateInterface $formState) {
        // Save image as permanent.
        $image = $formState->getValue('image');
        if ($image != $this->configuration['image']) {
          if (!empty($image[0])) {
            $file = File::load($image[0]);
            $file->setPermanent();
            $file->save();
          }
        }
        
        $this->configuration['body'] = $formState->getValue('body');
        $this->configuration['image'] = $formState->getValue('image');
      }

     /**
      * {@inheritdoc}
     */
     public function build() {

       $form = \Drupal::formBuilder()->getForm('Drupal\fivepaisa_loan_app\Form\PreferredLandingBorrowing');

       //return $form;
       $build = [];
        
        $image = $this->configuration['image'];
        if (!empty($image[0])) {
          if ($file = File::load($image[0])) {
            $build['image'] = [
                  '#theme' => 'image',
                  '#uri' => $file->getFileUri(),
                ];
          }
        }
        
        $build['body']['#markup'] = '<div>'.$this->configuration['body']['value'].'</div>';

        $build['form'] = $form;
        return $build;
     }
   }