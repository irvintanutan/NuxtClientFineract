<template>
  <div>
    <NavBar />
    <AppHeader />
    <nuxt />
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader'
import NavBar from '../components/NavBar'

export default {
  components: {
    AppHeader,
    NavBar
  }
}
</script>

<style>
</style>
