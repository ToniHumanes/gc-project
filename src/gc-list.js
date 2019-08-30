import { LitElement, html, css } from 'lit-element';

export class GcList extends LitElement {

    static get styles(){
        return css`
            :host{
                background-color: #eeeeee;
            }
        `;
    }

    constructor() {
        super();
        this.item = []
    }

    static get properties() {
        return {
            item: {type: Array }
        };
    }

    render() {
        return html`
        
        `;
    }
}
customElements.define('gc-list', GcList);