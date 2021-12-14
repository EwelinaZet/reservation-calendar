<template>
  <div>
    <div class="container">
      <div class="reservation-info">
        <div class="price">
          {{ price }} zł
        </div>
        <div class="rating">
          <Stars
            :stars="stars"
          />
          <span class="voice">{{ voice }}</span>
        </div>
      </div>
      <div class="submit-reservation">
        <button>Reserve</button>
      </div>
      <div class="data-range">
        <span class="start-date">
            <input class="start-input" v-model="startDate">
            <img class="delete-icon" src="@/assets/delete.png" @click="startDate = ''">
        </span>
        <span class="arrow">
            <img class="arrow-icon" src="@/assets/arrow.png">
        </span>
        <span class="end-date">
            <input class="end-input" v-model="endDate">
            <img class="delete-icon" src="@/assets/delete.png" @click="endDate = ''">
        </span>
      </div>
      <Calendar
        :start-date="startDate"
        :end-date="endDate"
        :unavailable-date="unavailableDate"
        :date="date"
        :selected-month.sync="selectedMonth"
        :selectedYear.sync="selectedYear"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Stars from './Stars.vue'
import Calendar from './Calendar.vue'

@Component({
  components: {
    Stars,
    Calendar
  },
})
export default class ReservationInfo extends Vue {
  @Prop() price!: number

  @Prop() stars!: number

  @Prop() voice!: number

  @Prop() unavailableDate!: string

  @Prop() startDate!: string

  @Prop() endDate!: string

  get date() {
    return new Date(this.startDate)
  }

  get selectedMonth() {
    return this.date.getMonth()
  }

  get selectedYear() {
    return this.date.getFullYear()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    width: 400px;
    border-radius: 30px;
    box-shadow: rgba(0, 0, 0, 0.15) 0 5px 15px 0;
    padding: 20px 20px;
    position: relative;
  }
  .reservation-info {
    margin-bottom: 15px;
  } 
  .price {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 8px;
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
    font-size: 12px;
    color: #b4b7bb;
    font-weight: bold;
  }
  .stars {
    margin-right: 5px;
  }
  .data-range {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(38, 224, 127);
    border-radius: 30px;
    height: 30px;
    padding: 10px 15px;
  }
  .start-date {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40%;
  }
  .end-date {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40%;
    background-color:rgb(219, 253, 235);
    color: rgb(38, 224, 127);
    border-radius: 30px;
  }
  input {
    border: none;
    font-size: 14px;
    height: 30px;
    outline: none;
    width:60%
  }
  .end-input{
    background-color:rgb(219, 253, 235);
  }
  .delete-icon {
    width: 12px;
  }
  .arrow {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .arrow-icon{
    width: 24px;
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
