<template>
    <form @submit.prevent="handle_submit($event)">
      <div class="row">
        <div class="col-6 col-md-6 mb-2">
          <label for="member" class="form-label">¿Quien pago?</label>
          <select name="member" id="member" class="form-control" v-model="expense.payer">
            <option :value="null" disabled>Seleccioná quien pagó</option>
            <option v-for="(member_name,m) in group" :key="m" :value="member_name">{{ capitalize(member_name) }}</option>
          </select>
          <span class="mt-1 text-danger" v-if="error.payer">&otimes; {{ error.payer }}</span>
        </div>
        <div class="col-6 col-md-6 mb-2">
          <label for="name" class="form-label">¿Cuanto gasto?</label>
          <div class="input-group">
            <span class="input-group-text">$</span>
            <input id="name" type="number" class="form-control" v-model="expense.price">
          </div>
          <span class="mt-1 text-danger" v-if="error.price">&otimes; {{ error.price }}</span>
        </div>
        <div class="col-12 col-md-6 mb-2">
          <label for="name" class="form-label">¿Que compro?</label>
          <input id="name" type="text" class="form-control" v-model="expense.detail">
          <span class="mt-1 text-danger" v-if="error.detail">&otimes; {{ error.detail }}</span>
        </div>
        <div class="col-12 mb-2">
          <label for="name" class="form-label">Entre quienes se divide</label>
          
          <div class="row g-1">
            <div class="col-6" v-for="(member_name,m) in group" :key="m">
              <div class="form-check form-check-box border rounded d-flex" :class="{'border-primary':payer_members[member_name]}">
                <input class="form-check-input flex-shrink-0 me-1" type="checkbox" :value="member_name" :id="member_name" :checked="payer_members[member_name]"
                @change="handle_check($event,member_name)">
                <label class="form-check-label w-100" :for="member_name">
                  {{ capitalize(member_name) }}
                </label>
              </div>
            </div>
          </div>

          <div class="mt-1 text-danger" v-if="error.payers">&otimes; {{ error.payers }}</div>

        </div>
      </div>
      
      <button class="btn btn-primary w-100 mt-3" ref="submitButton">
        <span v-if="is_set(this.from)">Editar gasto</span>
        <span v-else>Agregar gasto</span>
      </button>
      <button v-if="is_set(this.from)" class="btn btn-outline-danger w-100 mt-3" @click.prevent="$emit('remove')">Eliminar gasto</button>
      <button class="btn btn-sm fw-bold text-light mt-1 w-100" @click.prevent="$emit('aborted')">Cancelar</button>
    </form>
</template>
<script>
//   import {Offcanvas} from 'bootstrap'
//   import { AddExpense } from "@/components/AddExpense.vue";
import {capitalize,is_set,has_text, is_number} from '@/utils'
  
export default {
  name: 'CreateExpense',
  components:{
      
  },
  props:{
      group:Array,
      from:Object,
  },
  data(){
    return {
      expense:{
        payer:null,
        price:null,
        detail:null,
        payers:[...this.group]
      },
      error:{},
    }
  },
  mounted(){
    // se genera desde una plantilla, es decir desde un shared_expense existente
    if(this.from && Object.keys(this.from).length){
      Object.keys(this.expense).forEach((prop)=>{
        if(this.from[prop] != undefined) {
          this.expense[prop] = this.from[prop]
        }
      })
    }
  },
  computed:{
    payer_members(){
      let indexed = {}
      this.group.forEach((member)=>indexed[member]=this.expense.payers.some((payer)=>payer==member))
      return indexed
    }
  },
  methods:{
    is_set,
    capitalize,
    handle_check(event,member_name){
      if(event.target.checked){
        this.expense.payers.push(member_name)
      } else {
        let payer_index = this.expense.payers.findIndex((payer)=>payer==member_name)
        this.expense.payers.splice(payer_index,1)
      }
    },
    handle_submit(event){
      // console.log(event);

      let is_valid = true;
      Object.keys(this.expense).forEach((prop)=>{
        delete this.error[prop]

        if(!is_set(this.expense[prop])){
          is_valid = false;
          this.error[prop] = 'Completá acá'
        } else if(['payer','detail'].includes(prop) && !has_text(this.expense[prop])){
          is_valid = false;
          this.error[prop] = 'Completá acá'
        } else if(prop=='price' && !is_number(this.expense[prop])){
          is_valid = false;
          this.error[prop] = 'Solo números'
        } else if(prop=='payers' && this.expense.payers.length==0){
          is_valid = false;
          this.error[prop] = 'Alguien debería pagar'
        }
      });

      if (!is_valid) return;

      let form_elements = event.target.querySelectorAll('input,button,select,textarea');
      form_elements.forEach((el) => el.disabled = true)

      this.$refs.submitButton.innerHTML = `
        <div class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
      `

      this.$emit('generated',this.expense)
    },
  }
}
</script>