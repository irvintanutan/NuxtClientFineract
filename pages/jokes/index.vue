<template>
  <div>
    <b-table :data="data" :striped="true" :hoverable="true" :columns="columns"></b-table>
    <SearchJokes v-on:search-text="searchText" />
    <Joke v-for="joke in jokes" :key="joke.id" :id="joke.id" :joke="joke.joke" />
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
      jokes: [],
      data: [
        {
          id: 1,
          first_name: 'Jesse',
          last_name: 'Simmons',
          date: '2016-10-15 13:43:27',
          gender: 'Male'
        },
        {
          id: 2,
          first_name: 'John',
          last_name: 'Jacobs',
          date: '2016-12-15 06:00:53',
          gender: 'Male'
        },
        {
          id: 3,
          first_name: 'Tina',
          last_name: 'Gilbert',
          date: '2016-04-26 06:26:28',
          gender: 'Female'
        },
        {
          id: 4,
          first_name: 'Clarence',
          last_name: 'Flores',
          date: '2016-04-10 10:28:46',
          gender: 'Male'
        },
        {
          id: 5,
          first_name: 'Anne',
          last_name: 'Lee',
          date: '2016-12-06 14:38:38',
          gender: 'Female'
        }
      ],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true
        },
        {
          field: 'first_name',
          label: 'First Name'
        },
        {
          field: 'last_name',
          label: 'Last Name'
        },
        {
          field: 'date',
          label: 'Date',
          centered: true
        },
        {
          field: 'gender',
          label: 'Gender'
        }
      ]
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
