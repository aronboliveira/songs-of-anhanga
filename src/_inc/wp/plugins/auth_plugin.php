<?php
/**
 * Plugin Name: Custom Auth Plugin
 * Description: Custom REST API endpoint for user registration.
 * Version: 1.0
 * Author: Your Name
 */

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}

add_action('rest_api_init', function () {
  register_rest_route('custom-auth/v1', '/register', [
    'methods' => 'POST',
    'callback' => 'custom_auth_register_user',
    'permission_callback' => '__return_true'
  ]);
});

function custom_auth_register_user(WP_REST_Request $request) {
  $username = sanitize_text_field( $request->get_param('username') );
  $email = sanitize_email( $request->get_param('email') );
  $password = $request->get_param('password');

  // Basic Validation
  if ( empty($username) || empty($email) || empty($password) ) {
    return new WP_Error('missing_fields', 'Username, email, and password are required.', ['status' => 400]);
  }

  if ( username_exists($username) ) {
    return new WP_Error('username_exists', 'Username already exists.', ['status' => 400]);
  }

  if ( email_exists($email) ) {
    return new WP_Error('email_exists', 'Email already registered.', ['status' => 400]);
  }

  if ( !is_email($email) ) {
    return new WP_Error('invalid_email', 'Invalid email address.', ['status' => 400]);
  }

  $user_id = wp_create_user($username, $password, $email);

  if ( is_wp_error($user_id) ) {
    return new WP_Error('registration_failed', 'Could not register user.', ['status' => 500]);
  }

  return new WP_REST_Response([
    'success' => true,
    'message' => 'User registered successfully.'
  ], 201);
}