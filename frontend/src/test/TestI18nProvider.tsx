import i18n from 'i18next'
import type { ReactNode } from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'

import { ThemeProvider } from '@/context/ThemeContext'
import de from '@/i18n/locales/de.json'
import en from '@/i18n/locales/en.json'
import pl from '@/i18n/locales/pl.json'

const testI18n = i18n.createInstance()

void testI18n.use(initReactI18next).init({
  resources: {
    de: { translation: de },
    en: { translation: en },
    pl: { translation: pl },
  },
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'pl', 'de'],
  interpolation: {
    escapeValue: false,
  },
})

// eslint-disable-next-line react-refresh/only-export-components
export { testI18n }

export default function TestWrapper({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={testI18n}>
      <ThemeProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </ThemeProvider>
    </I18nextProvider>
  )
}
