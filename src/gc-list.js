import {
    LitElement,
    html,
    css
} from 'lit-element';

export class GcList extends LitElement {

    static get styles() {
        return css `
        `;
    }

    constructor() {
        super();
        this.arrayInput = [],
        this.tasks = [{
                description: 'Nota de prueba',
                price: 0,
                iconEdit: true,
                iconDelete: true,
            }
        ]
    }

    static get properties() {
        return {
            tasks: {
                type: Array
            },
            arrayInput: {
                type: Array
            }
        };
    }

    render() {
        return html `
        <p>${this.arrayInput}</p>
            ${this.tasks.map(task => html`<gc-item-list description="${task.description}" price="${task.price}" .iconEdit="${task.iconEdit}" .iconDelete="${task.iconDelete}"></gc-item-list>`)}
        `;
    }


    results(){
        console.log(this.arrayInput)
        debugger
    }




}
customElements.define('gc-list', GcList);