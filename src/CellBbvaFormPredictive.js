import { LitElement, html, } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import '@bbva-web-components/bbva-web-form-search/bbva-web-form-search.js';
import '@bbva-web-components/bbva-web-form-checkbox/bbva-web-form-checkbox.js';
import '@bbva-web-components/bbva-form-input/bbva-form-input.js';
import '@bbva-web-components/bbva-web-form-select/bbva-web-form-option.js';
import '@bbva-web-components/bbva-web-form-select/bbva-web-form-select.js';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@bbva-web-components/bbva-form-input/bbva-form-input.js';
import '@bbva-web-components/bbva-web-form-predictive/bbva-web-form-predictive.js';
import '@bbva-web-components/bbva-web-form-radio-button/bbva-web-form-radio-button.js';
import '@bbva-web-components/bbva-form-predictive/bbva-form-predictive.js';


import styles from './CellBbvaFormPredictive-styles.js';
/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<cell-bbva-form-predictive></cell-bbva-form-predictive>
```

##styling-doc

@customElement cell-bbva-form-predictive
*/
export class CellBbvaFormPredictive extends LitElement {
  static get is() {
    return 'cell-bbva-form-predictive';
  }

  // Declare properties
  static get properties() {
    return {
      options: { type: Object, },
      selected: { type: Boolean },
      selectOptions: { type: Boolean },
      values: { type: Array },
      datosSeleccionados: { type: Object },
      required: {type: Object}
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.options = {};
    this.selected = false;
    this.selectOptions = false;
    this.values = ["Toyota", "Suzuki", "Honda", "Jeep", "Ford"];
    this.datosSeleccionados = {
      placa: '',
      marca: '',
      anio: '',
      circulacion: '',
      glp: ''
    };
    this.required = {
      modelo:false,
      placa: false,
      marca: false,
      anio: false,
      circulacion:false,
      glp: false
    }
  }



  badgeValidation() {
    let selectedCheckbox = this.shadowRoot.querySelectorAll("bbva-web-form-checkbox");
    let selected = this.shadowRoot.querySelector("bbva-web-form-search");
    selectedCheckbox.forEach(i => {
      if (i.checked === true) {
        selected.readonly = true;
      } else {
        selected.readonly = false;
      }
    })
  }

  selectedPlaca() {
    let componentPredictive = this.shadowRoot.querySelectorAll('.placa');
    if (componentPredictive[0].value !== undefined) {
      this.datosSeleccionados.placa = componentPredictive[0].value;
      this.required.placa = true;
    } else {
      this.required.placa  = false;
    }
  }

  selectedMarca() {
    let componentPredictive = this.shadowRoot.querySelectorAll('.marca');
    if (componentPredictive[0].value !== undefined) {
      this.datosSeleccionados.marca = componentPredictive[0].value;
      this.required.marca = true;
    } else {
      this.required.marca  = false;
    }
  }

  selectedModelo() {
    let componentPredictive = this.shadowRoot.querySelectorAll('.modelo');
    if (componentPredictive[0].value !== undefined) {
      this.datosSeleccionados.modelo = componentPredictive[0].value;
      this.required.modelo = true;
    } else {
      this.required.modelo  = false;
    }
  }

  radiogroupGLP() {
    let radioButtons = this.shadowRoot.querySelectorAll(".options1");
    radioButtons.forEach(radio => {
      if (radio.checked === true) {
        this.datosSeleccionados.glp = radio.value;
        this.required.glp = true;
      } else {
        this.required.glp  = false;
      }
    })
  }

  radiogroupProvincias() {
    let radioButtons = this.shadowRoot.querySelectorAll(".options");
    radioButtons.forEach(radio => {
      if (radio.checked === true) {
        this.datosSeleccionados.circulacion = radio.value;
        this.required.circulacion = true;
      } else {
        this.required.circulacion  = false;
      }
    })
  }


  selectYear() {
    let formOptions = this.shadowRoot.querySelectorAll("bbva-web-form-option");
    let count = 0;
    formOptions.forEach(item => {
      if (item.selected === true) {
        count++;
        this.datosSeleccionados.anio = item.value;
        this.required.anio = true;
      } else {
        this.required.anio  = false;
      }
      if (count >= 1) {
        this.selectOptions = true;
      }
    })

  }

  _onButtonClick() {
    if (this.required.placa === true &&  this.required.marca === true && this.required.modelo === true ) {
      this.dispatchEvent(
        new CustomEvent('event-datos', {
          bubbles: true,
          detail: {
            title: this.datosSeleccionados,
          },
        })
      );
    } else {
      this.dispatchEvent(
        new CustomEvent('event-datos', {
          bubbles: true,
          detail: {
            error: 'Complete los campos obligatorios*',
          },
        })
      );

    }
  }
  static get styles() {
    return [
      styles,
      getComponentSharedStyles('cell-bbva-form-predictive-shared-styles')
    ];
  }

  // Define a template
  render() {
    return html`
      <div class="container">
            <h4>Completa los datos del vehículo</h4> 
            <bbva-form-predictive
            class="placa"
            @click="${this.selectedPlaca}"
            search="" 
            label="Número de placa(opcional)" 
            required="" 
            .items=${this.options.placa}>
          </bbva-form-predictive>
            <bbva-web-form-checkbox                    
                      @click="${this.badgeValidation}"
                      >
                      ${this.options.items}                      
             </bbva-web-form-checkbox>         
            <bbva-form-predictive 
            class="marca"
            search="" 
            label="Marca" 
            required="" 
            @click="${this.selectedMarca}"
            .items=${this.values}>
          </bbva-form-predictive>

          <bbva-form-predictive 
            @click="${this.selectedModelo}"
            class="modelo"
            search="" 
            label="Modelo" 
            required="" 
            .items=${this.options.modelo}>
          </bbva-form-predictive>
            
            <div>
              <bbva-web-form-select label= "Año">
              ${this.options.year.map(item => html`
            
                   <bbva-web-form-option 
                      value=${item}                       
                      @click="${this.selectYear}"
                    >${item}    
                    </bbva-web-form-option> 
              `)}  
              </bbva-web-form-select>
            </div>

            <label>Mayor circulación del vehículo</label>
            <div class="radiogroupGLP" role="radiogroup">  
            ${this.options.circulation.map(item => html`                    
                    <bbva-web-form-radio-button
                      class="options" 
                      value=${item}
                      name="options"    
                      @click ="${this.radiogroupProvincias}"                   
                    >${item}    
                    </bbva-web-form-radio-buttonn> 
              `)}  
            </div>

            <label>Vehículo convertido a GLP/GNV</label>
            <div class="radiogroupGLP" role="radiogroup1"> 
              ${this.options.glp.map(item => html`                    
                      <bbva-web-form-radio-button 
                        class="options1"
                        value=${item}
                        name="options1"                       
                        @click="${this.radiogroupGLP}"
                      >${item}    
                      </bbva-web-form-radio-buttonn> 
                `)} 
            </div>             
          
          <div  class="button">
            <bbva-web-button-default @click="${this._onButtonClick}">Ver datos</bbva-web-button-default>
            
          </div>

      </div>
    `;
  }
}
