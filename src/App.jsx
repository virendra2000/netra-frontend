import './App.css'
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ConnectionStatus from "./Component/ConnectionStatus";
import Loader from "./Component/Loader";
// Lazily load all your routes
const Home = lazy(() => import('./Component/Home'));
const Register = lazy(() => import('./Component/Register'));
const ErrorPage = lazy(() => import('./Component/404NotFoundPage.jsx'));
const Dashboard = lazy(() => import('./Component/Dashboard.jsx'));
const AdminLogin = lazy(() => import('./Component/AdminLogin.jsx'));
const AdminDashboard = lazy(() => import('./Component/AdminDashboard.jsx'));
const AllotArea = lazy(() => import('./Component/AllotArea.jsx'));
const AllotSubArea = lazy(() => import('./Component/AllotSubArea.jsx'));
const AllotedArea = lazy(() => import('./Component/AllotedArea.jsx'));
const AllotedSubArea = lazy(() => import('./Component/AllotedSubArea.jsx'));
const AllotedAreaAdminView = lazy(() => import('./Component/AllotedAreaAdminView.jsx'));
const AllotedSubAreaAdminView = lazy(() => import('./Component/AllotedSubAreaAdminView.jsx'));
const ViewAlerts = lazy(() => import('./Component/ViewAlerts.jsx'));
const Demo = lazy(() => import('./Component/demo.jsx'));
function App() {
  return (
    <>
      <ConnectionStatus />
      <BrowserRouter>
      <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/*" element={<ErrorPage/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/AdminLogin" element={<AdminLogin/>}/>
        <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
        <Route path="/AllotArea" element={<AllotArea/>}/>
        <Route path="/AllotSubArea" element={<AllotSubArea/>}/>
        <Route path="/AllotedArea" element={<AllotedArea/>}/>
        <Route path="/AllotedSubArea" element={<AllotedSubArea/>}/>
        <Route path="/AllotedAreaAdminView" element={<AllotedAreaAdminView/>}/>
        <Route path="/AllotedSubAreaAdminView" element={<AllotedSubAreaAdminView/>}/>
        <Route path="/ViewAlerts" element={<ViewAlerts/>}/>
        <Route path="/demo" element={<Demo/>}/>
      </Routes>
      </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
