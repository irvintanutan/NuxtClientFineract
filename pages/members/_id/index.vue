<template>
  <section>
    <div class="container">
      <div class="notification">
        <nuxt-link to="/members" class="button is-primary">Back To Member List</nuxt-link>
        <!-- <h2>{{ joke }}</h2> -->
        <hr />
        <b-field label="Office">
          <b-select placeholder="Select office">
            <!-- <option
              v-for="option in data"
              :value="option.id"
              :key="option.id"
            >{{ option.user.first_name }}</option>-->
            <option value></option>
          </b-select>
        </b-field>
        <b-field label="Legal form">
          <b-select placeholder="Select legal form">
            <option value="person">Person</option>
            <option value="entity">Entity</option>
          </b-select>
        </b-field>
        <b-field label="First name">
          <b-input v-model="member.firstname"></b-input>
        </b-field>
        <b-field label="Middle name">
          <b-input value></b-input>
        </b-field>
        <b-field label="Last name">
          <b-input v-model="member.lastname"></b-input>
        </b-field>
        <b-field label="Account#">
          <b-input v-model="member.AccountNo"></b-input>
        </b-field>
        <b-field label="External id">
          <b-input v-model="member.externalId"></b-input>
        </b-field>
        <b-field label="Mobile number">
          <b-input v-model="member.mobileNo"></b-input>
        </b-field>
        <b-field label="Date of birth">
          <b-datepicker
            :show-week-number="showWeekNumber"
            placeholder="Click to select..."
            icon="calendar-today"
            trap-focus
          ></b-datepicker>
        </b-field>
        <b-field label="Client type">
          <b-select placeholder="Select client type">
            <option value="em">EM</option>
            <option value="ma">MA</option>
            <option value="co">CO</option>
          </b-select>
        </b-field>
        <b-field label="Submitted on">
          <b-datepicker
            :show-week-number="showWeekNumber"
            placeholder="Click to select..."
            icon="calendar-today"
            trap-focus
          ></b-datepicker>
        </b-field>
        <b-field label="Staff">
          <b-select placeholder="Select staff">
            <!-- <option
              v-for="option in data"
              :value="option.id"
              :key="option.id"
            >{{ option.user.first_name }}</option>-->
            <option value></option>
          </b-select>
        </b-field>
        <b-field label="Is staff?">
          <div class="field">
            <b-checkbox></b-checkbox>
          </div>
        </b-field>
        <b-field label="Gender">
          <b-select placeholder="Select gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </b-select>
        </b-field>
        <b-field label="Client classification">
          <b-select placeholder="Select client classification">
            <!-- <option
              v-for="option in data"
              :value="option.id"
              :key="option.id"
            >{{ option.user.first_name }}</option>-->
            <option value></option>
          </b-select>
        </b-field>

        <nuxt-link to="/members" class="button is-default">Cancel</nuxt-link>
        <nuxt-link to="/members" class="button is-primary">Submit</nuxt-link>
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
      member: {}
    }
  },
  created() {},
  mounted() {
    try {
      this.$store
        .dispatch('getSpecificMembers', this.$route.params.id)
        .then(() => {
          this.member = this.$store.getters.memberDetails
          console.log(this.member)
        })
        .catch(err => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
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
