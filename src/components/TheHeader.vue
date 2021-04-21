<template>
  <header>
    <section class="top-section">
      <div class="nav-bar nav-lt">
        <base-icon title="search" @click="search">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 251.66 252.52">
            <path
              d="M132.14,22.67a77.4,77.4,0,1,0-4.88,113.94,6,6,0,0,0,1.46,2.37,6,6,0,0,0,3.05,1.65,18.11,18.11,0,0,0,3,20.54l80.42,85.63a18.09,18.09,0,0,0,26,.41l5.23-5.23a18.09,18.09,0,0,0-.41-26l-85.63-80.42a18.12,18.12,0,0,0-21.48-2.45,6,6,0,0,0-1.57-2.71,6.14,6.14,0,0,0-2.19-1.4A77.4,77.4,0,0,0,132.14,22.67ZM125.3,125.3a67.73,67.73,0,1,1,0-95.78A67.8,67.8,0,0,1,125.3,125.3Z"
            />
          </svg>
        </base-icon>
        <base-icon title="shop" @click="goTo('/')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 204 260">
            <path
              d="M157.76,0H46.24A46.24,46.24,0,0,0,0,46.24V213.76A46.24,46.24,0,0,0,46.24,260H157.76A46.24,46.24,0,0,0,204,213.76V46.24A46.24,46.24,0,0,0,157.76,0Zm-2,212.6q-18.68,17.27-53.65,17.25a276.82,276.82,0,0,1-68.52-8.54L38,167.82q42.41,10.77,57.29,10.76,9.81,0,9.81-7a6.18,6.18,0,0,0-2.37-5.07,38.64,38.64,0,0,0-7-4.11q-4.59-2.22-13.45-5.86t-14.87-6.33a91.92,91.92,0,0,1-14.25-8.38q-25.32-17.4-25.31-48.74t19-48.74Q65.89,27,99.6,27a398.35,398.35,0,0,1,69.47,6.33L161.79,89q-39.57-7.91-51.9-7.91T97.54,88.7a4.19,4.19,0,0,0,1.9,3.95q1.91,1.11,2.85,1.74A18,18,0,0,0,105.93,96q2.68,1,4.43,1.75c1.16.52,5,2.11,11.4,4.74s11.28,4.75,14.55,6.33a151.66,151.66,0,0,1,13.46,7.76q24.67,16.14,24.68,47.47T155.78,212.6Z"
            />
          </svg>
        </base-icon>
      </div>
      <div id="nav-center">
        <transition name="fade" mode="out-in">
          <template v-if="showShop">
            <nav>
              <template v-for="item in navList" :key="item + '-a-item'">
                <a
                  @click="setFilter(item)"
                  :class="{ active: checkFilter(item) }"
                  >{{ item }}</a
                >
                <span>|</span>
              </template>
            </nav>
          </template>
          <template v-else-if="showCart">
            <nav>
              <template v-for="item in navList" :key="item + '-a-item'">
                <a
                  @click="setComp(item)"
                  :class="{ active: checkCart(item), deact: !canAccess(item) }"
                  >{{ item === "personal" ? "personal info." : item }}</a
                >
                <span>|</span>
              </template>
            </nav>
          </template>
          <template v-else>
            <nav>
              <p>404 | Url not found...</p>
            </nav>
          </template>
        </transition>
        <h1>Car Accessories</h1>
      </div>
      <div class="nav-bar nav-rt">
        <base-icon title="cart" @click="goTo('/cart')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 204.22 260.5">
            <path
              d="M204.19,244.62,193.32,68.12a15,15,0,0,0-14.92-14H152.06C151.67,24.19,129.17,0,101.56,0S51.45,24.19,51.06,54.08H29.21A15,15,0,0,0,14.3,67.83L0,244.35A15,15,0,0,0,15,260.5h174.3A15,15,0,0,0,204.19,244.62ZM101.56,5C125.92,5,145.88,26,147.06,52.4h-91C57.24,26,77.2,5,101.56,5ZM53.92,96.55a7.94,7.94,0,1,1,8-7.93A7.92,7.92,0,0,1,53.92,96.55Zm96.07,0a7.93,7.93,0,1,1,7.93-7.93A7.93,7.93,0,0,1,150,96.55Z"
            />
          </svg>
        </base-icon>
        <transition name="auth" mode="out-in">
          <base-icon :title="authTxt" @click="auth" :key="authTxt">
            <template v-if="authTxt == 'login'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 246 260">
                <path
                  d="M240,260H89c-3.31,0-6-2.34-6-5.22V224c0-2.88,2.68-5.22,6-5.22h0c3.31,0,6,2.34,6,5.22v20.34c0,2.88,2.68,5.22,6,5.22H228c3.31,0,6-2.34,6-5.22V15.65c0-2.88-2.68-5.22-6-5.22H101c-3.31,0-6,2.34-6,5.22V37c0,2.88-2.68,5.22-6,5.22h0c-3.31,0-6-2.34-6-5.22V5.22C83.06,2.34,85.74,0,89,0H240c3.31,0,6,2.34,6,5.22V254.78C246,257.66,243.32,260,240,260Z"
                />
                <path
                  d="M157.17,128.89l-46.58,62.47V139.14H10.1c-5.95,0-10.1-5.62-10.1-13.66s4.15-13.65,10.1-13.65H110.59V59.61l46.58,62.47A6,6,0,0,1,157.17,128.89Z"
                />
              </svg>
            </template>
            <template v-else>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 246 260">
                <path
                  d="M240,260H89c-3.31,0-6-2.34-6-5.22V224c0-2.88,2.68-5.22,6-5.22h0c3.31,0,6,2.34,6,5.22v20.34c0,2.88,2.68,5.22,6,5.22H228c3.31,0,6-2.34,6-5.22V15.65c0-2.88-2.68-5.22-6-5.22H101c-3.31,0-6,2.34-6,5.22V37c0,2.88-2.68,5.22-6,5.22h0c-3.31,0-6-2.34-6-5.22V5.22C83.06,2.34,85.74,0,89,0H240c3.31,0,6,2.34,6,5.22V254.78C246,257.66,243.32,260,240,260Z"
                />
                <path
                  d="M1.05,122.08,47.63,59.61v52.22H148.12c5.95,0,10.1,5.62,10.1,13.66s-4.15,13.65-10.1,13.65H47.63v52.22L1.05,128.89A6,6,0,0,1,1.05,122.08Z"
                />
              </svg>
            </template>
          </base-icon>
          <!-- <base-icon title="profile" @click="auth" v-else>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 134 260">
              <circle cx="67" cy="34" r="34" />
              <path
                d="M134,97.33v63.34A17.33,17.33,0,0,1,116.67,178H105v72a10,10,0,0,1-10,10H39a10,10,0,0,1-10-10V178H17.33A17.33,17.33,0,0,1,0,160.67V97.33A29.33,29.33,0,0,1,29.33,68h0A25.69,25.69,0,0,1,43,72.08a45,45,0,0,0,48,0A25.69,25.69,0,0,1,104.67,68h0A29.33,29.33,0,0,1,134,97.33Z"
              />
            </svg>
          </base-icon> -->
        </transition>
      </div>
      <div class="nav-mobile">
        <div class="left-icons icons-mob">
          <base-icon title="search" @click="search">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 251.66 252.52">
              <path
                d="M132.14,22.67a77.4,77.4,0,1,0-4.88,113.94,6,6,0,0,0,1.46,2.37,6,6,0,0,0,3.05,1.65,18.11,18.11,0,0,0,3,20.54l80.42,85.63a18.09,18.09,0,0,0,26,.41l5.23-5.23a18.09,18.09,0,0,0-.41-26l-85.63-80.42a18.12,18.12,0,0,0-21.48-2.45,6,6,0,0,0-1.57-2.71,6.14,6.14,0,0,0-2.19-1.4A77.4,77.4,0,0,0,132.14,22.67ZM125.3,125.3a67.73,67.73,0,1,1,0-95.78A67.8,67.8,0,0,1,125.3,125.3Z"
              />
            </svg>
          </base-icon>
          <base-icon title="shop" @click="goTo('/')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 204 260">
              <path
                d="M157.76,0H46.24A46.24,46.24,0,0,0,0,46.24V213.76A46.24,46.24,0,0,0,46.24,260H157.76A46.24,46.24,0,0,0,204,213.76V46.24A46.24,46.24,0,0,0,157.76,0Zm-2,212.6q-18.68,17.27-53.65,17.25a276.82,276.82,0,0,1-68.52-8.54L38,167.82q42.41,10.77,57.29,10.76,9.81,0,9.81-7a6.18,6.18,0,0,0-2.37-5.07,38.64,38.64,0,0,0-7-4.11q-4.59-2.22-13.45-5.86t-14.87-6.33a91.92,91.92,0,0,1-14.25-8.38q-25.32-17.4-25.31-48.74t19-48.74Q65.89,27,99.6,27a398.35,398.35,0,0,1,69.47,6.33L161.79,89q-39.57-7.91-51.9-7.91T97.54,88.7a4.19,4.19,0,0,0,1.9,3.95q1.91,1.11,2.85,1.74A18,18,0,0,0,105.93,96q2.68,1,4.43,1.75c1.16.52,5,2.11,11.4,4.74s11.28,4.75,14.55,6.33a151.66,151.66,0,0,1,13.46,7.76q24.67,16.14,24.68,47.47T155.78,212.6Z"
              />
            </svg>
          </base-icon>
        </div>
        <div class="right-icons icons-mob">
          <base-icon title="cart" @click="goTo('/cart')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 204.22 260.5">
              <path
                d="M204.19,244.62,193.32,68.12a15,15,0,0,0-14.92-14H152.06C151.67,24.19,129.17,0,101.56,0S51.45,24.19,51.06,54.08H29.21A15,15,0,0,0,14.3,67.83L0,244.35A15,15,0,0,0,15,260.5h174.3A15,15,0,0,0,204.19,244.62ZM101.56,5C125.92,5,145.88,26,147.06,52.4h-91C57.24,26,77.2,5,101.56,5ZM53.92,96.55a7.94,7.94,0,1,1,8-7.93A7.92,7.92,0,0,1,53.92,96.55Zm96.07,0a7.93,7.93,0,1,1,7.93-7.93A7.93,7.93,0,0,1,150,96.55Z"
              />
            </svg>
          </base-icon>
          <transition name="auth" mode="out-in">
            <base-icon :title="authTxt" @click="auth" :key="authTxt">
              <template v-if="authTxt == 'login'">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 246 260">
                  <path
                    d="M240,260H89c-3.31,0-6-2.34-6-5.22V224c0-2.88,2.68-5.22,6-5.22h0c3.31,0,6,2.34,6,5.22v20.34c0,2.88,2.68,5.22,6,5.22H228c3.31,0,6-2.34,6-5.22V15.65c0-2.88-2.68-5.22-6-5.22H101c-3.31,0-6,2.34-6,5.22V37c0,2.88-2.68,5.22-6,5.22h0c-3.31,0-6-2.34-6-5.22V5.22C83.06,2.34,85.74,0,89,0H240c3.31,0,6,2.34,6,5.22V254.78C246,257.66,243.32,260,240,260Z"
                  />
                  <path
                    d="M157.17,128.89l-46.58,62.47V139.14H10.1c-5.95,0-10.1-5.62-10.1-13.66s4.15-13.65,10.1-13.65H110.59V59.61l46.58,62.47A6,6,0,0,1,157.17,128.89Z"
                  />
                </svg>
              </template>
              <template v-else>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 246 260">
                  <path
                    d="M240,260H89c-3.31,0-6-2.34-6-5.22V224c0-2.88,2.68-5.22,6-5.22h0c3.31,0,6,2.34,6,5.22v20.34c0,2.88,2.68,5.22,6,5.22H228c3.31,0,6-2.34,6-5.22V15.65c0-2.88-2.68-5.22-6-5.22H101c-3.31,0-6,2.34-6,5.22V37c0,2.88-2.68,5.22-6,5.22h0c-3.31,0-6-2.34-6-5.22V5.22C83.06,2.34,85.74,0,89,0H240c3.31,0,6,2.34,6,5.22V254.78C246,257.66,243.32,260,240,260Z"
                  />
                  <path
                    d="M1.05,122.08,47.63,59.61v52.22H148.12c5.95,0,10.1,5.62,10.1,13.66s-4.15,13.65-10.1,13.65H47.63v52.22L1.05,128.89A6,6,0,0,1,1.05,122.08Z"
                  />
                </svg>
              </template>
            </base-icon>
            <!-- <base-icon title="profile" @click="auth" v-else>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 134 260">
              <circle cx="67" cy="34" r="34" />
              <path
                d="M134,97.33v63.34A17.33,17.33,0,0,1,116.67,178H105v72a10,10,0,0,1-10,10H39a10,10,0,0,1-10-10V178H17.33A17.33,17.33,0,0,1,0,160.67V97.33A29.33,29.33,0,0,1,29.33,68h0A25.69,25.69,0,0,1,43,72.08a45,45,0,0,0,48,0A25.69,25.69,0,0,1,104.67,68h0A29.33,29.33,0,0,1,134,97.33Z"
              />
            </svg>
          </base-icon> -->
          </transition>
        </div>
      </div>
      <div class="line" id="line1" :class="{ 'active-line': showFilter }"></div>
      <div class="line" id="line2" :class="{ 'active-line': showFilter }"></div>
    </section>
    <transition-group
      name="dropdown"
      tag="section"
      class="dropdown"
      :style="dropdown"
    >
      <menu
        v-for="(options, filter) in filters"
        :key="filter"
        v-show="filter == showFilter"
        :id="filter"
      >
        <li
          v-for="(active, option) in options"
          :class="{ active: active }"
          :key="option"
          @click="setFilter(filter, option)"
        >
          {{ option }}
        </li>
      </menu>
    </transition-group>
  </header>
