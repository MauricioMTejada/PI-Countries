import { Detail, Form, Home, Landing } from "./views"
//import NavBar from "./components/NavBar/NavBar";
import "./App.css";
//import { Route, useLocation } from "react-router-dom";
import { Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      {/* {useLocation().pathname !== '/' && <NavBar />} */}
      <Route exact path="/" component={Landing} />
      <Route path='/home/:id' component={Detail} />
      <Route path='/create' component={Form} />
      <Route exact path='/home' component={Home} />

    </div>
  );
} 

export default App;
