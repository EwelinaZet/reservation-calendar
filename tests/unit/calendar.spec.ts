import { shallowMount, Wrapper  } from '@vue/test-utils'
import Calendar from '@/components/Calendar.vue'

describe('Calendar.vue', () => {
  let wrapper: Wrapper<Calendar & { [key: string]: any }>;

  describe.each([
      [2021, 0, [2021, 1]],
      [2021, 11, [2022, 0]],
      [2021, 7, [2021, 8]],
  ])('#next', (year, month, expected) => {
    it(`#next method,`, () => {
        wrapper = shallowMount(Calendar, {
          propsData: { 
            selectedYear: year,
            selectedMonth: month,
            unavailableDate: [7, 25, 29]
           },
           methods: {
            isUnavailable() { return false }
           }
        })
        wrapper.find('.forward-icon').trigger('click')
        expect(wrapper.props().selectedYear).toEqual(expected[0])
        expect(wrapper.props().selectedMonth).toEqual(expected[1])
      })
  })

  describe.each([
    [2021, 0, [2020, 11]],
    [2021, 11, [2021, 10]],
    [2021, 7, [2021, 6]],
  ])('#previous', (year, month, expected) => {
    it(`#previous method,`, () => {
    wrapper = shallowMount(Calendar, {
        propsData: { 
          selectedYear: year,
          selectedMonth: month,
          unavailableDate: [7, 25, 29]
        },
        methods: {
         isUnavailable() { return false }
        }
      })
      wrapper.find('.back-icon').trigger('click')
      expect(wrapper.props().selectedYear).toEqual(expected[0])
      expect(wrapper.props().selectedMonth).toEqual(expected[1])
    })
  })

  it('#getCurrentMonthDays', () => {
    wrapper = shallowMount(Calendar, {
      data() {
          return{
            days: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        }
      },
      propsData: { 
        selectedYear: 2021,
        selectedMonth: 0,
        unavailableDate: [7, 25, 29]
       },
       methods: {
        isUnavailable() { return false }
       }
    })
    wrapper.vm.getCurrentMonthDays();
    expect(wrapper.vm.getCurrentMonthDays()).toEqual(31)
  })

  it('#getNextMonthDays', () => {
    wrapper = shallowMount(Calendar, {
        data() {
          return{
            days: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
        }
      },
      propsData: { 
        selectedYear: 2021,
        selectedMonth: 0,
        unavailableDate: [7, 25, 29]
       },
       methods: {
        isUnavailable() { return false }
       }
    })
    wrapper.vm.getNextMonthDays();
    expect(wrapper.vm.getNextMonthDays()).toEqual(6)
  })
})
