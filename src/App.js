import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ActivityIndicator,
  ActivityOverLay,
  AppWrapper,
  NotificationsContainer,
  NotificationItem,
} from "./App.styles";
import PageRoutes from "./router";
import {
  initializeNotificationSystem,
  removeNotification,
} from "./Store/Globals/global.slice";

class App extends Component {
  componentDidMount() {
    this.props.initializeNotificationSystem();
  }
  render() {
    return (
      <AppWrapper isLoading={this.props.isLoading}>
        {this.props.isLoading ? (
          <ActivityOverLay>
            <ActivityIndicator></ActivityIndicator>
          </ActivityOverLay>
        ) : null}
        <PageRoutes />

        <NotificationsContainer>
          {this.props.notificationsList.map((notification) => (
            <NotificationItem
              onClick={() =>
                this.props.removeNotification({ id: notification.id })
              }
              key={notification.id}
              deleted={notification.isDeleted}
            >
              {notification.text}
            </NotificationItem>
          ))}
        </NotificationsContainer>
      </AppWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.global.state === "loading" ? true : false,
    notificationsList: state.global.notificationsList,
  };
};

const mapDispatchToProps = { removeNotification, initializeNotificationSystem };
export default connect(mapStateToProps, mapDispatchToProps)(App);
