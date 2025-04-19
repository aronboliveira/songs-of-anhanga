<?php
function custom_class_search_block_assets() {
  // Vue must be globally available
  wp_enqueue_script(
    'vue-js',
    'https://unpkg.com/vue@3/dist/vue.global.prod.js',
    [],
    null,
    true
  );

  // Enqueue frontend view logic
  if (!is_admin()) {
    wp_enqueue_script(
      'class-search-view',
      get_template_directory_uri() . '/blocks/class-search/view.js',
      ['vue-js'],
      null,
      true
    );
  }
}
add_action('enqueue_block_assets', 'custom_class_search_block_assets');