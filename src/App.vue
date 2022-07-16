<template>
  <div class="container">
    <web-header :user="currentUser"></web-header>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">1</li>
          <li class="list-inline-item">2</li>
          <li class="list-inline-item">3</li>
          <li class="list-inline-item">4</li>
          <li class="list-inline-item">5</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from 'vuex'
import WebHeader from './components/WebHeader.vue'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    const currentUser = computed(() => store.state.user)
    return {
      currentUser
    }
  },
  components: {
    WebHeader
  }
})
</script>

<style></style>
