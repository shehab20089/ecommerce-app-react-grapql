import React, { Component } from "react";
import { Icon } from "../Base";
import {
  ImageSliderActionsContainer,
  ImageSliderContainer,
} from "./ImageSlider.styles";
import leftArrow from "../../assets/icons/leftArrow.svg";
import rightArrow from "../../assets/icons/rightArrow.svg";

export default class ImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = { selectImageIndex: 0 };
  }
  //   componentDidMount() {}
  handleImageChange = (direction) => {
    let newImageIndex =
      direction == "left"
        ? this.state.selectImageIndex - 1
        : this.state.selectImageIndex + 1;
    if (newImageIndex >= this.props.gallery.length) newImageIndex = 0;
    else if (newImageIndex < 0) newImageIndex = this.props.gallery.length - 1;
    this.setState({
      selectImageIndex: newImageIndex,
    });
  };
  render() {
    const { selectImageIndex } = this.state;
    const { gallery } = this.props;
    return (
      <ImageSliderContainer image={gallery[selectImageIndex]}>
        <ImageSliderActionsContainer>
          <Icon
            onClick={() => {
              this.handleImageChange("left");
            }}
            size={{ height: "13px", width: "13px" }}
            icon={leftArrow}
          ></Icon>
          <Icon
            onClick={() => {
              this.handleImageChange("right");
            }}
            size={{ height: "13px", width: "13px" }}
            icon={rightArrow}
          ></Icon>
        </ImageSliderActionsContainer>
      </ImageSliderContainer>
    );
  }
}
