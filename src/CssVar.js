import { LitElement, html } from './lit-all.min.js';

class CssVar extends LitElement {
	/* Properties */
	static properties = {
		mode: {
			type: String,
			attribute: 'mode',
			reflect: true
		},
		value: {
			type: String,
			attribute: 'value',
			reflect: true
		}
	};
	constructor(){
		super();
		this.mode = 'value';
		this.value = '';
	}
	
	
	/* Rendering */
	render(){
		return html`
			<div class="d-f">
				<select id="mode">
					
				</select>
			</div>
		`;
	}
	
	static modes = {
		"color": {
			label: "Color",
			detector: (v) => {
				if (typeof v !== 'string') return false;
				const s = document.createElement('span');
				s.style.color = '';
				s.style.color = v.trim();
				return !!s.style.color;
			},
			editor: (v) => html``
		},
		"var": {
			
		},
		"value": {
			label: "Value",
			detector: ()=>true,
			editor: (v) => html`<input type="text" value="${v}" />`
		}
	}
}
