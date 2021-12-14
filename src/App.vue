<template>
  <div id="app">
    <ReservationInfo 
      :price="price"
      :stars="stars"
      :voice="voice"
      :start-date="startDate"
      :end-date="endDate"
      :unavailable-date="unavailableDate"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ReservationInfo from './components/ReservationInfo.vue';

@Component({
  components: {
    ReservationInfo,
  },
})
export default class App extends Vue {
  price = 298

  stars=3.5

  voice="123"

  startDate="2021-01-12"

  endDate="2021-01-20"

  unavailableDate="[2021-01-07, 2021-01-25, 2021-01-30]"
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    display: flex;
    justify-content: center;
  }
</style>
