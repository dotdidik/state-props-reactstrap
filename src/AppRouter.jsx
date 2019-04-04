import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Induk from './Induk'
import AppAbout from './components/AppAbout';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style/Main.css'
import AppContact from './components/AppContact';
import AppCms from './components/AppCms';
import DetailPage from './components/DetailPage';
import Login from './components/Login';
export default class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
            <Route exact path='/' component={Induk} />
            <Route path='/:prodId' component={DetailPage} />
            <Route path='/about-me' component={AppAbout}/>
            <Route path='/products' component={AppContact}/>
            <Route path='/cms' component={AppCms}/>
            <Route path='/login' component={Login} />
        </div>
      </BrowserRouter>
    )
  }
}
