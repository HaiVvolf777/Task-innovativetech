import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "./loader/Loader";
import Navbar from "./layout/Navbar";


const ViewUser = lazy(() => import("./pages/ViewUser"));
const UserForm = lazy(() => import("./pages/UserForm"));

// Lazy loading on a component

function App() {
  return (
    <>
    
    <Router>
      <Navbar/>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<ViewUser />} />
          <Route path="/create-user" element={<UserForm />} />
        </Routes>
      </Suspense>
    </Router>
    {/* Client Side Routing */}
    </>
  );
}

export default App;
