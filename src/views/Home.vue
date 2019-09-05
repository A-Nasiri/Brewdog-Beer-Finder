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
  background: linear-gradient(to bottom, #323232 0%, #3f3f3f 40%, #1c1c1c 150%),
    linear-gradient(
      to top,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(0, 0, 0, 0.25) 200%
    );
  background-blend-mode: multiply;
}

.container {
  max-width: 1600px;
  margin: 0 auto;
  overflow: auto;
}
</style>
