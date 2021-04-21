<template>
  <transition-group name="products" tag="ul" class="product-list">
    <base-card
      v-for="product in products"
      :product="product"
      :key="product.id"
    ></base-card>
  </transition-group>
</template>

<script>
export default {
  computed: {
    productList() {
      return this.$store.getters["shop/products"];
    },
    keyword() {
      return this.$store.getters["shop/keyword"];
    },
    filters() {
      return this.$store.getters["shop/filters"];
    },
    activeFilters() {
      return this.$store.getters["shop/activeFilters"];
    },
    products() {
      if (!this.activeFilters.ids && !this.keyword) return this.productList;
      const filteredProducts = this.productList.filter((product) => {
        if (this.keyword) {
          if (product.name.toLowerCase().includes(this.keyword)) return true;
          if (product.description.toLowerCase().includes(this.keyword))
            return true;
        }
        let found = 0;
        if (this.activeFilters.ids) {
          this.activeFilters.ids.forEach((id) => {
            if (product.keywords[id]) {
              return found++;
            }
          });
        }
        if (found) return true;
        return false;
      });
      return filteredProducts;
    },
  },
};
</script>

<style scoped>
ul {
  position: relative;
  margin-top: 1rem;
  padding-right: 3rem;
  padding-left: 2rem;
  padding-bottom: 5rem;
  backface-visibility: hidden;
}
</style>
