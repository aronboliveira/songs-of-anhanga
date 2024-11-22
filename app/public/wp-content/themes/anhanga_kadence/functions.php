<?php
/**
 * Kadence functions and definitions
 *
 * This file must be parseable by PHP 5.2.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package kadence
 */
namespace Kadence;
use Kadence\Template_Tags;
use Kadence\Theme;
use function get_template_directory;
define('KADENCE_VERSION', '1.2.11');
define('KADENCE_MINIMUM_WP_VERSION', '6.0');
define('KADENCE_MINIMUM_PHP_VERSION', '7.4');
if (version_compare($GLOBALS['wp_version'], KADENCE_MINIMUM_WP_VERSION, '<') || version_compare(phpversion(), KADENCE_MINIMUM_PHP_VERSION, '<')) {
	require get_template_directory().'/inc/back-compat.php';
	return;
}
function kadence(): Template_Tags {
	static $theme = null;
	if (!$theme) $theme = Theme::instance();
	return $theme->template_tags();
}
require get_template_directory().'/inc/wordpress-shims.php';
require get_template_directory().'/inc/class-theme.php';
require get_template_directory().'/inc/class-kadence-css.php';
require get_template_directory().'/inc/class-local-gfonts.php';
require get_template_directory().'/inc/customizer/class-theme-customizer.php';
require get_template_directory().'/inc/dashboard/class-theme-dashboard.php';
require get_template_directory().'/inc/meta/class-theme-meta.php';
require get_template_directory().'/inc/template-functions/header-functions.php';
require get_template_directory().'/inc/template-functions/title-functions.php';
require get_template_directory().'/inc/template-functions/single-functions.php';
require get_template_directory().'/inc/template-functions/archive-functions.php';
require get_template_directory().'/inc/template-hooks.php';
require get_template_directory().'/inc/anhanga/blocks.php';
call_user_func('Kadence\kadence');
