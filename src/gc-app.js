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
        this.db = firebase.firestore();
        this.tasks = [],
            this.getData = this.getData(this.tasks, this);
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
                //this.addData(ArrayValues, this);
            }
            for (let i = 0; i < ValueDescription.length; i++) {
                ValueDescription[i].shadowRoot.querySelector('input').value = '';
            }

            this.shadowRoot.querySelector('gc-list').requestUpdate();
        }
    }

    editData(e) {
        if (e.detail.edit === true) {

            let identArray = this.shadowRoot.querySelector('gc-list').shadowRoot.querySelectorAll('gc-item-list')
            let ArrayValues = [];

            // Llegamos hasta los inputs, recogemos el valor y lo insertamos en gc-item-list, editando así el contenido.

            for (let i = 0; i < identArray.length; i++) {
                if (!!identArray[i].shadowRoot.querySelector('gc-form')) {
                    let ArrayInputs = identArray[i].shadowRoot.querySelector('gc-form').shadowRoot.querySelectorAll('gc-input')
                    for (let i = 0; i < ArrayInputs.length; i++) {
                        let ArrayInputsValues = ArrayInputs[i].shadowRoot.querySelector('input').value;
                        ArrayValues.push(ArrayInputsValues);
                    }
                    var id = identArray[i].ident
                }
            }

            let ArrayValuesObject = {
                description: ArrayValues[0],
                price: ArrayValues[1],
                iconDelete: true,
                iconEdit: true,
                id: e.detail.id,
                show: false
            }

            if (ArrayValuesObject.description === '' || ArrayValuesObject.price === '') {
                alert('Faltan campos por completar')
            } else {
                let positionInArray = this.tasks.findIndex((task) => task.id === id)
                this.tasks[positionInArray] = {
                    ...ArrayValuesObject
                }
            }

            // Iteración para cerrar el formulario despues de editar
            let itemsList = this.shadowRoot.querySelector('gc-list').shadowRoot.querySelectorAll('gc-item-list')
            for (let i = 0; i < itemsList.length; i++) {
                itemsList[i].show = false
            }

            // Actualizamos la lista para que imprima los datos de nuevo
            this.shadowRoot.querySelector('gc-list').requestUpdate();
        }
    }

    getData() {
        this.db.collection("task_item").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    let data = doc.data();
                    this.tasks.push(data);
                    this.shadowRoot.querySelector('gc-list').requestUpdate();
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }


    // dbChangeTask(){
    //     this.db.collection("task_item").onSnapshot((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         this.tasks.push(doc.data());
    //     });
    // });

    // this.shadowRoot.querySelector('gc-list').requestUpdate();

    // }
}

customElements.define('gc-app', GcApp);