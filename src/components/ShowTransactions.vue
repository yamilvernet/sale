<template>
  <div v-if="transactions!=null" id="transactions_element">
    
    <!-- <h2 class="h5 fw-bold d-flex-center-start mb-3">
        <div class="me-1 border rounded sqr-48 d-flex-center-center">
            {{shared_expense.icon}} 
        </div>
        <div>
          <b class="text-primary small d-flex-center-start">
            <svg class="" style="vertical-align: text-top;" width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 10h-14l4 -4" /><path d="M7 14h14l-4 4" /></svg>
            <small>Sale</small>
          </b>
          <div>
              {{ capitalize_words(shared_expense.name) }}
          </div>
        </div>
    </h2> -->

    <div class="card mb-2" v-for="(transaction,t) in transactions" :key="t">
       <div class="card-body">
         <div class="d-flex-center-between">
           <div class="flex-shrink-0 me-2">
             <div class="sqr-28 bg-lighten-text-danger rounded d-flex-center-center">
               <svg width="22"  height="22"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 18v-6a3 3 0 0 1 3 -3h10l-4 -4m0 8l4 -4" /></svg>
             </div>
           </div>
           <div class="w-100">
             <h6 class="mb-0 fw-bold">{{ capitalize(transaction.from_name) }}</h6>
             <b class="small text-danger">${{format_price(transaction.amount)}}</b>
           </div>
           <div class="flex-shrink-0 text-end">
             <h6 class="mb-0 fw-bold d-flex-center-end">
                <div class="small text-success rounded d-flex-center-center me-1">
                  <small>+${{format_price(transaction.amount)}}</small>
                </div>
                {{ capitalize(transaction.to_name) }}
            </h6>
             <small class="text-muted" v-if="left_ro_receive(transaction,t)==0">Ya no le deben</small>
             <small class="text-muted" v-else>Todavía le deben ${{format_price(Math.abs(left_ro_receive(transaction,t)))}}</small>
           </div>
         </div>
       </div>
     </div>

    <div class="card border-success mb-2 mb-4">
       <div class="card-body">
          <div class="d-flex-center-start">
            <div class="flex-shrink-0 me-2">
              <div class="sqr-28 bg-lighten-text-success rounded d-flex-center-center">
                <svg width="16"  height="16"  viewBox="0 0 24 24"  fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" /></svg>
              </div>
            </div>
            <div class="small">
              <p class="mb-1">Nos encanta ayudar a dividir sus gastos ¿Qué tal una pequeña colaboración para dividir los nuestros?</p>
              <a class="" href="https://link.mercadopago.com.ar/saledividirgastos">Quiero invitarles un café</a>
            </div>
          </div>
       </div>
     </div>
  </div>
  

  <button v-if="can_share" @click.prevent="handle_share_image()" class="btn btn-primary btn-lg w-100 mb-2">
    <div class="d-flex-center-between">
      <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M8.7 10.7l6.6 -3.4" /><path d="M8.7 13.3l6.6 3.4" /></svg>
      <span>
        Compartir imagen
      </span>
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
    </div>
  </button>
  <button v-else @click.prevent="handle_share_image()" class="btn btn-primary btn-lg w-100 mb-2">
    <div class="d-flex-center-between">
      <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
      <span>
        Descargar imagen
      </span>
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
    </div>
  </button>


  <a id="link"></a>
  <div id="print_element" class="d-none" style="width:420px;padding:20px">
    <h2 class="h5 fw-bold d-flex-center-start mb-3">
        <div class="me-1 border rounded sqr-48 d-flex-center-center">
            {{shared_expense.icon}} 
        </div>
        <div>
          <b class="text-primary small d-flex-center-start">
            <svg class="" style="vertical-align: text-top;" width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 10h-14l4 -4" /><path d="M7 14h14l-4 4" /></svg>
            <small>Sale</small>
          </b>
          <div>
              {{ capitalize_words(shared_expense.name) }}
          </div>
        </div>
    </h2>
  
    <div class="card mb-2" v-for="(transaction,t) in transactions" :key="t">
        <div class="card-body">
          <div class="d-flex-center-between">
            <div class="flex-shrink-0 me-2">
              <div class="sqr-28 bg-lighten-text-danger rounded d-flex-center-center">
                <svg width="22"  height="22"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 18v-6a3 3 0 0 1 3 -3h10l-4 -4m0 8l4 -4" /></svg>
              </div>
            </div>
            <div class="w-100">
              <h6 class="mb-0 fw-bold">{{ capitalize(transaction.from_name) }}</h6>
              <b class="small text-danger">${{format_price(transaction.amount)}}</b>
            </div>
            <div class="flex-shrink-0 text-end">
              <h6 class="mb-0 fw-bold d-flex-center-end">
                <div class="small text-success rounded d-flex-center-center me-1">
                  <small>+${{format_price(transaction.amount)}}</small>
                </div>
                {{ capitalize(transaction.to_name) }}
            </h6>
              <small class="text-muted" v-if="left_ro_receive(transaction,t)==0">Ya no le deben</small>
              <small class="text-muted" v-else>Todavía le deben ${{format_price(Math.abs(left_ro_receive(transaction,t)))}}</small>
            </div>
          </div>
        </div>
      </div>
  
      <p class="mt-3 text-center">
        <small class="d-block w-100">Compartieron los gastos gracias a <b class="text-primary">Sale</b></small> 
        <small class="d-block w-100">
          una herramienta de 
          <a href="https://quantica.ar" class="text-primary fw-bold text-decoration-none">
            <svg style="vertical-align: sub;" width="14" height="14" viewBox="0 0 24 24" fill="none"> <mask id="path-1-inside-1_83_1236" fill="white"> <path d="M22 12C22 18.6274 18.866 24 15 24C11.134 24 8 18.6274 8 12C8 5.37258 11.134 0 15 0C18.866 0 22 5.37258 22 12Z"/> </mask> <path d="M18.5 12C18.5 14.8054 17.8293 17.1741 16.9265 18.7217C15.9736 20.3553 15.1714 20.5 15 20.5V27.5C18.6946 27.5 21.3924 24.9584 22.973 22.2488C24.6037 19.4533 25.5 15.822 25.5 12H18.5ZM15 20.5C14.8286 20.5 14.0264 20.3553 13.0735 18.7217C12.1707 17.1741 11.5 14.8054 11.5 12H4.5C4.5 15.822 5.39632 19.4533 7.02703 22.2488C8.60761 24.9584 11.3054 27.5 15 27.5V20.5ZM11.5 12C11.5 9.19458 12.1707 6.82591 13.0735 5.27827C14.0264 3.6447 14.8286 3.5 15 3.5V-3.5C11.3054 -3.5 8.60761 -0.958409 7.02703 1.75117C5.39632 4.54667 4.5 8.178 4.5 12H11.5ZM15 3.5C15.1714 3.5 15.9736 3.6447 16.9265 5.27827C17.8293 6.82591 18.5 9.19458 18.5 12H25.5C25.5 8.178 24.6037 4.54667 22.973 1.75117C21.3924 -0.958409 18.6946 -3.5 15 -3.5V3.5Z" fill="#00EBC4" mask="url(#path-1-inside-1_83_1236)"/> <mask id="path-3-inside-2_83_1236" fill="white"> <path d="M16 12C16 18.6274 12.866 24 9 24C5.13401 24 2 18.6274 2 12C2 5.37258 5.13401 0 9 0C12.866 0 16 5.37258 16 12Z"/> </mask> <path d="M12.5 12C12.5 14.8054 11.8293 17.1741 10.9265 18.7217C9.97361 20.3553 9.17136 20.5 9 20.5V27.5C12.6946 27.5 15.3924 24.9584 16.973 22.2488C18.6037 19.4533 19.5 15.822 19.5 12H12.5ZM9 20.5C8.82864 20.5 8.02639 20.3553 7.07348 18.7217C6.17069 17.1741 5.5 14.8054 5.5 12H-1.5C-1.5 15.822 -0.603684 19.4533 1.02703 22.2488C2.60761 24.9584 5.30537 27.5 9 27.5V20.5ZM5.5 12C5.5 9.19458 6.17069 6.82591 7.07348 5.27827C8.02639 3.6447 8.82864 3.5 9 3.5V-3.5C5.30537 -3.5 2.60761 -0.958409 1.02703 1.75117C-0.603684 4.54667 -1.5 8.178 -1.5 12H5.5ZM9 3.5C9.17136 3.5 9.97361 3.6447 10.9265 5.27827C11.8293 6.82591 12.5 9.19458 12.5 12H19.5C19.5 8.178 18.6037 4.54667 16.973 1.75117C15.3924 -0.958409 12.6946 -3.5 9 -3.5V3.5Z" fill="#5000CA" mask="url(#path-3-inside-2_83_1236)"/> </svg>
            quantica
          </a>
        </small>
      </p>
      
