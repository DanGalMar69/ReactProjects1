import React from "react";
import "./App.css";
import { TwiterCard } from "./TwiterCard";

export function App() {
  return (
    <React.Fragment>
      <TwiterCard userName="gobernador" name="cacahuate" />
      <TwiterCard userName="gobernador10" name="gobernador10" />
      <TwiterCard userName="gober" name="gobernador10" />
    </React.Fragment>
  );
}
