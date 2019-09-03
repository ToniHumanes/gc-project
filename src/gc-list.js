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
        this.tasks = []
    }

    static get properties() {
        return {
            tasks: {
                type: Array
            },
        };
    }

    render() {
        return html `
            ${this.tasks.map(task => html`<gc-item-list description="${task.description}" price="${task.price}" .iconEdit="${task.iconEdit}" .iconDelete="${task.iconDelete}"></gc-item-list>`)}
        `;
    }

}
customElements.define('gc-list', GcList);