import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { AuthProvider } from "~/contexts/AuthContext";
import { GlobalSettingProvider } from "~/contexts/GlobalSettingProvider";
import { LayoutProvider } from "~/contexts/LayoutProvider";
import Layout from "~/layouts";
import AdminLayout from "~/layouts/AdminLayout";
import ProtectedLayout from "~/layouts/ProtectedLayout";
import NotFoundPage from "~/pages/404";
import ContentManager from "~/pages/ContentManager";
import AdminSettings from "./pages/Admin Settings";
import Login from "~/pages/Login";
import CategoryPages from "~/pages/WebsiteCategoryPages";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalSettingProvider>
          <LayoutProvider>
            <Routes>
              <Route path="/login" exact element={<Login />} />
              <Route exact path="/secure" element={<ProtectedLayout />}>
                <Route path="" element={<AdminLayout />}>
                  <Route path=":type" exact element={<CategoryPages />} />
                  <Route path="*" exact element={<Navigate to="/secure" />} />
                </Route>
              </Route>
              <Route path="/" exact element={<Layout />}>
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="/:category" exact element={<CategoryPages />} />
                <Route path="*" exact element={<NotFoundPage />} />

                <Route exact path="/secure" element={<ProtectedLayout />}>
                  <Route path="content_manager" element={<ContentManager />} />
                  <Route path="admin_settings" exact element={<AdminSettings />} />
                </Route>
              </Route>
            </Routes>
          </LayoutProvider>
        </GlobalSettingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
