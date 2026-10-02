import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicLayout from './components/layout/PublicLayout'
import LandingPage from './pages/landing/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import SignUpPage from './pages/auth/SignUpPage'
import AppLayout from './components/layout/AppLayout'
import PolicyManagement from './pages/admin/PolicyManagement'
import UserManagement from './pages/admin/UserManagement'
import KanbanPage from './features/kanban/pages/KanbanPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth">
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>
        </Route>
        <Route>
          <Route element={<AppLayout />}>
            <Route path='/kanban' element={<KanbanPage />} />
            <Route path='/admin' >
              <Route path='policy' element={<PolicyManagement />}/>
              <Route path='user' element={<UserManagement />}/>
            </Route>
            <Route path='/policy' element={<PolicyManagement />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App