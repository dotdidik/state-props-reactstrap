import React, { Component } from 'react'
import { Card, CardImg, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';

export default class AppCard extends Component {
  render() {
    return (
      <Card style={{marginTop:'20px'}}>
        <CardImg top width="100%" style={{width: '288px'}} src={this.props.image} alt="" />
        <CardBody>
          <CardTitle>{this.props.title}</CardTitle>
          <CardSubtitle>{this.props.harga}</CardSubtitle>
        </CardBody>
      </Card>
    )
  }
}
