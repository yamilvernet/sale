<template>
  <nav-bar></nav-bar>
  <router-view/>
</template>
<script>
import NavBar from "@/views/layout/NavBar.vue";
export default {
  components:{NavBar},
}
</script>
