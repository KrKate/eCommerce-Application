<template>
  <div class="page">
    <div class="preloader" :style="cssVars">
      <span :class="`rot-${index}`" v-for="index in 8" :key="index"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppPreloader',
  computed: {
    cssVars() {
      return {
        '--color': '#fb1b1b',
        '--scale': 0.6
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/colors';
.page {
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  bottom: 0;
  left: 0;
  background-color: $app-gray;
  opacity: 0.6;
  z-index: 1000;
  justify-content: center;
  align-items: center;

  .preloader {
    position: relative;
    width: 125px;
    height: 125px;
    transform: scale(var(--scale));
  }

  .preloader > span {
    position: absolute;
    background-color: transparent;
    height: 22px;
    width: 22px;
    border-radius: 12px;
    animation-name: f_fadeG;
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
    animation-direction: normal;
  }

  .rot-1 {
    left: 0;
    top: 51px;
    animation-delay: 0.45s;
  }

  .rot-2 {
    left: 15px;
    top: 15px;
    animation-delay: 0.6s;
  }

  .rot-3 {
    left: 51px;
    top: 0;
    animation-delay: 0.75s;
  }

  .rot-4 {
    right: 15px;
    top: 15px;
    animation-delay: 0.9s;
  }

  .rot-5 {
    right: 0;
    top: 51px;
    animation-delay: 1.05s;
  }

  .rot-6 {
    right: 15px;
    bottom: 15px;
    animation-delay: 1.2s;
  }

  .rot-7 {
    left: 51px;
    bottom: 0;
    animation-delay: 1.35s;
  }

  .rot-8 {
    left: 15px;
    bottom: 15px;
    animation-delay: 1.5s;
  }
}

@keyframes f_fadeG {
  0% {
    background-color: var(--color);
  }
  100% {
    background-color: transparent;
  }
}
</style>
