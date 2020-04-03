<template>
  <div>
    <b-table :data="data" :striped="true" :hoverable="true" :columns="columns"></b-table>
    <SearchJokes v-on:search-text="searchText" />
    <Joke v-for="joke in jokes" :key="joke.id" :id="joke.id" :joke="joke.joke" />
  </div>
</template>

<script>
import Joke from '../../components/Joke'
import SearchJokes from '../../components/SearchJokes'
import https from 'https'

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
  created() {
    const config = {
      headers: {
        Accept: 'application/json'
      }
    }

    try {
      // const rest = await this.$axios.get('https://icanhazdadjoke.com/search', config)
      // this.jokes = rest.data.results
      const agent = new https.Agent({  
        rejectUnauthorized: false
      });
      
    const fineract = new Promise((resolve, reject) => {
      const agent = new https.Agent({  
        rejectUnauthorized: false
      });
      const token = this.$store.state.token
        console.log(`members ${token}`)
        this.$axios.defaults.headers.common = {
          'Fineract-Platform-TenantId': 'default',
          'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json",
          'Authorization': `Basic ${token}`
        }
        this.$axios({
          url: 'clients',
          method: 'GET',
          data: {
            "name": "Davao",
            "dateFormat": "dd MMMM yyyy",
            "locale": "en",
            "openingDate": "01 July 2007",
            "parentId": 2,
            "externalId": "SYS54-88"
          },
          config: {
            httpsAgent: agent
          },
          crossDomain: true
        })
        .then(resp => {
          console.log(resp.data)
          resolve(resp);
        })
        .catch(err => {
          reject(err)
        });
    });
      // console.log(fineract)
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
        const rest = await this.$axios.get(
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
