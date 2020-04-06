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
          @select="(row, index) => open(row)"
        ></b-table>
      </div>
    </div>
  </section>
</template>

<script>
import Member from '../../components/Member'
import SearchJokes from '../../components/SearchJokes'
import https from 'https'

let data = []

export default {
  components: {
    Member,
    SearchJokes
  },

  data() {
    return {
      title: 'Members Page',
      subtitle: 'List of Members',
      jokes: [],
      data,
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
  mounted() {
    const config = {
      headers: {
        Accept: 'application/json'
      }
    }
    try {
      this.$store
        .dispatch('getMembers')
        .then(() => {
          this.data = this.$store.getters.members
        })
        .catch(err => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async open(row) {
      this.$router.push({ path: `/members/${row.id}` })
    }
  },
  head() {
    return {
      title: 'Members Page',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'List of Members'
        }
      ]
    }
  }
}
</script>
<style></style>
