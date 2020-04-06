<template>
  <!-- <header class="header">
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
  </header>-->

  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <nuxt-link to="/" class="navbar-item">Home</nuxt-link>

          <nuxt-link to="/member" class="navbar-item">Members</nuxt-link>

          <nuxt-link to="/about" class="navbar-item">About</nuxt-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light">Log in</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>
<style>
</style>