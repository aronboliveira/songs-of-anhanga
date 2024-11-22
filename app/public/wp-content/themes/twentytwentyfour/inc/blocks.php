<?php
function modularize(string $n): void {
	if (wp_script_is($n, 'registered')) {
		wp_script_add_data($n, 'type', 'module');
		wp_script_add_data($n, 'crossorigin', 'anonymous');
	} else error_log("Script $n is not registered, unable to modularize.");
}
function register_block_files(
string $f, 
string $f_name, 
string $s, 
string $s_name
): void {
	wp_register_script(
		$f_name, 
		get_template_directory_uri().$f, 
		['wp-blocks', 'wp-element', 'wp-editor'],
		filemtime(get_template_directory().$f),
		true
	);
	modularize($f_name);
	wp_register_style(
		$s_name,
		get_template_directory_uri().$s,
		[],
		filemtime(get_template_directory().$s)
	);
}
add_filter('block_categories_all', function($cat) {
	array_unshift($cat, [
		'slug' => 'anhanga_custom', 
		'title' => 'Anhanga Blocks',
		'icon' => null
	]);
	return $cat;
}, 10, 2);
add_action('init', function() {
	$f = '/build/FooterDefault.js';
	$f_name = 'footer_block_script';
	$s = '/assets/css/dist/modules/anhangaFooter.css';
	$s_name = 'footer_block_style';
	register_block_files($f, $f_name, $s, $s_name);
	register_block_type('anhanga/footer', 
		[
			'title' => 'Anhanga Footer',
			'icon' => 'feedback',
			'category' => 'anhanga_custom',
			'description' => 'Block for the Default Footer, including social media and more informations',
			'textdomain' => 'twentytwentyfour',
			'editor_script' => $f_name,
			'editor_style' => $s_name,
			'style' => $s_name,
			'keywords' => ['footer', 'default', 'layout', 'bottom', 'anhanga'],
			'supports' => [
				'align' => true,
				'spacing' => [
					'margin' => true,
					'padding' => true
				],
				'typography' => [
					'fontSize' => true,
					'lineHeight' => true
				],
				'color' => true,
				'customClassName' => true,
				'html' => false,
				'multiple' => false,
			],
			'render_callback' => function($attributes, $content) {
				ob_start();
				?>
				<footer id="footer">
					<?php
						echo $content
					?>
					<span id="footerWatcher" style="display:none;"></span>
				</footer>
				<?php
				add_action('wp_enqueue_scripts', function() {
					$n = 'footer_client_script';
					$path = '/assets/js/components/footers/footerDefault/index.js';
					if (!get_template_directory().$path) return;
					wp_enqueue_script(
						$n,
						get_template_directory_uri().$path,
						[],
						filemtime(get_template_directory().$path),
						true
					);
					wp_script_add_data($n, 'type', 'module');
					wp_script_add_data($n, 'crossorigin', 'anonymous');
				});
				return ob_get_clean();
			},
		]
	);
});
add_action('init', function() {
	$f = '/build/HeaderLanding.js';
	$f_name = 'header_landing_block_script';
	$s = '/assets/css/dist/modules/anhangaHeaderLanding.css';
	$s_name = 'header_landing_block_style';
	register_block_files($f, $f_name, $s, $s_name);
	register_block_type('anhanga/header', 
		[
			'title' => 'Landing Header',
			'icon' => 'archive',
			'category' => 'anhanga_custom',
			'description' => 'Preview of the Anhanga Header for landing',
			'textdomain' => 'twentytwentyfour',
			'editor_script' => 'header_landing_block_script',
			'editor_style' => 'header_landing_block_style',
			'style' => 'header_landing_block_style',
			'keywords' => ['header', 'landing', 'default', 'layout', 'top', 'anhanga'],
			'supports' => [
				'align' => true,
				'spacing' => [
					'margin' => true,
					'padding' => true
				],
				'typography' => [
					'fontSize' => true,
					'lineHeight' => true
				],
				'color' => true,
				'customClassName' => true,
				'html' => false,
				'multiple' => false,
			],
			'render_callback' => function($attributes, $content) {
				ob_start();
				?>
				<header id="header">
					<?php
						echo $content;
					?>
					<span id="headerLandingWatcher" style="display: none;"></span>
				</header>
				<?php
				add_action('wp_enqueue_scripts', function() {
					$n = 'header_landing_client_script';
					$path = '/assets/js/components/headers/headerLanding/index.js';
					if (!file_exists('anhanga/header')) return;
					wp_enqueue_script(
						$n, 
						get_template_directory_uri().$path,
						[],
						filemtime(get_template_directory().$path),
						true
					);
					wp_script_add_data($n, 'type', 'module');
					wp_script_add_data($n, 'crossorigin', 'anonymous');
				});
				return ob_get_clean();
			}
		]
	);
});
add_action('enqueue_block_editor_assets', fn() => 
	wp_localize_script('footer_block_script', 'footer_block_preview', [
		'fixed_content' => 'http://songs-of-anhanga.local/wp-content/uploads/2024/11/dall-e-g-knight-25.webp'
	])
);
add_action('enqueue_block_editor_assets', fn() =>
	wp_localize_script('header_landing_block_script', 'header_landing_preview', [
		'fixed_content' => 'http://songs-of-anhanga.local/wp-content/uploads/2024/11/dall-e-monk-42.webp'
	]));
add_action('enqueue_block_assets', fn() =>
	wp_localize_script('header_landing_block_script', 'header_landing_logo', [
		'fixed_content' => 'http://songs-of-anhanga.local/wp-content/uploads/2024/11/dall-e-favicon-tree-2.webp'
	]));