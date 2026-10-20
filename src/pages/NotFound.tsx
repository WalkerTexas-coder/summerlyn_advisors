import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
export default function NotFound() {
  return (
    <section className="container-x py-40 text-center">
      <SEO title="Page not found" description="This page doesn't exist." />
      <p className="eyebrow">404</p>
      <h1 className="h-section mt-4">Wrong number.</h1>
      <Link to="/" className="btn-primary mt-8">Back home</Link>
    </section>
  );
}
