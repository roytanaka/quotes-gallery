<template>
  <section class="quote-box">
    <div class="frame top"></div>
    <slot name="controls" :on="{ nextHandler, prevHandler }"></slot>
    <span class="quote-box__quote" aria-hidden="true">“</span>
    <figure>
      <blockquote class="quote-box__text">
        {{ text }}
      </blockquote>
      <figcaption v-if="author">{{ author }}</figcaption>
    </figure>
    <span class="quote-box__quote quote-box__quote--close" aria-hidden="true"
      >”</span
    >
    <div class="frame bottom"></div>
  </section>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: false,
    },
  },
  methods: {
    nextHandler() {
      this.$emit('next-handler');
    },
    prevHandler() {
      this.$emit('prev-handler');
    },
  },
};
</script>

<style></style>
