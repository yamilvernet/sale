<template>
    <section class="mb-3 text-white bg-primary py-4" v-if="shared_expense">
        <div class="container">
            <div class="d-flex-center-between mb-2">
                
                <h2 class="h5 fw-bold mb-0 d-flex-center-start">
                    <div class="bg-white fs-5 p-2 rounded sqr-32 d-flex-center-center me-1">
                        {{shared_expense.icon}} 
                    </div>
                    <span>
                        {{ capitalize_words(shared_expense.name) }}
                    </span>
                </h2>
                <button class="btn bg-white btn-sm d-flex-center-center ms-2" @click.prevent="trigger.update_expense=true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /> <path d="M13.5 6.5l4 4" /></svg>
                    Editar<span class="d-none d-sm-inline">&nbsp;grupo</span>
                </button>
            </div>
            
            <ListGroupMembers :group="shared_expense.group"/>
            
            <!-- <Carousel v-else :wrap-around="false" itemsToShow="3" :breakpoints="{
                // 700px and up
                360: {
                    itemsToShow: 5,
                },
                // 700px and up
                576: {
                    itemsToShow: 7,
                },
            }">
                <Slide v-for="member,m in shared_expense.group" :key="m">
                    <div class="badge border border-white text-white w-100 me-1">
                        <b>{{ capitalize(member) }}</b>
                    </div>
                </Slide>
                <template #addons>
                    <Navigation />
                </template>
            </Carousel> -->
            
        </div>
    </section>
<div class="container" v-if="shared_expense">
    <section class="mb-3">
        <h2 class="section-title">Gastos del grupo</h2>


        <div v-if="shared_expense.expenses==undefined || !Object.keys(shared_expense.expenses).length" class="card mb-2">
            <div class="card-body p-2 ps-3">
                Todavía no agregaste ningún gasto
            </div>
        </div>



        <div class="card mb-2" v-for="(expense,e) in shared_expense.expenses" :key="e">
            <div class="card-body p-2 ps-3">
                <div class="d-flex-center-between">
                    <div class="w-100">
                        <h6 class="mb-1">{{ capitalize(expense.detail) }} <b class="ms-1">${{ expense.price }}</b></h6>
                        <div class="d-flex">
                            <small class="badge badge-name text-bg-primary me-2">
                                {{capitalize(expense.payer)}}
                            </small>
                            <small v-for="(member_name,m) in shared_expense.group" :key="m" :class="{'opacity-25':!expense.payers.includes(member_name)}" class="badge badge-name-circle border border-primary text-primary">
                                {{ member_name.charAt(0).toUpperCase() }}
                            </small>
                        </div>
                    </div>
                    <button class="btn btn-sm ms-2" @click.prevent="selected_expense=e;trigger.create_expense = true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /> <path d="M13.5 6.5l4 4" /></svg>
                    </button>
                </div>
            </div>
        </div>

        <div class="mt-3 mb-1 px-2 d-flex-center-between">
            <b>Gastos totales</b>
            <b>$ {{ total_shared_expenses }}</b>
        </div>

        <button class="btn btn-primary btn-lg w-100 mb-2" @click.prevent="trigger.create_expense = true">
            <div class="d-flex-center-between">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" /></svg>
                <span>
                    Agregar gasto compartido
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 6l6 6l-6 6" /></svg>
            </div>
        </button>
    </section>
</div>

<!-- <section class="my-4 py-3 bg-primary">
    <div class="container">
      <h2 class="fw-bold text-white">Como arreglamos</h2>
      <div class="card mb-2">
        <div class="card-body">
          <div class="d-flex-center-between">
            <div class="flex-shrink-0 me-2">
              <div class="sqr-28 bg-lighten-text-danger rounded d-flex-center-center">
                <svg width="22"  height="22"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 18v-6a3 3 0 0 1 3 -3h10l-4 -4m0 8l4 -4" /></svg>
              </div>
            </div>
            <div class="w-100">
              <h6 class="mb-0 fw-bold">{{ 'Joan' }}</h6>
              <b class="small text-danger">$7100</b>
            </div>
            <div class="flex-shrink-0 text-end">
              <h6 class="mb-0 fw-bold">{{ 'a Tom' }}</h6>
              <small class="text-muted">Todavía le deben $100</small>
            </div>
          </div>
        </div>
      </div>
      <div class="card mb-2">
        <div class="card-body">
          <div class="d-flex-center-between">
            <div class="flex-shrink-0 me-2">
              <div class="sqr-28 bg-lighten-text-success rounded d-flex-center-center">
                <svg width="22"  height="22"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
              </div>
            </div>
            <div class="w-100">
              <h6 class="mb-0 fw-bold">{{ 'Yamil' }}</h6>
              <b class="small text-success">$7100</b>
            </div>
            <div class="flex-shrink-0 text-end">
              <h6 class="mb-0 fw-bold">{{ 'a Tom' }}</h6>
              <small class="text-success">Cuenta saldada</small>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-sm fw-bold text-white w-100">Ver en detalle</button>
    
       <button class="btn btn-icon border-white text-white fw-bold w-100">
        <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>  
        Calcular como dividir
      </button>
    </div>
  </section> -->

