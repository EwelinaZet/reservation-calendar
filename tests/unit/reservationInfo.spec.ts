import { shallowMount, Wrapper  } from '@vue/test-utils'
import ReservationInfo from '@/components/ReservationInfo.vue'

describe('ReservationInfo.vue', () => {
  let wrapper: Wrapper<ReservationInfo & { [key: string]: any }>;

  it('#coutPrice', () => {
    wrapper = shallowMount(ReservationInfo, {
      propsData: { 
        endDate: '2021-01-20',
        startDate: '2021-01-12'
       }
    })
    console.log(wrapper.vm.coutPrice())
    expect(wrapper.vm.coutPrice()).toEqual(9)
  })
})
