import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Resources from './pages/Resources';
import Article from './pages/Article';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'about', element: <About /> },
      { path: 'resources', element: <Resources /> },
      { path: 'resources/:slug', element: <Article /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);
