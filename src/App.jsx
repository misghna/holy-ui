import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { AuthProvider } from "~/context/AuthContext";
import Layout from "~/layouts";
import AdminLayout from "~/layouts/AdminLayout";
import ProtectedLayout from "~/layouts/ProtectedLayout";
import NotFoundPage from "~/pages/404";
import Login from "~/pages/Login";
import CategoryPages from "~/pages/WebsiteCategoryPages";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route exact path="/admin" element={<ProtectedLayout />}>
            <Route element={<AdminLayout />}>
              <Route index element={<div>DEMO</div>} />
              <Route path="*" exact element={<Navigate to="/admin" />} />
            </Route>
          </Route>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="/:category" exact element={<CategoryPages />} />
            <Route path="*" exact element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
