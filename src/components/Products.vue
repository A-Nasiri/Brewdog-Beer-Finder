<template>
  <div>
    <h3 class="feedback" v-if="searchFeedback">{{ searchFeedback }}</h3>
    <div class="pagination">
      <button :disabled="disabled" @click.prevent="prev()">
        <i class="material-icons">arrow_back</i>
      </button>
      <span class="page-number">{{ currentPage }}</span>
      <button @click.prevent="next()">
        <i class="material-icons">arrow_forward</i>
      </button>
    </div>
    <div class="products">
      <div class="product" v-for="product in products" :key="product.id">
        <h2 class="name">{{ product.name }}</h2>
        <div class="image">
          <img :src="product.image_url" />
        </div>
        <h3 class="tagline">{{ product.tagline }}</h3>
        <h3 class="first-brewed">{{ product.first_brewed }}</h3>
        <h3 class="abv">{{ product.abv }}%</h3>
        <p class="id">{{ product.id }}</p>
        <router-link class="btn" :to="`/beer/${product.id}`">
          <i class="material-icons">zoom_in</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";
import { setTimeout } from "timers";

export default {
  name: "Products",
  data() {
    return {
      products: [],
      currentPage: 1,
      searchVal: "",
      searchFeedback: null
    };
  },
  created() {
    this.getBeers();

    eventBus.$on("keyword", val => {
      this.searchVal = val;

      this.getBeersForSearch();
    });
  },
  computed: {
    apiUrl() {
      return `https://api.punkapi.com/v2/beers?page=${this.currentPage}&per_page=16`;
    },
    apiUrlForSearch() {
      return `https://api.punkapi.com/v2/beers?page=${this.currentPage}&per_page=12&beer_name=${this.searchVal}`;
    },
    disabled() {
      return this.currentPage <= 1;
    },
    isFirstPage() {
      return this.currentPage === 1;
    }
  },
  methods: {
    async getBeers() {
      try {
        const response = await axios.get(this.apiUrl);

        this.products = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getBeersForSearch() {
      try {
        this.currentPage = 1;

        const response = await axios.get(this.apiUrlForSearch);

        this.products = response.data;

        if (response.data.length <= 0) {
          this.searchFeedback = "Beer Not Found";
          setTimeout(() => {
            this.searchFeedback = null;
          }, 2000);
          this.currentPage = 1;
          this.getBeers();
        }

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    next() {
      this.currentPage += 1;
      this.getBeers();
    },
    prev() {
      this.currentPage -= 1;
      this.getBeers();
    },
    getSingleBeer(beer) {
      eventBus.$emit("beer", beer);
      this.$router.push({ name: "Beer" });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Mono:400,500&display=swap");

.products {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  font-family: "Roboto Mono", monospace;
  padding: 1rem;
  overflow: hidden;
}

.product {
  padding: 1rem;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background-color: #dcd9d4;
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(0, 0, 0, 0.5) 100%
    ),
    radial-gradient(
      at 50% 0%,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(0, 0, 0, 0.5) 50%
    );
  background-blend-mode: soft-light, screen;
  color: black;
  position: relative;
  border-radius: 10px;
}

.feedback {
  margin-top: 1rem;
  text-align: center;
  color: whitesmoke;
  font-family: "Roboto Mono", monospace;
}

.id {
  display: none;
}

.image {
  width: 20%;
}

.image img {
  max-width: 100%;
}

.pagination {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem 0;
}

.pagination i {
  font-size: 2rem;
}

.pagination button {
  border-radius: 20px 0 20px 0;
  padding: 0.7rem;
  outline: none;
  background: transparent;
  border: none;
  color: whitesmoke;
  cursor: pointer;
}

.page-number {
  font-size: 2rem;
  font-weight: bold;
  color: whitesmoke;
}

.btn {
  text-decoration: none;
  outline: none;
}

.btn i {
  font-size: 2.5rem;
  color: black;
}
</style>