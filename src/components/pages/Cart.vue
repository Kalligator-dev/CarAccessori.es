<template>
  <div id="cart-page">
    <transition name="fade-away" mode="out-in">
      <div class="cart-comp" v-if="comp != 'orders'">
        <transition :name="swipe" mode="out-in">
          <keep-alive>
            <component :is="comp"></component>
          </keep-alive>
        </transition>
        <side-bar v-if="comp != 'orders'"></side-bar>
      </div>
      <template v-else>
        <orders></orders>
      </template>
    </transition>
  </div>
</template>

<script>
import SideBar from "../cart/SideBar";
import Cart from "../cart/Cart";
import Personal from "../cart/Personal";
import Checkout from "../cart/Checkout";
import Orders from "../cart/Orders";
export default {
  components: {
    SideBar,
    Cart,
    Personal,
    Checkout,
    Orders,
  },
  data() {
    return {
      swipe: "swipe-left",
      list: ["cart", "personal", "checkout", "orders"],
    };
  },
  computed: {
    comp() {
      return this.$store.getters["cart/comp"];
    },
  },
  watch: {
    comp(n, o) {
      if (this.list.indexOf(n) - this.list.indexOf(o) >= 0) {
        this.swipe = "swipe-left";
      } else {
        this.swipe = "swipe-right";
      }
    },
  },
  mounted() {
    let cart = localStorage.getItem("cart");
    let orders = localStorage.getItem("orders");
    let card = localStorage.getItem("card");
    let address = localStorage.getItem("address");
    if (cart) {
      cart = JSON.parse(cart);
      this.$store.dispatch("cart/setCart", cart);
    }
    if (orders) {
      orders = JSON.parse(orders);
      this.$store.dispatch("cart/setOrders", orders);
    }
    if (card) {
      card = JSON.parse(card);
      this.$store.dispatch("cart/setCard", card);
    }
    if (address) {
      address = JSON.parse(address);
      this.$store.dispatch("cart/setAddress", address);
    }
  },
  unmounted() {
    this.$store.dispatch("cart/setTerms", false);
    this.$store.dispatch("cart/setComp", "cart");
  },
};
</script>

<style scoped>
#cart-page {
  height: 80vh;
  overflow: hidden;
}
.cart-comp {
  height: 100%;
  width: 100%;
}
.swipe-right-enter-active,
.swipe-left-enter-active,
.fade-away-enter-active {
  transition: all ease-in 0.4s;
}
.swipe-right-leave-active,
.swipe-left-leave-active,
.fade-away-leave-active {
  transition: all ease-out 0.4s;
}

.swipe-right-enter-from,
.swipe-right-leave-to,
.swipe-left-enter-from,
.swipe-left-leave-to,
.fade-away-enter-from,
.fade-away-leave-to {
  opacity: 0;
}

.swipe-right-enter-from {
  transform: translateX(-100%);
}
.swipe-right-leave-to {
  transform: translateX(100%);
}

.swipe-left-enter-from {
  transform: translateX(100%);
}
.swipe-left-leave-to {
  transform: translateX(-100%);
}

@media (max-width: 740px) {
  #cart-page {
    height: auto;
  }
}
</style>
