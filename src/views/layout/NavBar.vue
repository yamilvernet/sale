<template>
  <div class="w-100">
    <div class="container py-2">
      <div class="d-flex-center-between">
        <h1 class="h5 fw-bold text-primary mb-0">
          <router-link to="/" class="d-flex-center-start text-reset text-decoration-none">
            <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 10h-14l4 -4" /><path d="M7 14h14l-4 4" /></svg>
            <span class="ms-1">
              Sale
            </span>
          </router-link>
        </h1>
        <button v-if="$route.meta.nav_back_button" class="btn text-primary" @click.prevent="$router.push('/')">
          <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>
        </button>
        <button v-else class="btn text-primary opacity-0" disabled>
          <svg width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left">
            <!-- <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /> -->
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style>

</style>