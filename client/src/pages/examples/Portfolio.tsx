import Portfolio from "../Portfolio";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function PortfolioExample() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}
