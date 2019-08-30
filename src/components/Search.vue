<template>
  <div class="search">
    <div class="logo">
      <img src="../assets/brewdog.png" alt />
    </div>
    <div class="search-bar">
      <h1>Find Your Craft</h1>
      <form @submit.prevent="sendVal" class="search-form">
        <input type="text" placeholder="Beer Name..." v-model="searchVal" />
        <button type="submit" class="search-button">
          <i class="material-icons">search</i>
        </button>
      </form>
    </div>
    <div class="search-inner"></div>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "Search",
  data() {
    return {
      searchVal: ""
    };
  },
  computed: {
    apiUrl() {
      return `https://api.punkapi.com/v2/beers?page=${this.currentPage}&per_page=16`;
    }
  },
  methods: {
    sendVal() {
      eventBus.$emit("keyword", this.searchVal);
      this.searchVal = "";
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto+Mono:400,500&display=swap");

.search-inner {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.search {
  content: "";
  height: 450px;
  background: url("~@/assets/520.jpg") no-repeat center/cover fixed;
  width: 100%;
  position: relative;
}

.logo {
  position: absolute;
  top: 10px;
  left: 0;
  width: 200px;
  z-index: 3;
  cursor: pointer;
}

.logo img {
  width: 100%;
  height: auto;
  display: block;
}

.search-bar {
  z-index: 5;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  max-width: 750px;
  text-align: center;
}

.search-form {
  display: flex;
  width: 100%;
}

.search-bar h1 {
  color: whitesmoke;
  margin-bottom: 1.5rem;
  font-size: 3.5rem;
  font-family: "Roboto Mono", monospace;
}

input[type="text"] {
  width: 100%;
  border-right: none;
  padding: 15px;
  height: 20px;
  border: 3px solid whitesmoke;
  background: transparent;
  border-radius: 10px 0 0 10px;
  outline: none;
  color: whitesmoke;
  font-size: 1.4rem;
}

.search-button {
  width: 40px;
  height: 36px;
  background: transparent;
  text-align: center;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  font-size: 20px;
  outline: none;
  border-left: none;
}

.search-button i {
  font-size: 2rem;
  color: whitesmoke;
}

@media only screen and (max-width: 600px) {
  .logo {
    width: 150px;
  }

  .search-bar h1 {
    font-size: 2.5rem;
  }

  .search-bar {
    width: 80%;
  }
}
</style>