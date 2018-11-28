//snippet rce
import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';

export class MovieCard extends Component {
  constructor(props) {
    super(props);
  }

  buttonHandler = () => {
    //console.log('buttonHandler: ', this.props.place.mapslink);
    window.open(this.props.place.mapslink); //open link with new window tab
  };

  buttonSearch = () => {
    //console.log('buttonSearch: ', this.props.place.youtubelink);
    //window.location = this.props.place.youtubelink;
    window.open(this.props.place.youtubelink);
  };

  render() {
    let {
      title,
      name,
      address,
      rating,
      mapslink,
      youtubelink,
      picturelink
    } = this.props.place;

    //console.log('render: ', mapslink);

    return (
      <div>
        <Card>
          <CardImg top width="100%" src={picturelink} alt="Card image cap" />
          <CardBody>
            <CardTitle>{name}</CardTitle>
            <br />
            <CardSubtitle>
              <strong>Address:</strong> {address}
            </CardSubtitle>
            <br />
            <CardSubtitle>
              <strong>Rating:</strong> {rating}
            </CardSubtitle>
            <br />
            <CardSubtitle>
              <strong>Google Maps Link:</strong>{' '}
              <button onClick={this.buttonHandler}>See Map</button>
            </CardSubtitle>
            <br />
            <CardSubtitle>
              <strong>Youtube Link:</strong>{' '}
              <button onClick={this.buttonSearch}>See Video</button>
            </CardSubtitle>
            <br />

            <Button
              color="primary"
              onClick={() => this.props.removeplace(title)}
            >
              Delete
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default MovieCard;
