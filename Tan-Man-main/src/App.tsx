import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import FeaturesPage from './pages/FeaturesPage';
import StressTestPage from './pages/features/StressTestPage';
import VirtualNaturePage from './pages/features/VirtualNaturePage';
import GamesPage from './pages/features/GamesPage';
import MoodTrackingPage from './pages/features/MoodTrackingPage';
import ReportsPage from './pages/features/ReportsPage';
import AISupport from './pages/features/AISupport';
import DietRecommendation from './pages/features/DietRecommendation';
import MeditationTimer from './pages/features/MeditationTimer';
import EmergencyPage from './pages/features/EmergencyPage';
import SubscriptionPage from './pages/SubscriptionPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { isInitialized } = useAuth();

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary-100 to-secondary-100">
        <div className="animate-pulse-slow flex flex-col items-center">
          <svg className="w-16 h-16 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.04Z M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24A2.5 2.5 0 0 0 14.5 2Z" />
          </svg>
          <p className="mt-4 text-lg font-medium text-primary-700">Loading Tan-Man...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          
          <Route path="/features" element={
            <ProtectedRoute>
              <FeaturesPage />
            </ProtectedRoute>
          } />
          
          <Route path="/features/stress-test" element={
            <ProtectedRoute>
              <StressTestPage />
            </ProtectedRoute>
          } />
          
          <Route path="/features/virtual-nature" element={
            <ProtectedRoute>
              <VirtualNaturePage />
            </ProtectedRoute>
          } />
          
          <Route path="/features/games" element={
            <ProtectedRoute>
              <GamesPage />
            </ProtectedRoute>
          } />
          
          <Route path="/features/mood-tracking" element={
            <ProtectedRoute>
              <MoodTrackingPage />
            </ProtectedRoute>
          } />
          
          <Route path="/features/reports" element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          } />
          
          <Route path="/features/ai-support" element={
            <ProtectedRoute>
              <AISupport />
            </ProtectedRoute>
          } />
          
          <Route path="/features/diet" element={
            <ProtectedRoute>
              <DietRecommendation />
            </ProtectedRoute>
          } />
          
          <Route path="/features/meditation" element={
            <ProtectedRoute>
              <MeditationTimer />
            </ProtectedRoute>
          } />
          
          <Route path="/features/emergency" element={<EmergencyPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;