<template>
  <section>
    <div id="co-cart">
      <ul id="co-list-header">
        <li><h4>Product</h4></li>
        <li><h4>Qty</h4></li>
        <li><h4>Total</h4></li>
      </ul>
      <transition-group name="products" tag="ul" class="cart-product-list">
        <cart-item
          v-for="(product, index) in products"
          :product="product"
          :ind="index"
          :key="product.id"
        ></cart-item>
      </transition-group>
    </div>
    <div id="co-details">
      <div class="line"></div>
      <h5>Sub-total(before shipping & taxes): {{ total.toFixed(2) }}$</h5>
      <h5>Taxes: {{ (total * 0.14).toFixed(2) }}$</h5>
      <h5>Shipping: {{ (qty * 15).toFixed(2) }}$</h5>
    </div>
  </section>
</template>

<script>
import CartItem from "./CartItem";
export default {
  components: {
    CartItem,
  },
  computed: {
    products() {
      return this.$store.getters["cart/cart"];
    },
    qty() {
      return this.$store.getters["cart/qty"];
    },
    total() {
      return this.$store.getters["cart/total"];
    },
  },
};
</script>

<style scoped>
section {
  display: inline-block;
  margin: 1rem;
  padding: 1rem;
  position: relative;
  width: 65%;
  height: 100%;
}
#co-cart {
  height: calc(75% - 1.5rem);
  margin-bottom: 1rem;
}
.cart-product-list {
  overflow-y: auto;
  height: calc(100% - 3rem);
}
.cart-product-list::-webkit-scrollbar {
  width: 5px;
}
.cart-product-list::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  border-radius: 10px;
}
.cart-product-list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
}
#co-details {
  height: calc(25% - 1.5rem);
  background: var(--col-0);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#co-details h5 {
  margin-bottom: 0.5rem;
}
.line {
  width: 50%;
  height: 2px;
  background: var(--col-6);
  margin-bottom: 2rem;
}
#co-list-header {
  display: flex;
  width: 100%;
  padding-left: 1rem;
  margin-bottom: 1rem;
}
#co-list-header li {
  display: inline-flex;
  justify-content: center;
  margin-right: 1rem;
  width: calc(44% - 1rem);
}
#co-list-header li:first-child {
  width: calc(22% - 1rem);
}
#co-list-header li h4 {
  color: var(--col-6);
  opacity: 0.4;
}
h4 {
  margin-bottom: 1rem;
}

@media (max-width: 740px) {
  section {
    width: 100%;
    height: 60vh;
    padding-right: 2rem;
  }
  #co-cart {
    height: calc(60% - 1.5rem);
    margin-bottom: 1.5rem;
  }
  #co-details {
    height: 40%;
  }
}
</style>
