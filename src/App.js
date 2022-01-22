import React, { Component } from "react";
import { connect } from "react-redux";
import { ActivityIndicator, ActivityOverLay, AppWrapper } from "./App.styles";
import PageRoutes from "./router";

class App extends Component {
  render() {
    return (
      <AppWrapper isLoading={this.props.isLoading}>
        {this.props.isLoading ? (
          <ActivityOverLay>
            <ActivityIndicator></ActivityIndicator>
          </ActivityOverLay>
        ) : null}
        <PageRoutes />
      </AppWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.global.state == "loading" ? true : false,
  };
};
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(App);
