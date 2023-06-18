import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders welcome text", () => {
  render(<App />);
  const welcomeText = screen.getByText(/welcome charles/i);
  expect(welcomeText).toBeInTheDocument();
});
