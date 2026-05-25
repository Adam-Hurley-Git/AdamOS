export default function ProjectDashboard({ params }: { params: { projectId: string } }) {
  return (
    <div style={{ padding: '32px 48px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>Project {params.projectId} Dashboard</h1>
      <p style={{ color: '#64748b' }}>Welcome to the isolated project workspace.</p>
    </div>
  );
}