<!-- Actions -->
<div class="container mb-3" v-if="shared_expense!=null">
    <button v-if="shared_expense.expenses!=undefined" class="btn btn-outline-primary btn-lg w-100 mb-2" @click.prevent="trigger.show_transactions=true">
        <div class="d-flex-center-between">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                <path d="M6 21v-2a4 4 0 0 1 4 -4h3" />
                <path d="M16 22l5 -5" />
                <path d="M21 21.5v-4.5h-4.5" /></svg>
            <span>
                Calcular quien paga a quien
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 6l6 6l-6 6" /></svg>
        </div>
    </button>
    <button @click.prevent="handle_qr_generate()" class="btn btn-outline-primary btn-lg w-100 mb-2">
        <div class="d-flex-center-between">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /> <path d="M7 17l0 .01" /> <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /> <path d="M7 7l0 .01" /> <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /> <path d="M17 7l0 .01" /> <path d="M14 14l3 0" /> <path d="M20 14l0 .01" /> <path d="M14 14l0 3" /> <path d="M14 20l3 0" /> <path d="M17 17l3 0" /> <path d="M20 17l0 3" /></svg> <span>
                Mostrar QR para unirse
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M9 6l6 6l-6 6" /></svg>
        </div>
    </button>
    <button class="btn btn-sm fw-bold text-danger w-100" @click.prevent="trigger.delete=true">Eliminar grupo de gasto compartido</button>
</div>

<!-- <OffcanvasBottom v-if="trigger.show_transactions || trigger.create_expense"> -->

<!-- TODO va en un modal -->
<!-- <ShowSharedExpenseQr/> -->
<!-- </OffcanvasBottom> -->

<!-- Vertically centered modal -->

<div class="modal fade" id="qrModal" tabindex="-1" aria-labelledby="qrModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-body">
        <h4 class="fw-bold text-center">¡Compartí el gasto!</h4>
        <p class="text-center small">Escaneá el código con alguna app para escanear QR</p>
        <div class="border rounded p-1 w-min mx-auto">
            <div v-if="qr_data_url==null" class="bg-light d-flex-center-center rounded opacity-25" style="width: 250px;height:250px">
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <img v-else style="width: 250px" class="" :src="qr_data_url">
        </div>
        <p class="text-center small mt-2">O podés usar el link <br> <a :href="get_url">{{get_url}}</a></p>
    </div>
    </div>
  </div>
</div>


<offcanvas-bottom v-if="trigger.show_qr" @hide="trigger.show_qr=false">
    <template v-slot:header>Compartí el gasto</template>
    <template v-slot:body>
        <img style="width: 250px;" class="mx-auto d-block border rounded p-1" :src="qr_data_url" v-if="qr_data_url!=null">
    </template>
</offcanvas-bottom>

<offcanvas-bottom v-if="trigger.delete" @hide="trigger.delete=false">
    <template v-slot:header>¡Cuidado!</template>
    <template v-slot:body>
        <p class="px-1">Vas a eliminar este gasto compartido, nadie va a poder acceder.</p>
        <div class="d-flex">
            <button class="btn btn-danger text-white w-100 me-2" @click.prevent="handle_delete()">Si, eliminar</button>
            <button class="btn btn-outline-light w-75" @click="trigger.delete=false">Cancelar</button>
        </div>
    </template>
</offcanvas-bottom>

<offcanvas-bottom v-if="trigger.show_transactions" @hide="trigger.show_transactions=false">
    <template v-slot:header>¿Como arreglamos?</template>
    <template v-slot:body>
        <ShowTransactions :shared_expense="shared_expense"/>
    </template>
</offcanvas-bottom>

