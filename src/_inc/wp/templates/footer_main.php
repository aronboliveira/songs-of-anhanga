  </main><!-- close site-main or content area, as in your template -->

  <footer id="site-footer" class="site-footer">
    <div id="footer-app">
      <nav class="footer-nav">
        <!-- We’ll let Vue populate these links dynamically -->
        <ul>
          <!-- Example static fallback if JS is disabled (optional): -->
          <li><a href="https://twitter.com/" class="social-icon" aria-label="Twitter">
            <i class="fab fa-twitter"></i>
          </a></li>
          <li><a href="https://facebook.com/" class="social-icon" aria-label="Facebook">
            <i class="fab fa-facebook-f"></i>
          </a></li>
        </ul>
      </nav>

      <address class="footer-address">
        <!-- Basic business info. This can also be dynamic if you want. -->
        <p>Origin: Folklore RPG Project<br>
           Contact: <a href="mailto:contact@mydomain.com">contact@mydomain.com</a>
        </p>
      </address>

      <section class="footer-copyright">
        <p>&copy; <?php echo date('Y'); ?> My Folklore RPG. All rights reserved.</p>
      </section>
    </div>
  </footer>

  <?php wp_footer(); ?>
</body>
</html>