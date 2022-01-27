import React, { Component } from "react";
import {
  AttributeContainer,
  AttributeSelection,
  AttributeSelectionItem,
  AttributeSelectionItemSwatch,
  AttributeTitle,
} from "./AttributeSelector.styles";

export default class AttributeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedAttribute: this.props.attribute.selectedItem };
  }
  // check props changes
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.attribute.selectedItem.id !==
      this.props.attribute.selectedItem.id
    )
      this.setState({ selectedAttribute: this.props.attribute.selectedItem });
  }
  handleItemChange = (item) => {
    this.setState({ selectedAttribute: item });
    this.props.onAttributeChange(item, this.props.attribute.id);
  };
  render() {
    const { name, items, type } = this.props.attribute;
    const { size } = this.props;
    const { selectedAttribute } = this.state;

    return (
      <AttributeContainer>
        <AttributeTitle size={size}>{name}:</AttributeTitle>
        <AttributeSelection>
          {items.map((item) => {
            return type !== "swatch" ? (
              <AttributeSelectionItem
                size={size}
                selected={selectedAttribute.value === item.value}
                onClick={() => this.handleItemChange(item)}
                key={item.id}
              >
                {item.value}
              </AttributeSelectionItem>
            ) : (
              <AttributeSelectionItemSwatch
                color={item.value}
                selected={selectedAttribute.value === item.value}
                onClick={() => this.handleItemChange(item)}
                size={{
                  height: size !== "mini" ? "45px" : "24px",
                  width: size !== "mini" ? "45px" : "24px",
                }}
                key={item.id}
              ></AttributeSelectionItemSwatch>
            );
          })}
        </AttributeSelection>
      </AttributeContainer>
    );
  }
}
