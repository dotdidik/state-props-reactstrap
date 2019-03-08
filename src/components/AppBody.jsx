import React, { Component } from 'react'
import AppCarousel from './common/AppCarousel';
import { Container, Row, Col } from 'reactstrap';
import AppCard from './common/Card';

export default class AppBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardImg: [
        {
          id: 1,
          title: 'pantai yang indah',
          image: 'https://i2.wp.com/content.phuket101.net/wp-content/uploads/20181015165943/phuket-best-beaches.jpg?resize=1200%2C630&ssl=1'
        },
        {
          id: 2,
          title: 'pantai yang indah 222',
          image: 'https://i2.wp.com/content.phuket101.net/wp-content/uploads/20181015165943/phuket-best-beaches.jpg?resize=1200%2C630&ssl=1'
        }
      ]
    }
  }
  render() {
    const looping = this.state.cardImg.map((cardItem, index) => {
      return(
        <Col md='4' key={index}>
        <AppCard
          title= {cardItem.title}
          image= {cardItem.image}
        />
      </Col>
      )}
    );
    return (
      <div>
        <AppCarousel />
        <Container className="body-content">
          <Row className='d-flex'>
            {looping}
          </Row>
        </Container>
      </div>
    )
  }
}
