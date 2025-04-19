<header id="site-header" class="site-header">
  <nav class="main-nav">
    <div class="nav-left">
      <a href="<?php echo home_url(); ?>" class="nav-logo">Folklore RPG</a>
      <a href="#story" class="nav-link">Story</a>
      <a href="#characters" class="nav-link">Characters</a>
      <a href="#world" class="nav-link">World</a>
    </div>

    <div class="nav-right">
      <?php if ( is_user_logged_in() ) : ?>
        <a href="<?php echo wp_logout_url( home_url() ); ?>" class="nav-button">Logout</a>
      <?php else : ?>
        <a href="<?php echo wp_login_url(); ?>" class="nav-button">Login</a>
        <a href="<?php echo wp_registration_url(); ?>" class="nav-button">Register</a>
      <?php endif; ?>
    </div>
  </nav>
</header>