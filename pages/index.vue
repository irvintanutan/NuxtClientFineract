<template>
  <div class="container">
    <div class="notification">
      <h2>Fineract NUXT Member Module</h2>

      <b-notification :closable="false">
        <b-loading :is-full-page="isFullPage" :active.sync="isLoading"></b-loading>
      </b-notification>
    </div>
  </div>
</template>

<script>
import https from 'https'
export default {
  data() {
    return {
      isLoading: false,
      isFullPage: true
    }
  },
  head() {
    return {
      title: 'Member Module',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'member module'
        }
      ]
    }
  },
  methods: {
    openLoading() {
      this.isLoading = true
    },
    stopLoading() {
      this.isLoading = false
    }
  },
  mounted() {
    const data = {
      username: 'mifos',
      password: 'password'
    }
    this.openLoading()
    this.$store
      .dispatch('login', data)
      .then(() => {
        this.stopLoading()
        console.log('Logged in!')
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
