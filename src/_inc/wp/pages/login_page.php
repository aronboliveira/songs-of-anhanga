*PHP PAGE*

<?php
/**
 * Template Name: Login Page
 */

get_header(); ?>

<main id="primary" class="site-main">
  <section class="form-section">
    <h1 class="form-title"><?php the_title(); ?></h1>

    <div id="login-app" class="form-wrapper">
      <!-- Vue.js will mount the login form here -->
    </div>

    <div class="form-links">
      <a href="<?php echo site_url('/forgot-password'); ?>">Forgot Password?</a> |
      <a href="<?php echo site_url('/register'); ?>">Register</a>
    </div>
  </section>
</main>

<?php get_footer(); ?>