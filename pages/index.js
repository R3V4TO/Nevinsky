import { useState, useEffect } from "react";
import EnergyChart from "../components/EnergyChart";
import InputForm from "../pages/form";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const [energyData, setEnergyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setEnergyData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <Sidebar />
      <h1>Energy Usage Dashboard</h1>
      <InputForm onSubmit={(data) => console.log(data)} />
      {loading ? <p>Loading...</p> : <EnergyChart data={energyData} />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}