</template>

<script>
export default {
  data() {
    return {
      dropdown: { height: 0 },
    };
  },
  computed: {
    navList() {
      if (this.showShop) return ["cars", "motorbikes", "bikes", "misc"];
      return ["cart", "personal", "checkout", "orders"];
    },
    filters() {
      return this.$store.getters["shop/filters"];
    },
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    authTxt() {
      return this.loggedIn ? "logout" : "login";
    },
    showFilter() {
      return this.$store.getters["shop/showFilter"];
    },
    qty() {
      return this.$store.getters["cart/qty"];
    },
    cartComp() {
      return this.$store.getters["cart/comp"];
    },
    terms() {
      return this.$store.getters["cart/terms"];
    },
    address() {
      return this.$store.getters["cart/address"];
    },
    card() {
      return this.$store.getters["cart/card"];
    },
    orders() {
      return this.$store.getters["cart/ordersLength"];
    },
    showShop() {
      return this.$router.currentRoute.value.path == "/" ? true : false;
    },
    showCart() {
      return this.$router.currentRoute.value.path == "/cart" ? true : false;
    },
  },
  watch: {
    showFilter(index, from) {
      if (index === from) return;

      this.$nextTick(() => {
        if (!this.showFilter) {
          this.dropdown.height = 0;
        } else {
          const list = document.querySelector(`#${this.showFilter}`);
          this.dropdown.height = `${list.clientHeight + 16}px`;
        }
      });
    },
  },
  methods: {
    setFilter(category, branch = null) {
      if (!branch) {
        if (this.showFilter == category) {
          this.$store.dispatch("shop/setShowFilter", null);
        } else {
          this.$store.dispatch("shop/setShowFilter", category);
        }
      } else {
        this.filters[category][branch] = !this.filters[category][branch];
      }
    },
    checkFilter(fil) {
      return fil === this.showFilter;
    },
    search() {
      if (this.$router.currentRoute.value.path != "/") {
        this.$router.push("/");
      } else {
        this.$store.dispatch("shop/searching");
      }
    },
    auth() {
      this.$store.dispatch("auth");
    },
    goTo(path) {
      this.$store.dispatch("shop/setShowFilter", null);
      this.$router.replace(path);
    },
    setComp(comp) {
      if (this.canAccess(comp)) this.$store.dispatch("cart/setComp", comp);
    },
    checkCart(val) {
      return this.cartComp === val ? true : false;
    },
    canAccess(comp) {
      if (comp === "personal") {
        return this.qty && this.terms && this.loggedIn;
      }
      if (comp === "checkout") {
        return this.canAccess("personal") && this.address && this.card;
      }
      if (comp === "orders") {
        return this.orders;
      }
      return true;
    },
  },
};
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  background: var(--col-0);
  z-index: 1000;
  text-align: center;
  box-shadow: 0 0 3px 1px #c5d0d180;
}
.top-section {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 1.25rem 1rem;
}
nav {
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}
span:nth-child(8) {
  display: none;
}

