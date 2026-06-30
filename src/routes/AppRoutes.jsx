import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import About from '../pages/About'
import Contact from '../pages/Contact'
import ComponentDemo from '../pages/ComponentDemo'
import Home from '../pages/Home'
import Login from '../pages/Login'
import PropertyManager from '../pages/PropertyManager'
import Register from '../pages/Register'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="components-demo" element={<ComponentDemo />} />
        <Route path="login" element={<Login />} />
        <Route path="manage-properties" element={<PropertyManager />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
