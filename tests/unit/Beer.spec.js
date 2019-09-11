import { mount } from '@vue/test-utils'
import Beer from '@/views/Beer'
import flushPromises from 'flush-promises'
import axios from 'axios'

jest.mock('axios', () => require('../__mocks__/axios.mock.js'))

describe('Beer.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Beer, {
      propsData: {
        id: '9'
      }
    })
  })

  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('Renders without errors!', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('Shows loader initially and hides it when beer is fetched', async () => {
    expect(wrapper.find('.loader').exists()).toBe(true)
    await flushPromises()
    expect(wrapper.find('.loader').exists()).toBe(false)
  })

  it('Makes api request with correct parameters', () => {
    expect(axios.get).toBeCalledWith(
      `https://api.punkapi.com/v2/beers/${wrapper.vm.id}`
    )
  })

  it('Renders correct content', async () => {
    await flushPromises()
    expect(wrapper.find('.beer-name').html()).toContain('AB:06')
    expect(wrapper.find('.yeast-value').html()).toContain('Saflager S189')
    expect(wrapper.find('.bt-value').html()).toContain(
      'Boil down to desired OG (about 17 litres).'
    )
  })

  it('Does not render duplicate hops', async () => {
    await flushPromises()
    const hops = wrapper.findAll('.hops > ul > li')
    const expectedHops = ['Saaz', 'Amarillo']
    const renderedHops = []
    hops.wrappers.filter(w => {
      renderedHops.push(w.text())
    })
    expect(expectedHops.sort()).toEqual(renderedHops.sort())
  })

  it('Does not render duplicate malts', async () => {
    await flushPromises()
    const malts = wrapper.findAll('.malt > ul > li')
    const expectedMalts = ['Munich', 'Wheat', 'Caramalt', 'Amber']
    const renderedMalts = []
    malts.wrappers.filter(w => {
      renderedMalts.push(w.text())
    })
    expect(expectedMalts.sort()).toEqual(renderedMalts.sort())
  })
})
