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
  created() {
    const login = new Promise((resolve, reject) => {
      const agent = new https.Agent({
        rejectUnauthorized: false
      })
      this.$axios.defaults.headers.common = {
        'Fineract-Platform-TenantId': 'default',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json; charset=utf-8'
      }
      this.$axios({
        url: 'authentication?username=mifos&password=password',
        data: {},
        method: 'POST',
        config: {
          httpsAgent: agent
        },
        crossDomain: true
      })
        .then(resp => {
          const token = resp.data.base64EncodedAuthenticationKey
          console.log(token)
          this.$store.state.token = token
          console.log(this.$store.state.token)
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
</script>
