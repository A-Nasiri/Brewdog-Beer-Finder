<template>
  <div class="home">
    <Search />
    <div class="container">
      <Products />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Search from "@/components/Search";
import Products from "@/components/Products";

export default {
  name: "home",
  components: {
    Search,
    Products
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style scoped>
.home {
  background-color: black;
}

.container {
  max-width: 1600px;
  margin: 0 auto;
  overflow: auto;
}
</style>
