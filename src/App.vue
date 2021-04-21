<template>
  <the-header></the-header>
  <router-view v-slot='slotProps'>
    <transition name="section-fade" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
  <the-footer></the-footer>
</template>

<script>
import theHeader from "./components/TheHeader";
import theFooter from "./components/TheFooter";

export default {
  name: "App",
  components: {
    theHeader,
    theFooter,
  },
  data() {
    return {
      comp: "shop",
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  font-family: "Barlow Semi Condensed", sans-serif;
}

:root {
  --col-00: #001300;
  --col-0: #edf5e1;
  --col-0-t: #e4eed7;
  --col-1: #fc4445;
  --col-2: #3feee6;
  --col-3: #55bcc9;
  --col-4: #97caef;
  --col-5: #cafafe;
  --col-6: #05386b;
  --col-7: #5cdb95;
  --col-8: #8ee4af;
  --col-9: #378683;
  --col-10: #c3073f;
  --col-11: #00ff0a;
  --col-11-80: #00ff0a80;
  --col-12: #00ffa005;
  --col-green: rgb(0, 138, 0);
  --col-green-light-75: rgba(155, 255, 155, 0.75);
  --col-green-light-35: rgba(155, 255, 155, 0.35);
  --col-green-light-15: rgba(155, 255, 155, 0.15);
  --col-green-ltdark: rgb(0, 50, 0);
  --col-green-dark: rgb(0, 19, 0);
  --col-green-dark-05: rgba(0, 19, 0, 0.5);
}

html {
  height: -webkit-fill-available;
}

body {
  width: 100vw;
  color: #2c3e50;
}
body::-webkit-scrollbar {
  width: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
}

a {
  text-decoration: none;
}

.section-fade-enter-active,
.section-fade-leave-active {
  transition: all ease-in-out 0.3s;
}

.section-fade-enter-from,
.section-fade-leave-to {
  /* transform: translateX(-50%); */
  opacity: .25;
}
</style>
