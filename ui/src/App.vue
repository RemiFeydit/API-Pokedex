<template>
  <div id="app">
    <div id="nav">
      <nav>
        <div class="nav-wrapper">
          <router-link class="brand-logo" to="/">Projet Api Pokedex</router-link>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link to="/about">About</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <router-view />
  </div>
</template>
