import {
    LitElement,
    html,
    css
} from 'lit-element';

export class GcForm extends LitElement {

    static get styles() {
        return css `

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


        gc-button svg {
            fill: var(--color-white);
            width: 18px;
            height: 18px;
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
                <gc-button @click="${this.actionButtonClick}" textButton="${this.textButton}" .edit="${this.edit}" claseVariacion="gc-button--icon" ident="${this.ident}"><svg slot="icon"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                        <path d="M0 0h24v24H0z" fill="none" /></svg>
                </gc-button>
            </div>
        </div>
        `;
    }


    actionButtonClick() {
        if (this.edit === true) {
            this.dispatchEvent(new CustomEvent('clickButtonEdit', {
                bubbles: true,
                composed: true,
                detail: {
                    id: this.ident,
                    edit: this.edit
                }
            }));
        } else if (this.edit === false) {

            this.send = true
            this.dispatchEvent(new CustomEvent('clickButtonForm', {
                bubbles: true,
                composed: true,
                detail: {
                    send: this.send,
                    edit: this.edit
                }
            }));
        }
    }


}
customElements.define('gc-form', GcForm);