<!doctype html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <title><?php wp_title('|', true, 'right'); ?></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <?php wp_head(); ?>
        
        <link rel="alternate" type="application/rss+xml" title="<?php echo get_bloginfo('name'); ?> Feed" href="<?php echo home_url(); ?>/feed/">
        
        <link rel="shortcut icon" href="/favicon.ico">
        <!--[if IE 7]><link rel="stylesheet" href="/assets/css/fontello-ie7.css"><![endif]-->
        <!-- endbuild -->
    </head>
    <body class="loading">
        <!--[if lt IE 10]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->