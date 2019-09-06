import { LitElement, html, css } from 'lit-element';
import {Icons} from './icons'

export class GcIcon extends LitElement {

    static get styles(){
        return css`
            .gc-icon{
                fill: var(--color-grey-dark);
            }
        `;
    }

    constructor() {
        super();
        this.icon = ''
    }
    

    static get properties() {
        return {
            icon: {type: String}
        };
    }

    render() {
        return html`
        <a href="#" class="gc-icon">
            ${Icons[this.icon]}
        </a>
        `;
    }
}
customElements.define('gc-icon', GcIcon);