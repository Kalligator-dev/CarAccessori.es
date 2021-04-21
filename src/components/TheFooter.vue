<template>
  <footer>
    <div id="footer-sections">
      <section id="footer-main">
        <h2>Car Accessories</h2>
        <p>Anything your car needs? We've got your back.</p>
        <strong>Ride fun</strong>
      </section>
      <div class="line"></div>
      <transition name="fade-away" mode="out-in">
        <section id="changeable" :key="current">
          <template v-if="current == 'main-home'">
            <section id="footer-filters" class="nav-block">
              <div
                class="list-block"
                v-for="(val, filter) in filters"
                :key="`${filter}-footer`"
              >
                <h4>{{ filter }}</h4>
                <ul class="leftnav nav">
                  <li
                    v-for="(k2, branch) in val"
                    :key="`${k2}-branch`"
                    @click="filterNav(filter, branch)"
                  >
                    {{ branch }}
                  </li>
                </ul>
              </div>
            </section>
            <div class="line"></div>
            <section id="footer-nav" class="nav-block">
              <div class="list-block">
                <h4>Navigation</h4>
                <ul class="nav">
                  <li
                    v-for="item in list"
                    :key="`${item}-footer`"
                    @click="goTo(item)"
                  >
                    {{ item == "profile" ? authTxt : item }}
                  </li>
                </ul>
              </div>
              <div class="list-block">
                <h4>Follow</h4>
                <ul class="nav">
                  <li
                    v-for="item in social"
                    :key="`${item}-footer`"
                    @click="goTo(item)"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </section>
          </template>
          <template v-if="current == 'main-cart'">
            <section id="footer-filters" class="nav-block">
              <div class="list-block">
                <h4>Cart</h4>
                <ul class="leftnav nav">
                  <li
                    v-for="item in cartList"
                    :key="`footer-cart-${item}`"
                    :class="{
                      active: checkCart(item),
                      deact: !canAccess(item),
                    }"
                    @click="setComp(item)"
                  >
                    {{ item === "personal" ? "personal info." : item }}
                  </li>
                </ul>
              </div>
            </section>
            <div class="line"></div>
            <section id="footer-nav" class="nav-block">
              <div class="list-block">
                <h4>Navigation</h4>
                <ul class="nav">
                  <li
                    v-for="item in list"
                    :key="`${item}-footer`"
                    @click="goTo(item)"
                  >
                    {{ item == "profile" ? authTxt : item }}
                  </li>
                </ul>
              </div>
              <div class="list-block">
                <h4>Follow</h4>
                <ul class="nav">
                  <li v-for="item in social" :key="`${item}-footer`">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </section>
          </template>
          <template v-else-if="current == 'about'">
            <section
              id="footer-filters"
              class="nav-block nav-col about-filters"
            >
              <div class="list-block me-txt">
                <h4>Me</h4>
                <p>
                  Kalligator, 27 from Egypt. Currently working on some personal
                  projects, improving what I know and learning what I can and
                  want to learn. Check me if you like @ My Links
                </p>
              </div>
              <div class="list-block web-txt">
                <h4>The Website</h4>
                <p>
                  This website is develop using HTML, CSS, Vue3(using options
                  API not composition API), vue-router and vuex. It's only meant
                  as a showcase to test and deploy front-end features not as an
                  actual functional website.
                </p>
              </div>
            </section>
            <div class="line"></div>
            <section id="footer-nav" class="nav-block about-nav">
              <div class="list-block">
                <h4>My Links</h4>
                <ul class="nav">
                  <li>
                    <a
                      href="https://kalligator.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      >portfolio</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://github.com/Kalligator-dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      >github</a
                    >
                  </li>
                  <li><a href="mailto: kalligator04@gmail.com">email</a></li>
                </ul>
              </div>
              <div class="list-block">
                <h4>Navigation</h4>
                <ul class="nav">
                  <li
                    v-for="item in list"
                    :key="`${item}-footer`"
                    @click="goTo(item)"
                  >
                    {{ item == "profile" ? authTxt : item }}
                  </li>
                </ul>
              </div>
            </section>
          </template>
          <section id="contact-section" v-else-if="current == 'contact'">
            <form>
              <div class="form-item">
                <label for="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="input-name"
                  placeholder="name"
                  v-model="contact.name"
                />
              </div>
              <div class="form-item">
                <label for="email">Email</label>
                <input
                  type="text"
                  email="email"
                  id="input-email"
                  placeholder="email"
                  v-model="contact.email"
                />
              </div>
              <div class="form-item">
                <label for="message">Message</label>
                <textarea
                  name="message"
                  id="ta-message"
                  cols="30"
                  rows="10"
                  placeholder="message"
                  v-model="contact.message"
                ></textarea>
              </div>
              <div class="form-item">
                <button
                  @click.prevent="submitForm"
                  :class="{ deact: !formComplete }"
                >
                  Submit
                </button>
                <p :class="{ subbed }">Message sent successfully.</p>
              </div>
            </form>
          </section>
        </section>
      </transition>
      <section id="link-box">
        <button :class="{ inactive: !nextTxt }" @click.prevent="nextSection">
          {{ nextTxt }}
        </button>
        <button :class="{ inactive: !backTxt }" @click.prevent="prevSection">
          {{ backTxt }}
        </button>
      </section>
    </div>
    <section id="link-box-bottom">
      <button :class="{ inactive: !backTxt }" @click.prevent="prevSection">
        {{ backTxt }}
      </button>
      <button :class="{ inactive: !nextTxt }" @click.prevent="nextSection">
        {{ nextTxt }}
      </button>
    </section>
    <div id="footer-bar">
      ©2021 CarAccessori.es - All rights reserved
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      list: ["search", "shop", "cart", "profile"],
      cartList: ["cart", "personal", "checkout", "orders"],
      social: ["Twitter", "Instagram", "Tiktok"],
      nextTxt: "About",
      backTxt: "",
      current: "main",
      comps: ["main-home", "main-cart", "about", "contact"],
      contact: {
        name: "",
        email: "",
        message: "",
      },
      subbed: false,
    };
  },
  computed: {
    filters() {
      return this.$store.getters["shop/filters"];
    },
    showFilter() {
      return this.$store.getters["shop/showFilter"];
    },
    curPath() {
      return this.$router.currentRoute.value.path;
    },
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    authTxt() {
      return this.loggedIn ? "logout" : "login";
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
    formComplete() {
      return this.contact.name && this.contact.email && this.contact.message;
    },
  },
  watch: {
    curPath(n) {
      if (
        this.current == "main" ||
        this.current == "main-cart" ||
        this.current == "main-home"
      )
        this.current = `main-${n == "/" ? "home" : "cart"}`;
    },
    current(n) {
      if (n == "main") {
        this.current = `main-${this.curPath == "/" ? "home" : "cart"}`;
        this.nextTxt = "About";
        this.backTxt = "";
      }
      if (n == "about") {
        this.nextTxt = "Contact";
        this.backTxt = "Home";
      }
      if (n == "contact") {
        this.nextTxt = "";
        this.backTxt = "About";
      }
    },
  },
  methods: {
    nextSection() {
      // this.swipe = "swipe-right";
      if (this.current == "main-home" || this.current == "main-cart")
        return (this.current = "about");
      if (this.current == "about") return (this.current = "contact");
    },
    prevSection() {
      // this.swipe = "swipe-left";
      if (this.current == "contact") return (this.current = "about");
      if (this.current == "about") return (this.current = "main");
    },
    filterNav(category, branch) {
      if (this.curPath != "/") return this.goTo("shop");
      this.$store.dispatch("shop/setShowFilter", category);
      this.filters[category][branch] = !this.filters[category][branch];
    },
    goTo(path) {
      let dest;
      if (path == "search") {
        dest = "/";
        if (this.curPath != "/") {
          this.$router.replace(dest);
        } else {
          this.$store.dispatch("shop/searching");
        }
      }
      if (path == "profile") {
        this.$store.dispatch("auth");
      }
      if (path == "shop") dest = "/";
      if (path == "cart") dest = "/cart";
      if (dest && this.curPath != dest) {
        this.$store.dispatch("shop/setShowFilter", null);
        this.$router.replace(dest);
      }
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
    setComp(comp) {
      if (this.canAccess(comp)) this.$store.dispatch("cart/setComp", comp);
    },
    submitForm() {
      this.subbed = true;
      this.contact.name = "";
      this.contact.email = "";
      this.contact.message = "";
      setTimeout(() => {
        this.subbed = false;
      }, 2000);
    },
  },
  mounted() {
    setTimeout(() => {
      this.current = `main-${this.curPath == "/" ? "home" : "cart"}`;
    }, 100);
  },
};
</script>

<style scoped>
footer {
  overflow: hidden;
  position: relative;
  background: rgb(10, 10, 10);
  color: #8f8f8f;
  padding: 3rem;
  box-shadow: 0 0 8px 0.5px #0e0e0e8c;
  transition: all 0.5s ease-in-out;
}
#footer-sections {
  min-height: 30rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
#footer-bar {
  text-align: center;
  padding-top: 2rem;
}
#footer-main {
  width: 30%;
  padding: 0.5rem 1rem;
  margin-right: 3rem;
}
#changeable {
  width: calc(50% - 5rem);
  display: flex;
  justify-content: space-between;
}
#link-box {
  z-index: 999;
  width: 20%;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  /* margin-right: -3.4rem; */
}
#link-box-bottom {
  display: none;
}
h2 {
  font-family: "Passion One", cursive;
  letter-spacing: 0.5px;
  color: #fff;
  margin-bottom: 2rem;
}

