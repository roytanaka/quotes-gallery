<template>
  <main class="full-screen" @keypress.left="currentQuote = currentQuote + 1">
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
            :disabled="currentQuote === 0"
          />
          <SlideBtn
            type="next"
            aria-label="next quote"
            @click="on.nextHandler"
            :disabled="currentQuote === quotes.length - 1"
          />
        </template>
      </QuoteBox>
    </transition>
  </main>
</template>

<script>
import gsap from 'gsap';
import QuoteBox from '@/components/QuoteBox';
import SlideBtn from '@/components/SlideBtn';
import Axios from 'axios';
export default {
  name: 'App',
  components: { QuoteBox, SlideBtn },
  data: () => ({
    quotes: [],
    currentQuote: 0,
  }),
  async created() {
    const response = await Axios.get('getQuotes');
    this.quotes = response.data.quotes;
  },
  mounted() {
    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowRight') this.currentQuote = this.currentQuote + 1;
      if (e.key === 'ArrowLeft') this.currentQuote = this.currentQuote - 1;
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
  },
  watch: {
    quote() {
      document.title = `A quote by ${this.quote.author || 'Anonymous'}`;
    },
  },
};
</script>

<style lang="scss"></style>
