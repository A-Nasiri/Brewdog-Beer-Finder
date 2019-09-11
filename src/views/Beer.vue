<template>
  <div>
    <div v-if="loading" class="loader">
      <img src="@/assets/loader.svg" class="loader-icon" />
    </div>
    <div v-if="!loading" class="beer-container">
      <div class="description">
        <h3 data-aos="fade-right" data-aos-delay="500">{{ beer.description }}</h3>
      </div>
      <div class="img-name">
        <h1 class="beer-name" data-aos="fade-down" data-aos-delay="500">{{ beer.name }}</h1>
        <div data-aos="fade-left" data-aos-delay="500" class="imageUrl">
          <img :src="beer.image_url" alt />
        </div>
      </div>
      <div class="ingredients">
        <h1 data-aos="fade-down">Ingredients</h1>
        <div data-aos="fade-right" class="hops">
          <h3>Hops</h3>
          <ul>
            <li v-for="(hop, index) in removeDuplicateHop" :key="index">{{ hop }}</li>
          </ul>
        </div>
        <div data-aos="fade-left" class="malt">
          <h3>Malt</h3>
          <ul>
            <li v-for="(malt, index) in removeDuplicateMalt" :key="index">{{ malt }}</li>
          </ul>
        </div>
        <div data-aos="fade-right" data-aos-offset="30" class="yeast">
          <h3>Yeast</h3>
          <h4 class="yeast-value">{{ beer.ingredients.yeast }}</h4>
        </div>
      </div>
      <div class="brewer-tips">
        <h2 data-aos="fade-up">Brewer's Tips</h2>
        <h3 class="bt-value" data-aos="fade-down">{{ beer.brewers_tips }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Beer",
  data() {
    return {
      beer: {},
      loading: true
    };
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  created() {
    this.getBeer();
  },
  methods: {
    async getBeer() {
      try {
        const response = await axios.get(this.apiUrl);

        this.beer = response.data[0];
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    apiUrl() {
      return `https://api.punkapi.com/v2/beers/${this.id}`;
    },
    removeDuplicateHop() {
      if (!this.loading) {
        return [...new Set(this.beer.ingredients.hops.map(({ name }) => name))];
      }
    },
    removeDuplicateMalt() {
      if (!this.loading) {
        return [...new Set(this.beer.ingredients.malt.map(({ name }) => name))];
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Mono:400,500&display=swap");

.beer-container {
  max-width: 1600px;
  margin: 0 auto;
  overflow: hidden;
  font-family: "Roboto Mono", monospace;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 700px 700px;
  grid-template-areas:
    "des img"
    "tips ing";
}

.loader {
  width: 100px;
  height: 100px;
  margin: 0 auto;
}
.loader-icon {
  width: 100%;
  height: auto;
}

.description {
  grid-area: des;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  background-color: black;
  color: whitesmoke;
  padding: 2.5rem 1rem;
  line-height: 1.8;
}

.img-name {
  grid-area: img;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 1.5rem;
}

.imageUrl {
  width: 20%;
}

.img-name img {
  max-width: 100%;
}

.ingredients {
  grid-area: ing;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  padding: 2.5rem 0.5rem;
  background: black;
  color: whitesmoke;
}

.ingredients ul {
  color: whitesmoke;
}

.ingredients ul li {
  list-style-type: none;
  color: whitesmoke;
}

.hops {
  text-align: center;
}

.malt {
  text-align: center;
}

.yeast {
  text-align: center;
}

.brewer-tips {
  grid-area: tips;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: space-evenly;
  align-items: center;
  padding: 4rem 1rem;
}

@media only screen and (max-width: 800px) {
  .beer-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 700px);
    grid-template-areas:
      "img"
      "des"
      "tips"
      "ing";
  }
}

@media only screen and (max-width: 600px) {
  .imageUrl {
    width: 30%;
  }
}
</style>