<template>
  <div class="backdrop">
    <div class="spinner-container">“”</div>
  </div>
</template>

<script>
import gsap from 'gsap';

export default {
  mounted() {
    gsap.to('.spinner-container', {
      duration: 1.5,
      rotate: '+=1080',
      ease: 'expo.out',
      repeat: -1,
      transformOrigin: '50% 35%',
    });
  },
};
</script>
