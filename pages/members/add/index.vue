<template>
  <section>
    <div class="container">
      <div class="notification">
        <nuxt-link to="/members" class="button is-primary">Back To Member List</nuxt-link>
        <!-- <h2>{{ joke }}</h2> -->
        <hr />
        <b-field label="Office">
          <b-select placeholder="Select office" v-model="member.officeId">
            <option v-for="option in offices" :value="option.id" :key="option.id">{{ option.name }}</option>
            <option value></option>
          </b-select>
        </b-field>
        <!-- <b-field label="Legal form">
          <b-select placeholder="Select legal form" v-model="member.legalForm">
            <option
              v-for="option in template.clientLegalFormOptions"
              :value="option.id"
              :key="option.id"
            >{{ option.value }}</option>
          </b-select>
        </b-field>-->
        <b-field label="First name">
          <b-input v-model="member.firstname"></b-input>
        </b-field>
        <!-- <b-field label="Middle name">
          <b-input value></b-input>
        </b-field>-->
        <b-field label="Last name">
          <b-input v-model="member.lastname"></b-input>
        </b-field>
        <b-field label="Account#">
          <b-input v-model="member.accountNo"></b-input>
        </b-field>
        <b-field label="External id">
          <b-input v-model="member.externalId"></b-input>
        </b-field>
        <b-field label="Mobile number">
          <b-input v-model="member.mobileNo"></b-input>
        </b-field>
        <!-- <b-field label="Client type">
          <b-select placeholder="Select client type">
            <option value="em">EM</option>
            <option value="ma">MA</option>
            <option value="co">CO</option>
          </b-select>
        </b-field>-->
        <b-field label="Submitted on">
          <b-input v-model="submissionDate" type="date"></b-input>
        </b-field>
        <b-field label="Activated on">
          <b-input v-model="activationDate" type="date"></b-input>
        </b-field>
        <!-- <b-field label="Staff">
          <b-select placeholder="Select staff" v-model="member.staffId">
            <option
              v-for="option in staffs"
              :value="option.id"
              :key="option.id"
            >{{ option.displayName }}</option>
            <option value></option>
          </b-select>
        </b-field>-->
        <!-- <b-field label="Client classification">
          <b-select placeholder="Select client classification">
            <option
              v-for="option in data"
              :value="option.id"
              :key="option.id"
            >{{ option.user.first_name }}</option>
            <option value></option>
          </b-select>
        </b-field>-->

        <nuxt-link to="/members" class="button is-default">Cancel</nuxt-link>
        <button class="button is-primary" v-on:click="add">Add</button>
        <!-- <small>Joke ID: {{ $route.params.id }}</small> -->
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      joke: {},
      member: {},
      staffs: {},
      payload: {},
      offices: {},
      submissionDate: '',
      activationDate: ''
    }
  },
  async created() {
    try {
      this.$store
        .dispatch('getAllStaff')
        .then(() => {
          this.staffs = this.$store.getters.staffs
          console.log(this.staffs)
        })
        .catch(err => {
          console.log(err)
        })

      this.$store
        .dispatch('getOffices')
        .then(() => {
          this.offices = this.$store.getters.offices
          console.log(this.offices)
        })
        .catch(err => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
  },
  mounted() {},
  methods: {
    add() {
      console.log(`add payload ${JSON.stringify(this.member)}`)

      let activationDateFormatted = new Date(this.activationDate)
      let submittedDateFormatted = new Date(this.submissionDate)

      const payload = {
        officeId: this.member.officeId,
        firstname: this.member.firstname,
        lastname: this.member.lastname,
        externalId: this.member.externalId,
        mobileNo: this.member.mobileNo,
        dateFormat: 'MM/dd/yyyy',
        locale: 'en',
        active: true,
        activationDate: activationDateFormatted.toLocaleDateString(),
        submittedOnDate: submittedDateFormatted.toLocaleDateString()
      }
      this.$store
        .dispatch('addMember', {
          payload: payload
        })
        .then(() => {
          alert('Successful')
          this.$router.push('/members')
        })
        .catch(err => {
          alert('Not Successful')
          console.log(err)
        })
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