<offcanvas-bottom v-if="trigger.create_expense" @hide="trigger.create_expense=false;selected_expense=null">
    <template v-slot:header>Agregar gasto</template>
    <template v-slot:body>
        <GenerateExpense :from="(selected_expense) ? shared_expense.expenses[selected_expense] : null" :group="shared_expense.group" @generated="handle_generate_expense($event)" @aborted="trigger.create_expense=false;selected_expense=null" @remove="handle_remove()" />
    </template>
</offcanvas-bottom>

<!-- <offcanvas-bottom v-if="trigger.group_manage" @hide="trigger.group_manage=false">
    <template v-slot:header>
        <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-users-group"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" /></svg>
        <span class="ms-1">Editar grupo</span>
    </template>
    <template v-slot:body>
        <SharedExpenseGroupManage :from="shared_expense.group" @updated="updated_data.group=$event"/>
        <div class="mt-3">
            <form class="mb-2 ps-1">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="add_to_all" v-model="trigger.add_to_all">
                    <label class="form-check-label small" for="add_to_all">
                        Agregar en todos los gastos
                    </label>
                </div>
            </form>
            <button class="btn btn-primary w-100" @click="handle_group_update()">Modificar miembros del grupo</button>
        </div>
    </template>
</offcanvas-bottom> -->

<offcanvas-bottom 
    v-if="trigger.update_expense" 
    @hide="clear_update_state()"
    >
    <template v-slot:header>
        <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-users-group"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" /></svg>
        <span class="ms-1">Editar gasto compartido</span>
    </template>
    <template v-slot:body>
        <generate-shared-expense v-if="!trigger.member_remove_error" :from="shared_expense" @updated="update_shared_expense($event)">
            
            <template v-slot:form-top>
                <div class="alert py-2 bg-secondary text-primary small d-flex-center-start">
                    <svg class="flex-shrink-0 me-1" width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
                    <span>Los participantes nuevos se agregan a todos los gastos</span>
                </div>
            </template>
            
            <template v-slot:submit-label>
                Editar gasto compartido
            </template>

        </generate-shared-expense>
        <div v-else>
            <div class="bg-lighten-text-danger rounded p-3">
                <h6 class="fw-bold mb-1">No pudimos eliminar a</h6>
                <div class="mb-2">
                    <div class="badge bg-danger text-white me-1 mb-1" v-for="member in error_members_with_expenses" :key="member">
                        {{ capitalize(member) }}
                    </div>
                </div>
                <p>Han pagado gastos compartidos. Primero eliminá sus gastos.</p>
            </div>
            <button class="btn btn-primary w-100 mt-3" @click.prevent="clear_update_state()">Entendido</button>
        </div>
    </template>
</offcanvas-bottom>
</template>

<script>
import {Modal} from 'bootstrap'
import OffcanvasBottom from "@/components/OffcanvasBottom.vue";
import ShowTransactions from "@/components/ShowTransactions.vue";
import GenerateExpense from "@/components/Expense/GenerateExpense.vue";
import ListGroupMembers from "@/components/Expense/ListGroupMembers.vue";
// import SharedExpenseGroupManage from "@/components/Expense/SharedExpenseGroupManage.vue";
import GenerateSharedExpense from "@/components/Expense/GenerateSharedExpense.vue";

// import 'vue3-carousel/dist/carousel.css'
// import { Carousel, Slide, Navigation, } from 'vue3-carousel'

import QRCode from 'qrcode'

import {
    capitalize,
    capitalize_words,
    is_set,
} from '@/utils'

