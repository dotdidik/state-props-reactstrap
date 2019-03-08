import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class AppCard extends Component {
  render() {
    return (
      <Card>
        <CardImg top width="100%" src={this.props.image} alt={this.props.alt} />
        <CardBody>
          <CardTitle>{this.props.title}</CardTitle>
          <CardSubtitle>{this.props.subtitle}</CardSubtitle>
          <CardText>{this.props.content}</CardText>
          <Button>{this.props.button}</Button>
        </CardBody>
      </Card>
    )
  }
}