</div>
</template>
  
  <script>
//   import {Offcanvas} from 'bootstrap'
//   import { AddExpense } from "@/components/AddExpense.vue";
  import {capitalize, set_default,format_price,capitalize_words} from '@/utils'
  import html2canvas from 'html2canvas';
  
  export default {
    name: 'ShowTransactions',
    components:{
        
    },
    props:{
      shared_expense:Object,
    },
    data(){
      return {
        transactions:null,
        owes:null,
      }
    },
    mounted(){
      console.log(this.shared_expense);

      this.owes = this.calculate_debts(this.shared_expense.expenses)
      this.transactions = this.calculate_transactions(this.owes)

      // console.log('owes',owes);
    },
    computed:{
      can_share(){
        return navigator.share;
      }
    },
    methods:{
      capitalize,format_price,capitalize_words,
      handle_share_image(){
          let hide = document.createElement('div') 
          hide.classList.add('hide')
          document.body.append(hide)

          let print_element = document.getElementById('print_element');
          print_element.classList.toggle('d-none')
          
          html2canvas(print_element).then(function(canvas) {
              // document.body.appendChild(canvas);
              var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
              
              if (navigator.share) {
                  canvas.toBlob(function(blob) {
                      const file = new File([blob], 'gasto_compartido.png', { type: 'image/png' });
                      navigator.share({
                          files: [file],
                          title: 'Gasto Compartido',
                          text: 'Mira esta imagen de los gastos compartidos.'
                      }).catch((error) => {
                          console.error('Error sharing', error);
                      });
                  });
              } else {
                  var link = document.getElementById('link');
                  link.setAttribute('download', 'gasto_compartido.png');
                  link.setAttribute('href', image);
                  link.click();
              }

              print_element.classList.toggle('d-none')
              hide.remove()
          });
      },
      calculate_debts(expenses){
        let owes_total = {};

        Object.values(expenses).forEach(expense => {
            const { payer, payers, price } = expense;
            const share = price / payers.length;

            payers.forEach(payerName => {
                set_default(owes_total, payerName, {
                    debts: [],
                    total_proportional_debt: 0,
                    spent: 0,
                    owes_or_receives: 0
                });

                owes_total[payerName].total_proportional_debt += share;
            });

            set_default(owes_total, payer, {
                debts: [],
                total_proportional_debt: 0,
                spent: 0,
                owes_or_receives: 0
            });

            owes_total[payer].spent += price;
        });

        Object.keys(owes_total).forEach(member => {
            owes_total[member].owes_or_receives = owes_total[member].total_proportional_debt - owes_total[member].spent;
        });

        return owes_total;
      },
      calculate_transactions(owes){
        let transactions = [];
        let members = Object.keys(owes).map(member_name => ({
            ...owes[member_name],
            name: member_name,
            current_balance: owes[member_name].owes_or_receives
        }));

        members.sort((a, b) => a.current_balance - b.current_balance);

        let i = 0;
        let j = members.length - 1;

        while (i < j) {
            let debtor = members[i];
            let creditor = members[j];

            let amount = Math.min(Math.abs(debtor.current_balance), Math.abs(creditor.current_balance));
            
            // Updating balances before creating the transaction
            debtor.current_balance += amount;
            creditor.current_balance -= amount;

            transactions.push({
                from_name: creditor.name,
                to_name: debtor.name,
                amount: amount,
                // left_ro_receive: Math.abs(creditor.current_balance) // Update left_ro_receive based on the updated balance
            });

            if (debtor.current_balance === 0) i++;
            if (creditor.current_balance === 0) j--;
        }

        return transactions;
      },
      left_ro_receive(transaction, transaction_index){
        console.log('transaction',transaction);
        console.log('transaction_index',transaction_index);

        
        let left_to_receive = JSON.parse(JSON.stringify(this.owes[transaction.to_name].owes_or_receives));
        for (let i = 0; i <= transaction_index; i++) {
          if(this.transactions[i].to_name==transaction.to_name){
            left_to_receive+=this.transactions[i].amount;
          }
        }
        return left_to_receive
      }
      
    }
  }
  </script>
<style>
  .hide{
    width: 100vw;
    height: 100vh;
    background: #fff;
    position: absolute;
    top: 0;
    z-index: 9999999999999999999999999;
  }
</style>
  