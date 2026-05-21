import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { seedArticlesIfEmpty } from './data/articles';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import EditorialPolicyPage from './pages/EditorialPolicyPage';
import CorrectionsPage from './pages/CorrectionsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import SearchPage from './pages/SearchPage';
import SubscribePage from './pages/SubscribePage';

// Admin imports
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminForgotPassword from './pages/admin/AdminForgotPassword';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPosts from './pages/admin/AdminPosts';
import AdminPostForm from './pages/admin/AdminPostForm';

function App() {
  // Seed Firestore with initial articles if collection is empty (runs once)
  useEffect(() => {
    seedArticlesIfEmpty().catch(console.error);
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/editorial-policy" element={<EditorialPolicyPage />} />
          <Route path="/corrections" element={<CorrectionsPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfUsePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/subscribe" element={<SubscribePage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />

          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="posts/new" element={<AdminPostForm />} />
            <Route path="posts/:id/edit" element={<AdminPostForm />} />
          </Route>

          {/* Catch-all: redirect to home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
