import React, { Component } from 'react'
import AppHeader from './AppHeader';
import axios from 'axios';

class AppAbout extends Component {
    constructor(props){
        super(props);
        this.state={
            datas: []
        }
    }

    componentDidMount(){
        axios.get('http://simplepostapi.herokuapp.com/posts/')
        .then(response => {
          this.setState({ datas : response.data})
          console.log('hay', response.data)
        })
      }

  render() {
    return (
      <div>
        <h1>Iam About</h1>
      </div>
    )
  }
}

export default AppAbout;
