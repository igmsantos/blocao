import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context'
import { Layout } from './components'
import {
  HomePage,
  GalleryPage,
  StorePage,
  InscriptionPage,
  ProfessionalsPage,
  SponsorsPage,
  AboutPage,
  DonationsPage,
  NewsPage,
  NotFoundPage,
  AdminPage,
} from './pages'

import './App.css'

function App() {
  return (
    <AppProvider>
      <Routes>
        {/* Admin - without layout */}
        <Route path="/admin" element={<AdminPage />} />
        
        {/* Public pages with layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/galeria/:albumId" element={<GalleryPage />} />
          <Route path="/loja" element={<StorePage />} />
          <Route path="/inscricao" element={<InscriptionPage />} />
          <Route path="/profissionais" element={<ProfessionalsPage />} />
          <Route path="/patrocinadores" element={<SponsorsPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/doacoes" element={<DonationsPage />} />
          <Route path="/noticias" element={<NewsPage />} />
          <Route path="/noticias/:articleId" element={<NewsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AppProvider>
  )
}

export default App
