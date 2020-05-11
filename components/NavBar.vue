<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand"></div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <nuxt-link to="/" class="navbar-item">
            <span class="navbar-item-text">Home</span>
          </nuxt-link>

          <nuxt-link to="/members" class="navbar-item">
            <span class="navbar-item-text">Members</span>
          </nuxt-link>

          <nuxt-link to="/about" class="navbar-item">
            <span class="navbar-item-text">About</span>
          </nuxt-link>
        </div>

        <div class="navbar-end">
          <ul class="navbar-item">
            <li class="nuxt-link-top">
              <nuxt-link to="/home">
                <span class="navbar-item-text">Welcome, Username</span>
              </nuxt-link>
              <br />
              <nuxt-link to="/home">
                <span class="navbar-item-text">Settings</span>
              </nuxt-link>
            </li>
          </ul>
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
.navbar {
  box-shadow: 0px 0px 15px rgba(86, 88, 86, 0.5);
}

.navbar-start {
  padding-top: 60px;
  color: #2d3747;
}

.navbar-end {
  text-align: right;
  padding-bottom: 40px;
}

.nuxt-link-exact-active .navbar-item-text {
  font-weight: 600;
  border-bottom: 3px solid #33c05b;
  line-height: 25px;
  color: #2d3747;
}

.nuxt-link-top .navbar-item-text {
  border-bottom: 1px solid #33c05b;
  line-height: 25px;
  font-size: 14px;
  color: #33c05b;
}
</style>