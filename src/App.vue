<template>
  <main class="full-screen">
    <QuoteBox
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
  </main>
</template>

<script>
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
  methods: {},
  computed: {
    quote() {
      return this.quotes[this.currentQuote];
    },
  },
};
</script>

<style lang="scss"></style>
