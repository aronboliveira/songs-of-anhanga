<?php
function enqueue_class_vue_page() {
  if (is_page_template('page-classes.php')) {
    wp_enqueue_script('vue-js', 'https://unpkg.com/vue@3/dist/vue.global.prod.js', [], null, true);
    wp_enqueue_script('rpg-classes', get_template_directory_uri() . '/js/rpg-classes.js', ['vue-js'], null, true);
    wp_enqueue_style('rpg-classes-style', get_template_directory_uri() . '/css/rpg-classes.css');
  }
}
add_action('wp_enqueue_scripts', 'enqueue_class_vue_page');