h1 {
  font-family: "Passion One", cursive;
  font-size: 3rem;
}

.nav-bar {
  display: flex;
  align-items: center;
  transform: translateY(25%);
  min-width: 20%;
}
.nav-lt {
  justify-content: flex-start;
}
.nav-rt {
  justify-content: flex-end;
}
.nav-mobile {
  display: none;
}

a {
  position: relative;
  text-decoration: none;
  color: #2c3e50;
  margin: 0.25rem 1rem;
  transition: all 0.15s ease-in;
  letter-spacing: 1.5px;
  cursor: pointer;
}
a::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0.25rem);
  width: 10%;
  border-bottom: chocolate 1px solid;
  opacity: 0.1;
}
a:hover {
  color: lightsalmon;
}
a:hover::after {
  animation: line 0.4s ease-in 0.1s forwards;
}
a.active {
  color: var(--col-1);
}
a.active::after {
  animation: line 0.4s ease-in 0.1s forwards;
}
a.deact {
  opacity: 0.5;
}
a.deact::after {
  opacity: 0.05;
}
a.deact:hover {
  color: #2c3e50;
}
a.deact:hover::after {
  animation: none;
}

@keyframes line {
  0% {
    width: 10%;
    opacity: 0.1;
  }
  50% {
    width: 100%;
    opacity: 0.75;
  }
  100% {
    width: 50%;
    opacity: 0.5;
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease-in-out;
}

svg {
  width: 1.75rem;
  height: 1.75rem;
}
circle,
path {
  fill: #2c3e50;
  transition: all 0.15s ease-in;
}
.app-icon:hover circle,
.app-icon:hover path {
  fill: lightsalmon;
  animation: icon 0.4s ease-out 0.05s forwards;
}
@keyframes icon {
  50% {
    transform: rotateY(45deg);
  }
  100% {
    transform: rotateY(15deg);
  }
}
.line {
  width: 6rem;
  height: 3px;
  background: lightsalmon;
  opacity: 0.25;
  position: absolute;
  top: 100%;
  z-index: 99;
  transition: 0.2s all ease-in;
}
#line1 {
  left: 33.33%;
}
#line2 {
  right: 33.33%;
}
.active-line {
  height: 6rem;
  border-radius: 50%;
  opacity: 0.25;
  transform: translateY(25%);
}

