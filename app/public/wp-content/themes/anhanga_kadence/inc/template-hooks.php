<?php
/**
 * Calls in content using theme hooks.
 *
 * @package kadence
 */

namespace Kadence;

use function Kadence\kadence;
use function add_action;

defined('ABSPATH') || exit;
add_action('kadence_header', 'Kadence\header_markup');
add_action('kadence_top_header', 'Kadence\top_header');
add_action('kadence_main_header', 'Kadence\main_header');
add_action('kadence_bottom_header', 'Kadence\bottom_header');
add_action('kadence_render_header_column', 'Kadence\header_column', 10, 2);
add_action('kadence_render_mobile_header_column', 'Kadence\mobile_header_column', 10, 2);
add_action('kadence_mobile_header', 'Kadence\mobile_header');
add_action('kadence_mobile_top_header', 'Kadence\mobile_top_header');
add_action('kadence_mobile_main_header', 'Kadence\mobile_main_header');
add_action('kadence_mobile_bottom_header', 'Kadence\mobile_bottom_header');
add_action('kadence_site_branding', 'Kadence\site_branding');
add_action('kadence_primary_navigation', 'Kadence\primary_navigation');
add_action('kadence_secondary_navigation', 'Kadence\secondary_navigation');
add_action('kadence_header_html', 'Kadence\header_html');
add_action('kadence_header_button', 'Kadence\header_button');
add_action('kadence_header_cart', 'Kadence\header_cart');
add_action('kadence_header_social', 'Kadence\header_social');
add_action('kadence_header_search', 'Kadence\header_search');
add_action('kadence_mobile_site_branding', 'Kadence\mobile_site_branding');
add_action('kadence_navigation_popup_toggle', 'Kadence\navigation_popup_toggle');
add_action('kadence_mobile_navigation', 'Kadence\mobile_navigation');
add_action('kadence_mobile_html', 'Kadence\mobile_html');
add_action('kadence_mobile_button', 'Kadence\mobile_button');
add_action('kadence_mobile_cart', 'Kadence\mobile_cart');
add_action('kadence_mobile_social', 'Kadence\mobile_social');
add_action('kadence_hero_header', 'Kadence\hero_title');
add_action('kadence_entry_hero', 'Kadence\kadence_entry_header', 10, 2);
add_action('kadence_entry_header', 'Kadence\kadence_entry_header', 10, 2);
add_action('kadence_entry_archive_hero', 'Kadence\kadence_entry_archive_header', 10, 2);
add_action('kadence_entry_archive_header', 'Kadence\kadence_entry_archive_header', 10, 2);
add_action('kadence_single', fn() => get_template_part('template-parts/content/single', get_post_type()));
add_action('kadence_single_content', 'Kadence\single_content');
add_action('kadence_404_content', 'Kadence\get_404_content');
add_action('kadence_comments', 'Kadence\comments_list');
add_action('kadence_comments', function() {
	$priority = (kadence()->option('comment_form_before_list') ? 5 : 15);
	add_action('kadence_comments', 'Kadence\comments_form', $priority);
}, 1);
add_action('kadence_archive', 'Kadence\archive_markup');
add_action('kadence_loop_entry', 'Kadence\loop_entry');
add_action('kadence_loop_entry_thumbnail', 'Kadence\loop_entry_thumbnail');
add_action('kadence_loop_entry_content', 'Kadence\loop_entry_header', 10);
add_action('kadence_loop_entry_header', 'Kadence\loop_entry_taxonomies', 10);
add_action('kadence_loop_entry_content', 'Kadence\loop_entry_summary', 20);
add_action('kadence_loop_entry_header', 'Kadence\loop_entry_title', 20);
add_action('kadence_loop_entry_content', 'Kadence\loop_entry_footer', 30);
add_action('kadence_loop_entry_header', 'Kadence\loop_entry_meta', 30);
add_action('kadence_footer', fn() => 
	kadence()->has_footer() && 
		get_template_part('template-parts/footer/base'));
add_action('kadence_top_footer', fn() => 
	kadence()->display_footer_row('top') && 
		kadence()->get_template('template-parts/footer/footer', 'row', ['row' => 'top']));
add_action('kadence_middle_footer', fn() =>
	kadence()->display_footer_row('middle') &&
		kadence()->get_template('template-parts/footer/footer', 'row', ['row', 'middle']));
add_action('kadence_bottom_footer', fn() => 
	kadence()->display_footer_row('bottom') &&
		kadence()->get_template('template-parts/footer/footer', 'row', ['row' => 'bottom']));
