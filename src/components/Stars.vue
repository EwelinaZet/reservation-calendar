<template>
  <div class="stars-container">
    <div class="stars">
      <span
          v-for="(i) in 5"
          :key="i"
          class="star-container"
        >
        <img
          :src="getStar(i)"
          alt=""
          class="star"
        >
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component

export default class Stars extends Vue {
  @Prop() stars!: number

  getStar(value: number):string {
    if (value <= this.stars) {
      return require('@/assets/star-filled.png')
    }
    if (value - 0.5 === this.stars) {
      return require('@/assets/star-half-empty.png')
    }
    return require('@/assets/star-empty.png')
  }
}
</script>

<style>
  .stars-container {
    margin-right: 5px;
  }
  .star {
      width: 12px;
  }
</style>
