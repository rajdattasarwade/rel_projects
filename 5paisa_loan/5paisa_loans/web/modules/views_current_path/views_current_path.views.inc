<?php

/**
 * @file
 * Provide a current path global field for views.
 */

/**
 * Implements hook_views_data_alter().
 */
function views_current_path_views_data_alter(array &$data) {
  $data['views']['current_path'] = [
    'title' => t('Current Path'),
    'group' => t('Global'),
    'help' => t('The path of the page currently being viewed.'),
    'field' => [
      'title' => t('Current path'),
      'id' => 'current_path',
    ],
  ];
}
