<template>
   
</template>
  
  <script>
//   import {Offcanvas} from 'bootstrap'
//   import { AddExpense } from "@/components/AddExpense.vue";
  // import {date_format} from '@/utils'
  
  export default {
    name: 'Template',
    components:{
        
    },
    props:{
        expense_id:String,
    },
    data(){
      return {
        
      }
    },
    mounted(){
      
    },
    computed:{
    //   greeting(){
    //     return "Hello";
    //   }
    },
    methods:{
      handle_show(expense_id){
        console.log(expense_id);
        // this.expense_selected = expense_id
        // this.offcanvas.show.show()
      },
      handle_submit(e){
        console.log(e);
  
        // fetch('https://stocks-e3bff-default-rtdb.firebaseio.com/expenses.json',{
        //     method:'POST',
        //     body:JSON.stringify({name:e.target.name.value,icon:e.target.icon.value})
        // }).then((r)=>r.json())
        // .then((data)=>{
          
        //   fetch('https://stocks-e3bff-default-rtdb.firebaseio.com/expenses.json').then((r)=>r.json())
        //   .then((data)=>{
        //     // console.log('data',data);
        //     this.expenses = data
        //   })
        //   .catch((err)=>console.log(err))
  
        //   this.expense_selected = data.name;
        //   this.offcanvas.create.hide();
  
        // }).catch((err)=>console.log(err))
      },
    }
  }
  </script>
  