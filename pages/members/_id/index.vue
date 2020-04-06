<template>
  <section>
    <div class="container">
      <div class="notification">
        <nuxt-link to="/members" class="button is-primary">Back To Member List</nuxt-link>
        <h2>{{ joke }}</h2>
        <hr />
        <small>Joke ID: {{ $route.params.id }}</small>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      joke: {}
    }
  },
  async created() {
    const config = {
      headers: {
        Accept: 'application/json'
      }
    }

    const config2 = {
      headers: {
        'Fineract-Platform-TenantId': 'default',
        'Access-Control-Allow-Origin': 'true'
      }
    }

    try {
      const rest = await axios.get(
        `https://icanhazdadjoke.com/j/${this.$route.params.id}`,
        config
      )

      this.joke = rest.data.joke
      console.log(this.joke)
    } catch (err) {
      console.log(err)
    }
  },
  head() {
    return {
      title: 'Member Page',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'best place for corny dad jokes'
        }
      ]
    }
  }
}
</script>
<style></style>
