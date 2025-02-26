import './App.css'
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import { store } from "./app/store";
import { PublicRoutes, PrivateRoutes } from "./app/constants/routes";
import DiagramsPage from './features/diagrams/pages/DiagramsPage';
import { NotificationProvider } from './app/context/NotificationContext';
import { AppLayout } from './app/layouts/AppLayout';

function App() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route path={PublicRoutes.REGISTER} element={<Register />} />
              <Route path={PrivateRoutes.HOME} element={<DiagramsPage />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </NotificationProvider>
    </Provider>
  )
}

export default App
