import { Navigate, Route, Routes } from 'react-router'
import { AppLayout } from './AppLayout'
import { LearningPage } from '../pages/LearningPage'
import { HomePage } from '../pages/HomePage'
import { DIYPage } from '../pages/DIYPage'
import { MapPage } from '../pages/MapPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import type { JSX } from 'react'
import { CitizenSciencePage } from '../pages/CitizenSciencePage'

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="map" element={<MapPage />} />
        <Route path="diy" element={<DIYPage />} />
        <Route path="contribute" element={<CitizenSciencePage />} />
        <Route path="learning" element={<LearningPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}