import "./App.css";
import Routers from './Router.js'
import Demo from './Demo'
import ScssDemo from './scssDemo'
function App() {
  return (
    <div className="App">
      <Routers />
    </div>
  );
}

export default App;

// @media screen and (min-width: 0px) and (max-width: 400px) {
//   #my-content { display: block; }  /* show it on small screens */
// }

// @media screen and (min-width: 401px) and (max-width: 1024px) {
//   #my-content { display: none; }   /* hide it elsewhere */
