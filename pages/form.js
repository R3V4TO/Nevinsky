export default function FormPage() {
  return (
    <div>
      <h1>Enter Energy Data</h1>
      <form action="/api/add-data" method="POST">
        <label>
          Line-to-Line Voltage:
          <input type="text" name="voltageLine" required />
        </label>
        <br />

        <label>
          Phase-to-Phase Voltage:
          <input type="text" name="voltagePhase" required />
        </label>
        <br />

        <label>
          Building Number:
          <input type="text" name="buildingNumber" required />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
