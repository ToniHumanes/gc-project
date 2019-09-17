import {
    LitElement,
    html,
    css
} from 'lit-element';
import './gc-form';
import './gc-list';
import './gc-feedback'

export class GcApp extends LitElement {

    static get styles() {
        return css ``
    }

    constructor() {
        super();
        this.db = firebase.firestore();
        this.tasks = [],
        this.getChangeData = this.dbChangeTask();
        this.textButton = 'Insertar',
        this.resultDescription = 'Resultado'
        this.resultPrice = 0
        this.active = false
        this.feedbackText = ''
    }


    static get properties() {
        return {
            tasks: {
                type: Object
            },
            active: {
                type: Boolean
            },
            feedbackText: {
                type: String
            }
        };
    }

    render() {
        return html `
        <div  @clickButtonForm="${this.sendData}" @deleteItem="${this.deleteData}">
            <section class="form-insert-count">
                <gc-form textButton="${this.textButton}"></gc-form>
            </section>

            <section class="form-insert-rows" >
                <gc-list .tasks="${this.tasks}"></gc-list>
            </section>

            <section class="result">
                <gc-item-list description="${this.resultDescription}" price="${this.resultPrice}"></gc-item-list>
            </section>

            ${this.active ? html`<gc-feedback class="${this.active ? 'feedback--active' : ''}" feedbackText="${this.feedbackText}"></gc-feedback>` : ''}
        </div>
        `;
    }

    // Real time get data firebase
    dbChangeTask() {
        this.db.collection("task_item").orderBy('time', 'desc').onSnapshot((querySnapshot) => {
            var data = [];
            querySnapshot.forEach((doc) => {
                let item = doc.data();
                item.id = doc.id
                data.push(item);
                this.tasks = data;
            });

            // Hacemos operación y lo añadimos en la prop
            if(this.tasks.length >= 1){
                let result = this.tasks.map(item => Number(item.price)).reduce((total, num) => total + num )
                this.resultPrice = result;
            }

        });
    }

    sendData(e) {
        if (e.detail.edit) {
            console.log(e.detail);
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
                }
            }

            let ArrayValuesObject = {
                description: ArrayValues[0],
                price: Number(ArrayValues[1]),
                iconDelete: true,
                iconEdit: true,
                show: false,
                time: e.detail.time
            }

            if (!ArrayValuesObject.description || !ArrayValuesObject.price) {
                // componente feedback
                this.feedbackMessage('Faltan campos por completar o los datos no son validos')
            } else {
                // edit static
                // let positionInArray = this.tasks.findIndex((task) => task.id === id)
                // this.tasks[positionInArray] = {
                //     ...ArrayValuesObject
                // }

                // Añadimos firebase edit
                this.db.collection("task_item").doc(e.detail.id).update(ArrayValuesObject)
                .then(()=>{
                    this.feedbackMessage('Tarea Editada')
                })
                .catch(()=>{
                    this.feedbackMessage('Error al editar')
                })
            }

            // Iteración para cerrar el formulario despues de editar
            let itemsList = this.shadowRoot.querySelector('gc-list').shadowRoot.querySelectorAll('gc-item-list')
            for (let i = 0; i < itemsList.length; i++) {
                itemsList[i].show = false
            }

            // Actualizamos la lista para que imprima los datos de nuevo
            this.shadowRoot.querySelector('gc-list').requestUpdate();
        }else{
            console.log(e.detail);
            let ArrayValues = [];
            let ValueDescription = this.shadowRoot.querySelector('gc-form').shadowRoot.querySelectorAll('gc-input');
            for (let i = 0; i < ValueDescription.length; i++) {
                let values = ValueDescription[i].shadowRoot.querySelector('input').value;
                ArrayValues.push(values)
            }
            ArrayValues = {
                description: ArrayValues[0],
                price: Number(ArrayValues[1]),
                iconDelete: true,
                iconEdit: true,
                show: false,
                time: e.detail.time
            }
            if (!ArrayValues.description || !ArrayValues.price) {
                this.feedbackMessage('Faltan campos por completar o los datos no son validos')
            } else {
                // añadimos datos a firebase
                this.db.collection("task_item").add(ArrayValues)
                .then(() => {
                    // Hay que crear un componente de feedback
                    this.feedbackMessage('Tarea añadida')
                })
                .catch(() => {
                    this.feedbackMessage('Error al añadir')
                })

                // Limpiamos los campos cuando enviamos los datos
                for (let i = 0; i < ValueDescription.length; i++) {
                    ValueDescription[i].shadowRoot.querySelector('input').value = '';
                }
            }
            
            this.shadowRoot.querySelector('gc-list').requestUpdate();
        }
        
    }

    // delete data in firebase
    deleteData(e){
        this.db.collection("task_item").doc(e.detail.id).delete()
        .then(() => {
            this.feedbackMessage('Se ha eliminado la tarea')
        })
        .catch(() => {
            this.feedbackMessage('Error')
        })
    }

    // mensaje de feedback

    feedbackMessage(text){
        this.feedbackText = text
        this.active = true
        this.requestUpdate();
        setTimeout(() => {
            this.feedbackText = ''
            this.active = false
        }, 4000);
    }

}

customElements.define('gc-app', GcApp);