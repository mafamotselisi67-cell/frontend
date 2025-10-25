import PRLRatingsTable from './PRLRatingsTable';

function PRLDashboard() {
  return (
    <div>
      <Sidebar role="prl" />
      <main className="container">
        <h2>Welcome PRL</h2>
        <PRLRatingsTable />
      </main>
    </div>
  );
}
