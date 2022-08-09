import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { createEmotionCache } from "../provider/provider";
import {
  HeadTag,
  MainLayout,
} from '../components/components';
import { store } from '../provider/provider';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps
  } = props;
  return (
    <React.Fragment>
      <CacheProvider value={emotionCache}>
        <HeadTag />
        <Provider store={store}>
          <CssBaseline />
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </Provider>
      </CacheProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp
