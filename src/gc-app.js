import {
    LitElement,
    html,
    css
} from 'lit-element';

export class GcApp extends LitElement {

    static get styles() {
        return css `
            
        `
    }

    constructor() {
        super();
        this.tasks = [{
            description: 'Nota de prueba',
            price: 0,
            iconEdit: true,
            iconDelete: true,
        }]
    }


    static get properties() {
        return {
            tasks: {
                type: Object
            }
        };
    }

    render() {
        return html `
        <div  @clickButtonForm="${this.sendData}">
            <section class="form-insert-count">
                <gc-form></gc-form>
            </section>

            <section class="form-insert-rows" >
                <gc-list .tasks="${this.tasks}"></gc-list>
            </section>
        </div>
        `;
    }


    sendData() {
        let ArrayValues = [];
        let ValueDescription = this.shadowRoot.querySelector('gc-form').shadowRoot.querySelectorAll('gc-input');
        for (let i = 0; i < ValueDescription.length; i++) {
            let values = ValueDescription[i].shadowRoot.querySelector('input').value;
            ArrayValues.push(values)
        }
        ArrayValues = {
            description: ArrayValues[0],
            price: ArrayValues[1],
            iconDelete: true,
            iconEdit: true,
        }
        this.tasks.push(ArrayValues)
        for (let i = 0; i < ValueDescription.length; i++) {
            ValueDescription[i].shadowRoot.querySelector('input').value = '';
        }
        this.shadowRoot.querySelector('gc-list').requestUpdate();
    }
}

customElements.define('gc-app', GcApp);