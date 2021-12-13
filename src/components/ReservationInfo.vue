<template>
  <div>
    <div class="container">
      <div class="reservation-info">
        <div class="price">
          {{ price }} zł
        </div>
        <div class="rating">
          <span class="stars">{{ stars }}</span>
          <span class="voice">{{ voice }}</span>
        </div>
      </div>
      <div class="submit-reservation">
        <button>Reserve</button>
      </div>
      <div class="data-range">
        <input>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ReservationInfo extends Vue {
  @Prop() price!: number

  @Prop() stars!: number

  @Prop() voice!: number

  @Prop() unavailableDate!: string

  @Prop() startDate!: string

  @Prop() endDate!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    width: 300px;
    border-radius: 30px;
    box-shadow: rgba(0, 0, 0, 0.15) 0 5px 15px 0;
    padding: 20px 20px;
    position: relative;
  }
  .reservation-info {
    margin-bottom: 15px;
  } 
  .price {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .rating {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .voice {
    font-size: 16px;
    color: gray;
    font-weight: bold;
  }
  .stars {
    margin-right: 5px;
  }
  .data-range {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input {
    display: inline-block;
    width: 100%;
    height: 30px;
    outline: none;
    font-size: 18px;
    border: 1px solid rgb(38, 224, 127);
    border-radius: 30px;
    padding: 10px 15px;
  }
  .submit-reservation {
    position: absolute;
    top: 20px;
    right: 20px
  }
  button {
    padding: 15px 20px;
    border:none;
    border-radius: 30px;
    background-color: rgb(38, 224, 127);
    color: white;
    font-weight: bold;
    letter-spacing: 0.2rem;
  }
</style>
