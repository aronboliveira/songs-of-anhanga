<?php
if (! function_exists('twentytwentyfour_block_styles')) :
	function twentytwentyfour_block_styles() {
		register_block_style(
			'core/details',
			[
				'name' => 'arrow-icon-details',
				'label' => __('Arrow icon', 'twentytwentyfour'),
				'inline_style' => '
				.is-style-arrow-icon-details {
					padding-top: var(--wp--preset--spacing--10);
					padding-bottom: var(--wp--preset--spacing--10);
				}

				.is-style-arrow-icon-details summary {
					list-style-type: "\2193\00a0\00a0\00a0";
				}

				.is-style-arrow-icon-details[open]>summary {
					list-style-type: "\2192\00a0\00a0\00a0";
				}',
			]
		);
		register_block_style(
			'core/post-terms',
			[
				'name' => 'pill',
				'label' => __('Pill', 'twentytwentyfour'),
				'inline_style' => '
				.is-style-pill a,
				.is-style-pill span:not([class], [data-rich-text-placeholder]) {
					display: inline-block;
					background-color: var(--wp--preset--color--base-2);
					padding: 0.375rem 0.875rem;
					border-radius: var(--wp--preset--spacing--20);
				}

				.is-style-pill a:hover {
					background-color: var(--wp--preset--color--contrast-3);
				}',
			]
		);
		register_block_style(
			'core/list',
			[
				'name' => 'checkmark-list',
				'label' => __('Checkmark', 'twentytwentyfour'),
				'inline_style' => '
				ul.is-style-checkmark-list {
					list-style-type: "\2713";
				}

				ul.is-style-checkmark-list li {
					padding-inline-start: 1ch;
				}',
			]
		);
		register_block_style(
			'core/navigation-link',
			[
				'name' => 'arrow-link',
				'label' => __('With arrow', 'twentytwentyfour'),
				'inline_style' => '
				.is-style-arrow-link .wp-block-navigation-item__label:after {
					content: "\2197";
					padding-inline-start: 0.25rem;
					vertical-align: middle;
					text-decoration: none;
					display: inline-block;
				}',
			]
		);
		register_block_style(
			'core/heading',
			[
				'name' => 'asterisk',
				'label' => __('With asterisk', 'twentytwentyfour'),
				'inline_style' => "
				.is-style-asterisk:before {
					content: '';
					width: 1.5rem;
					height: 3rem;
					background: var(--wp--preset--color--contrast-2, currentColor);
					clip-path: path('M11.93.684v8.039l5.633-5.633 1.216 1.23-5.66 5.66h8.04v1.737H13.2l5.701 5.701-1.23 1.23-5.742-5.742V21h-1.737v-8.094l-5.77 5.77-1.23-1.217 5.743-5.742H.842V9.98h8.162l-5.701-5.7 1.23-1.231 5.66 5.66V.684h1.737Z');
					display: block;
				}

				/* Hide the asterisk if the heading has no content, to avoid using empty headings to display the asterisk only, which is an A11Y issue */
				.is-style-asterisk:empty:before {
					content: none;
				}

				.is-style-asterisk:-moz-only-whitespace:before {
					content: none;
				}

				.is-style-asterisk.has-text-align-center:before {
					margin: 0 auto;
				}

				.is-style-asterisk.has-text-align-right:before {
					margin-left: auto;
				}

				.rtl .is-style-asterisk.has-text-align-left:before {
					margin-right: auto;
				}",
			]
		);
	}
endif;
add_action('init', 'twentytwentyfour_block_styles');
if (!function_exists('twentytwentyfour_block_stylesheets')) :
	function twentytwentyfour_block_stylesheets() {
		wp_enqueue_block_style(
			'core/button',
			[
				'handle' => 'twentytwentyfour-button-style-outline',
				'src' => get_parent_theme_file_uri('assets/css/button-outline.css'),
				'ver' => wp_get_theme(get_template())->get('Version'),
				'path' => get_parent_theme_file_path('assets/css/button-outline.css'),
			]
		);
	}
endif;
add_action('init', 'twentytwentyfour_block_stylesheets');
if (!function_exists('twentytwentyfour_pattern_categories')):
	function twentytwentyfour_pattern_categories() {
		register_block_pattern_category(
			'twentytwentyfour_page',
			array(
				'label' => _x('Pages', 'Block pattern category', 'twentytwentyfour'),
				'description' => __('A collection of full page layouts.', 'twentytwentyfour'),
			)
		);
	}
endif;
add_action('init', 'twentytwentyfour_pattern_categories');
require_once get_template_directory().'./inc/blocks.php';