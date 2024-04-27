import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { AuthProvider } from "~/contexts/AuthContext";
import { GlobalSettingProvider } from "~/contexts/GlobalSettingProvider";
import { LayoutProvider } from "~/contexts/LayoutProvider";
import Layout from "~/layouts";
import AdminLayout from "~/layouts/AdminLayout";
import ProtectedLayout from "~/layouts/ProtectedLayout";
import NotFoundPage from "~/pages/404";
import AdminSettings from "~/pages/AdminSettings";
import ContentManager from "~/pages/ContentManager";
import Login from "~/pages/Login";
import CategoryPages from "~/pages/WebsiteCategoryPages";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalSettingProvider>
          <LayoutProvider>
            <Routes>
              <Route path="/login" element={<Login />} />

              {/* Routes for admin panel */}
              <Route path="/admin/*" element={<ProtectedLayout />}>
                <Route index element={<AdminLayout />} />
                <Route path=":type" element={<CategoryPages />} />
                <Route path="*" element={<Navigate to="/admin" />} />
              </Route>

              {/* Routes for regular users */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="/:category" element={<CategoryPages />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Routes for secure/admin functionalities */}
              <Route path="/secure/*" element={<ProtectedLayout />}>
                <Route index element={<Navigate to="/secure/content_manager" replace />} />
                <Route path="content_manager" element={<ContentManager />} />
                <Route path="admin_settings" element={<AdminSettings />} />
              </Route>
            </Routes>
          </LayoutProvider>
        </GlobalSettingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
