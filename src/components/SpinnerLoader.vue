<template>
  <div class="backdrop">
    <div class="spinner-container">
      <span class="spinner">“</span>
      <span class="spinner">”</span>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';

export default {
  mounted() {
    gsap.to('.spinner', {
      duration: 2,
      rotateY: '+=1080',
      ease: 'expo.out',
      repeat: -1,
      transformOrigin: '50% 35%',
      stagger: {
        each: 0.1,
        from: 'random',
      },
    });
  },
};
</script>
<style scoped>
.spinner {
  display: inline-block;
}
</style>
