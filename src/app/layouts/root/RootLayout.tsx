import type { Metadata } from 'next';

import { Open_Sans } from 'next/font/google';

import {
  Box,
  ColorSchemeScript,
  Flex,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import NextTopLoader from 'nextjs-toploader';

import '@/app/globals.css';

import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

import { env } from '@/shared/env';

const openSans = Open_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-open-sans',
  display: 'swap',
});

const theme = createTheme({
  primaryColor: 'blue',

  fontFamily: 'var(--font-open-sans), Inter, Arial, sans-serif',
  fontFamilyMonospace: '"JetBrains Mono", monospace',

  defaultRadius: 'lg',
  defaultGradient: { from: 'blue.3', to: 'blue.9', deg: 135 },

  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.25)',
    md: '0 4px 12px rgba(0,0,0,0.35)',
    lg: '0 8px 24px rgba(0,0,0,0.45)',
  },

  components: {
    Button: {
      defaultProps: {
        fw: '400',
      },
    },
    Notification: {
      defaultProps: {
        radius: 'lg',
        withBorder: true,
      },
    },
  },
});

const siteUrl = env.CATALOG_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'Extensions Registry',
    template: '%s | Extensions Registry',
  },

  description: 'Find and download extensions for your app',

  applicationName: 'Extensions Registry',

  openGraph: {
    type: 'website',
    siteName: 'Extensions Registry',
    title: 'Extensions Registry',
    description: 'Find and download extensions for your app',
    url: '/',
  },
};

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={openSans.variable} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications
            autoClose={4000}
            limit={3}
            pauseResetOnHover="notification"
            position="top-right"
            zIndex={999999}
          />
          <NextTopLoader color="var(--mantine-color-blue-6)" showSpinner={false} />
          <Flex direction="column" mih="100dvh">
            <Header />
            <Box component="main" style={{ flex: 1 }}>
              {children}
            </Box>
            <Footer />
          </Flex>
        </MantineProvider>
      </body>
    </html>
  );
}
