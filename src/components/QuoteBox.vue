<template>
  <section class="quote-box">
    <slot name="controls" :on="{ nextHandler, prevHandler }"></slot>
    <span class="quote-box__quote" aria-hidden="true">“</span>
    <figure>
      <blockquote>
        {{ text }}
      </blockquote>
      <figcaption v-if="author">{{ author }}</figcaption>
    </figure>
    <span class="quote-box__quote quote-box__quote--close" aria-hidden="true"
      >”</span
    >
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
