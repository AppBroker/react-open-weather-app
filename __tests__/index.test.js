/* eslint-env jest */
import React from 'react'
import ReactDOM from 'react-dom'
import IndexPage from '../pages/index'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

let wrapper

describe('Test: Home Page', () => {
  beforeAll(async () => {
    const props = await IndexPage.getInitialProps()
    wrapper = mount(<IndexPage {...props} />)
  })
  it('Renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(wrapper, div)
  })

  it('Renders a snapshot', () => {
    const tree = renderer.create(wrapper).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Renders the title as Weather', () => {
    expect(wrapper.find('h1').first().text()).toEqual('Weather')
  })

  it('Should contain a search field and submit button', () => {
  	const input = wrapper.find('input')
  	const submit = wrapper.find('.material_flatbutton')
  	expect(input.length).toBeGreaterThan(0)
  	expect(submit.length).toBeGreaterThan(0)
  })

  it('Typing a value into the input should update the value', () => {
  	const input = wrapper.find('input')
  	input.simulate('focus')
  	input.simulate('change', { target: { value: 'edinburgh' } })
  	expect(input.instance().value).toEqual('edinburgh')
  })
})
