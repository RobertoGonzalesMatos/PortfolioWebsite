import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRouts from "./AnimatedRouts";
import "./App.css";
/**
 * This is the highest level component!
 */
export interface IApplicationProps {}
function App() {
  return (
    <Router>
      <AnimatedRouts />
    </Router>
  );
}

export default App;
