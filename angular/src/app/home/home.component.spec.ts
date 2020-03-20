// This shows a different way of testing a component, check about for a simpler one
import { Component } from '@angular/core';

import { TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('Home Component', () => {
  const html = '<my-home></my-home>';

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [HomeComponent, TestComponent]});
    TestBed.overrideComponent(TestComponent, { set: { template: html }});
  });

});

@Component({selector: 'my-test', template: ''})
class TestComponent { }
