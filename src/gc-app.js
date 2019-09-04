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
                id: 0
            }],
            this.textButton = 'Crear Nota'
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
        <div  @clickButtonForm="${this.sendData}" @clickButtonEdit="${this.editData}>
            <section class="form-insert-count">
                <gc-form textButton="${this.textButton}"></gc-form>
            </section>

            <section class="form-insert-rows" >
                <gc-list .tasks="${this.tasks}"></gc-list>
            </section>
        </div>
        `;
    }


    sendData(e) {
        if (e.detail.edit === false) {
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
                id: this.tasks.length
            }
            if (ArrayValues.description === '' || ArrayValues.price === '') {
                alert('Fantan campos por completar')
            } else {
                this.tasks.push(ArrayValues)
            }
            for (let i = 0; i < ValueDescription.length; i++) {
                ValueDescription[i].shadowRoot.querySelector('input').value = '';
            }
            this.shadowRoot.querySelector('gc-list').requestUpdate();
        }
    }

    editData(e) {
        if (e.detail.edit === true) {
            if (this.tasks[e.detail.id].id === e.detail.id) {

                let ArrayValues = [];

                let identArray = this.shadowRoot.querySelector('gc-list').shadowRoot.querySelectorAll('gc-item-list')
                for (let i = 0; i < identArray.length; i++) {
                    if (Number(identArray[i].getAttribute('ident')) === this.tasks[e.detail.id].id) {
                        let ArrayInputs = identArray[e.detail.id].shadowRoot.querySelector('gc-form').shadowRoot.querySelectorAll('gc-input')
                        for (let i = 0; i < ArrayInputs.length; i++) {
                            let ArrayInputsValues = ArrayInputs[i].shadowRoot.querySelector('input').value;
                            ArrayValues.push(ArrayInputsValues);
                        }
                    }
                }

                let ArrayValuesObject = {
                    description: ArrayValues[0],
                    price: ArrayValues[1],
                    iconDelete: true,
                    iconEdit: true,
                    id: e.detail.id
                }

                this.tasks[e.detail.id] = {
                    ...ArrayValuesObject
                }

                for (let i = 0; i < identArray.length; i++) {
                    let ArrayInputs = identArray[e.detail.id].shadowRoot.querySelector('gc-form').shadowRoot.querySelectorAll('gc-input')
                    for (let i = 0; i < ArrayInputs.length; i++) {
                        ArrayInputs[i].shadowRoot.querySelector('input').value = ''
                    }
                }

                this.shadowRoot.querySelector('gc-list').requestUpdate();
            }
        }
    }


}

customElements.define('gc-app', GcApp);