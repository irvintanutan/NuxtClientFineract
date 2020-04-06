import Vuex from 'vuex'
import https from 'https'

const createStore = () => {
  return new Vuex.Store({
    state: {
      status: "",
      token: "",
      members: [],
      dataStatus: ""
    },
    mutations: {
      auth_request(state) {
        state.status = "loading"
      },
      auth_success(state, token) {
        state.status = "success"
        state.token = token
      },
      auth_error(state) {
        state.status = "error"
      },
      data_error(state, name) {
        state.dataStatus = `Error fetching ${name} data`;
      },
      data_request(state, name) {
        state.dataStatus = `Fetching ${name} data`;
      },
      data_success(state, name) {
        state.dataStatus = `Success fetching ${name} data`;
      },
      members(state, members) {
        state.members = members
      }
    },
    actions: {
      login({ commit }, user) {
        return new Promise((resolve, reject) => {
          const agent = new https.Agent({
              rejectUnauthorized: false
          })
          commit("auth_request");
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
              if(process.client) {
                localStorage.setItem("token", token)
                console.log(`localStorage ${localStorage.getItem("token")}`)
              }
              commit("auth_success", token)
              resolve(resp)
            })
            .catch(err => {
              reject(err)
            })
        });
      },
  
      getMembers({commit}) {
        return new Promise((resolve, reject) => {
          const agent = new https.Agent({
            rejectUnauthorized: false
          })
          const token = process.client ? localStorage.getItem("token") : ""
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
                item['external_id'] = obj.lastname
                item['status'] = obj.status.value
                item['office'] = obj.officeName
                item['staff'] = obj.staffName
  
                membersData.push(item)
              }
              commit("members", membersData)
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
      members: state => state.members
    }
  });
}

export default createStore
