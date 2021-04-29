<template>
  <main class="full-screen">
    <transition name="spinner">
      <SpinnerLoader v-if="loading" />
    </transition>
    <transition appear v-on:appear="customAppearHook" v-if="!loading">
      <img class="swipe-icon" src="@/assets/Tap.svg" alt="" aria-hidden />
    </transition>
    <transition @enter="enter" @leave="leave" :css="false" mode="out-in">
      <QuoteBox
        :key="currentQuote"
        v-if="quotes.length"
        :text="quote.text"
        :author="quote.author"
        @prev-handler="previous"
        @next-handler="next"
      >
        <template v-slot:controls="{ on }">
          <SlideBtn
            type="prev"
            aria-label="previous quote"
            @click="on.prevHandler"
          />
          <SlideBtn
            type="next"
            aria-label="next quote"
            @click="on.nextHandler"
          />
        </template>
      </QuoteBox>
    </transition>
  </main>
</template>

<script>
import gsap from 'gsap';
import Axios from 'axios';
import QuoteBox from '@/components/QuoteBox';
import SlideBtn from '@/components/SlideBtn';
import SpinnerLoader from '@/components/SpinnerLoader';
export default {
  name: 'App',
  components: { QuoteBox, SlideBtn, SpinnerLoader },
  data: () => ({
    loading: true,
    quotes: [],
    currentQuote: 0,
  }),
  async created() {
    this.loading = true;
    const response = await Axios.post('getQuotes', { count: 100 });
    this.loading = false;
    this.quotes = response.data.quotes;
  },
  mounted() {
    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowRight' && !this.isLastQuote)
        this.currentQuote = this.currentQuote + 1;
      if (e.key === 'ArrowLeft' && !this.isFirstQuote)
        this.currentQuote = this.currentQuote - 1;
    });
  },
  methods: {
    previous() {
      if (this.isFirstQuote) {
        this.currentQuote = this.quotes.length - 1;
      } else {
        this.currentQuote = this.currentQuote - 1;
      }
    },
    next() {
      if (this.isLastQuote) {
        this.currentQuote = 0;
      } else {
        this.currentQuote = this.currentQuote + 1;
      }
    },
    customAppearHook(el, done) {
      const tl = gsap.timeline({
        onComplete: done,
        defaults: { duration: 1.2, ease: 'sine.inOut', delay: 0.4 },
      });
      tl.to(el, { delay: 3.5, opacity: 1 })
        .to(el, { rotate: -30, delay: 0 }, '-=0.8')
        .to(el, { rotate: 30 })
        .to(el, { rotate: -30 })
        .to(el, { opacity: 0 }, '-=2.8');
    },
    enter(el, done) {
      const blockquote = el.querySelector('blockquote');
      const frames = el.querySelectorAll('.frame');
      const figcaption = el.querySelector('figcaption');
      const quoteChar = el.querySelectorAll('.quote-box__quote');

      const tl = gsap.timeline({
        onComplete: done,
        defaults: { duration: 0.8, ease: 'sine.in' },
      });

      tl.from(frames, { width: 0 }, '+=0')
        .from(
          quoteChar,
          {
            opacity: 0,
            rotateY: '+=720',
            ease: 'expo.out',
            duration: 2.5,
            stagger: {
              each: 0.15,
              from: 'random',
            },
          },
          '-=0.1'
        )
        .from(
          blockquote,
          { opacity: 0, yPercent: -20, ease: 'power1.out' },
          '-=2.2'
        )
        .from(
          figcaption,
          { opacity: 0, xPercent: -10, ease: 'power3.out', duration: 1.5 },
          '<'
        );
    },
    leave(el, done) {
      gsap.to(el, { opacity: 0, onComplete: done });
    },
  },
  computed: {
    quote() {
      return this.quotes[this.currentQuote];
    },
    isLastQuote() {
      return this.currentQuote === this.quotes.length - 1;
    },
    isFirstQuote() {
      return this.currentQuote === 0;
    },
  },
  watch: {
    quote() {
      document.title = `A quote by ${this.quote.author || 'Anonymous'}`;
    },
  },
};
</script>

<style lang="scss">
.full-screen {
  position: relative;
}
.swipe-icon {
  position: absolute;
  width: clamp(2.5em, 7vw, 5em);
  transform-origin: 50% 200%;
  transform: rotate(30deg);
  opacity: 0;
}

.spinner-enter-active,
.spinner-leave-active {
  transition: opacity 0.3s;
}
.spinner-enter,
.spinner-leave-to {
  opacity: 0;
}
</style>