export default {
    name: 'ShareExpenseView',
    components: {
        // Carousel, Slide, Navigation,
        OffcanvasBottom,
        GenerateExpense,
        ShowTransactions,
        // SharedExpenseGroupManage,
        GenerateSharedExpense,
        ListGroupMembers,
    },
    data() {
        return {
            shared_expense: null,
            selected_expense: null,

            qr_data_url:null,
            modal_qr:null,

            // updated_data:{
            //     group:null,
            //     shared_expense:null,
            // },

            error_members_with_expenses:null,
            
            trigger: {
                show_transactions: false,
                create_expense: false,
                // group_manage:false,
                member_remove_error:false,
                delete:false
            },
        }
    },
    mounted() {
        fetch(`https://stocks-e3bff-default-rtdb.firebaseio.com/shared_expenses/${this.$route.params.id}.json`).then((r) => r.json())
            .then((data) => {
                // console.log('data',data);
                if (data) {
                    this.shared_expense = data
                    /**
                     * IMPORTANT: save id in localStorage
                     */
                    let local_shared_expenses = localStorage.getItem('shared_expenses')

                    if (local_shared_expenses == null) {
                        local_shared_expenses = [this.$route.params.id]
                    } else {
                        local_shared_expenses = JSON.parse(local_shared_expenses)
                        local_shared_expenses.push(this.$route.params.id)
                        // eliminar elementos duplicados
                        local_shared_expenses = Array.from(new Set(local_shared_expenses))
                    }

                    // guardar
                    localStorage.setItem('shared_expenses', JSON.stringify(local_shared_expenses))

                } else {
                    alert('no se econtro nads')

                }
            })
            .catch((err) => console.log(err))
    },
    computed: {
        total_shared_expenses() {
            // si no gasto o no hay gastos para el gasto devolver 0
            if (this.shared_expense == null || this.shared_expense.expenses == undefined) return 0;
            // si hay gastos en el gasto calcularlo
            return Object.keys(this.shared_expense.expenses).reduce(
                (accumulator, expense_id) => accumulator + this.shared_expense.expenses[expense_id].price,
                0,
            );
        },
        get_url(){
            return location.href
        }
    },
    methods: {
        capitalize_words,
        capitalize,
        is_set,
        handle_delete(){
            fetch(`https://stocks-e3bff-default-rtdb.firebaseio.com/shared_expenses/${this.$route.params.id}.json`, {
                method: 'DELETE',
            }).then((r) => r.json())
            .then((data) => {
                console.log(data);
                let local_data = JSON.parse(localStorage.getItem('shared_expenses'))
                local_data=local_data.flatMap((id)=>(id==this.$route.params.id)?[]:id)
                localStorage.setItem('shared_expenses',JSON.stringify(local_data))

                this.$router.push('/')

            }).catch((err) => console.log(err))
        },
        handle_qr_generate(){
            // With promises
            // this.trigger.show_qr=true;
            let modal = new Modal('#qrModal')
            modal.show()

            setTimeout(() => {
                QRCode.toDataURL(location.href)
                .then(url => {
                    this.qr_data_url = url;
                    console.log(url)
                })
                .catch(err => {
                    console.error(err)
                })
            }, 700);
        },
        handle_generate_expense(data) {
            let new_expense = data
            // add timestamp
            new_expense['timestamp'] = Date.now()

            if (this.selected_expense) {
                // Update
                fetch(`https://stocks-e3bff-default-rtdb.firebaseio.com/shared_expenses/${this.$route.params.id}/expenses/${this.selected_expense}.json`, {
                        method: 'PUT',
                        body: JSON.stringify(new_expense)
                    }).then((r) => r.json())
                    .then((data) => {
                        console.log(data);
                        this.shared_expense.expenses[this.selected_expense] = new_expense

                        this.trigger.create_expense = false
                        this.selected_expense = null
                    }).catch((err) => console.log(err))

            } else {
                // Save
                fetch(`https://stocks-e3bff-default-rtdb.firebaseio.com/shared_expenses/${this.$route.params.id}/expenses.json`, {
                        method: 'POST',
                        body: JSON.stringify(new_expense)
                    }).then((r) => r.json())
                    .then((data) => {
                        console.log(data);
                        if (this.shared_expense.expenses == undefined) this.shared_expense.expenses = {}
                        this.shared_expense.expenses[data.name] = new_expense

                        this.trigger.create_expense = false
                    }).catch((err) => console.log(err))
            }

        },
        handle_remove() {
            if (this.selected_expense != null) {
                fetch(`https://stocks-e3bff-default-rtdb.firebaseio.com/shared_expenses/${this.$route.params.id}/expenses/${this.selected_expense}.json`, {
                        method: 'DELETE',
                    }).then((r) => r.json())
                    .then((data) => {
                        console.log(data);
                        delete this.shared_expense.expenses[this.selected_expense]
                        this.trigger.create_expense = false
                        this.selected_expense = null
                    }).catch((err) => console.log(err))
            }

        },
        handle_group_update(){
          fetch(`https://stocks-e3bff-default-rtdb.firebaseio.com/shared_expenses/${this.$route.params.id}/group.json`, {
              method: 'PUT',
              body: JSON.stringify(this.updated_data.group)
          }).then((r) => r.json())
          .then((data) => {
              console.log(data);
              let new_group_member = this.updated_data.group.filter((m)=>!this.shared_expense.group.includes(m))
              
              if(is_set(this.shared_expense.expenses)){
                Object.keys(this.shared_expense.expenses).forEach((expense_id)=>{
                  new_group_member.forEach((new_member)=>{
                    this.shared_expense.expenses[expense_id].payers.push(new_member)
                  })

                  // TODO falta quitar miembros
                })

                fetch(`https://stocks-e3bff-default-rtdb.firebaseio.com/shared_expenses/${this.$route.params.id}/expenses.json`, {
                    method: 'PUT',
                    body: JSON.stringify(this.shared_expense.expenses)
                })
                .then((r) => r.json())
                .then((data) => {
                  console.log(data);
                  this.shared_expense.group = this.updated_data.group;
                  this.trigger.group_manage = false
                }).catch((err) => console.log(err))

                this.shared_expense.group = this.updated_data.group;
                this.trigger.group_manage = false
              }
              
          
          }).catch((err) => console.log(err))
        },
        update_shared_expense(modified){
            this.shared_expense.name = modified.name;
            this.shared_expense.icon = modified.icon;

            const removed_members = this.shared_expense.group.filter(member => !modified.group.includes(member))
            const added_members = modified.group.filter(member => !this.shared_expense.group.includes(member))
            
            /**
             * Remove
             */

            const current_payer_members = Object.keys(this.shared_expense.expenses).map((exp_id)=>{
                return this.shared_expense.expenses[exp_id].payer
            })

            let error_removing_members_with_expenses = []

            removed_members.forEach((member)=>{
                if(current_payer_members.includes(member)){
                    error_removing_members_with_expenses.push(member)
                } else {
                    // search member and delete
                    Object.keys(this.shared_expense.expenses).forEach((expense_id)=>{
                        let payer_index = this.shared_expense.expenses[expense_id].payers.findIndex((payer_member)=>payer_member==member)
                        if(payer_index>-1){
                            this.shared_expense.expenses[expense_id].payers.splice(payer_index,1)
                        }
                    })
                    
                    // remove from member
                    let member_index = this.shared_expense.group.findIndex((group_member)=>group_member==member)
                    if(member_index>-1){
                        this.shared_expense.group.splice(member_index,1)
                    }
                }
            })

            /**
             * Add
             */

             added_members.forEach((member)=>{
                const member_normalized_name = member.trim().toLowerCase();
                if(!this.shared_expense.group.includes(member_normalized_name)){
                    // add to shared expense group
                    this.shared_expense.group.push(member_normalized_name)
                    // add to all expenses
                    Object.keys(this.shared_expense.expenses).forEach((expense_id)=>{
                        this.shared_expense.expenses[expense_id].payers.push(member_normalized_name)
                    });
                }
             })

             
             this.shared_expense.timestamp = Date.now();
             
             fetch(`https://stocks-e3bff-default-rtdb.firebaseio.com/shared_expenses/${this.$route.params.id}.json`, {
                 method: 'PUT',
                 body: JSON.stringify(this.shared_expense)
                })
                .then((r) => r.json())
                .then((data) => {
                    console.log(data);
                    if(error_removing_members_with_expenses.length){
                        this.error_members_with_expenses = error_removing_members_with_expenses;
                        this.trigger.member_remove_error = true;
                    } else {
                        this.clear_update_state()
                    }
                }).catch((err) => console.log(err))


        },
        clear_update_state(){
            this.error_members_with_expenses = null;
            this.trigger.member_remove_error = false;
            this.trigger.update_expense=false;
        }
    }
}
</script>
<style>
.carousel__viewport {
    width: 87%;
    margin: auto;
}

.carousel__track {
    margin:0 !important
}

.carousel__prev,
.carousel__next {
  background-color: white;
  padding: 0 !important;
  margin: 0 !important;
   /* top: 0; */
   width: 1.4rem;
   height: 1.4rem;
   border-radius: 100%;
}

.carousel__icon {
    width: 1.375rem;
    height: 1.375rem;
    stroke-width:3
}

/* .carousel__prev,
.carousel__next {
  box-sizing: content-box;
  background-color: white;
  border-radius: 100%;
  width: 22.4px;
  height: 22.4px;
  margin: 0;
}

.carousel__prev svg,
.carousel__next svg {
  width: 18px;
  height: 18px;
} */
</style>
