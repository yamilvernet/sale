<template>
<form @submit.prevent="handle_submit($event)">
    <slot name="form-top">
    </slot>

    <div class="mb-3">
        <label for="name" class="form-label">Nombre del gasto compartido</label>
        <div class="d-flex-center-start">
            <select v-model="shared_expense.icon" class="form-control" name="icon" id="icon" @click="icon_was_set=true">
                <option v-for="(icon,i) in icons" :key="i" :value="i">{{icon.icon}}</option>
            </select>
            <input v-model="shared_expense.name" @keyup="!icon_was_set && handle_icon_update()" type="text" class="form-control" id="name" placeholder="Asado en lo de...">
        </div>
        <div class="text-danger mt-1" v-if="error.name">&otimes; {{error.name}}</div>
    </div>

    <div class="mb-3">
        <label for="member_name" class="form-label">Agrega integrantes</label>
        <form @submit.prevent="add_member()" class="d-flex-center-start">
            <input v-model="new_member" type="text" class="form-control" id="member_name" placeholder="Lio Mess..">
            <button @click.prevent="add_member()" class="btn btn-primary ms-2">Agregar</button>
        </form>
        <div class="text-danger mt-1" v-if="error.group">&otimes; {{error.group}}</div>
        <div class="mt-1" v-if="shared_expense.group.length">
            <p class="small mb-1 form-label d-flex-center-start">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M9 12l2 2l4 -4" /></svg>
                &nbsp;
                Participantes agregados
            </p>
            <button v-for="(member,m) in shared_expense.group" :key="m" class="btn btn-sm btn-secondary mb-1 me-1" @click.prevent="shared_expense.group.splice(m,1)">
                <div class="d-flex-center-center">
                    <span class="me-1">{{member}}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10m3.6 5.2a1 1 0 0 0 -1.4 .2l-2.2 2.933l-2.2 -2.933a1 1 0 1 0 -1.6 1.2l2.55 3.4l-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2 -2.933l2.2 2.933a1 1 0 0 0 1.6 -1.2l-2.55 -3.4l2.55 -3.4a1 1 0 0 0 -.2 -1.4" /></svg>
                </div>
            </button>
        </div>
    </div>

    <slot name="form-bottom">
    </slot>

    <button class="btn btn-primary btn-lg w-100 mt-3" ref="submitButton">
        <slot name="submit-label">
            Generar gasto compartido
        </slot>
    </button>
    <button class="btn text-light mt-2 w-100" @click.prevent="$emit('aborted')">Cancelar</button>


</form>
</template>
<script>
//   import {Offcanvas} from 'bootstrap'
//   import { AddExpense } from "@/components/AddExpense.vue";
import {
    has_text,
    get_random
} from '@/utils'
import icons from '@/emojis'

export default {
    name: 'GenerateSharedExpense',
    // components:{
    // },
    props:{
        from:Object,
    },
    data() {
        return {
            new_member: null,
            shared_expense: {
                name: null,
                icon: null,
                group: [],
                timestamp:null,
            },
            icon_was_set: false,
            icons: icons,
            last_search_query: null,
            error: {}
        }
    },
    mounted() {
        // se genera desde una plantilla, es decir desde un shared_expense existente
        if(this.from && Object.keys(this.from).length){
            Object.keys(this.shared_expense).forEach((prop)=>{
                if(this.from[prop] != undefined) {
                    this.shared_expense[prop] = this.from[prop]
                }
            })
            // Es necesario mapear el ícono al índice correspondiente en icons
            let icon_index = this.icons.findIndex((emoji)=>emoji.icon==this.shared_expense.icon)
            this.shared_expense.icon = icon_index
            
            this.shared_expense = JSON.parse(JSON.stringify(this.shared_expense))
        } else {
            // Animate icon select (UX?)
            this.shared_expense.icon = get_random(0, this.icons.length - 1)
            this.$forceUpdate()
            setTimeout(() => {
                this.shared_expense.icon = get_random(0, this.icons.length - 1)
                this.$forceUpdate()
                setTimeout(() => {
                    this.shared_expense.icon = get_random(0, this.icons.length - 1)
                    this.$forceUpdate()
                }, 800);
            }, 800);
        }

    },
    computed: {
        //   greeting(){
        //     return "Hello";
        //   }
    },
    methods: {
        add_member() {
            /**
             * Se verifica existencia, se normaliza y vuelve verificar
             * Se verifica longitud (max: 16)
             * Tambien se verifica unicidad
             */
            if (this.new_member && this.new_member.trim() && this.new_member.trim().length <= 16) {
                let name_normalized = this.new_member.trim().toLowerCase();
                let exists = this.shared_expense.group.some((m) => m == name_normalized)
                if (!exists) {
                    this.shared_expense.group.push(name_normalized)
                    this.new_member = null
                }
            }
        },
        handle_submit(event) {
            let is_valid = true;
            // Iterate over props to validate
            ['name','group'].forEach((prop) => {
                delete this.error[prop] // reset errors

                if (prop == 'name' && !has_text(this.shared_expense.name)) {
                    this.error.name = 'Es necesario un nombre'
                    is_valid = false;
                } else if (prop == 'group' && this.shared_expense.group.length < 2) {
                    this.error.group = 'Agrega al menos a 2 personas'
                    is_valid = false;
                }
            })
            // Validate
            if (!is_valid) return;

            let form_elements = event.target.querySelectorAll('input,button,select,textarea');
            form_elements.forEach((el) => el.disabled = true)

            this.$refs.submitButton.innerHTML = `
            <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            `

            // Set the string icon
            this.shared_expense.icon = this.icons[this.shared_expense.icon].icon;
            // add timestamp
            this.shared_expense.timestamp = Date.now()

            this.$emit('updated',this.shared_expense)
        },
        handle_icon_update() {
            // console.log('llega aca');
            setTimeout(() => {
                // console.log("this.last_search_query","!=","this.shared_expense.name",this.last_search_query!=this.shared_expense.name);
                if (this.last_search_query != this.shared_expense.name) {
                    this.last_search_query = this.shared_expense.name
                    const match_icon = this.set_icon(icons, this.shared_expense.name)
                    if (match_icon != null) this.shared_expense.icon = match_icon.index
                }
            }, 400);
        },
        set_icon(listaEmojis, valor) {
            // Verificar si el valor de búsqueda es válido
            if (!valor || typeof valor !== 'string') {
                return null;
            }

            // Dividir el valor en palabras clave
            const palabrasClave = valor.toLowerCase().split(' ');

            // Calcular la cantidad de veces que aparece cada término en la lista de keywords
            const puntajes = listaEmojis.map((emoji, e) => {
                const keywords = emoji.keywords.toLowerCase().split(', ');
                const puntaje = palabrasClave.reduce((acumulador, palabra) => {
                    return acumulador + keywords.filter(keyword => (palabra.length >= 3) && keyword.includes(palabra)).length;
                }, 0);
                return {
                    icon: emoji.icon,
                    puntaje,
                    index: e
                };
            });

            // Ordenar la lista de emojis en base al puntaje calculado
            puntajes.sort((a, b) => b.puntaje - a.puntaje);

            // Retornar el ícono con el mayor puntaje
            return puntajes.length > 0 ? puntajes[0] : null;
        }
    }
}
</script>

<style scoped>
select {
    width: min-content;
    font-size: 24px;
    padding: 0 .5rem;
    margin-right: .5rem;
}
</style>
