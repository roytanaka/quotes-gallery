<template>
  <main class="full-screen" @keypress.left="currentQuote = currentQuote + 1">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
      :css="false"
      mode="out-in"
    >
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
import { gsap, CSSRulePlugin, TextPlugin } from 'gsap/all';
import QuoteBox from '@/components/QuoteBox';
import SlideBtn from '@/components/SlideBtn';
import Axios from 'axios';
export default {
  name: 'App',
  components: { QuoteBox, SlideBtn },
  data: () => ({
    quotes: [],
    currentQuote: 0,
    blockquote: null,
    frames: null,
    quoteChar: null,
    figcaption: null,
    button: null,
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
    beforeEnter(el) {
      this.blockquote = el.querySelector('blockquote');
      this.frames = el.querySelectorAll('.frame');
      this.quoteChar = el.querySelectorAll('.quote-box__quote');
      this.figcaption = el.querySelector('figcaption');
      gsap.from(this.blockquote, {
        rotationX: 90,
      });
      gsap.from(this.frames, {
        width: 0,
      });
      gsap.from(this.quoteChar, {
        yPercent: 100,
      });
      gsap.from(this.figcaption, {
        xPercent: 200,
        opacity: 0,
      });
    },
    enter(_, done) {
      const tl = gsap.timeline();
      tl.to(this.blockquote, {
        duration: 0.85,
        rotationX: 0,
        ease: 'power1',
        onComplete: done,
      }).to(this.frames, { width: '87%', duration: 0.7, ease: 'back.out' }, 0);
      tl.play();
    },
    leave(_, done) {
      const tl = gsap.timeline();
      tl.to(this.blockquote, {
        duration: 0.5,
        rotationX: -90,
        ease: 'ease',
        onComplete: done,
      });
      tl.to(
        this.frames[0],
        { xPercent: -200, duration: 1, ease: 'power1.out' },
        0
      );
      tl.to(
        this.frames[1],
        { xPercent: 200, duration: 1, opacity: 0, ease: 'power1.out' },
        0
      );
      tl.to(
        this.quoteChar,
        {
          scale: 0,
        },
        0
      );
      tl.to(
        this.figcaption,
        {
          xPercent: -200,
          opacity: 0,
        },
        0
      );
      tl.play();
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
