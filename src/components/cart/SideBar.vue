<template>
  <div class="side-bar">
    <transition name="fade-away" mode="out-in">
      <div class="container" :key="comp">
        <div class="card">
          <h4>
            {{
              comp != "checkout"
                ? `Sub-total: ${total.toFixed(2)}`
                : `Total: ${(total * 1.14 + qty * 15).toFixed(2)}`
            }}$
          </h4>
          <p v-if="comp != 'checkout'">
            Taxes and shipping will be calculated in checkout
          </p>
          <p v-else>Taxes and shipping are included</p>
        </div>
        <div class="card">
          <template v-if="comp == 'cart'">
            <input type="checkbox" name="terms" id="terms" v-model="terms" />
            <label for="terms">I agree to terms & conditions</label>
          </template>
          <template v-if="comp == 'checkout'">
            <h5>Expected days to deliver: <span>4 - 5 business days.</span></h5>
          </template>
          <template v-if="comp == 'personal'">
            <ul>
              <li :class="{ disabled: !card }">
                Card
              </li>
              <li :class="{ disabled: !address }">
                Address
              </li>
            </ul>
          </template>
        </div>
        <div class="card">
          <button @click="checkout" :class="{ deact }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 158 175">
              <path
                d="M142.74,36c-.41,0-.82,0-1.24,0H16.5C7.4,36,0,42.51,0,50.52v110c0,8,7.4,14.52,16.5,14.52h125c9.1,0,16.5-6.51,16.5-14.52v-110C158,42.88,151.26,36.6,142.74,36ZM148,160.48c0,3.15-2.92,5.72-6.5,5.72H16.5c-3.58,0-6.5-2.57-6.5-5.72v-110c0-3.15,2.92-5.72,6.5-5.72h125c3.58,0,6.5,2.57,6.5,5.72Z"
              />
              <path
                d="M83.82,117H74.18A6.92,6.92,0,0,1,67.27,110v-9.63a6.92,6.92,0,0,1,6.91-6.91h9.63a6.92,6.92,0,0,1,6.91,6.91V110A6.92,6.92,0,0,1,83.82,117ZM74.18,98.5a1.91,1.91,0,0,0-1.91,1.91V110A1.91,1.91,0,0,0,74.18,112h9.63A1.91,1.91,0,0,0,85.73,110v-9.63a1.91,1.91,0,0,0-1.91-1.91Z"
              />
              <rect
                x="76.32"
                y="105.05"
                width="5"
                height="18.45"
                rx="2.5"
                ry="2.5"
              />
              <path
                d="M109,0H49A32,32,0,0,0,17,32a31.13,31.13,0,0,0,.25,4,31.7,31.7,0,0,0,2.43,8.8H31.13A21.6,21.6,0,0,1,27.37,36,22,22,0,0,1,49,10h60a22,22,0,0,1,21.63,26,21.6,21.6,0,0,1-3.76,8.8h11.46A32,32,0,0,0,109,0Z"
              /></svg
            ><span>Checkout</span>
          </button>
        </div>
        <!-- <div class="card"></div> -->
        <!-- <div class="card"></div> -->
      </div>
    </transition>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 204.22 260.5"
      class="bg-svg"
    >
      <path
        d="M204.19,244.62,193.32,68.12a15,15,0,0,0-14.92-14H152.06C151.67,24.19,129.17,0,101.56,0S51.45,24.19,51.06,54.08H29.21A15,15,0,0,0,14.3,67.83L0,244.35A15,15,0,0,0,15,260.5h174.3A15,15,0,0,0,204.19,244.62ZM101.56,5C125.92,5,145.88,26,147.06,52.4h-91C57.24,26,77.2,5,101.56,5ZM53.92,96.55a7.94,7.94,0,1,1,8-7.93A7.92,7.92,0,0,1,53.92,96.55Zm96.07,0a7.93,7.93,0,1,1,7.93-7.93A7.93,7.93,0,0,1,150,96.55Z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      terms: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    comp() {
      return this.$store.getters["cart/comp"];
    },
    qty() {
      return this.$store.getters["cart/qty"];
    },
    total() {
      return this.$store.getters["cart/total"];
    },
    storeTerms() {
      return this.$store.getters["cart/terms"];
    },
    address() {
      return this.$store.getters["cart/address"];
    },
    card() {
      return this.$store.getters["cart/card"];
    },
    deact() {
      return !this.canCheckout();
    },
  },
  watch: {
    terms(n) {
      this.$store.dispatch("cart/setTerms", n);
    },
  },
  methods: {
    checkout() {
      if (this.canCheckout()) {
        if (this.comp == "cart")
          return this.$store.dispatch("cart/setComp", "personal");
        if (this.comp == "personal")
          return this.$store.dispatch("cart/setComp", "checkout");
        if (this.comp == "checkout") {
          this.$store.dispatch("cart/addOrders");
          return this.$store.dispatch("cart/setComp", "orders");
        }
      }
    },
    canCheckout() {
      if (this.comp == "cart") return this.qty && this.terms && this.loggedIn;
      if (this.comp == "personal") return this.card && this.address;
      return true;
    },
  },
  mounted() {
    this.terms = this.storeTerms;
  },
};
</script>

<style scoped>
.side-bar {
  float: right;
  background: var(--col-0-t);
  height: 100%;
  width: calc(35% - 2rem);
  z-index: 999;
  position: relative;
}
.container {
  width: 100%;
  height: 100%;
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  position: relative;
}
h4 {
  margin-bottom: 1rem;
}
p {
  font-size: 0.9rem;
}
h5 span {
  color: var(--col-1);
}
ul {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
li {
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  background: var(--col-7);
  color: var(--col-0);
  border-radius: 25px;
  cursor: default;
  transition: all 0.2s ease-in;
}
li.disabled {
  background: #e4e4e4;
  color: var(--col-1);
  opacity: 0.5;
  text-decoration: line-through;
}
button {
  border: none;
  padding: 0.5rem 2rem;
  background: var(--col-6);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 20px;
  cursor: pointer;
  transition: all ease-in-out 0.2s;
}
button svg {
  width: 1rem;
  fill: #fff;
  margin-right: 0.5rem;
  transition: all ease-in 0.2s;
}
button:hover {
  background: var(--col-5);
  color: var(--col-6);
}
button:hover svg {
  fill: var(--col-6);
}
.deact {
  background: #e4e4e4;
  color: #000;
  cursor: default;
}
.deact svg {
  fill: #000;
  cursor: default;
}
.deact:hover {
  background: #e4e4e4;
  color: #000;
  cursor: default;
}
.deact:hover svg {
  fill: #000;
  cursor: default;
}
.card {
  z-index: 1;
  margin-bottom: 3rem;
  width: 100%;
}
input {
  margin-right: 0.75rem;
}
.bg-svg {
  z-index: 0;
  position: absolute;
  bottom: -5%;
  right: -10%;
  width: 16vw;
  fill: #fff;
  transform: rotate(15deg);
}

.fade-away-enter-from,
.fade-away-leave-to {
  opacity: 0;
}

.fade-away-enter-active,
.fade-away-leave-active {
  transition: all 0.25s ease;
}

@media (max-width: 740px) {
  .side-bar {
    float: none;
    height: auto;
    width: 100%;
  }
}
</style>
