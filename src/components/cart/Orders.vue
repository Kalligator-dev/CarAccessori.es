<template>
  <div id="orders-page">
    <section>
      <ul class="orders">
        <li
          class="order card ord-card"
          :class="{ active: active(ind) }"
          v-for="(order, ind) in orders"
          :key="`order-${ind}`"
          @click="setCur(order, ind)"
        >
          <h3>Order#{{ ind + 1 }}</h3>
          <ul class="cells">
            <li class="cell cell-border">
              <h4>Status</h4>
              <h5>Pending</h5>
            </li>
            <li class="cell cell-border">
              <h4>Order Date</h4>
              <h5>{{ calcDate(order.date) }}</h5>
            </li>
            <li class="cell cell-border">
              <h4>Delivery Date</h4>
              <h5>{{ calcDate(order.date + 432000000) }}</h5>
            </li>
            <li class="cell">
              <h4>Order Amount</h4>
              <ul class="price">
                <h5>pre: ${{ calcTotal(order.order).toFixed(2) }}</h5>
                <h5>tax: ${{ (calcTotal(order.order) * 0.14).toFixed(2) }}</h5>
                <h5>shipping: ${{ calcDel(order.order) }}</h5>
              </ul>
              <div class="line"></div>
              <h5 class="price-total">
                ${{
                  (
                    calcTotal(order.order) * 1.14 +
                    calcDel(order.order)
                  ).toFixed(2)
                }}
              </h5>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <ul class="side-bar">
      <transition name="fade-away" mode="out-in">
        <h2 v-if="!cur">
          Select an order to display its details.
        </h2>
        <div class="container" :key="`ord-dets-${ind}`" v-else>
          <h3>Order Details</h3>
          <li class="card">
            <h4>Card Used</h4>
            <ul class="cells">
              <li>
                <h4>Card N.</h4>
                <h5>{{ cypher(cur.card.number) }}</h5>
              </li>
              <li>
                <h4>Name on card</h4>
                <h5>{{ cur.card.name }}</h5>
              </li>
            </ul>
          </li>
          <li class="card">
            <h4>Delivery Address</h4>
            <ul class="cells">
              <li>
                <h4>Address 1</h4>
                <h5>{{ cur.address.add1 }}</h5>
              </li>
              <li>
                <h4>Country</h4>
                <h5>{{ cur.address.country }}</h5>
              </li>
            </ul>
          </li>
          <li class="card prods">
            <ul class="prod-header">
              <h3>Item</h3>
              <h3>Qty</h3>
              <h3>Price</h3>
            </ul>
            <transition-group name="products" tag="ul" class="orders prod-list">
              <cart-item
                v-for="(product, index) in cur.order"
                :product="product"
                :ind="index"
                :key="`ord-prod-${index}`"
              ></cart-item>
            </transition-group>
          </li>
        </div>
      </transition>
    </ul>
  </div>
</template>

<script>
import CartItem from "./CartItem";

export default {
  components: {
    CartItem,
  },
  data() {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      cur: null,
      ind: null,
    };
  },
  computed: {
    orders() {
      return this.$store.getters["cart/orders"];
    },
  },
  methods: {
    setCur(order, ind) {
      this.cur = order;
      this.ind = ind;
    },
    active(ind) {
      return this.ind === ind;
    },
    calcTotal(order) {
      let res = 0;
      order.forEach((el) => {
        res += el.price * el.qty;
      });
      return res;
      // return res * 1.14 + order.length * 15;
    },
    calcDate(date) {
      let dateOb = new Date(date);
      let month = this.months[dateOb.getMonth()];
      let day = dateOb.getDate();
      let year = dateOb.getFullYear();
      return month + " " + day + ", " + year;
    },
    calcDel(order) {
      let qty = order.length;
      return qty * 15;
    },
    cypher(str) {
      let st = str;
      if (typeof str != "string") st = st.toString();
      return "**** **** **** " + st.substr(12);
    },
  },
};
</script>

<style scoped>
#orders-page {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
section {
  height: 100%;
  width: calc(60% - 1rem);
  margin: 0.5rem;
  padding-bottom: 1rem;
}
.side-bar {
  position: relative;
  height: 100%;
  width: 40%;
  padding: 1rem;
  background: var(--col-0);
}
.container {
  position: relative;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
}
.side-bar h3 {
  text-align: center;
}
ul {
  list-style: none;
  display: flex;
}
li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
}
.card {
  box-shadow: 0 0 3px 1px #c5d0d180;
  margin-bottom: 1rem;
}
.orders {
  height: 100%;
  padding: 1rem;
  flex-direction: column;
  overflow-y: auto;
}
.order {
  width: 100%;
}
.active {
  border: var(--col-9) 2px solid;
}
.prods {
  height: 50%;
}
.prod-list {
  width: 100%;
  padding: 0.25rem 1rem;
}
.product {
  width: 100%;
}
.cells {
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
}
.cell {
  width: 25%;
}
.cell:first-child {
  width: 17.5%;
}
.cell:last-child {
  width: 32.5%;
}
.cell-border {
  border-right: 1px #c5d0d180 solid;
}
.price {
  flex-direction: column;
}
.price h5 {
  text-align: left;
  width: 100%;
}
.price-total {
  font-weight: 600;
  width: 100%;
  text-align: right;
}
.line {
  width: 60%;
  height: 1px;
  background: #c5d0d180;
  margin: 0.5rem 0;
  align-self: flex-end;
}
.prod-header {
  width: 100%;
  justify-content: space-between;
  padding: 0 2rem 0 0.75rem;
  font-size: 0.8rem;
}
h2 {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
  text-align: center;
}
h3 {
  color: var(--col-6);
  opacity: 0.4;
  margin-bottom: 1rem;
  text-align: left;
  width: 100%;
}
h4 {
  margin-bottom: 0.5rem;
}
h5 {
  /* font-size: 0.8rem; */
  font-weight: 400;
}
h3,
h4,
h5 {
  /* line-height: 15px;
  max-height: 15px; */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
::-webkit-scrollbar {
  width: 3px;
}
::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
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
  #orders-page {
    height: auto;
    width: 100%;
    flex-direction: column;
  }
  section {
    height: 60vh;
    width: 100%;
    margin: 0.5rem;
    padding-bottom: 1rem;
    padding-right: 1rem;
  }
  .side-bar {
    height: auto;
    width: 100%;
  }
  .orders {
    height: 40vh;
  }
}
</style>
