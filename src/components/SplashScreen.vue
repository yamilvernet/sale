<template>
    <div class="my-2 mb-4 position-relative">
      <img :src="background_url[trigger.current_background]">
      <img :src="screens[trigger.current_screen].image_url">
    </div>
    <div class="mx-4">
      <p class="text-center fw-bold">Dividí los gastos de salidas con amigos en un toque</p>
      <p class="text-center small">Conectá con el momento, disfrutá de los viajes sin complicaciones y <b class="text-primary">compartí sin preocuparte</b>.</p>
    </div>
</template>
  
<script>
// import {Offcanvas} from 'bootstrap'
// import { AddExpense } from "@/components/AddExpense.vue";
// import {date_format} from '@/utils'

export default {
  name: 'SplashScreen',
  components:{
      
  },
  props:{
      expense_id:String,
  },
  data(){
    return {
      screen_interval:null,

      trigger:{
        current_screen:0,
        current_background:0,
      },
      screens:[
        {
          image_url:'/assets/images/illustrations/undraw_coffee_with_friends_3cbj.svg'
        },
        {
          image_url:'/assets/images/illustrations/undraw_fans_re_cri3.svg'
        },
        {
          image_url:'/assets/images/illustrations/undraw_having_fun_re_vj4h.svg'
        },
        {
          image_url:'/assets/images/illustrations/undraw_horror_movie_3988.svg'
        },
        {
          image_url:'/assets/images/illustrations/undraw_pizza_sharing_wxop.svg'
        },
      ],
      background_url:[
        '/assets/images/illustrations/background/background_splash_0.svg',
        '/assets/images/illustrations/background/background_splash_1.svg',
        '/assets/images/illustrations/background/background_splash_2.svg'
      ]
    }
  },
  mounted(){
    this.screen_interval=setInterval(() => {
      let new_screen = this.trigger.current_screen+1;
      this.trigger.current_screen = (new_screen>=this.screens.length) ? 0 : new_screen;
      let new_background = this.trigger.current_background+1;
      this.trigger.current_background = (new_background>=this.background_url.length) ? 0 : new_background;
    }, 4000);
  },
  beforeUnmount() {
    clearInterval(this.screen_interval);
  },
  computed:{
  },
  methods:{
  }
}
</script>
<style scoped>
img {
  height: 280px;
  width: 100%;
  object-fit: contain;
  position: absolute;
}

.position-relative {
  height:280px;
}
</style>