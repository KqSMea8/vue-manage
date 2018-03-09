<template>
  <div id="app" class="app-main">
      <link rel="icon" href="./assets/img/favicon.ico" type="image/x-icon">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style>
.app-main{
    width: 100%;
    height: 100%;
}
</style>
