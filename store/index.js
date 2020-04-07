import Vuex from 'vuex'
import https from 'https'

const createStore = () => {
  return new Vuex.Store({
    state: {
      status: '',
      token: '',
      members: [],
      memberDetails: {},
      staffs: {},
      clientTemplates: {},
      offices: {},
      dataStatus: ''
    },
    mutations: {
      auth_request(state) {
        state.status = 'loading'
      },
      auth_success(state, token) {
        state.status = 'success'
        state.token = token
      },
      auth_error(state) {
        state.status = 'error'
      },
      data_error(state, name) {
        state.dataStatus = `Error fetching ${name} data`
      },
      data_request(state, name) {
        state.dataStatus = `Fetching ${name} data`
      },
      data_success(state, name) {
        state.dataStatus = `Success fetching ${name} data`
      },
      members(state, members) {
        state.members = members
      },
      memberDetails(state, memberDetails) {
        state.memberDetails = memberDetails
      },
      staffs(state, staffs) {
        state.staffs = staffs
      },
      clientTemplates(state, clientTemplates) {
        state.clientTemplates = clientTemplates
      },
      offices(state, offices) {
        state.offices = offices
      }
    },
    actions: {
      login({ commit }, user) {
        return new Promise((resolve, reject) => {
          const agent = new https.Agent({
            rejectUnauthorized: false
          })
          commit('auth_request')
          this.$axios.defaults.headers.common = {
            'Fineract-Platform-TenantId': 'default',
            'Access-Control-Allow-Origin': '*'
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
              if (process.client) {
                localStorage.setItem('token', token)
                console.log(`localStorage ${localStorage.getItem('token')}`)
              }
              commit('auth_success', token)
              resolve(resp)
            })
            .catch(err => {
              reject(err)
            })
        })
      },
      getSpecificMembers({ commit }, id) {
        return new Promise((resolve, reject) => {
          const agent = new https.Agent({
            rejectUnauthorized: false
          })
          const token = process.client ? localStorage.getItem('token') : ''
          this.$axios.defaults.headers.common = {
            'Fineract-Platform-TenantId': 'default',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Authorization: `Basic ${token}`
          }
          this.$axios({
            url: `clients/${id}`,
            method: 'GET',
            data: {},
            config: {
              httpsAgent: agent
            },
            crossDomain: true
          })
            .then(resp => {
              commit('memberDetails', resp.data)
              resolve(resp)
            })
            .catch(err => {
              reject(err)
            })
        })
      },
      updateMember({ commit }, {clientId, payload}) {
        return new Promise((resolve, reject) => {
          const agent = new https.Agent({
            rejectUnauthorized: false
          })
          const token = process.client ? localStorage.getItem('token') : ''
          this.$axios.defaults.headers.common = {
            'Fineract-Platform-TenantId': 'default',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Authorization: `Basic ${token}`
          }
          console.log(`id ${clientId} payload ${JSON.stringify(payload)}`)
          this.$axios({
            url: `clients/${clientId}`,
            method: 'PUT',
            data: payload,
            config: {
              httpsAgent: agent
            },
            crossDomain: true
          })
            .then(resp => {
              resolve(resp)
            })
            .catch(err => {
              reject(err)
            })
        })
      },
      getOffices({ commit }) {
        return new Promise((resolve, reject) => {
          const agent = new https.Agent({
            rejectUnauthorized: false
          })
          const token = process.client ? localStorage.getItem('token') : ''
          this.$axios.defaults.headers.common = {
            'Fineract-Platform-TenantId': 'default',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Authorization: `Basic ${token}`
          }
          this.$axios({
            url: `offices`,
            method: 'GET',
            data: {},
            config: {
              httpsAgent: agent
            },
            crossDomain: true
          })
            .then(resp => {
              commit('offices', resp.data)
              resolve(resp)
            })
            .catch(err => {
              reject(err)
            })
        })
      },
      getClientTemplates({ commit }) {
        return new Promise((resolve, reject) => {
          const agent = new https.Agent({
            rejectUnauthorized: false
          })
          const token = process.client ? localStorage.getItem('token') : ''
          this.$axios.defaults.headers.common = {
            'Fineract-Platform-TenantId': 'default',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Authorization: `Basic ${token}`
          }
          this.$axios({
            url: 'clients/template',
            method: 'GET',
            data: {},
            config: {
              httpsAgent: agent
            },
            crossDomain: true
          })
            .then(resp => {
              commit('clientTemplates', resp.data)
              resolve(resp)
            })
            .catch(err => {
              reject(err)
            })
        })
      },
      getAllStaff({ commit }) {
        return new Promise((resolve, reject) => {
          const agent = new https.Agent({
            rejectUnauthorized: false
          })
          const token = process.client ? localStorage.getItem('token') : ''
          this.$axios.defaults.headers.common = {
            'Fineract-Platform-TenantId': 'default',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Authorization: `Basic ${token}`
          }
          this.$axios({
            url: `staff`,
            method: 'GET',
            data: {},
            config: {
              httpsAgent: agent
            },
            crossDomain: true
          })
            .then(resp => {
              commit('staffs', resp.data)
              resolve(resp)
            })
            .catch(err => {
              reject(err)
            })
        })
      },
      getMembers({ commit }) {
        return new Promise((resolve, reject) => {
          const agent = new https.Agent({
            rejectUnauthorized: false
          })
          const token = process.client ? localStorage.getItem('token') : ''
          console.log(`getMembers token ${token}`)
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
              var membersData = new Array()
              for (var i = 0; i < json.pageItems.length; i++) {
                var obj = json.pageItems[i]

                var item = {}
                item['name'] = obj.firstname + ' ' + obj.lastname
                item['client_number'] = obj.accountNo
                item['external_id'] = obj.externalId
                item['status'] = obj.status.value
                item['office'] = obj.officeName
                item['staff'] = obj.staffName
                item['id'] = obj.id

                membersData.push(item)
              }
              commit('members', membersData)
              resolve(resp)
            })
            .catch(err => {
              reject(err)
            })
        })
      }
    },
    modules: {},
    getters: {
      isLoggedIn: state => !!state.token,
      authStatus: state => state.status,
      token: state => state.token,
      members: state => state.members,
      memberDetails: state => state.memberDetails,
      staffs: state => state.staffs,
      clientTemplates: state => state.clientTemplates,
      offices: state => state.offices
    }
  })
}

export default createStore
