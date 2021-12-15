<template>
  <div class="date-picker-container">
    <div class="date-picker-content">
      <div class="date-label">
        <span
          class="change-month"
          @click="previous()"
        >
          <img class="back-icon" src="@/assets/back.png">
        </span>
        <span class="month-year">
          {{ months[selectedMonth] }} {{ selectedYear }}
        </span>
        <span
          class="change-month"
          @click="next()"
        >
          <img class="forward-icon" src="@/assets/forward.png">
        </span>
      </div>
      <div class="day-name">
        <span
          v-for="day in days"
          :key="day"
        >
          {{ day }}
        </span>
      </div>
      <div class="calendar-content">
        <div
          v-for="item in previewDaysArray"
          :key="item"
          class="preview-date"
        >
          {{ item }}
        </div>
        <div
          v-for="item in getCurrentMonthDays()"
          :key="item"
          class="current-date"
        >
          {{ item }}
        </div>
        <div
          v-for="item in getNextMonthDays()"
          :key="item"
          class="next-date"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component

export default class Calendar extends Vue {
  @Prop() unavailableDate!: string

  @Prop() startDate!: string

  @Prop() endDate!: string

  @Prop() date!: string

  @Prop() selectedMonth!: number

  @Prop() selectedYear!: number

  months: Array<string> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'Novemer',
    'December'
  ]

  days: Array<string> = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ]

  previewDaysArray: Array<number> = []

  next(): void {
    this.selectedYear = (this.selectedMonth === 11) ? this.selectedYear + 1 : this.selectedYear
    this.selectedMonth = (this.selectedMonth + 1) % 12
  }

  previous(): void {
    this.selectedYear = (this.selectedMonth === 0) ? this.selectedYear - 1 : this.selectedYear
    this.selectedMonth = (this.selectedMonth === 0) ? 11 : this.selectedMonth - 1
  }

  getCurrentMonthDays(): number {
    this.getPreviewMonthDays()
    return new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate()
  }

  getNextMonthDays(): number {
    const lastDayIndex = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDay()
    return 7 - lastDayIndex - 1
  }

    getPreviewMonthDays(): Array<number> {
    this.previewDaysArray = []
    const firstDayIndex = new Date(this.selectedYear, this.selectedMonth, 1).getDay()
    const prevLastDay = new Date(this.selectedYear, this.selectedMonth, 0).getDate()
    for (let x: number = firstDayIndex; x > 0; x--) {
      this.previewDaysArray.push(prevLastDay - x + 1)
    }
    return this.previewDaysArray
  }
}
</script>

<style>
  .date-picker-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .date-picker-content {
    width: 360px;
    border-radius: 30px;
    box-shadow: rgba(0, 0, 0, 0.15) 0 5px 15px 0;
    display: block;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: absolute;
    top: 200px
  }
  .date-label{
    font-size: 16px;
    font-weight: bold;
    border: 1px solid #ccd0d5;
    border-radius: 30px;
    height: 30px;
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .change-month{
    font-size: 3rem;
    font-weight: bold;
    display: flex;
  }
  .day-name{
    margin: 20px 0;
    color: #b4b7bb;
    display: flex;
  }
  .day-name span {
    width: calc(360px/7);
  }
  .calendar-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap; 
    justify-content: space-between; 
  }
  .calendar-content div {
    font-size: 14px;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
  }
  .next-date {
    background-color: aquamarine;
    color:#ccd0d5
  }
  .preview-date {
    background-color: aquamarine;
    color:#ccd0d5
  }
</style>