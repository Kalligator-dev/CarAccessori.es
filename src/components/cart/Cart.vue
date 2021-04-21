<template>
  <section>
    <transition name="fade-away" mode="out-in">
      <template v-if="qty">
        <div id="cart-prods-list">
          <ul id="cart-list-header">
            <li><h4>Product</h4></li>
            <li><h4>Price</h4></li>
            <li><h4>Qty</h4></li>
            <li><h4>Total</h4></li>
          </ul>
          <transition-group
            name="products-anim"
            tag="ul"
            class="cart-product-list"
          >
            <cart-item
              v-for="(product, index) in products"
              :product="product"
              :ind="index"
              :key="product.id"
            ></cart-item>
          </transition-group>
        </div>
      </template>
      <template v-else>
        <h5>No items found in your cart.</h5>
      </template>
    </transition>
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
#cart-prods-list {
  height: 100%;
  width: 100%;
  position: relative;
}
#cart-list-header {
  display: flex;
  width: 88%;
  padding-left: 1rem;
  margin-bottom: 1rem;
}
#cart-list-header li {
  display: inline-flex;
  justify-content: center;
  width: calc(25% - 1rem);
  margin-right: 1rem;
}
#cart-list-header li h4 {
  color: var(--col-6);
  opacity: 0.4;
  margin-bottom: 1rem;
}
h5 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
ul {
  list-style: none;
}
.cart-product-list {
  height: calc(100% - 5rem);
  overflow-y: auto;
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

.cart-product-list li {
  transition: all 0.8s ease;
}

.products-anim-enter-from,
.products-anim-leave-to {
  opacity: 0;
  transform: translateY(10%);
}

.products-anim-leave-active {
  position: absolute;
}

/*  */
.fade-away-enter-from,
.fade-away-leave-to {
  opacity: 0;
  transform: translateY(10%);
}

.fade-away-enter-active,
.fade-away-leave-active {
  transition: all 0.5s ease;
}

@media (max-width: 740px) {
  section {
    width: 100%;
    height: 60vh;
  }
  .cart-product-list {
    height: calc(100% - 5rem);
    margin-right: 1rem;
    overflow-y: auto;
  }
}
</style>
