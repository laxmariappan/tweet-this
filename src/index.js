/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType('create-block/tweet-this', {
	apiVersion: 2,
	attributes: {
		bg_color: { type: 'string', default: '#ffffff' },
		text_color: { type: 'string', default: '#333333' },
		button_bg_color: { type: 'string', default: '#1C9BEF' },
		button_text_color: { type: 'string', default: '#ffffff' },
		twitter_handle: {
			type: 'string',
			default: 'laxmariappan',
		},
		content: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
		twitter_link: {
			type: 'string',
			default: '',
		},
	},
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
});
