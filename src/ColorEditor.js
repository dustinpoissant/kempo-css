import { LitElement, html } from './lit-all.min.js';

class ColorEditor extends LitElement {
	/* Properties */
	static properties = {
		format: {
			type: String,
			attribute: 'format',
			reflect: true
		},
		value: {
			type: String,
			attribute: 'value',
			reflect: true
		}
	}
	constructor(){
		super();
		this.format = 'hex';
		this.value = '#000000';
	}
	
	/* Rendering */
	
}
window.customElements.define('color-editor', ColorEditor);