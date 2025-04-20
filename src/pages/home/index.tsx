"use client";
import store from "src/redux/store";
import Home from "src/components/main/bodies/Home";
import { Provider } from "react-redux";
export default function HomeProvider(): JSX.Element {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
