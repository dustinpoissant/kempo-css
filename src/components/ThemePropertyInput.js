import ShadowComponent from '/kempo-ui/components/ShadowComponent.js';
import { html, css } from '/kempo-ui/lit-all.min.js';

export default class ThemePropertyInput extends ShadowComponent {
  static properties = {
    propName: { type: String, attribute: 'prop-name' },
    value: { type: String },
    availableProperties: { type: Array, attribute: 'available-properties' },
    mode: { type: String },
    initialColor: { type: String, attribute: 'initial-color' }
  };

  static styles = css`
    :host {
      display: block;
    }
    label {
      display: block;
      margin-bottom: 0.25rem;
    }
    .input-wrapper {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    .mode-select {
      width: 100px;
      flex-shrink: 0;
    }
    .value-input {
      flex: 1;
    }
  `;

  constructor() {
    super();
    this.propName = '';
    this.value = '';
    this.availableProperties = [];
    this.mode = 'color';
    this.initialColor = '';
  }

  connectedCallback() {
    super.connectedCallback();
    
    if(this.value?.startsWith('var(')) {
      this.mode = 'var';
    }
  }

  firstUpdated() {
    this.attachColorPickerListener();
  }

  updated(changedProperties) {
    super.updated?.(changedProperties);
    this.attachColorPickerListener();
  }

  attachColorPickerListener() {
    if(this.mode === 'color') {
      const colorPicker = this.shadowRoot?.querySelector('k-color-picker');
      if(colorPicker && !colorPicker._hasChangeListener) {
        colorPicker._hasChangeListener = true;
        colorPicker.addEventListener('change', this.handleColorChange);
        colorPicker.addEventListener('input', this.handleColorChange);
      }
    }
  }

  /*
    Event Handlers
  */

  handleModeChange = (e) => {
    this.mode = e.target.value;
    
    if(this.mode === 'var' && !this.value.startsWith('var(')) {
      this.value = this.availableProperties[0] ? `var(${this.availableProperties[0]})` : '';
    } else if(this.mode === 'color' && this.value.startsWith('var(')) {
      this.value = this.initialColor || '#000000';
    }
    
    this.emitChange();
  };

  handleVarInput = (e) => {
    const varName = e.target.value;
    this.value = varName.startsWith('var(') ? varName : `var(${varName})`;
    this.emitChange();
  };

  handleColorChange = (e) => {
    this.value = e.target.value;
    this.emitChange();
  };

  /*
    Utility Functions
  */

  emitChange() {
    this.dispatchEvent(new CustomEvent('value-change', {
      detail: { propName: this.propName, value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  /*
    Rendering
  */

  render() {
    const datalistId = `${this.propName}-datalist`;
    const varName = this.value?.startsWith('var(') 
      ? this.value.slice(4, -1).trim() 
      : '';

    return html`
      <label>${this.propName}</label>
      <div class="input-wrapper">
        <select class="mode-select" .value=${this.mode} @change=${this.handleModeChange}>
          <option value="var">Var</option>
          <option value="color">Color</option>
        </select>

        ${this.mode === 'var' 
          ? html`
            <input 
              class="value-input"
              list=${datalistId}
              .value=${varName}
              @input=${this.handleVarInput}
              placeholder="--property-name"
            />
            <datalist id=${datalistId}>
              ${this.availableProperties.map(prop => html`<option value=${prop}></option>`)}
            </datalist>
          `
          : html`
            <k-color-picker 
              class="value-input"
              value=${this.value}
            ></k-color-picker>
          `
        }
      </div>
    `;
  }
}

customElements.define('k-theme-property-input', ThemePropertyInput);
