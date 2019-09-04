import {
    LitElement,
    html,
    css
} from 'lit-element';
import {
    sharedStyles
} from './shared-styles'

export class GcButton extends LitElement {

    static get styles() {
        return [sharedStyles, css `
        
        .gc-button{
            min-width: 100px;
            padding: 9px 15px;
            border: 1px solid var(--color-grey-dark);
            background-color: var(--color-grey-dark);
            color: white;
            font-size: 1rem;
            cursor: pointer;
            width: 40%;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .gc-button:hover{
            background-color: black;
        }


        .gc-button--ghost{
            background-color: transparent;
            color: var(--color-grey-dark);
        }  

        .gc-button--icon{
            /* Pues no tiene nada por ahora */
        }

        @media (min-width: 768px){
            .gc-button{
                width: auto;
                margin: initial;
            }
        }

        `]
    }

    constructor() {
        super();
        this.textButton = 'Text Button',
            this.claseVariacion = '',
            this.send = false,
            this.edit = false,
            this.ident = 0
    }


    static get properties() {
        return {
            textButton: {
                type: String
            },
            claseVariacion: {
                type: String
            },
            send: {
                type: Boolean
            },
            edit: {
                type: Boolean
            },
            ident: {
                type: Number
            }
        };
    }

    render() {
        return html `
        <button 
        class="gc-button ${this.claseVariacion}"
    @click="${this.actionButtonClick}" .edit="${this.edit}" ident="${this.ident}">${this.textButton} <slot name="icon"></slot></button>
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
customElements.define('gc-button', GcButton);