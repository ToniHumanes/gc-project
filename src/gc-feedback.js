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
            position: absolute;
            left: 0;
            right: 0;
            bottom: -100px;
            display: none;
        }

        :host(.feedback--active){
            animation-name: active;
            animation-duration: 4s;
            display: block;
        }

        @keyframes active {
            0% {bottom: -100px;}
            10%{ bottom: 0px;}
            50% {bottom: 0px;}
            90% {bottom: 0px;}
            100% { bottom: -100px}
        }

        .feedback__paragraph{
            margin-top: 0px;
            margin-bottom: 0px;
        }

        `
    }

    constructor() {
        super();
        this.feedbackText = ''
    }


    static get properties() {
        return {
            feedbackText: {
                type: String
            }
        };
    }

    render() {
        return html `<p class="feedback__paragraph">${this.feedbackText}</p>`;
    }

}
customElements.define('gc-feedback', GcFeedback);