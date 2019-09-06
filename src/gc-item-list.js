import {
    LitElement,
    html,
    css
} from 'lit-element';

export class GcItemList extends LitElement {

    static get styles() {
        return css `
        
        :host{
            border-bottom: 1px solid var(--color-border-grey);
            display: block;
            padding: 8px 10px 8px;
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

        /* Variaciones */

        .list-item--first-icon{
            grid-template-columns: auto 1fr auto;
        }

        .list-item--second-icon{
            grid-template-columns: auto auto 1fr auto;
        }
        
        .list-item__title{
            font-size: 17px;
            margin-bottom: 0px;
            margin-top:0px;
            color: var(--color-grey-dark);
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
            this.price = '',
            this.iconDelete = false,
            this.iconEdit = false,
            this.show = false,
            this.textButton = 'Editar',
            this.edit = true,
            this.ident = 0
    }


    static get properties() {
        return {
            description: {
                type: String
            },
            price: {
                type: Number
            },
            iconEdit: {
                type: Boolean
            },
            iconDelete: {
                type: Boolean
            },
            show: {
                type: Boolean
            },
            edit: {
                type: Boolean
            },
            ident: {
                type: String
            },
        };
    }

    render() {
        return html `
            <div class="list-item ${  this.iconEdit && this.iconDelete ? 'list-item--second-icon' : '' 
                    || 
                    this.iconEdit || this.iconDelete ? 'list-item--first-icon' : ''
                }" 
                id="${this.ident}">

            ${this.iconEdit ? 
                html`<gc-icon 
                    icon="edit" 
                    @click="${this.actionMenuItem}">
                </gc-icon>` : ''}

            ${this.iconDelete ? 
                html`<gc-icon 
                    icon="delete" 
                    @click="${this.actionMenuItem}">
                </gc-icon>` : ''}

                <p class="list-item__title">${this.description}</p>
                <p class="list-item__price ${this.isPositiveOrNegative() ? 'list-item--price-negative' : 'list-item--price-positive' }">${this.price}€</p>

                </div>
                ${this.show ? html`<gc-form .edit="${this.edit}" textButton="${this.textButton}" ident="${this.ident}" description="${this.description}" price="${this.price}" .show="${this.show}"></gc-form>` : ''}
        `;
    }

    isPositiveOrNegative() {
        if (Math.sign(this.price) === -1) {
            return true
        } else if (Math.sign(this.price) === 1) {
            return false
        } else {
            return false
        }
    }

    actionMenuItem(e) {
        e.preventDefault();

        // Función dropdown 
        if (e.target.icon === 'edit') {
            if (this.show === true) {
                this.show = false;
            } else {
                // Función tab 
                let list = this.parentNode.querySelectorAll('gc-item-list')
                for (let i = 0; i < list.length; i++) {
                    if (list[i].shadowRoot.querySelector('gc-form')) {
                        let element = list[i]
                        element.show = false
                    }
                }
                this.show = true;
            }
        } else if (e.target.icon === 'delete') {
            this.dispatchEvent(new CustomEvent('deleteItem', {
                composed: true,
                bubbles: true,
                detail: {
                    delete: true,
                    id: this.ident
                }
            }));
        }
    }
}
customElements.define('gc-item-list', GcItemList);