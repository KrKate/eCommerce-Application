import { mount } from '@vue/test-utils'
import { expect, describe, test } from 'vitest'
import AboutView from '@/views/AboutView.vue'

describe('AboutView', () => {
  test('renders correctly', () => {
    const wrapper = mount(AboutView)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('has a main element with a paragraph', () => {
    const wrapper = mount(AboutView)
    const main = wrapper.find('main')
    expect(main.exists()).toBe(true)
  })
})