p {
  line-height: 1.7;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}
strong {
  color: #fff;
  letter-spacing: 0.4px;
}
.nav-block {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem 0;
}
.nav-col {
  flex-direction: column;
  width: 70%;
}
#footer-filters p {
  padding-right: 1rem;
}
#footer-nav {
  display: flex;
  flex-direction: column;
}
.about-nav {
  width: 30%;
}
/* .nav {
  margin-right: 2rem;
} */
.list-block {
  margin-left: 0.5rem;
  flex: 1 0 33%;
  margin-bottom: 1rem;
}
.list-block:nth-child(1) {
  order: 1;
}
.list-block:nth-child(2) {
  order: 3;
}
.list-block:nth-child(3) {
  order: 2;
}
.list-block:nth-child(4) {
  order: 4;
}
h4 {
  color: #fff;
  margin-bottom: 0.5rem;
}
ul {
  list-style: none;
  margin-bottom: 1.25rem;
}
li {
  padding: 0.5rem 0.25rem 0 0;
  color: #5c5c5c;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  cursor: pointer;
  transition: all 0.15s ease-in;
}
li:hover {
  background: #0e0e0e17;
  color: #e4e4e4;
  margin-bottom: 0.25rem;
}
.active {
  color: #dddddd;
}
.deact {
  color: #3d3d3d;
  cursor: default;
}
.deact:hover {
  color: #3d3d3d;
}
a {
  text-decoration: none;
  color: #5c5c5c;
}
a:hover {
  color: #e4e4e4;
}
.line {
  background: #e3e3e383;
  width: 1px;
  height: 12rem;
  margin-right: 3.5rem;
  align-self: center;
}
button {
  position: relative;
  height: 2.25rem;
  font-size: 1rem;
  text-decoration: none;
  color: #000;
  background: #e2e2e2;
  padding: 0.5rem 0.75rem;
  text-align: center;
  margin-bottom: 0.1rem;
  margin-right: 0.25rem;
  border: none;
  cursor: pointer;
  transition: all ease-in 0.25s;
}
#link-box button::before {
  content: "";
  border-top: 1px #000 solid;
  border-right: 1px #000 solid;
  width: 0.25rem;
  height: 0.25rem;
  position: absolute;
  left: 5%;
  top: 37.5%;
  transition: all ease-in 0.25s;
}
#link-box button:first-child::before {
  transform: rotate(45deg);
}
#link-box button:last-child::before {
  transform: rotate(-135deg);
}
#link-box button:first-child {
  transform: translateX(0.5rem);
}
#link-box button:last-child {
  transform: translateX(-0.5rem);
}
button:hover {
  background: rgb(48, 48, 48);
  color: rgb(199, 199, 199);
}
#link-box button:hover::before {
  border-top: 1px rgb(199, 199, 199) solid;
  border-right: 1px rgb(199, 199, 199) solid;
}
.inactive {
  opacity: 0;
  cursor: default;
}
#link-box-bottom .inactive {
  display: none;
}
button.deact {
  opacity: 0.5;
  background: rgb(48, 48, 48);
  color: rgb(199, 199, 199);
}
button.deact:hover {
  background: rgb(48, 48, 48);
  color: rgb(199, 199, 199);
}
#contact-section {
  width: 100%;
  position: relative;
  z-index: 3;
}
#contact-section::after {
  content: "";
  background: #a5a5a52a;
  width: 170%;
  height: 160%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-15%, -10%) rotate(30deg);
  z-index: 0;
}
form {
  position: relative;
  padding: 1rem;
  z-index: 3;
}
.form-item {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.form-item p {
  padding-right: 0;
  line-height: 1;
  letter-spacing: 0.5px;
  margin-bottom: 0;
  font-size: 0.9rem;
  text-align: center;
  opacity: 0;
  transition: all ease-in 0.3s;
}
.form-item p.subbed {
  opacity: 1;
}
label {
  margin-bottom: 0.25rem;
}
input,
textarea {
  background: #0e0e0ee1;
  color: #a5a5a5;
  border: none;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  /* border-radius: 10px; */
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 30px #0e0e0ef5 inset !important;
  box-shadow: 0 0 0 30px #0e0e0ef5 inset !important;
  -webkit-text-fill-color: #999999;
  border: none;
  border-radius: 0;
}
textarea {
  resize: none;
  padding: 1rem;
}
.fade-away-enter-from,
.fade-away-leave-to {
  opacity: 0;
}

.fade-away-enter-active,
.fade-away-leave-active {
  transition: all 0.4s ease-in;
}

@media (max-width: 1050px) {
  footer {
    padding: 1.5rem;
  }
  #footer-bar {
    padding-top: 1rem;
  }
  #footer-main {
    padding: 0.5rem 1rem;
    margin-right: 1rem;
  }
  #link-box {
    margin-left: 1rem;
  }
  .nav-block {
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem 0;
  }
  .nav-col {
    flex-direction: column;
  }
  .list-block {
    margin-left: 0.5rem;
    flex: 1 0 33%;
    margin-bottom: 1rem;
  }
}
@media (max-width: 900px) {
  #footer-filters .list-block {
    flex: 1 0 55%;
  }
}
@media (max-width: 730px) {
  #changeable .line {
    display: none;
  }
  .about-filters {
    display: none;
  }
}
@media (max-width: 675px) {
  #footer-sections {
    min-height: 5rem;
  }
  .line {
    display: none;
  }
  #changeable {
    flex-direction: column;
    justify-content: flex-start;
    width: calc(60% - 1rem);
    margin-left: 1rem;
  }
  #changeable .line {
    display: none;
  }
  #footer-filters .list-block {
    flex: 1 0 33%;
  }
  #footer-nav {
    flex-direction: row;
  }
  form {
    padding: 0.5rem;
  }
}
@media (max-width: 570px) {
  #changeable {
    flex-direction: column;
    justify-content: space-between;
  }
  #footer-filters {
    display: none;
  }
  #footer-nav {
    flex-direction: column;
  }
  #link-box {
    display: none;
  }
  #link-box-bottom {
    z-index: 999;
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }
  #link-box-bottom button {
    margin-left: 1rem;
  }
}
@media (max-width: 400px) {
  footer {
    padding: 0.25rem;
  }
  #footer-main {
    width: 50%;
    padding: 0.5rem;
    margin-right: 0.5rem;
  }
  h2 {
    margin-bottom: 1rem;
  }
  #footer-filters p {
    padding-right: 0.5rem;
  }
  .about-nav {
    width: auto;
  }
  .list-block {
    padding: 0;
    margin: 0;
  }
}
</style>