add_action('kadence_render_footer_column', function($r, $c) {
	$els = kadence()->option('footer_items');
	if (!(isset($els) && isset($els[$r]) && isset($els[$r][$r.'_'.$c]) 
		&& is_array($els[$r][$r.'_'.$c]) && !empty($els[$r][$r.'_'.$c]))) return;
	foreach ($els[$r][$r.'_'.$c] as $k => $i) get_template_part(apply_filters('kadence_footer_elements_template_path', 'template-parts/footer/'.$i, $i, $r, $c));
}, 10, 2);
add_action('kadence_footer_html', function() {
	$content = kadence()->option('footer_html_content');
	if (!($content || is_customize_preview())) return;
	$link_style = kadence()->option('footer_html_link_style');
	echo '<div class="footer-html inner-link-style-'.esc_attr($link_style).'">';
	kadence()->customizer_quick_link();
	echo '<div class="footer-html-inner">';
	$content = str_replace('{copyright}', '&copy;', $content);
	$content = str_replace('{year}', date_i18n('Y'), $content);
	$content = str_replace('{site-title}', str_ireplace('Of', 'of', implode(' ', array_map('ucfirst', explode('-', get_bloginfo('name'))))), $content);
	echo do_shortcode(wpautop($content));
	echo '</div>';
	echo '</div>';
});
add_action('kadence_footer_navigation', function() {
	?>
	<nav id="footer-navigation" class="footer-navigation" role="navigation" aria-label="<?php esc_attr_e('Footer Navigation', 'kadence'); ?>">
		<?php kadence()->customizer_quick_link(); ?>
		<div class="footer-menu-container">
			<?php
			kadence()->is_footer_nav_menu_active() 
				? kadence()->display_footer_nav_menu(['menu_id' => 'footer-menu'])
				: kadence()->display_fallback_menu();
			?>
		</div>
	</nav><!-- #footer-navigation -->
	<?php
});
add_action('kadence_footer_social', function() {
	$items      = kadence()->sub_option('footer_social_items', 'items');
	$title      = kadence()->option('footer_social_title');
	$show_label = kadence()->option('footer_social_show_label');
	$brand_colors = kadence()->option('footer_social_brand');
	$brand_color_class = '';
	if ('onhover' === $brand_colors) {
		$brand_color_class = ' social-show-brand-hover';
	} elseif ('untilhover' === $brand_colors) {
		$brand_color_class = ' social-show-brand-until';
	} elseif ('always' === $brand_colors) {
		$brand_color_class = ' social-show-brand-always';
	}
	echo '<div class="footer-social-wrap">';
	kadence()->customizer_quick_link();
	if (! empty($title)) {
		echo '<h2 class="widget-title">' . wp_kses_post($title) . '</h2>';
	}
	echo '<div class="footer-social-inner-wrap element-social-inner-wrap social-show-label-' . ($show_label ? 'true' : 'false') . ' social-style-' . esc_attr(kadence()->option('footer_social_style')) . esc_attr($brand_color_class) . '">';
	if (is_array($items) && ! empty($items)) {
		foreach ($items as $item) {
			if ($item['enabled']) {
				$link = kadence()->option($item['id'] . '_link');
				if ('phone' === $item['id']) {
					$link = 'tel:' . str_replace('tel:', '', $link);
				} elseif ('email' === $item['id']) {
					$link = str_replace('mailto:', '', $link);
					if (is_email($link)) {
						$link = 'mailto:' . $link;
					}
				}
				echo '<a href="' . esc_attr($link) . '"' . ($show_label ? '' : ' aria-label="' . esc_attr($item['label']) . '"') . ' ' . ('phone' === $item['id'] || 'email' === $item['id'] || apply_filters('kadence_social_link_target', false, $item) ? '' : 'target="_blank" rel="noopener noreferrer"  ') . 'class="social-button footer-social-item social-link-' . esc_attr($item['id']) . esc_attr('image' === $item['source'] ? ' has-custom-image' : '') . '">';
				if ('image' === $item['source']) {
					if ($item['imageid'] && wp_get_attachment_image($item['imageid'], 'full', true)) {
						echo wp_get_attachment_image($item['imageid'], 'full', true, array('class' => 'social-icon-image', 'style' => 'max-width:' . esc_attr($item['width']) . 'px'));
					} elseif (! empty($item['url'])) {
						echo '<img src="' . esc_attr($item['url']) . '" alt="' . esc_attr($item['label']) . '" class="social-icon-image" style="max-width:' . esc_attr($item['width']) . 'px"/>';
					}
				} elseif ('svg' === $item['source']) {
					if (!empty($item['svg']))
						echo '<span class="social-icon-custom-svg" style="max-width:' . esc_attr($item['width']) . 'px">' . $item['svg'] . '</span>';
				} else
					kadence()->print_icon($item['icon'], '', false);
				if ($show_label)
					echo '<span class="social-label">' . esc_html($item['label']) . '</span>';
				echo '</a>';
			}
		}
	}
	echo '</div>';
	echo '</div>';
});
add_action('wp_footer', function() {
	if (!kadence()->option('scroll_up')) return;
	echo '<a id="kt-scroll-up" tabindex="-1" aria-hidden="true" aria-label="' . esc_attr__('Scroll to top', 'kadence') . '" href="#wrapper" class="kadence-scroll-to-top scroll-up-wrap scroll-ignore scroll-up-side-' . esc_attr(kadence()->option('scroll_up_side')) . ' scroll-up-style-' . esc_attr(kadence()->option('scroll_up_style')) . ' vs-lg-' . (kadence()->sub_option('scroll_up_visiblity', 'desktop') ? 'true' : 'false') . ' vs-md-' . (kadence()->sub_option('scroll_up_visiblity', 'tablet') ? 'true' : 'false') . ' vs-sm-' . (kadence()->sub_option('scroll_up_visiblity', 'mobile') ? 'true' : 'false') . '">';
	kadence()->print_icon(kadence()->option('scroll_up_icon'), esc_attr__('Scroll to top', 'kadence'), false);
	echo '</a>';
	echo '<button id="kt-scroll-up-reader" href="#wrapper" aria-label="' . esc_attr__('Scroll to top', 'kadence') . '" class="kadence-scroll-to-top scroll-up-wrap scroll-ignore scroll-up-side-' . esc_attr(kadence()->option('scroll_up_side')) . ' scroll-up-style-' . esc_attr(kadence()->option('scroll_up_style')) . ' vs-lg-' . (kadence()->sub_option('scroll_up_visiblity', 'desktop') ? 'true' : 'false') . ' vs-md-' . (kadence()->sub_option('scroll_up_visiblity', 'tablet') ? 'true' : 'false') . ' vs-sm-' . (kadence()->sub_option('scroll_up_visiblity', 'mobile') ? 'true' : 'false') . '">';
	kadence()->print_icon(kadence()->option('scroll_up_icon'), esc_attr__('Scroll to top', 'kadence'), false);
	echo '</button>';
});
