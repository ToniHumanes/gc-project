import { LitElement, html, css } from 'lit-element';

export class GcApp extends LitElement {

    static get styles(){
        return css``
    }

    constructor(){
        super();
        this.arrayInput = []
    }


    static get properties() {
        return {
            arrayInput: { type: Object }
        };
    }

    render() {
        return html`
        <div  @clickButtonForm="${this.sendData}">
            <section class="form-insert-count">
                <gc-form></gc-form>
            </section>

            <section class="form-insert-rows" >
                <gc-list .task-data="${this.arrayInput}"></gc-list>
            </section>
        </div>
        `;
    }

    dataInput(){
        let ValueDescription = this.shadowRoot.querySelector('gc-form').shadowRoot.querySelectorAll('gc-input');
        let ArrayValues = [];
        for (let i = 0; i < ValueDescription.length; i++) {
            let values = ValueDescription[i].shadowRoot.querySelector('input').value;
            ArrayValues.push(values)
        }
        
        return ArrayValues;
    }

    sendData(e){
        let ArrayValues = this.dataInput()
        ArrayValues = {
            description: ArrayValues[0],
            price: ArrayValues[1],
        }
        this.arrayInput.push(ArrayValues)
        console.log(this.arrayInput)
    }

}

customElements.define('gc-app', GcApp);