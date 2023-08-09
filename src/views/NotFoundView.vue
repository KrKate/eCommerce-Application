<template>
  <main>
    <img src="@/assets/images/p.webp" alt="p" id="letter_1" />
    <img src="@/assets/images/a.webp" alt="a" id="letter_2" />
    <img src="@/assets/images/g.webp" alt="g" id="letter_3" />
    <img src="@/assets/images/e.webp" alt="e" id="letter_4" />
    <img src="@/assets/images/n.webp" alt="n" id="letter_5" />
    <img src="@/assets/images/o.webp" alt="o" id="letter_6" />
    <img src="@/assets/images/t.webp" alt="t" id="letter_7" />
    <img src="@/assets/images/f.webp" alt="f" id="letter_8" />
    <img src="@/assets/images/o.webp" alt="o" id="letter_9" />
    <img src="@/assets/images/u.webp" alt="u" id="letter_10" />
    <img src="@/assets/images/n.webp" alt="n" id="letter_11" />
    <img src="@/assets/images/d.webp" alt="d" id="letter_12" />
    <img src="@/assets/images/bush.webp" alt="" class="bush" />
  </main>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins';
main {
  position: relative;
  display: flex;
  height: 100vh;
  padding-top: 160px;
}
img {
  position: absolute;
  height: 100px;
  top: 55%;
  left: 50%;
}
.bush {
  position: absolute;
  height: 300px;
  top: 40%;
  left: 40%;
  animation: shake 1s infinite cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  animation-delay: 0.6s;
  perspective: 1000px;
}

#letter_1 {
  animation: fly1 4s forwards;
}
#letter_2 {
  animation: fly2 4s forwards;
}
#letter_3 {
  animation: fly3 4s forwards;
}
#letter_4 {
  animation: fly4 4s forwards;
}
#letter_5 {
  animation: fly5 4s forwards;
}
#letter_6 {
  animation: fly6 4s forwards;
}
#letter_7 {
  animation: fly7 4s forwards;
}
#letter_8 {
  animation: fly8 4s forwards;
}
#letter_9 {
  animation: fly9 4s forwards;
}
#letter_10 {
  animation: fly10 4s forwards;
}
#letter_11 {
  animation: fly11 4s forwards;
}
#letter_12 {
  animation: fly12 4s forwards;
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
@keyframes fly1 {
  @include fly-animation(23%, 36%, -49deg);
}
@keyframes fly2 {
  @include fly-animation(30%, 31%, -10deg);
}
@keyframes fly3 {
  @include fly-animation(39%, 27%, 10deg);
}
@keyframes fly4 {
  @include fly-animation(48%, 26%, -8deg);
}
@keyframes fly5 {
  @include fly-animation(62%, 27%, 26deg);
}
@keyframes fly6 {
  @include fly-animation(70%, 30%, 20deg);
}
@keyframes fly7 {
  @include fly-animation(77%, 35%, 38deg);
}
@keyframes fly8 {
  @include fly-animation(32%, 75%, 10deg);
}
@keyframes fly9 {
  @include fly-animation(40%, 80%, 15deg);
}
@keyframes fly10 {
  @include fly-animation(49%, 82%, 10deg);
}
@keyframes fly11 {
  @include fly-animation(58%, 80%, -2deg);
}
@keyframes fly12 {
  @include fly-animation(66%, 74%, -30deg);
}
</style>
