import {
    LitElement,
    html,
    css
} from 'lit-element';

export class GcFeedback extends LitElement {

    static get styles() {
        return css `

        :host{
            padding: 15px 8px;
            background-color: var(--color-grey-dark);
            color: white;
            font-size: 1rem;
            font-weight: 700;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            transform: translateY(100px);
            display: none;
        }

        :host(.feedback--active){
            animation-name: active;
            animation-duration: 4s;
            display: block;
        }

        :host(.feedback--success){
            background-color: var(--color-green);
        }

        :host(.feedback--error){
            background-color: var(--color-red);
        }

        @keyframes active {
            0% {transform: translateY(100px);}
            10%{ transform: translateY(0px);}
            50% {transform: translateY(0px);}
            90% {transform: translateY(0px);}
            100% { transform: translateY(100px)}
        }

        .feedback__paragraph{
            margin-top: 0px;
            margin-bottom: 0px;
        }

        `
    }

    constructor() {
        super();
        this.feedbackText = '';
        this.feedbackType = '';
    }


    static get properties() {
        return {
            feedbackText: {
                type: String
            },
            feedbackType: {
                type: String
            }
        };
    }

    render() {
        return html `<p class="feedback__paragraph ${this.feedbackType}">${this.feedbackText}</p>`;
    }

}
customElements.define('gc-feedback', GcFeedback);