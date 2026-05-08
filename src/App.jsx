import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Listings from './pages/Listings'
import PropertyDetail from './pages/PropertyDetail'
import Ghosts from './pages/Ghosts'
import Agents from './pages/Agents'
import SubmitHaunting from './pages/SubmitHaunting'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Listings />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/ghosts" element={<Ghosts />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/submit" element={<SubmitHaunting />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
