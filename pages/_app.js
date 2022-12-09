import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { theme } from '@chakra-ui/pro-theme'
import { RecoilRoot } from 'recoil'

import Layout from '../components/Layout.js'
import '../styles/globals.css'
import '../i18n'

import { ColorModeScript } from '@chakra-ui/react'

export default function MyApp({ Component, pageProps }) {
  const myTheme = extendTheme(
    {
      fonts: {
        heading: ' -apple-system, system-ui, sans-serif',
        body: ' -apple-system, system-ui, sans-serif',
      },
    },
    theme
  )
  return (
    <RecoilRoot>
      <ChakraProvider theme={myTheme}>
        <Layout>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  )
}
