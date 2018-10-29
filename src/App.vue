<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style lang="less">
@import "~less/base";
@import "~less/mint";
@import "~less/animate";
@import "~less/font";
</style>
