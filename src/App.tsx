import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Analytics } from "@vercel/analytics/react";
function App() {
  return (
    <div className="min-h-screen bg-(--color-background)">
      <Navbar />
      <Home />
      <Analytics />
    </div>
  );
}

export default App;
