<?php

function folklore_landing_assets() {
  if ( is_page_template('landing-folklore-rpg.php') ) {
    // Vue.js from CDN
    wp_enqueue_script(
      'vue-js',
      'https://unpkg.com/vue@3/dist/vue.global.prod.js',
      [],
      null,
      true
    );

    // Your custom landing script
    wp_enqueue_script(
      'landing-folklore',
      get_template_directory_uri() . '/js/landing-folklore.js',
      [ 'vue-js' ],
      null,
      true
    );

    // Enqueue the *compiled* SCSS output
    wp_enqueue_style(
      'landing-folklore-style',
      get_template_directory_uri() . '/css/main.css',
      [],
      null
    );
  }
}
add_action('wp_enqueue_scripts', 'folklore_landing_assets');