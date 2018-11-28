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
              <strong>Google Maps Link:</strong> {mapslink}
            </CardSubtitle>
            <br />
            <CardSubtitle>
              <strong>Youtube Link:</strong> {youtubelink}
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
