<template>
  <div class="container pt-2">
    <SplashScreen v-if="trigger.splash"/>
    <LastActivity v-if="trigger.last_activity"/>
  </div>
  <!-- Actions -->
  <div class="container mt-5">
    <button class="btn btn-primary btn-lg w-100 mb-2" @click.prevent="trigger.create=true">
      <div class="d-flex-center-between">
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
        <span>
          Nuevo gasto compartido
        </span>
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
      </div>
    </button>
    <button class="btn btn-outline-primary btn-lg w-100 mb-2" @click="trigger.qr_scan=true">
      <div class="d-flex-center-between">
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M7 17l0 .01" /><path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M7 7l0 .01" /><path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M17 7l0 .01" /><path d="M14 14l3 0" /><path d="M20 14l0 .01" /><path d="M14 14l0 3" /><path d="M14 20l3 0" /><path d="M17 17l3 0" /><path d="M20 17l0 3" /></svg>
        <span>
          Unirse a un grupo con QR
        </span>
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
      </div>
    </button>

    <!-- <button class="mt-5" @click="clear_data()">borrar data</button> -->
  </div>

  <qrcode-stream v-if="trigger.qr_scan" @detect="onDetect"></qrcode-stream>
  
  <offcanvas-bottom 
    v-if="trigger.create" 
    @hide="trigger.create=false"
    >
    <template v-slot:header>
      Nuevo gasto compartido
    </template>
    <template v-slot:body>
      <generate-shared-expense @updated="handle_created($event)" @aborted="trigger.create=false">
        <template v-slot:submit-label>
          Crear nuevo gasto compartido
        </template>

      </generate-shared-expense>
      
    </template>
  </offcanvas-bottom>
</template>

<script>
// import {Offcanvas} from 'bootstrap'
// import AddExpense from "@/components/AddExpense.vue";
import SplashScreen from "@/components/SplashScreen.vue";
import LastActivity from "@/components/LastActivity.vue";
import OffcanvasBottom from "@/components/OffcanvasBottom.vue";
import GenerateSharedExpense from "@/components/Expense/GenerateSharedExpense.vue";
// import {date_format} from '@/utils'
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  name: 'HomeView',
  components:{
    SplashScreen,LastActivity,OffcanvasBottom,GenerateSharedExpense,QrcodeStream
  },
  data(){
    return {
      // shared_expenses:[],
      trigger:{
        splash:true,
        last_activity:false,
        create:false,
        qr_scan:false
      },
    }
  },
  mounted(){
    // this.offcanvas.create = new Offcanvas('#off-canvas-create');
    // this.offcanvas.show = new Offcanvas('#off-canvas-show');
    // this.offcanvas.addexpense = new Offcanvas('#off-canvas-addexpense');

    const local_shared_expenses = localStorage.getItem('shared_expenses')
    if(local_shared_expenses!=null) {
      this.trigger.splash = false;
      this.trigger.last_activity = true;
    }
  },
  computed:{
    // greeting(){
    //   return "Hola";
    // }
  },
  methods:{
    onDetect (detectedCodes) {
      this.$router.push({
        name:'share-expense',
        params:{
          id:detectedCodes
        }
      })
    },
    clear_data(){localStorage.clear()},
    handle_created(created_element){
      console.log(created_element);
      // Save
      fetch('https://stocks-e3bff-default-rtdb.firebaseio.com/shared_expenses.json', {
        method: 'POST',
        body: JSON.stringify(created_element)
      }).then((r) => r.json())
      .then((data) => {
          this.trigger.create = false
          this.$nextTick(()=>{
            this.$router.push({
              name:'share-expense',
              params:{
                id:data.name
              }
            })
          })
      }).catch((err) => console.log(err))
    }
  }
}
</script>
