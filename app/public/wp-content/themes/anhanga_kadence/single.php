<?php
/**
 * The main single item template file.
 *
 * @package kadence
 */

namespace Kadence;

if (!defined( 'ABSPATH' ))exit;
get_header();
kadence()->print_styles( 'kadence-content' );
do_action( 'kadence_single' );
get_footer();
