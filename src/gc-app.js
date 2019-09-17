import {
    LitElement,
    html,
    css
} from 'lit-element';
import './gc-form';
import './gc-list';

export class GcApp extends LitElement {

    static get styles() {
        return css `
        `
    }

    constructor() {
        super();
        this.db = firebase.firestore();
        this.tasks = [],
        this.getChangeData = this.dbChangeTask();
        this.textButton = 'Insertar'
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
        <div  @clickButtonForm="${this.sendData}" @clickButtonEdit="${this.editData}" @deleteItem="${this.deleteData}">
            <section class="form-insert-count">
                <gc-form textButton="${this.textButton}"></gc-form>
            </section>

            <section class="form-insert-rows" >
                <gc-list .tasks="${this.tasks}"></gc-list>
            </section>
        </div>
        `;
    }

    // Real time get data firebase
    dbChangeTask() {
        this.db.collection("task_item").onSnapshot((querySnapshot) => {
            var data = [];
            querySnapshot.forEach((doc) => {
                let item = doc.data();
                item.id = doc.id
                data.push(item);
                this.tasks = data;
            });
        });
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
                show: false
            }
            if (ArrayValues.description === '' || ArrayValues.price === '') {
                alert('Fantan campos por completar')
            } else {
                // añadimos datos a firebase
                this.db.collection("task_item").add(ArrayValues)
                .then(() => {
                    // Hay que crear un componente de feedback
                    alert('Tarea añadida')
                })
                .catch((error) => {
                    alert('error: ', error)
                })

                // Limpiamos los campos cuando enviamos los datos
                for (let i = 0; i < ValueDescription.length; i++) {
                    ValueDescription[i].shadowRoot.querySelector('input').value = '';
                }
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
                show: false
            }

            if (ArrayValuesObject.description === '' || ArrayValuesObject.price === '') {
                // componente feedback
                alert('Faltan campos por completar')
            } else {
                // edit static
                // let positionInArray = this.tasks.findIndex((task) => task.id === id)
                // this.tasks[positionInArray] = {
                //     ...ArrayValuesObject
                // }

                // Añadimos firebase edit
                this.db.collection("task_item").doc(e.detail.id).update(ArrayValuesObject)
                .then(()=>{
                    alert('Tarea editada')
                })
                .catch(()=>{
                    alert('Error al editar')
                })
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

    // delete data in firebase
    deleteData(e){
        this.db.collection("task_item").doc(e.detail.id).delete()
        .then(() => {
            alert('Se ha eliminado el item')
        })
        .catch(() => {
            alert('error')
        })
    }

}

customElements.define('gc-app', GcApp);