import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: "idle",
  numberOfRequestsIsLoading: 0,
  notificationsList: [],
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    changeAppNumberIsLoading: (state, action) => {
      state.numberOfRequestsIsLoading += action.payload;
      if (state.numberOfRequestsIsLoading > 0) state.state = "loading";
      else state.state = "idle";
    },
    notificationsInit: (state) => {
      state.notificationsList = state.notificationsList.filter((item) => {
        // ensure to wait for the hide duration
        if (item.isDeleted && Date.now() > 2 * item.duration + item.id) {
          return false;
        } else return true;
      });
    },
    addNotification: (state, action) => {
      state.notificationsList.push(action.payload);
    },
    removeNotification: (state, action) => {
      const notificationId = action.payload.id;
      const timer = action.payload.timer;

      const notificationIndex = state.notificationsList.findIndex(
        (n) => n.id == notificationId
      );
      state.notificationsList[notificationIndex].isDeleted = true;
      if (timer) clearTimeout(timer);
    },
  },
});

export const showNotification = (notificationObj) => (dispatch) => {
  const mappedNotification = notificationObj;
  mappedNotification.id = Date.now();
  dispatch(addNotification(notificationObj));
  let timer;
  if (mappedNotification.duration > 0)
    timer = setTimeout(() => {
      dispatch(removeNotification({ id: mappedNotification.id, timer: timer }));
    }, mappedNotification.duration);
};
export const initializeNotificationSystem = () => (dispatch) => {
  setInterval(() => {
    dispatch(notificationsInit());
  }, 60000);
};
export const {
  changeAppNumberIsLoading,
  addNotification,
  removeNotification,
  notificationsInit,
} = globalSlice.actions;
export default globalSlice.reducer;