.dropdown {
  position: relative;
  height: 0;
  overflow: hidden;
  transition: height 350ms;
  max-width: 60%;
  margin: 0 auto;
  z-index: 9999;
}
menu {
  margin-top: 0.5rem;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
}
.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
}
.dropdown-enter-active,
.dropdown-leave-active {
  position: absolute;
  width: 100%;
  transition: opacity 200ms ease-in-out;
}

.auth-enter-from,
.auth-leave-to {
  opacity: 0;
}

.auth-enter-active,
.auth-leave-active {
  transition: all 0.25s ease;
}

li {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  border: solid 1px var(--col-2);
  list-style: none;
  margin: 0.5rem;
  cursor: pointer;
}
li:hover {
  border: solid 1px var(--col-3);
  background: var(--col-4);
  color: #fff;
}
li.active {
  border: none;
  background: var(--col-2);
  color: #fff;
}

@media (max-width: 650px) {
  .top-section {
    padding: 0 0.5rem 0.75rem 0.5rem;
  }
  nav {
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }
  h1 {
    font-size: 2.5rem;
  }
  a {
    margin: 0.25rem 0.5rem;
    letter-spacing: 1.15px;
  }
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  .line {
    width: 4rem;
    height: 3px;
  }
  #line1 {
    left: 30%;
  }
  #line2 {
    right: 30%;
  }
  .active-line {
    height: 4rem;
  }
  .dropdown {
    max-width: 90%;
  }
  menu {
    margin-top: 0.5rem;
  }
  li {
    padding: 0.25rem 0.5rem;
    margin: 0.25rem;
  }
}

@media (max-width: 540px) {
  .top-section {
    padding: 0 0.5rem 0.75rem 0.5rem;
    flex-direction: column;
  }
  #nav-center {
    order: -1;
    width: 100%;
    padding-top: 0.5rem;
  }
  .nav-lt {
    display: none;
  }
  .nav-rt {
    display: none;
  }
  .nav-mobile {
    display: block;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: -1rem;
  }
  .icons-mob {
    display: flex;
  }
  h1 {
    font-size: 2rem;
  }
}

@media (max-width: 500px) {
  .top-section {
    padding: 0 0.25rem 0.75rem 0.25rem;
  }
  #nav-center {
    padding-top: 0.25rem;
  }
  .nav-mobile {
    justify-content: space-between;
    margin-top: 0;
  }
  .icons-mob {
    display: flex;
  }
  .dropdown {
    max-width: 98%;
  }
  menu {
    margin-top: 0.25rem;
  }
  #line1 {
    left: 15%;
  }
  #line2 {
    right: 15%;
  }
}
@media (max-width: 350px) {
  a {
    display: inline-block;
  }
}
</style>
