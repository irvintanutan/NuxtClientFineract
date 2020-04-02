<template>
  <div>
    <SearchJokes v-on:search-text="searchText" />
    <Joke
      v-for="joke in jokes"
      :key="joke.id"
      :id="joke.id"
      :joke="joke.joke"
    />
  </div>
</template>

<script>
import axios from 'axios'
import Joke from '../../components/Joke'
import SearchJokes from '../../components/SearchJokes'

export default {
  components: {
    Joke,
    SearchJokes
  },

  data() {
    return {
      jokes: []
    }
  },
  async created() {
    const config = {
      headers: {
        Accept: 'application/json'
      }
    }

    try {
      const rest = await axios.get('https://icanhazdadjoke.com/search', config)
      this.jokes = rest.data.results

      axios.defaults.headers.common = {
        'Fineract-Platform-TenantId': 'default',
        'Access-Control-Allow-Origin': '*'
      }
      const fineract = await axios({
        url:
          'https://ec2-13-229-72-14.ap-southeast-1.compute.amazonaws.com/fineract-provider/api/v1/clients',
        method: 'GET',
        crossDomain: true
      })
      console.log(fineract.data)
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async searchText(text) {
      const config = {
        headers: {
          Accept: 'application/json'
        }
      }

      try {
        const rest = await axios.get(
          `https://icanhazdadjoke.com/search?term=${text}`,
          config
        )
        this.jokes = rest.data.results
      } catch (err) {
        console.log(err)
      }
    }
  },
  head() {
    return {
      title: 'Member List',
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
