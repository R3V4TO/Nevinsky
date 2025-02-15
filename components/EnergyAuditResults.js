export default function EnergyAuditResults({ data }) {
    return (
      <div className="results">
        <h2>Audit Analysis</h2>
        <pre>{JSON.stringify(data.analysis, null, 2)}</pre>
        <h2>Energy Usage Data</h2>
        <pre>{JSON.stringify(data.energyUsage, null, 2)}</pre>
      </div>
    );
  }
  