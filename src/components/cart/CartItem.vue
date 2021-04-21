<template>
  <li class="cart-item" :class="{ 'order-item': comp == 'orders' }">
    <div class="card">
      <base-card :product="product" :key="product.id"></base-card>
    </div>
    <div class="card" v-if="comp == 'cart'">
      <h4 class="card-top">{{ product.price + "$" }}</h4>
    </div>
    <div class="card" :class="{ 'co-card': comp != 'cart' }">
      <div class="qty-block card-top">
        <button
          @click="decrement"
          :class="{ deact: product.qty <= 1 }"
          v-if="comp == 'cart'"
        >
          -
        </button>
        <h4>{{ product.qty }}</h4>
        <button
          @click="increment"
          :class="{ deact: product.qty >= 5 }"
          v-if="comp == 'cart'"
        >
          +
        </button>
      </div>
    </div>
    <div class="card" :class="{ 'co-card': comp != 'cart' }">
      <h4 class="card-top">
        {{ (product.price * product.qty).toFixed(2) + "$" }}
      </h4>
    </div>
    <div class="card-tail" v-if="comp == 'cart'">
      <button class="card-top" @click="deleteItem">x</button>
    </div>
  </li>
</template>

<script>
export default {
  props: ["product", "ind"],
  computed: {
    comp() {
      return this.$store.getters["cart/comp"];
    },
  },
  methods: {
    increment() {
      if (this.product.qty > 4) return;
      this.$store.dispatch("cart/increment", this.ind);
    },
    decrement() {
      if (this.product.qty < 2) return;
      this.$store.dispatch("cart/decrement", this.ind);
    },
    deleteItem() {
      this.$store.dispatch("cart/del", this.ind);
    },
  },
};
</script>

<style scoped>
li {
  width: 100%;
  padding-left: 1rem;
  margin-bottom: 1.25rem;
  display: flex;
  /* box-shadow: 0 0 2px 1px #c5d0d180; */
}
.order-item {
  position: relative;
  padding: 0;
  margin-bottom: 0.5rem;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0 0 3px 0.5px #c5d0d180;
}
.order-item .card {
  width: calc(100% / 3) !important;
  padding: 0.25rem 0;
  height: 100%;
}
.order-item h4 {
  font-size: 0.8rem;
}
.card {
  width: calc(22% - 1rem);
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
}
.co-card {
  width: calc(44% - 1rem);
}
.co-card .qty-block {
  justify-content: center;
}
.card-tail {
  width: calc(12% - 1rem);
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
}
.card-top {
  position: absolute;
  top: 25%;
}
.qty-block {
  width: 100%;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  border: none;
  background: none;
  font-size: 1.2rem;
  color: var(--col-3);
  line-height: 1rem;
  transition: all ease-in 0.2s;
}
button.deact {
  opacity: 0.2;
  color: var(--col-6);
}
button:hover {
  cursor: pointer;
  color: var(--col-2);
}
button.deact:hover {
  cursor: default;
}

@media (max-width: 510px) {
  h4 {
    font-size: 0.9rem;
  }
  .qty-block {
    width: 100%;
    padding: 0 0.25rem;
  }
}
</style>
