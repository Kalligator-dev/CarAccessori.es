<template>
  <div id="shop">
    <div id="bars">
      <div id="search-bar" class="bar" :style="{ height: searchHt }">
        <input
          type="text"
          name="search"
          id="search-input"
          placeholder="search"
          v-model.trim="searchTxt"
          @keypress.enter="search"
          v-if="searching"
        />
        <div class="search" @click="search" v-if="searching">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 251.66 252.52">
            <path
              d="M132.14,22.67a77.4,77.4,0,1,0-4.88,113.94,6,6,0,0,0,1.46,2.37,6,6,0,0,0,3.05,1.65,18.11,18.11,0,0,0,3,20.54l80.42,85.63a18.09,18.09,0,0,0,26,.41l5.23-5.23a18.09,18.09,0,0,0-.41-26l-85.63-80.42a18.12,18.12,0,0,0-21.48-2.45,6,6,0,0,0-1.57-2.71,6.14,6.14,0,0,0-2.19-1.4A77.4,77.4,0,0,0,132.14,22.67ZM125.3,125.3a67.73,67.73,0,1,1,0-95.78A67.8,67.8,0,0,1,125.3,125.3Z"
            />
          </svg>
        </div>
      </div>
      <section id="filters-section" :style="{ height: filHt }">
        <ul id="filters-bar" class="bar">
          <transition-group name="filteranim" mode="out-in">
            <li v-for="(branch, category) in trimmedFilters" :key="category">
              <h4 class="category">{{ category }}</h4>
              <span
                class="branch"
                v-for="(key, val) of branch"
                :key="val"
                :class="{ key }"
              >
                {{ val }}
                <button @click="deleteFilter(category, val)">x</button>
              </span>
            </li>
            <li v-if="keyword">
              <h4 class="category">keyword:</h4>
              <span class="branch"
                >{{ keyword }} <button @click="clearKeyword">x</button></span
              >
            </li>
          </transition-group>
        </ul>
      </section>
    </div>

    <div id="main-shop">
      <products></products>
    </div>
  </div>
</template>

<script>
import Products from "../Products.vue";
export default {
  components: {
    Products,
  },
  data() {
    return {
      searchTxt: "",
      searchHt: 0,
      filHt: 0,
    };
  },
  computed: {
    showFilter() {
      return this.$store.getters["shop/showFilter"];
    },
    filters() {
      return this.$store.getters["shop/filters"];
    },
    searching() {
      return this.$store.getters["shop/searching"];
    },
    keyword() {
      return this.$store.getters["shop/keyword"];
    },
    activeFilters() {
      return this.$store.getters["shop/activeFilters"];
    },
    trimmedFilters() {
      const fils = { ...this.activeFilters };
      delete fils.ids;
      return fils;
    },
    filterIds() {
      return this.activeFilters.ids;
    },
  },
  watch: {
    showFilter() {
      const int = setInterval(() => {
        this.setTop();
      }, 16.67);
      setTimeout(() => {
        clearInterval(int);
      }, 320);
    },
    searching(n, old) {
      if (n === old) return;

      this.$nextTick(() => {
        if (!this.searching) {
          this.searchHt = 0;
        } else {
          const el = document.querySelector("#search-input");
          this.searchHt = `${el.clientHeight + 16}px`;
        }
      });
    },
    keyword(n, old) {
      if (n === old) return;

      this.$nextTick(() => {
        if (!n && !this.filterIds) {
          this.filHt = 0;
        } else {
          const el = document.querySelector("#filters-bar");
          this.filHt = `${el.clientHeight + 16}px`;
        }
      });
    },
    filterIds(n, old) {
      if (n === old) return;

      this.$nextTick(() => {
        if (!n && !this.keyword) {
          this.filHt = 0;
        } else {
          const el = document.querySelector("#filters-bar");
          this.filHt = `${el.clientHeight + 16}px`;
        }
      });
    },
  },
  methods: {
    deleteFilter(parent, child) {
      this.filters[parent][child] = false;
    },
    search() {
      if (!this.searchTxt) return;
      this.$store.dispatch("shop/setKeyword", this.searchTxt.toLowerCase());
      this.searchTxt = "";
      this.$store.dispatch("shop/searching");
    },
    clearKeyword() {
      this.$store.dispatch("shop/setKeyword", "");
    },
    setTop() {
      let top = document.querySelector("header").clientHeight;
      document.querySelector("#bars").style.top = top + "px";
    },
  },
  mounted() {
    this.setTop();
  },
  unmounted() {
    this.$store.dispatch("shop/searching", false);
  },
};
</script>

<style scoped>
#shop {
  z-index: 999;
}
#bars {
  position: sticky;
  z-index: 999;
}
.bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  padding: 0.5rem;
  transition: all 300ms ease-in-out;
}
#filters-bar {
  overflow: hidden;
  padding: 0 !important;
  flex-wrap: wrap;
}
li {
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 0.25rem 0.75rem; */
  overflow: hidden;
  background: var(--col-5);
  border-radius: 25px;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  transition: all ease-in 0.2s;
}
.category {
  margin-right: 0.15rem;
  background: var(--col-2);
  padding: 0.25rem;
}
span {
  position: relative;
  margin-right: 0.3rem;
  margin-left: 0.3rem;
}
span button {
  border: none;
  background: none;
  color: var(--col-1);
  transform: translateY(-33.334%);
  cursor: pointer;
}
input {
  background: var(--col-5);
  width: 33.34%;
  height: 2rem;
  border: none;
  border-radius: 15px 0 0 15px;
  padding: 0.5rem 1rem;
  color: var(--col-3);
  animation: searching 0.3s ease-in 0.15s forwards;
  opacity: 0;
}
.search {
  padding: 0.25rem;
  background: var(--col-2);
  border-radius: 0 15px 15px 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.15rem;
  cursor: pointer;
  animation: searching 0.3s ease-in 0.15s forwards;
  opacity: 0;
}
@keyframes searching {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
svg {
  width: 1rem;
  fill: var(--col-3);
}
.search:hover svg {
  fill: var(--col-1);
}

.filteranim-enter-from,
.filteranim-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.filteranim-enter-to,
.filteranim-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.filteranim-enter-active,
.filteranim-leave-active {
  transition: all 300ms ease-in-out;
}

@media (max-width: 700px) {
  input {
    width: 50%;
  }
}
@media (max-width: 340px) {
  li {
    margin-left: 0.25rem;
    margin-bottom: 0.25rem;
    font-size: 0.75rem;
  }
  .category {
    margin-right: 0.075rem;
    padding: 0.25rem 0.15rem;
  }
  span {
    position: relative;
    margin-right: 0.15rem;
    margin-left: 0.15rem;
  }
}
</style>
