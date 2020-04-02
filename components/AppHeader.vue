<template>
  <header class="header">
    <h1 class="title">Member Page</h1>
    <ul>
      <li>
        <b-button tag="nuxt-link" to="/" type="is-primary">Home</b-button>
      </li>
      <li>
        <b-button tag="nuxt-link" to="/jokes" type="is-primary">Member</b-button>
      </li>
      <li>
        <b-button tag="nuxt-link" to="/about" type="is-primary">About</b-button>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>
<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px dotted #ccc;
}

.header .title {
  font-size: 3rem;
  color: #526488;
}

.header ul {
  display: flex;
}

.header a {
  display: inline-block;
  background: #333;
  color: #fff;
  padding: 0.3rem 1rem;
  margin-right: 0.5rem;
}
</style>
