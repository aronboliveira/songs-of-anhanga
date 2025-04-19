.<?php
/**
 * Template Name: Forgot Password Page
 */

get_header(); ?>

<main id="primary" class="site-main">
  <section class="form-section">
    <h1 class="form-title"><?php the_title(); ?></h1>

    <div id="forgot-password-app" class="form-wrapper">
      <!-- Vue.js will mount the password recovery form here -->
    </div>

    <div class="form-links">
      <a href="<?php echo site_url('/login'); ?>">Back to Login</a>
    </div>
  </section>
</main>

<?php get_footer(); ?>