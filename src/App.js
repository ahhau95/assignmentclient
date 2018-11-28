import React, { Component } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import axios from 'axios';

import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      title: '',
      location: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  //for popup
  onDismiss() {
    this.setState({ alertVisible: false });
  }

  getallplace = () => {
    axios
      .get('https://powerful-headland-97969.herokuapp.com/getallplace')
      .then(result => {
        this.setState({ location: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getallplace();
  }

  //for form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });

    const query = `https://powerful-headland-97969.herokuapp.com/getplace?title=${
      this.state.title
    }`;

    console.log(query);

    axios
      .get(query)
      .then(result => {
        console.log(result.data);
        if (result.data === 'Not found') {
          this.setState({ alertVisible: true });
        }
        this.getallplace();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.title]: e.target.value
    });
  }

  removeplace(title) {
    this.setState({
      location: this.state.location.filter(place => {
        if (place.title !== title) return place;
      })
    });
    const query = `https://powerful-headland-97969.herokuapp.com/deleteplace?title=${title}`;
    axios
      .get(query)
      .then(result => {
        this.getallplace();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }

  render() {
    let movieCards = this.state.location.map(place => {
      return (
        <Col sm="4" key={place.title}>
          <MovieCard removeplace={this.removeplace.bind(this)} place={place} />
        </Col>
      );
    });
    return (
      <div className="App">
        <Jumbotron id="jumboheader">
          <h1 className="display-4">Place Search</h1>
          <p className="lead">Search for place information and youtube link</p>
        </Jumbotron>
        <Container>
          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Movie not found
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="title">Enter the place</Label>
                  <Input
                    title="title"
                    placeholder="Enter place name"
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button color="primary">Submit</Button>
              </Form>
            </Col>
          </Row>
          <p />
          <Row>{movieCards}</Row>
        </Container>
      </div>
    );
  }
}

export default App;
