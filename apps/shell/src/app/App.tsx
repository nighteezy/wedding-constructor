import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "@/app/routes/AppRouter";
import { Header } from "@/widgets/header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
}
