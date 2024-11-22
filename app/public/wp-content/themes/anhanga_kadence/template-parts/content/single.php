<?php
/**
 * The main single item template file.
 *
 * @package kadence
 */

namespace Kadence;
do_action( 'kadence_hero_header' );
?>
<div id="primary" class="content-area">
	<div class="content-container site-container">
		<main id="main" class="site-main" role="main">
			<?php
			// do_action( 'kadence_before_main_content' );
			?>
			<div class="content-wrap">
				<?php
				if (have_posts()) {
					while (have_posts()) {
						the_post();
						do_action('kadence_single_content');
					}
				} elseif (is_404()) do_action('kadence_404_content');
				else get_template_part('template-parts/content/error');
				?>
			</div>
			<?php			
			do_action( 'kadence_after_main_content' );
			?>
		</main><!-- #main -->
		<?php
		get_sidebar();
		?>
	</div>
</div><!-- #primary -->
