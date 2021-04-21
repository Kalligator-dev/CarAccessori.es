<template>
  <div id="not-found">
    <h2>Page Not Found</h2>
    <h4>Wait a second, you will be redirected to home page</h4>
  </div>
</template>

<script>
export default {
  mounted(){
    setTimeout(() => {
      this.$router.replace('/');
    }, 2000);
  }
};
</script>

<style scoped>
#not-found {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h2 {
  margin-bottom: 0.5rem;
}
h4 {
  opacity: 0.8;
}
</style>
