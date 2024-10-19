// import WorkerExample from "./components/dedicated-worker/WorkerExample";
import SharedWorkerExample from "./components/shared-worker/SharedWorkerExample";

import "./app.css";

function App() {
  return (
    <div className="container">
      <SharedWorkerExample />
      {/* <WorkerExample /> */}
    </div>
  );
}

export default App;
