import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Container,  Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AppHeader from './AppHeader';
import classnames from 'classnames'
import AppCard from './common/Card';
import axios from 'axios';
import store from 'store'
export default class AppCms extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      products: [],
      title: '',
      categories: '',
      content: '',
      pictures: []
    };

    this.updateData = this.updateData.bind(this)
  }

  handleTitleChange = event => {
      this.setState({ title: event.target.value })
  }
  handleCategoriesChange = event => {
    this.setState({ categories: event.target.value })
  }
  handleContentChange = event => {
    this.setState({ content: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    axios.post('http://reduxblog.herokuapp.com/api/posts?key=product',
    {
        title: this.state.title,
        categories: this.state.categories,
        content: this.state.content
    }
    )
        .then(res => {
                alert('article was added')
                this.updateData()
                this.setState({ activeTab: '2' })
            // if(res.data.status === "FAIL"){
            //   alert('sorry anda tidak bisa login')
            // } else if(res.data.status === "admin") {
            //   this.props.link='/cms'
            //   } else if(res.data.status === "SU"){
                
            //   }
            }
        )
  }

  handleLogout = (e) => {
    store.remove('loggedIn');
    this.props.history.push('/login')
  }

  updateData(){
    axios.get('http://reduxblog.herokuapp.com/api/posts?key=products')
    .then(res => {
        this.setState({
          products: res.data
        })
    });
  }

  componentDidMount(){
    axios.get('http://reduxblog.herokuapp.com/api/posts?key=products')
    .then(res => {
        this.setState({
          products: res.data
        })
    });
  }

  handleDelete = postId => {
    axios.delete(`http://reduxblog.herokuapp.com/api/posts/${postId}?key=products`)
    .then(res => {
      console.log(res.data)
      alert('item removed')
      this.updateData()
    })
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    console.log('test', this.state.activeTab)
    const looping = this.state.products.map((prod, index) => {
        return(
          <Col md='4' key={index}>
          <AppCard
            image={prod.categories}
            title={prod.title}
            harga={prod.content}
            deleteId= {(e) => this.handleDelete(prod.id)}
            buttonName='delete'
            color='primary'
          />
        </Col>
        )}
      );
    return (
      <div>
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
              <Button onClick={this.handleLogout.bind(this)}>logout</Button>
                <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label for="Title" sm={2} size="lg">Title</Label>
                            <Col sm={10}>
                                <Input 
                                    type="text" 
                                    placeholder="Title" 
                                    bsSize="lg" 
                                    onChange={this.handleTitleChange}
                                    name= 'this.state.title'
                                />
                            </Col>
                            <Label for="Image" sm={2} size="lg">Image Link</Label>
                            <Col sm={10}>
                                <Input 
                                    type="text" 
                                    placeholder="Image Link" 
                                    bsSize="lg"
                                    onChange={this.handleCategoriesChange}
                                    name='this.state.categpries'
                                />
                            </Col>
                            <Label for="Content" sm={2} size="lg">Content</Label>
                            <Col sm={10}>
                                <Input 
                                    type="text" 
                                    placeholder="Content" 
                                    bsSize="lg"
                                    onChange={this.handleContentChange}
                                    name='this.state.content'
                                />
                            </Col>
                        </FormGroup>
                        <Button color='primary' type="submit"> submit </Button>
                </Form>
                <h1>upload images</h1>
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