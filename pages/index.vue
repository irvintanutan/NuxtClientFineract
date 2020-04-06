<template>
  <div>
    <h2>Fineract NUXT Member Module</h2>
  </div>
</template>

<script>
import https from 'https'
export default {
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
  mounted() {
    const data = {
      username: "mifos",
      password: "password"
    }
    this.$store
      .dispatch("login", data)
      .then(() => {
        console.log("Logged in!")
      })
      .catch(err => {
        console.log(err)
      });
  }
}
</script>
