<template>
  <div id="app">
    <!-- Navigation bar -->
    <nav class="navbar navbar-dark">
      <div class="container">
        <ul class="nav navbar-nav flex-row">
          <li class="nav-item">
            <router-link class="nav-link home" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cantons/list">Cantons</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/people/list">People</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/courses/list">Courses</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/classes/list">Classes</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/teachings/list">Teachings</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/themes/list">Themes</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  li {
    margin: 0 0 0 10px;
  }
  .navbar {
    background-color: rgb(185, 106, 97);
  }
  form {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>