<template>
  <li class="card" :class="{ 'cart-card': showCart, order: comp == 'orders' }">
    <img :src="urlFull" alt="url" />
    <h3 :class="{ 'cart-header': showCart }">{{ product.name }}</h3>
    <!-- <p>{{ quote }}</p> -->
    <template v-if="showCart">
      <h5>product id: {{ product.id }}</h5>
    </template>
    <template v-else>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum a aliquam
        ut reiciendis vitae temporibus expedita laborum provident quo blanditiis
        reprehenderit velit, officiis consequuntur saepe ipsa eius in voluptate
        nihil repellendus alias sapiente facere ea non voluptatibus! Incidunt,
        inventore rerum.
      </p>
      <br />
      <div class="line"></div>
      <div class="buy-block">
        <h4>{{ product.price }}$</h4>
        <button @click="addToCart(product)"><h2>+</h2></button>
      </div>
    </template>
  </li>
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {
      cart: false,
    };
  },
  computed: {
    urlFull() {
      return `${require(`@/assets/img/${this.product.img}.jpg`)}`;
    },
    showCart() {
      return this.$router.currentRoute.value.path == "/cart" ? true : false;
    },
    comp() {
      return this.$store.getters["cart/comp"];
    },
  },
  methods: {
    addToCart(item) {
      item.qty = 1;
      this.$store.dispatch("cart/add", item);
    },
  },
};
</script>

<style scoped>
.card {
  position: relative;
  text-align: center;
  font-size: 0.95rem;
  width: calc(100% / 4 - 1rem);
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 1rem;
  margin-top: 1rem;
  padding-bottom: 0.75rem;
  backface-visibility: hidden;
  box-shadow: 0 0 3px 1px #c5d0d180;
  transform-origin: 10% 50%;
  z-index: 1;
}
.cart-card {
  width: 100% !important;
  display: flex;
  margin: 0 !important;
  padding: 0 !important;
  box-shadow: none;
}
h5 {
  opacity: 0.75;
}
img {
  width: 100%;
}
h3,
h4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.cart-header {
  margin-top: 0.5rem;
  margin-bottom: 0.15rem;
}
h4 {
  color: var(--col-1);
}
.order h3 {
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
p {
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
  padding-left: 0.75rem;
  text-align: left;
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 20px;
  max-height: 60px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.buy-block {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  width: 85%;
}
ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  list-style: none;
}
.icon-i {
  padding: 0.25rem;
  width: 2rem;
  height: 2rem;
  line-height: 1.5;
  background: var(--col-4);
  border-radius: 50%;
  border: 1px var(--col-5) solid;
  cursor: pointer;
}
.deact {
  color: var(--col-3);
  background: var(--col-5);
  cursor: default;
}
button {
  cursor: pointer;
  border: none;
  background: var(--col-3);
  width: 2rem;
  height: 2rem;
  margin-left: 0.75rem;
  border-radius: 50%;
  color: var(--col-2);
  transition: all ease-out 0.3s;
}
button:hover {
  background: var(--col-2);
  width: 2.25rem;
  height: 2.25rem;
  color: var(--col-3);
}
.products-move {
  transition: all 600ms ease-in-out 50ms;
}
.products-enter-active {
  transition: all 300ms ease-out;
}

.products-leave-active {
  transition: all 200ms ease-in;
  position: absolute;
  z-index: 0;
}

.products-enter-from,
.products-leave-to {
  opacity: 0;
}
.products-enter-from {
  transform: scale(0.9);
}

@media (max-width: 1000px) {
  .card {
    font-size: 0.95rem;
    width: calc(100% / 3 - 1rem);
    margin-left: 1rem;
    margin-top: 1rem;
    padding-bottom: 0.75rem;
  }
}
@media (max-width: 800px) {
  .card {
    font-size: 0.95rem;
    width: calc(100% / 2 - 1rem);
    margin-left: 1rem;
    margin-top: 1rem;
    padding-bottom: 0.75rem;
  }
}
@media (max-width: 500px) {
  .card {
    font-size: 0.95rem;
    width: calc(100% / 1 - 1rem);
    margin-left: 1rem;
    margin-top: 1rem;
    padding-bottom: 0.75rem;
  }
}
</style>
