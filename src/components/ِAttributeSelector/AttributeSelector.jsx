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
    this.state = { selectedAttribute: "" };
  }
  handleItemChange = (item) => {
    this.setState({ selectedAttribute: item });
    this.props.onAttributeChange(item);
  };
  render() {
    const { id, name, items, type } = this.props.attribute;
    const { selectedAttribute } = this.state;

    return (
      <AttributeContainer key={id}>
        <AttributeTitle>{name}:</AttributeTitle>

        <AttributeSelection>
          {items.map((item) => {
            return type != "swatch" ? (
              <AttributeSelectionItem
                selected={selectedAttribute.value == item.value}
                onClick={() => this.handleItemChange(item)}
                key={item.id}
              >
                {item.value}
              </AttributeSelectionItem>
            ) : (
              <AttributeSelectionItemSwatch
                color={item.value}
                selected={selectedAttribute.value == item.value}
                onClick={() => this.handleItemChange(item)}
                size={{ height: "40px", width: "40px" }}
                key={item.id}
              ></AttributeSelectionItemSwatch>
            );
          })}
        </AttributeSelection>
      </AttributeContainer>
    );
  }
}
