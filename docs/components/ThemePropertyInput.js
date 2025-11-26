import ShadowComponent from"/kempo-ui/components/ShadowComponent.js";import{html,css}from"/kempo-ui/lit-all.min.js";export default class ThemePropertyInput extends ShadowComponent{static properties={propName:{type:String,attribute:"prop-name"},value:{type:String},availableProperties:{type:Array,attribute:"available-properties"},mode:{type:String},initialColor:{type:String,attribute:"initial-color"}};static styles=css`
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
  `;constructor(){super(),this.propName="",this.value="",this.availableProperties=[],this.mode="color",this.initialColor=""}connectedCallback(){super.connectedCallback(),this.value?.startsWith("var(")&&(this.mode="var")}firstUpdated(){this.attachColorPickerListener()}updated(e){super.updated?.(e),this.attachColorPickerListener()}attachColorPickerListener(){if("color"===this.mode){const e=this.shadowRoot?.querySelector("k-color-picker");e&&!e._hasChangeListener&&(e._hasChangeListener=!0,e.addEventListener("change",this.handleColorChange),e.addEventListener("input",this.handleColorChange))}}handleModeChange=e=>{this.mode=e.target.value,"var"!==this.mode||this.value.startsWith("var(")?"color"===this.mode&&this.value.startsWith("var(")&&(this.value=this.initialColor||"#000000"):this.value=this.availableProperties[0]?`var(${this.availableProperties[0]})`:"",this.emitChange()};handleVarInput=e=>{const t=e.target.value;this.value=t.startsWith("var(")?t:`var(${t})`,this.emitChange()};handleColorChange=e=>{this.value=e.target.value,this.emitChange()};emitChange(){this.dispatchEvent(new CustomEvent("value-change",{detail:{propName:this.propName,value:this.value},bubbles:!0,composed:!0}))}render(){const e=`${this.propName}-datalist`,t=this.value?.startsWith("var(")?this.value.slice(4,-1).trim():"";return html`
      <label>${this.propName}</label>
      <div class="input-wrapper">
        <select class="mode-select" .value=${this.mode} @change=${this.handleModeChange}>
          <option value="var">Var</option>
          <option value="color">Color</option>
        </select>

        ${"var"===this.mode?html`
            <input 
              class="value-input"
              list=${e}
              .value=${t}
              @input=${this.handleVarInput}
              placeholder="--property-name"
            />
            <datalist id=${e}>
              ${this.availableProperties.map(e=>html`<option value=${e}></option>`)}
            </datalist>
          `:html`
            <k-color-picker 
              class="value-input"
              value=${this.value}
            ></k-color-picker>
          `}
      </div>
    `}}customElements.define("k-theme-property-input",ThemePropertyInput);