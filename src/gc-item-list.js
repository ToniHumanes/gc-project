

import { LitElement, html, css } from 'lit-element';

export class GcItemList extends LitElement {

    static get styles(){
        return css`
        
        :host{
            border-bottom: 1px solid var(--color-border-grey);
            display: block;
        }
        
        :host(:first-of-type){
            border-top: 1px solid var(--color-border-grey);
            margin-top: 1rem;
        }

        :host(:nth-of-type(odd)){
            background-color: var(--color-grey);
        }

        .list-item{
            padding: .7rem .5rem;
            display:grid;
            grid-template-columns: 1fr auto;
            grid-column-gap: 15px;
            justify-content: space-between;
            align-items: center;
        }
        
        .list-item__title{
            font-size: 17px;
            margin-bottom: 0px;
            margin-top:0px;
            color: #333;
        }

        .list-item__price{
            font-weight: 700;
            margin-top:0px;
            margin-bottom:0px;
            font-size: 16px;
        }

        .list-item--price-positive{
            color: var(--color-green);
        }

        .list-item--price-negative{
            color: var(--color-red);
        }
        `
    }

    constructor() {
        super();
        this.description = '',
        this.price = 0
    }


    static get properties() {
        return {
            description: {type: String},
            price: {type: Number},
        };
    }

    render() {
        return html`
            <div class="list-item">
                <p class="list-item__title">${this.description}</p>
                
                <p class="list-item__price ${this.isPositiveOrNegative() ? 'list-item--price-negative' : 'list-item--price-positive' }">${this.price}€</p>
            </div>
        `;
    }

    isPositiveOrNegative(){
        if(Math.sign(this.price) === -1){
            return true
        }else if(Math.sign(this.price) === 1){
            return false
        }else{
            return false
        }
    }
}
customElements.define('gc-item-list', GcItemList);