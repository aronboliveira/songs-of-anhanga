<?php
/**
 * Template Name: RPG Class Page
 * Description: Dynamically shows class/subclass descriptions in a z-pattern layout.
 */

get_header();

$uri_path = trim(parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH), '/');
$slug_parts = explode('/', $uri_path); // e.g. ['sorcerer', 'warlock', 'necromancer']

get_template_part('template-parts/content', 'class-layout', ['slugs' => $slug_parts]);

get_footer();