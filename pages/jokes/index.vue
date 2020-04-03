<template>
  <div>
    <b-table
      :data="data"
      :striped="true"
      :hoverable="true"
      :columns="columns"
    ></b-table>
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
      data: [],
      columns: [
        {
          field: 'name',
          label: 'Name'
        },
        {
          field: 'client_number',
          label: 'Client #'
        },
        {
          field: 'external_id',
          label: 'External Id'
        },
        {
          field: 'status',
          label: 'Status'
        },
        {
          field: 'office',
          label: 'Office'
        },
        {
          field: 'staff',
          label: 'Staff'
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
      })

      const fineract = new Promise((resolve, reject) => {
        const agent = new https.Agent({
          rejectUnauthorized: false
        })
        const token = this.$store.state.token
        console.log(`members ${token}`)
        this.$axios.defaults.headers.common = {
          'Fineract-Platform-TenantId': 'default',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: `Basic ${token}`
        }
        this.$axios({
          url: 'clients',
          method: 'GET',
          data: {
            name: 'Davao',
            dateFormat: 'dd MMMM yyyy',
            locale: 'en',
            openingDate: '01 July 2007',
            parentId: 2,
            externalId: 'SYS54-88'
          },
          config: {
            httpsAgent: agent
          },
          crossDomain: true
        })
          .then(resp => {
            var json = resp.data
            for (var i = 0; i < json.pageItems.length; i++) {
              var obj = json.pageItems[i]

              var item = {}
              item['name'] = obj.accountNo
              item['client_number'] = obj.firstname
              item['external_id'] = obj.lastname
              item['status'] = obj.status.value
              item['office'] = obj.officeName
              item['staff'] = obj.staffName

              this.data.push(item)
            }
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
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
