<template>
    <form @submit.prevent="add_member()" class="d-flex-center-start">
        <input v-model="new_member" type="text" class="form-control" id="member_name" placeholder="Lio Mess..">
        <button @click.prevent="add_member()" class="btn btn-primary ms-2">Agregar</button>
    </form>
    <div class="mt-1" v-if="group.length">
        <p class="small mb-1 form-label d-flex-center-start">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /> <path d="M9 12l2 2l4 -4" /></svg>
            &nbsp;
            Participantes agregados
        </p>
        <button v-for="(member,m) in group" :key="m" class="btn btn-sm btn-secondary mb-1 me-1" @click.prevent="handle_remove(m)">
            <div class="d-flex-center-center">
                <span class="me-1">{{capitalize(member)}}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10m3.6 5.2a1 1 0 0 0 -1.4 .2l-2.2 2.933l-2.2 -2.933a1 1 0 1 0 -1.6 1.2l2.55 3.4l-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2 -2.933l2.2 2.933a1 1 0 0 0 1.6 -1.2l-2.55 -3.4l2.55 -3.4a1 1 0 0 0 -.2 -1.4" /></svg>
            </div>
        </button>
    </div>
</template>
<script>
import {capitalize} from '@/utils'

export default {
    name: 'SharedExpenseGroupManage',
    props:{
        from:{
            type:Array,
            default:null
        }
    },
    data() {
        return {
            new_member: null,
            group:[]
        }
    },
    mounted() {
        if(this.from!=null) this.group = JSON.parse(JSON.stringify(this.from))
    },
    methods: {
        capitalize,
        add_member() {
            /**
             * Se verifica existencia, se normaliza y vuelve verificar
             * Se verifica longitud (max: 16)
             * Tambien se verifica unicidad
             */
            if (this.new_member && this.new_member.trim() && this.new_member.trim().length <= 16) {
                let name_normalized = this.new_member.trim().toLowerCase();
                let exists = this.group.some((m) => m == name_normalized)
                if (!exists) {
                    this.group.push(name_normalized)
                    this.new_member = null
                    this.$emit('updated',this.group)
                }
            }
        },
        handle_remove(member_index){
            this.group.splice(member_index,1)
            this.$emit('updated',this.group)
        }
    }
}
</script>