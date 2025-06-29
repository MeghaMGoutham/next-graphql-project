import Layout from '@/ui/Layout';

export default function NotFound() {
  return (
    <Layout>
      <div style={{ textAlign: 'center', marginTop: '2rem', color: 'white' }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for does not exist.</p>
      </div>
    </Layout>
  );
}
