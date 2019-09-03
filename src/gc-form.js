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
    }

    static get properties() {
        return {
        };
    }

    render() {
        return html `
        <div class="gc-form">
            <div>
                <gc-input placeholder="Descripción" typeInput="text" claseVariacion="" idComponent="inputDescription"></gc-input>
            </div>
            <div>
                <gc-input placeholder="Importe " typeInput="number" idComponent="inputValor"></gc-input>
            </div>
            <div>
                <gc-button textButton="Crear Nota" claseVariacion="gc-button--icon"><svg slot="icon"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                        <path d="M0 0h24v24H0z" fill="none" /></svg>
                </gc-button>
            </div>
        </div>
        `;
    }
}
customElements.define('gc-form', GcForm);