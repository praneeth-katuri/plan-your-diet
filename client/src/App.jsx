import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          className: "text-sm font-medium",
          style: {
            borderRadius: "8px",
            background: "#fff",
            color: "#333",
          },
        }}
        position="top-center"
        reverseOrder={false}
      />
      <ScrollToTop />
      <AppRoutes />
    </>
  );
}

export default App;
