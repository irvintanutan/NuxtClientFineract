<template>
  <section>
    <div class="container">
      <div class="notification">
        <b-field grouped group-multiline>
          <b-select v-model="perPage" :disabled="!isPaginated">
            <option value="5">5 per page</option>
            <option value="10">10 per page</option>
            <option value="15">15 per page</option>
            <option value="20">20 per page</option>
          </b-select>
        </b-field>

        <b-table
          :data="data"
          :striped="true"
          :hoverable="true"
          :columns="columns"
          :paginated="isPaginated"
          :per-page="perPage"
          :current-page.sync="currentPage"
          :pagination-simple="isPaginationSimple"
          :pagination-position="paginationPosition"
          :default-sort-direction="defaultSortDirection"
          :sort-icon="sortIcon"
          :sort-icon-size="sortIconSize"
          default-sort="external_id"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
          :selected.sync="selected"
          @click="open(selected)"
        ></b-table>
      </div>
    </div>
  </section>
</template>

<script>
import Joke from '../../components/Joke'
import SearchJokes from '../../components/SearchJokes'
import https from 'https'

let data = []

export default {
  components: {
    Joke,
    SearchJokes
  },

  data() {
    return {
      jokes: [],
      data,
      selected: data[1],
      columns: [
        {
          field: 'name',
          label: 'Name',
          searchable: true,
          sortable: true
        },
        {
          field: 'client_number',
          label: 'Client #',
          searchable: true,
          sortable: true,
          numeric: true
        },
        {
          field: 'external_id',
          label: 'External Id',
          searchable: true,
          sortable: true,
          numeric: true
        },
        {
          field: 'status',
          label: 'Status',
          sortable: true
        },
        {
          field: 'office',
          label: 'Office',
          searchable: true,
          sortable: true
        },
        {
          field: 'staff',
          label: 'Staff',
          searchable: true,
          sortable: true
        }
      ],
      isPaginated: true,
      isPaginationSimple: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'desc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 5
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
              item['name'] = obj.firstname + ' ' + obj.lastname
              item['client_number'] = obj.accountNo
              item['external_id'] = obj.lastname
              item['status'] = obj.status.value
              item['office'] = obj.officeName
              item['staff'] = obj.staffName

              this.data.push(item)
              console.log(item)
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
    },
    open(item) {
      this.$router.push({ path: `/jokes/${item.external_id}` })
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
