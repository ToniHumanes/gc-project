import {
    LitElement,
    html,
    css
} from 'lit-element';

export class GcInput extends LitElement {


    static get styles() {
        return css `
            :host{
                width: 100%;
                display: flex;
                margin-bottom: 1rem;
            }

            .input{
                padding: 9px 15px;
                box-shadow: none;
                border: 1px solid grey;
                font-size: 1rem;
                width: 100%;
            }

            .input:focus{
                outline: none;
                border: 1px solid #333;
            }

            .input--text-color, .input--text-color::placeholder{
                color: #636363;
            }

            .input--bg-color{
                background-color: #00d8ff;
            }

            @media (min-width: 768px){
                :host{
                    width: auto;
                    margin-bottom: 0px;
                }

                .input{ width: auto;}
            }
        `
    }

    constructor() {
        // El constructor inicializa propiedades / valores por defecto
        super();
        this.placeholder = '',
        this.typeInput = 'text',
        this.claseVariacion = '',
        this.idComponent = ''
    }

    static get properties() {
        // las properties son reactivas
        // Gracias a las properties podemos bindear datos
        return {
            placeholder: {type: String},
            claseVariacion: {type: String},
            typeInput: {type: String},
            idComponent: {type: String},
        };
    }

    render() {
        return html `
            <input 
                type="${this.typeInput}" 
                class="input ${this.claseVariacion}" 
                placeholder="${this.placeholder}"
                @keypress="${this.inputValue}"
                id=${this.idComponent}
            >
        `;
    }

    inputValue(e) {
        if ( e.target.type === 'number' && e.which != 8 && e.which != 0 && e.which < 48 || e.target.type === 'number' && e.which > 57){
            e.preventDefault();
        }
        if (e.keyCode === 13) {
            console.log(e.target.value);
        }
    }

}
customElements.define('gc-input', GcInput);