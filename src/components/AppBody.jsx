import React, { Component } from 'react'
import AppCarousel from './common/AppCarousel';
import { Container, Row, Col} from 'reactstrap';
import AppCard from './common/Card';
import axios from 'axios';

export default class AppBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      topproducts:[],
      value: '',
      results: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.onChangeResult = this.onChangeResult.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  //get data with axios method GET
  componentDidMount(){
    axios.get('http://reduxblog.herokuapp.com/api/posts?key=products')
    .then(res => {
        this.setState({
          products: res.data
        })
    });
    axios.get('http://reduxblog.herokuapp.com/api/posts?key=topproducts')
    .then(res => {
        this.setState({
          topproducts: res.data
        })
    })
  }

  onChangeResult(){
    axios.get(`http://reduxblog.herokuapp.com/api/posts?key=${this.state.value}`)
    .then(res => {
        this.setState({
          results: res.data
        })
    })
  }

  render() {
    console.log('ini data', this.state.products)
    console.log('this value', this.state.value)
    const looping = this.state.products.map((prod, index) => {
      return(
        <Col md='4' key={index}>
        <AppCard
          image={prod.categories}
          title={prod.title}
          harga={prod.content}
        />
      </Col>
      )}
    );
    const top = this.state.topproducts.map((top, index) => {
      return(
        <Col md='4' key={index}>
        <AppCard
          image={top.categories}
          title={top.title}
          harga={top.content}
        />
        </Col>
      )
    });
    
    return (
      <div>
        <AppCarousel />
        <Container className="body-content">
          <h2>Products</h2>
          <Row className='d-flex'>
            {looping}
          </Row>
          <hr/>
          <h2>Top Products</h2>
          <Row className='d-flex'>
            {top}
          </Row>
          <hr/>
        
        </Container>
      </div>
    )
  }
}
