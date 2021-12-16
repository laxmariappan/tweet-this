<?php
/**
 * Plugin Name:       Tweet This
 * Description:       Example block written with ESNext standard and JSX support – build step required.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       tweet-this
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 */
function create_block_tweet_this_block_init() {
	register_block_type( __DIR__ );
	//bg_color text_color twitter_handle content
	// $defaultValues =  array(
    //         'bg_color' => array(
    //             'type' => 'string',
    //             'default' => ''
    //         ),
    //         'text_color' => array(
    //             'type' => 'string',
    //             'default' => ''
    //         ),
    //         'twitter_handle' => array(
    //             'type' => 'string',
    //             'default' => ''
    //         ),
    //         'content' => array(
    //             'type' => 'string',
    //             'default' => ''
    //         ),
    //     );
	// register_block_type( 'create-block/tweet-this', array(
	// 	'attributes' => $defaultValues,
	// 	'render_callback' => 'ub_render_click_to_tweet_block2'));
}
add_action( 'init', 'create_block_tweet_this_block_init' );

/**
 * Rendering the block dynamically.
 *
 * @param $attributes
 *
 * @return string
 *
 */
function ub_render_click_to_tweet_block2( $attributes ) {
    extract($attributes);
	//$twitter_handle = get_post_meta( get_the_ID(), 'ub_ctt_via', true );
	$twitter_handle = ( $twitter_handle ) ? '&via=' .  mb_strimwidth( preg_replace( '/[^A-Za-z0-9_]/', '', $twitter_handle ), 0, 15  ): false; //ensure that only valid Twitter usernames appear
    $tweet = preg_replace('/<br><br>$/', '<br>', $content);
	$tweet_url  = ( $tweet ) ? rawurlencode( preg_replace('/<.+?>/', '', str_replace("<br>","\n",$tweet) )) : false;

	$permalink = esc_url( get_the_permalink() );
	$link = "http://twitter.com/intent/tweet?&text={$tweet}&url={$permalink}{$twitter_handle}";

    $output = '';
    if($blockID === ''){
        $output .= sprintf('<div class="ub_click_to_tweet%1$s" style="border-color: %2$s;">', (isset($className) ? ' ' . esc_attr($className) : ''), $borderColor );
        $output .= sprintf( '<div class="ub_tweet" style="font-size: %1$spx; color: %2$s">', $tweetFontSize, $tweetColor );
    }
    else{
        $output .= sprintf('<div class="ub_click_to_tweet%1$s" id="%2$s">', (isset($className) ? ' ' . esc_attr($className) : ''), esc_attr('ub_click_to_tweet_' . $blockID ));
        $output .= sprintf( '<div class="ub_tweet">');
    }

    $output .= $tweet;
	$output .= sprintf('</div>');
	$output .= sprintf( '<div class="ub_click_tweet">' );
	$output .= sprintf( '<span>');
	$output .= sprintf( '<i></i>');
	$output .= sprintf( '<a target="_blank" href="%1$s">' . __( 'Click to Tweet', 'ultimate-blocks' ) . '</a>',  $link  );
	$output .= sprintf( '</span>');
	$output .= sprintf( '</div>');
    $output .= sprintf( '</div>');

	return $output;
}
