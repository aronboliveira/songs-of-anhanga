<?php
/**
 * Template part for displaying the footer info
 *
 * @package kadence
 */

namespace Kadence;

kadence()->has_content() && kadence()->print_styles( 'kadence-content' );
kadence()->print_styles( 'kadence-footer' );
?>
<footer id="colophon" class="site-footer" role="contentinfo">
	<div class="site-footer-wrap">
		<?php
		do_action( 'kadence_top_footer' );
		do_action( 'kadence_middle_footer' );
		do_action( 'kadence_bottom_footer' );
		?>
	</div>
</footer><!-- #colophon -->

