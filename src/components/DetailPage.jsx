import React, { Component } from 'react'
import AppHeader from './AppHeader';
import axios from 'axios';

export default class DetailPage extends Component {
  constructor(props){
    super(props);
    this.state = {
        detail: ''
    }
  }

  componentDidMount(){
      let detailId = this.props.match.params.prodId
      axios.get(`http://reduxblog.herokuapp.com/api/posts/${detailId}?key=topproducts`)
      .then(res => {
          console.log('data detail',res.data)
          this.setState({
              detail : res.data
          })
      })
  }
  render() {
    console.log('ini adalah properti detail', this.state.detail)
    const {title, categories, content} = this.state.detail
    return (
      <div>
          <AppHeader />
          <h1>{title}</h1>
          <img src={categories} alt="" srcset=""/>
          <h2>{content}</h2>
      </div>
    )
  }
}
