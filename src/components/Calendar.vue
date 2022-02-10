<template>
  <div class="date-picker-container">
    <div class="date-picker-content">
      <div class="date-label">
        <button
          class="change-month"
          @click="previous()"
        >
          <img class="back-icon" src="@/assets/back.png">
        </button>
        <span class="month-year">
          {{ months[selectedMonth] }} {{ selectedYear }}
        </span>
        <button
          class="change-month"
          @click="next()"
        >
          <img class="forward-icon" src="@/assets/forward.png">
        </button>
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
          v-for="(item, i) in previewDaysArray"
          :key="'preview' + i"
          class="preview-date"
          :class="{active: isSelected(item, -1), activeFirst: firstDayInRange, activeLast: lastDayInRange, unavailable: isUnavailable(item, -1)}"
        >
          <span
            @click="selectDateRange(item, 0)"
          >{{ item }}</span>
        </div>
        <div
          v-for="(item, i) in getCurrentMonthDays()"
          :key="'current' + i"
          class="current-date"
          :class="{active: isSelected(item, 0), activeFirst: firstDayInRange, activeLast: lastDayInRange, unavailable: isUnavailable(item, 0)}"
        >
          <span
            @click="selectDateRange(item, 1)"
          >{{ item }}</span>
        </div>
        <div
          v-for="(item, i) in getNextMonthDays()"
          :key="'next' + i"
          class="next-date"
          :class="{active: isSelected(item, 1), activeFirst: firstDayInRange, activeLast: lastDayInRange, unavailable: isUnavailable(item, 1)}"
        >
          <span
            @click="selectDateRange(item, 2)"
          >{{ item }}</span>
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

  click = 1;

  firstDayInRange = false

  lastDayInRange = false

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
    this.firstLast(day, month)
    return this.selectedDaysArray.indexOf(new Date(this.selectedYear, this.selectedMonth + month, day).toLocaleDateString()) !== -1
  }

  firstLast(day:number, month:number):boolean {
    const date = new Date(this.selectedYear, this.selectedMonth + month, day).toLocaleDateString()
    const lastIndex = this.selectedDaysArray.length - 1
    this.firstDayInRange = this.selectedDaysArray[0] === date
    this.lastDayInRange = this.selectedDaysArray[lastIndex] === date
    return this.firstDayInRange, this.lastDayInRange
  }

  isUnavailable(day:number, month: number): boolean {
    let calendarDay = new Date(this.selectedYear, this.selectedMonth + month, day).toLocaleDateString()
    let arrayDays = this.unavailableDate.map(item => item.toLocaleDateString())
    return arrayDays.indexOf(calendarDay)!== -1
  }

  selectDateRange(day: number, month: number): number {
    if(this.selectedMonth === 0 && month === 0) {
      this.selectedMonth = 11
      month = 1
      this.selectedYear = this.selectedYear - 1
    }
    if(this.selectedMonth === 11 && month === 2) {
      this.selectedMonth = 0
      month = 1
      this.selectedYear = this.selectedYear + 1
    }
    if(this.click === 1) {
      this.startDate = `${this.selectedYear}-${this.selectedMonth + month}-${day}`
      this.$emit('update:startDate', this.startDate)
      return this.click++
    }
    if(this.click === 2) {
      this.endDate = `${this.selectedYear}-${this.selectedMonth + month}-${day}`
      this.$emit('update:endDate', this.endDate)
      return this.click--
    }
    return this.click
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
    width: 320px;
    border-radius: 30px;
    box-shadow: rgba(0, 0, 0, 0.15) 0 5px 15px 0;
    background-color: white;
    display: block;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: absolute;
    top: 150px
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
    border: none;
    background: none;
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
    font-weight: 700;
    width: 45px;
    height: 45px;
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
    color: #289b38;
    background-color:#edf5ec;
  }
  .activeFirst{
    background: linear-gradient(to left, #edf5ec 50%, white 50%);
  }
  .activeFirst span{
    color: white;
    background-color:#289b38;
    border-radius: 30px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .activeLast{
    background: linear-gradient(to right, #edf5ec 50%, white 50%);
  }
  .activeLast span{
    color: white;
    background-color:#289b38;
    border-radius: 30px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .unavailable span{
    color: #289b38;
    border: 3px solid #289b38;
    border-radius: 30px;
    width: 80%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>