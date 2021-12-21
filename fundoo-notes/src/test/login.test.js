import React from 'react';
import Login from '../pages/signIn';
import {shallow} from 'enzyme'

describe("name testing", () =>{
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  test("render the title of counter", () => {
    expect(wrapper.find("h1").text()).toContain("This is counter app");
  });
})