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

            .contain-input{
                display: flex;
                width: 100%;
                position: relative;
                align-items: center;
            }

            .input--icon{
                padding: 3px;
                position: absolute;
                right: 5px;
                width: 18px;
                height: 18px;
            }

            .input--icon svg{
                fill: var(--color-grey-dark)
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
            }
        `
    }

    constructor() {
        // El constructor inicializa propiedades / valores por defecto
        super();
        this.placeholder = '',
            this.typeInput = 'text',
            this.claseVariacion = '',
            this.idComponent = '',
            this.description = '',
            this.price = ''
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
            description: {
                type: String
            },
            price: {
                type: Number
            }
        };
    }

    render() {
        return html `
        <div class="contain-input">
            <input 
                type="${this.typeInput}" 
                class="input ${this.claseVariacion}" 
                placeholder="${this.placeholder}"
                @keypress="${this.inputValue}"
                id=${this.idComponent}
                value="${this.typeInput === 'number' ? this.price : this.description}"
            >
            ${this.typeInput === 'number' ? html`<span class="input--icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15v-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15V9H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3v2h3.06c-.04.33-.06.66-.06 1 0 .34.02.67.06 1H3v2h3.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57z"/><path fill="none" d="M0 0h24v24H0z"/></svg></span>` : ''}
        </div>
        `;
    }

    inputValue(e) {
        if (e.target.type === 'number' && e.code === "KeyE") {
            e.preventDefault();
        }
    }

}
customElements.define('gc-input', GcInput);