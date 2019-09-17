import {
    LitElement,
    html,
    css
} from 'lit-element';
import './gc-input';
import './gc-button';

export class GcForm extends LitElement {

    static get styles() {
        return css `

            :host svg {
                fill: var(--color-white);
                width: 18px;
                height: 18px;
            }

            .gc-form{
                display: grid;
                grid-template-columns: repeat(auto-fit, 100%);
                grid-column-gap: 10px;
                align-items: center;
            }

            @media (min-width: 768px) {
                .gc-form {
                    grid-template-columns: repeat(auto-fit, minmax(219px, max-content));
                }
            }

        `
    }

    constructor() {
        super();
        this.textButton = '',
        this.edit = false,
        this.ident = 0,
        this.description = '',
        this.price = ''
    }

    static get properties() {
        return {
            textButton: { type: String },
            edit: { type: Boolean },
            ident: { type: String},
            description: { type: String},
            price: { type: Number}
        };
    }

    render() {
        return html `
        <div class="gc-form" id="${this.ident}">
            <div>
                <gc-input placeholder="Descripción" typeInput="text" claseVariacion="" idComponent="inputDescription" description="${this.edit ? this.description : ''}"></gc-input>
            </div>
            <div>
                <gc-input placeholder="Importe " typeInput="number" idComponent="inputValor" price="${this.edit ? this.price : null}"></gc-input>
            </div>
            <div>
                <gc-button @click="${this.actionButtonForm}" textButton="${this.textButton}" .edit="${this.edit}" claseVariacion="gc-button--icon" ident="${this.ident}"><svg slot="icon"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                        <path d="M0 0h24v24H0z" fill="none" /></svg>
                </gc-button>
            </div>
        </div>
        `;
    }


    actionButtonForm() {
            this.dispatchEvent(new CustomEvent('clickButtonForm', {
                bubbles: true,
                composed: true,
                detail: {
                    id: this.ident,
                    edit: this.edit,
                    time: new Date().getTime()
                }
            }));
    }
}
customElements.define('gc-form', GcForm);