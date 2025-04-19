<?php
/**
 * Template Name: Register Page
 */

get_header(); ?>

<main id="primary" class="site-main">
  <section class="form-section">
    <h1 class="form-title"><?php the_title(); ?></h1>

    <div id="register-app" class="form-wrapper">
      <!-- Vue.js will mount the registration form here -->
    </div>

    <div class="form-links">
      <a href="<?php echo site_url('/login'); ?>">Already have an account? Login</a>
    </div>
  </section>
</main>

<?php get_footer(); ?>