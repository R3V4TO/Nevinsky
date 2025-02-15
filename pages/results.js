import { useState } from "react";

export default function Results() {
  const [analysis, setAnalysis] = useState("");

  const fetchAnalysis = async () => {
    const response = await fetch("/api/analyze", { method: "POST", body: JSON.stringify({ energyData: [] }) });
    const data = await response.json();
    setAnalysis(data.analysis);
  };

  return (
    <div>
      <h1>Energy Analysis Results</h1>
      <button onClick={fetchAnalysis}>Analyze</button>
      <p>{analysis}</p>
    </div>
  );
}
