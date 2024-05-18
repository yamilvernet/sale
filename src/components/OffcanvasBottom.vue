<template>
   <!-- <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Toggle bottom offcanvas</button> -->

    <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
      <div class="container">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasBottomLabel">
            <slot name="header"></slot>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
</template>
  
<script>
import {Offcanvas} from 'bootstrap'
// import { AddExpense } from "@/components/AddExpense.vue";
// import {date_format} from '@/utils'

export default {
  name: 'OffcanvasBottom',
  // components:{
  // },
  props:{
      // title:{
      //   type:String,
      //   default:null
      // },
  },
  data(){
    return {
      bs_offcanvas:null,
      trigger:{
        show:0,
      },
    }
  },
  mounted(){
    this.bs_offcanvas = new Offcanvas('#offcanvasBottom');
    this.bs_offcanvas.show()
    // console.log(this.bs_offcanvas);

    this.bs_offcanvas._element.addEventListener('hidden.bs.offcanvas', () => {
      this.$emit('hide',true)
    })



  },
  beforeUnmount() {
    this.bs_offcanvas.dispose()
  },
  computed:{
  },
  methods:{
  }
}
</script>
<style>
</style>