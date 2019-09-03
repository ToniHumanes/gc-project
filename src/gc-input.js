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
                position: relative;
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
                border: 1px solid var(--color-grey-dark);
            }


            @media (min-width: 768px){
                :host{
                    width: auto;
                    margin-bottom: 0px;
                }

                .input{ width: auto;}
            }


            /* :host(.gc-input--number-euro):after{
                content: url('src/images/euro.svg');
                display: flex;
                position: absolute;
                right: 15px;
                top: calc((100% / 2) - (var(--icon-sm) / 2));
                width: var(--icon-sm);
                height: var(--icon-sm);
                line-height: 1;
            } */

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
            placeholder: {
                type: String
            },
            claseVariacion: {
                type: String
            },
            typeInput: {
                type: String
            },
            idComponent: {
                type: String
            },
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
        if (e.target.type === 'number' && e.code === "KeyE") {
            e.preventDefault();
        }
    }

}
customElements.define('gc-input', GcInput);