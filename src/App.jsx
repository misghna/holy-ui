import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "~/layouts";
import Home from "~/pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index exact element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
