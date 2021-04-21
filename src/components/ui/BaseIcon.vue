<template>
  <div class="app-icon">
    <div class="icon">
      <slot></slot>
    </div>
    <transition name="cartometer" mode="out-in">
      <div class="cartometer" v-if="cartQty && title == 'cart'" :key="cartUpdated">
        {{ cartQty }}
      </div>
    </transition>
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: ["title"],
  computed: {
    cartQty() {
      return this.$store.getters["cart/qty"];
    },
    cartUpdated(){
        return this.$store.getters["cart/cartUpdated"];
    }
  },
};
</script>

<style scoped>
.app-icon {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.25rem 0.75rem;
  cursor: pointer;
  color: #2c3e50;
  transition: all 0.15s ease-in;
}
.icon {
  width: 1.75rem;
  height: 1.75rem;
  margin-bottom: 0.25rem;
}
.app-icon:hover {
  color: lightsalmon;
}
span {
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}
.cartometer {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: var(--col-5);
  position: absolute;
  top: 0;
  right: -25%;
  padding: 0.05rem;
  font-size: 0.9rem;
  color: var(--col-3);
}
.app-icon:hover .cartometer {
  animation: icon 0.4s ease-out 0.05s forwards;
}

.cartometer-enter-to,
.cartometer-leave-from {
    transform: rotateY(-60deg);
    background: var(--col-5);
}

.cartometer-enter-active,
.cartometer-leave-active {
    transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
}

.cartometer-enter-from,
.cartometer-leave-to {
    transform: rotateY(-15deg);
    background: var(--col-2);
}

@keyframes icon {
  50% {
    transform: rotateY(-60deg);
  }
  100% {
    transform: rotateY(-15deg);
  }
}
</style>
