<?php
define('ABSPATH', dirname(__FILE__) . '/');
require_once(ABSPATH . 'wp-admin/includes/template.php');
 require_once(ABSPATH . 'wp-includes/theme.php');
function mein_theme_scripts() {
    // Registrieren Sie das Three.js-Skript
    wp_enqueue_script('threejs', 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js', array(), '0.118', true);

    // Registrieren Sie Ihre benutzerdefinierte Three.js-Szene
   
    wp_enqueue_script('prototyp-1', get_template_directory_uri() . '/js/index.js', array('threejs'), '1.0', true);

    // Optional: CSS-Datei, falls vorhanden
    wp_enqueue_style('prototyp-1-style', get_stylesheet_uri());
}

add_action('rest_api_init', function () {
    register_rest_route('threejs/v1', '/settings/', array(
        'methods' => 'GET',
        'callback' => 'my_custom_endpoint_callback',
        'permission_callback' => function() {
            return current_user_can('edit_posts');
        }
    ));
});

function my_custom_endpoint_callback( $request ) {
    // Deine Logik, um die benötigten Daten zu sammeln
    $data = array(
        'mainTitle' => get_option('threejs_main_title'),
        'fieldTitle1' => get_option('threejs_field1_title'),
        'fieldTitle2' => get_option('threejs_field2_title'),
        'fieldTitle3' => get_option('threejs_field3_title'),
        'iframeTitle1' => get_option('threejs_iframe1_title'),
        'iframeTitle2' => get_option('threejs_iframe2_title'),
        'iframeTitle3' => get_option('threejs_iframe3_title'),
        'iframeUrl1' => get_option('threejs_iframe1_url'),
        'iframeUrl2' => get_option('threejs_iframe2_url'),
        'iframeUrl3' => get_option('threejs_iframe3_url')
    );

    return new WP_REST_Response($data, 200);
}



add_action('wp_enqueue_scripts', 'mein_theme_scripts','wp_head');
function custom_threejs_texts_head() {
    wp_enqueue_script('custom-threejs-texts', get_template_directory_uri() . '/wp-content/plugins/3d/custom-threejs-texts.php');
}
?>
