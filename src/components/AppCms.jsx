import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Container } from 'reactstrap';
import AppHeader from './AppHeader';
import classnames from 'classnames'
import AppCard from './common/Card';
import axios from 'axios';

export default class AppCms extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      products: [],
    };
  }


  componentDidMount(){
    axios.get('http://reduxblog.herokuapp.com/api/posts?key=products')
    .then(res => {
        this.setState({
          products: res.data
        })
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
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
    return (
      <div>
          <AppHeader />
          <Container>
          <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Add Data
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              List Data
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <h4>Tab 1 Contents</h4>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
          <Row className='d-flex'>
            {looping}
          </Row>
          </TabPane>
        </TabContent>

          </Container>
      </div>
    );
  }
}