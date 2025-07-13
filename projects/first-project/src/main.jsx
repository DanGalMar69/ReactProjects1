import ReactDom from "react-dom/client";
import { Accordion } from "./Accordion";
import "./index.css";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(<Accordion />);
