<template>
  <section>
    <div class="container">
      <div class="notification">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <h1 class="title">Member List</h1>
            </div>
          </div>
          <div class="level-right">
            <p class="level-item">
              <nuxt-link to="/members/add" class="button is-primary">Register Member</nuxt-link>
            </p>
          </div>
        </div>
        <div class="level table-controls">
          <div class="level-left">
            <div class="level-item"></div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <b-field grouped group-multiline>
                <b-select v-model="perPage" :disabled="!isPaginated">
                  <option value="5">5 per page</option>
                  <option value="10">10 per page</option>
                  <option value="15">15 per page</option>
                  <option value="20">20 per page</option>
                </b-select>
              </b-field>
            </div>
          </div>
        </div>

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

    <div class="container form-conatiner">
      <div class="form-details">
        <b-field class="input-label">
          <span v-show="mobileNumber.length > 0" class="input-placeholder">Mobile Number</span>
          <b-input
            id="mobile"
            v-model="mobileNumber"
            name="mobile-number"
            autocomplete="off"
            class="label-overlay-input"
            type="tel"
            placeholder="Mobile Number"
            @keypress="input"
            autofocus
          />
        </b-field>
        <b-field class="input-sublabel" type="is-danger" message="Example: 0XXX XXX XXXX"></b-field>
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
      mobileNumber: '',
      title: 'Members Page',
      subtitle: 'List of Members',
      data,
      columns: [
        {
          field: 'status',
          label: 'Status',
          sortable: true
        },
        {
          field: 'name',
          label: 'Member Name',
          sortable: true
        },
        {
          field: 'client_number',
          label: 'Member ID',
          sortable: true
        },
        // {
        //   field: 'external_id',
        //   label: 'External Id',
        //   sortable: true,
        //   numeric: true
        // },
        {
          field: 'office',
          label: 'Branch',
          sortable: true
        },
        {
          field: 'staff',
          label: 'Assigned Officer',
          sortable: true
        },
        {
          field: 'action',
          label: '⫶',
          class: 'bold-td',
          width: 1
        }
      ],
      isPaginated: true,
      isPaginationSimple: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'desc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 10
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
<style>
</style>
