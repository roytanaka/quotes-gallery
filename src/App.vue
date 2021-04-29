<template>
  <main class="full-screen">
    <transition name="spinner">
      <SpinnerLoader v-if="loading" />
    </transition>
    <transition @enter="enter" @leave="leave" :css="false" mode="out-in">
      <QuoteBox
        :key="currentQuote"
        v-if="quotes.length"
        :text="quote.text"
        :author="quote.author"
        @prev-handler="currentQuote = currentQuote - 1"
        @next-handler="currentQuote = currentQuote + 1"
      >
        <template v-slot:controls="{ on }">
          <SlideBtn
            type="prev"
            aria-label="previous quote"
            @click="on.prevHandler"
            :disabled="isFirstQuote"
          />
          <SlideBtn
            type="next"
            aria-label="next quote"
            @click="on.nextHandler"
            :disabled="isLastQuote"
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
    const response = await Axios.post('getQuotes');
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
        .from(quoteChar[0], { opacity: 0, rotate: -135 }, '-=0.1')
        .from(quoteChar[1], { opacity: 0, rotate: 135 }, '<')
        .from(
          blockquote,
          { opacity: 0, yPercent: -20, ease: 'power1.out' },
          '-=0.3'
        )
        .from(
          figcaption,
          { opacity: 0, xPercent: -10, ease: 'power3.out', duration: 1.5 },
          '<'
        );
    },
    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        onComplete: done,
      });
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
    async currentQuote(val) {
      if (val === this.quotes.length - 5) {
        const response = await Axios.post('getQuotes', { count: 5 });
        this.quotes.push(...response.data.quotes);
      }
    },
  },
};
</script>

<style lang="scss">
.spinner-enter-active,
.spinner-leave-active {
  transition: opacity 0.3s;
}
.spinner-enter,
.spinner-leave-to {
  opacity: 0;
}
</style>
