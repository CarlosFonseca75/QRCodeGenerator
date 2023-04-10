import { render, screen } from "@testing-library/react";
import Index from "@pages/index";

describe("Home", () => {
  // Mocking "modal-root" element.
  beforeEach(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  });

  // Removing "modal-root" element.
  afterEach(() => {
    const modalRoot = document.getElementById("modal-root");
    modalRoot.remove();
  });

  // Verify that index page is being rendered.
  it("renders a heading", () => {
    render(<Index />);

    const heading = screen.getByRole("heading", {
      name: /Get Started with QR Codes!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
