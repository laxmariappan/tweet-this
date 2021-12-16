/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	useBlockProps,
	ColorPalette,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';

import { TextControl, Icon } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @param {Object} props Object
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const onChangeContent = (newContent) => {
		setAttributes({ content: newContent });
	};

	const onChangeBGColor = (hexColor) => {
		setAttributes({ bg_color: hexColor });
	};

	const onChangeTextColor = (hexColor) => {
		setAttributes({ text_color: hexColor });
	};
	const onChangeButtonBGColor = (hexColor) => {
		setAttributes({ button_bg_color: hexColor });
	};
	const onChangeButtonTextColor = (hexColor) => {
		setAttributes({ button_text_color: hexColor });
	};
	const PageURL = wp.data.select('core/editor').getPermalink();
	const TweetData = `http://twitter.com/intent/tweet?text=${attributes.content}&url=${PageURL}&via=${attributes.twitter_handle}`;
	setAttributes({ twitter_link: TweetData });
	return (
		<div {...useBlockProps()}>
			<InspectorControls key="setting">
				<div id="tweet-this-controls">
					<fieldset>
						<legend className="blocks-base-control__label">
							{__('Username', 'tweet-this')}
						</legend>
						<TextControl
							value={attributes.twitter_handle}
							onChange={(val) =>
								setAttributes({ twitter_handle: val })
							}
						/>
					</fieldset>
					<fieldset>
						<legend className="blocks-base-control__label">
							{__('Background color', 'tweet-this')}
						</legend>
						<ColorPalette // Element Tag for Gutenberg standard colour selector
							onChange={onChangeBGColor} // onChange event callback
						/>
					</fieldset>
					<fieldset>
						<legend className="blocks-base-control__label">
							{__('Text color', 'tweet-this')}
						</legend>
						<ColorPalette // Element Tag for Gutenberg standard colour selector
							onChange={onChangeTextColor} // onChange event callback
						/>
					</fieldset>
					<fieldset>
						<legend className="blocks-base-control__label">
							{__('Button Background color', 'tweet-this')}
						</legend>
						<ColorPalette // Element Tag for Gutenberg standard colour selector
							onChange={onChangeButtonBGColor} // onChange event callback
						/>
					</fieldset>
					<fieldset>
						<legend className="blocks-base-control__label">
							{__('Button Text color', 'tweet-this')}
						</legend>
						<ColorPalette // Element Tag for Gutenberg standard colour selector
							onChange={onChangeButtonTextColor} // onChange event callback
						/>
					</fieldset>
				</div>
			</InspectorControls>

			<RichText
				{...useBlockProps.save()}
				tagName="p"
				onChange={onChangeContent}
				value={attributes.content}
				style={{
					backgroundColor: attributes.bg_color,
					color: attributes.text_color,
					border: `1px solid ${attributes.text_color}`,
				}}
			/>
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
	);
}
