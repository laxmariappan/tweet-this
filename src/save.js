/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} attributes Props.
 * @param {Object} attributes.attributes Destructured attributes.
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	return (
		<>
			<div
				className="tweet-this-container"
				style={{
					backgroundColor: attributes.bg_color,
					color: attributes.text_color,
					border: `1px solid ${attributes.text_color}`,
				}}
				{...useBlockProps.save()}
			>
				{attributes.content}
				<a
					target="_blank"
					rel="noreferrer"
					className="tweet-this-link-button"
					href={attributes.twitter_link}
					style={{
						backgroundColor: attributes.button_bg_color,
						color: attributes.button_text_color,
					}}
				>
					Click to Tweet
					<Icon icon="twitter" />
				</a>
			</div>
		</>
	);
}
