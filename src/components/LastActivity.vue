<template>
<h2 class="section-title">Tu actividad</h2>
<!-- Activities -->
<div v-if="!Object.keys(shared_expenses).length" class="card border-light mb-2" style="opacity:.12">
    <div class="card-body d-flex-center-start">
        <div class="w-100">
            <div class="w-75 bg-light rounded mb-1" style="height:24px"></div>
            <div class="w-25 bg-light rounded" style="height:24px"></div>
        </div>
        <div class="spinner-border spinner-border-sm text-light" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</div>

<template v-else>
    <div class="card mb-2" v-for="shared_expense,e in shared_expenses" :key="e">
        <div class="card-body d-flex-center-start">
            <div class="w-100">
                <h6 class="mb-0 text-dark">
                    <router-link :to="`gasto/${e}`" class="text-reset text-decoration-none">
                        {{ shared_expense.icon }} {{ shared_expense.name }}
                    </router-link>
                </h6>
                <small class="fw-bold">
                    <span v-if="shared_expense.expenses">
                        Total ${{ calculate_total(shared_expense.expenses) }}
                    </span>
                    <span v-else>Sin gastos</span>
                </small>
            </div>
            <router-link :to="`gasto/${e}`" class="btn btn-sm text-dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M9 6l6 6l-6 6" /></svg>
            </router-link>
        </div>
    </div>
    <button class="btn fw-bold btn-sm text-light w-100">Ver todos los gastos compartidos</button>
</template>
</template>

<script>
//   import {Offcanvas} from 'bootstrap'
//   import { AddExpense } from "@/components/AddExpense.vue";
// import {date_format} from '@/utils'

export default {
    name: 'LastActivity',
    components: {

    },
    props: {

    },
    data() {
        return {
            shared_expenses: {},
        }
    },
    mounted() {
        const local_shared_expenses = localStorage.getItem('shared_expenses')
        if (local_shared_expenses != null) {
            const shared_expenses_id = JSON.parse(local_shared_expenses)
            const api_url = (id) => `https://stocks-e3bff-default-rtdb.firebaseio.com/shared_expenses/${id}.json`

            let promises = []
            shared_expenses_id.forEach(shared_expense_id => {
                promises.push(new Promise((resolve,reject)=>{
                    fetch(api_url(shared_expense_id)).then((r)=>r.json())
                    .then((data)=>resolve(this.shared_expenses[shared_expense_id]=data))
                    .catch((error)=>{alert(error);reject(error)})
                }))
            });

            Promise.all(promises).then((data)=>{
                console.log(data);
            })
        }
    },
    computed: {
        //   greeting(){
        //     return "Hello";
        //   }
    },
    methods: {
        calculate_total(expenses){
            let total = 0;
            Object.keys(expenses).forEach((e)=>{
                total+=expenses[e].price
            })
            return total
        },
        handle_show(expense_id) {
            console.log(expense_id);
            // this.expense_selected = expense_id
            // this.offcanvas.show.show()
        },
    }
}
</script>
