import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CallList from './pages/CallList';
import CallListSuccess from './pages/CallListSuccess';
import Insights from './pages/Insights';
import InsightArticle from './pages/InsightArticle';
import Advisory from './pages/Advisory';
import About from './pages/About';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'call-list', element: <CallList /> },
      { path: 'call-list/success', element: <CallListSuccess /> },
      { path: 'call-lists', element: <Navigate to="/call-list" replace /> },
      { path: 'insights', element: <Insights /> },
      { path: 'insights/:slug', element: <InsightArticle /> },
      { path: 'advisory', element: <Advisory /> },
      { path: 'services', element: <Navigate to="/advisory" replace /> },
      { path: 'resources', element: <Navigate to="/insights" replace /> },
      { path: 'resources/*', element: <Navigate to="/insights" replace /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'signup', element: <Signup /> },
      { path: 'terms', element: <Terms /> },
      { path: 'privacy', element: <Privacy /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
