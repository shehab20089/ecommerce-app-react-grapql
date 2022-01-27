import React, { Component } from "react";
import {
  GalleryContainer,
  GalleryImageItemContainer,
  GalleryImage,
  GallerySelectedImage,
} from "./ImageGallery.styles";
import PropTypes from "prop-types";

export default class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: "",
    };
  }

  componentDidMount() {
    this.setState({
      selectedImage: this.props.images[0],
    });
  }
  componentDidUpdate(prevState) {
    if (this.props.images[0] !== prevState.images[0]) {
      this.setState({
        selectedImage: this.props.images[0],
      });
    }
  }

  render() {
    const { images } = this.props;
    const { selectedImage } = this.state;

    return (
      <GalleryContainer>
        <GalleryImageItemContainer>
          {images.map((image) => {
            return (
              <GalleryImage
                onClick={() => {
                  this.setState({
                    selectedImage: image,
                  });
                }}
                image={image}
                key={image}
              ></GalleryImage>
            );
          })}
        </GalleryImageItemContainer>
        <GallerySelectedImage image={selectedImage}></GallerySelectedImage>
      </GalleryContainer>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array,
};

ImageGallery.defaultProps = {
  images: [],
};
