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
          :class="{active: isSelected(item, -1), unavailable: isUnavailable(item, -1)}"
        >
          {{ item }}
        </div>
        <div
          v-for="item in getCurrentMonthDays()"
          :key="item"
          class="current-date"
          :class="{active: isSelected(item, 0), unavailable: isUnavailable(item, 0)}"
        >
          {{ item }}
        </div>
        <div
          v-for="item in getNextMonthDays()"
          :key="item"
          class="next-date"
          :class="{active: isSelected(item, 1), unavailable: isUnavailable(item, 1)}"
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
  @Prop() unavailableDate!: Array<Date>

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
    'Sat'
  ]

  previewDaysArray: Array<number> = []

  selectedDaysArray: Array<string> = []

  uavailableDaysArray: Array<Date> = []

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
  
  selectedDays(): Array<string> {
    this.selectedDaysArray = []
    let startDay = new Date(this.startDate)
    let endDay = new Date(this.endDate)
    while(startDay <= endDay) {
      this.selectedDaysArray.push(startDay.toLocaleDateString())
      let newDate = startDay.setDate(startDay.getDate() + 1)
      startDay = new Date(newDate)
    }
    return this.selectedDaysArray
  }
  
  isSelected(day:number, month:number): boolean {
    this.selectedDays()
    return this.selectedDaysArray.indexOf(new Date(this.selectedYear, this.selectedMonth + month, day).toLocaleDateString()) !== -1
  }

  isUnavailable(day:number, month: number): boolean {
    let calendarDay = new Date(this.selectedYear, this.selectedMonth + month, day).toLocaleDateString()
    let arrayDays = this.unavailableDate.map(item => item.toLocaleDateString())
    return arrayDays.indexOf(calendarDay)!== -1
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
    color:#ccd0d5
  }
  .preview-date {
    color:#ccd0d5
  }
  .active {
    color: rgb(38, 224, 127);
    background-color:rgb(219, 253, 235);
  }
  .active:nth-child(1){
    color: white;
    background-color:rgb(38, 224, 127);
  }
  .unavailable {
    color: rgb(38, 224, 127);
    border: 1px solid rgb(38, 224, 127);
    border-radius: 30px;
  }
</style>