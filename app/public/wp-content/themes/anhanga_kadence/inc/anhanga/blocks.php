<?php
add_action('init', function() {
	wp_register_script(
		'footer_block_script', 
		get_template_directory_uri().'/assets/js/dist/blocks/footer/Footer.js', 
		['wp-blocks', 'wp-element', 'wp-editor'],
		filemtime(get_template_directory().'/assets/js/dist/blocks/footer/Footer.js')
	);
	register_block_type('anhanga_kadenceFooter', 
	[
		'title' => 'Default Footer',
		'category' => 'layout',
		'description' => 'Block for the Default Footer, including social media and more informations',
		'icon' => 'feedback',
		'textdomain' => 'kadence',
		'editor_script' => 'footer_block_script',
		'script' => '',
		'keywords' => ['footer', 'default', 'layout', 'bottom'],
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
		]
	]
);
});