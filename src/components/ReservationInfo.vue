<template>
  <div class="container">
    <div class="reservation-info">
      <div class="price">
        <span v-if="!!coutPrice()">
          {{ price * coutPrice() }} zł
        </span>
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
        <input class="start-input" v-model="startDate" @change="compareDate()" @click="isCalendarVisible = !isCalendarVisible" readonly>
        <img class="delete-icon" src="@/assets/delete.png" @click="startDate = ''">
      </span>
      <span class="arrow">
        <img class="arrow-icon" src="@/assets/arrow.png">
      </span>
      <span class="end-date">
        <input class="end-input" v-model="endDate" @change="compareDate()" @click="isCalendarVisible = !isCalendarVisible" readonly>
        <img class="delete-icon" src="@/assets/delete.png" @click="endDate = ''">
      </span>
    </div>
    <Calendar
      v-if="isCalendarVisible"
      :start-date.sync="startDate"
      :end-date.sync="endDate"
      :unavailable-date="unavailableDate"
      :date="date"
      :selected-month.sync="selectedMonth"
      :selected-year.sync="selectedYear"
    />
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

  @Prop() unavailableDate!: Array<Date>

  @Prop() startDate!: string

  @Prop() endDate!: string

  isCalendarVisible = false

  get date(): Date {
    return new Date(this.startDate)
  }

  get selectedMonth(): number {
    return this.date.getMonth()
  }

  get selectedYear(): number {
    return this.date.getFullYear()
  }

  coutPrice(): number{
    return ((new Date(this.endDate).getTime() - new Date(this.startDate).getTime())/(1000*60*60*24)) + 1
  }

  compareDate(): void {
    if (new Date(this.startDate) > new Date(this.endDate)) alert('Invalid date!')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    width: 360px;
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
    min-height: 25px;
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
    border: 1px solid #289b38;
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
    background-color:#edf5ec;
    color: #289b38;
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
    background-color:#edf5ec;
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
    background-color: #289b38;
    color: white;
    font-weight: bold;
    letter-spacing: 0.2rem;
  }
</style>
