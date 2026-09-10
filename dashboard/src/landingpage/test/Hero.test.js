import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hero from "../home/Hero";

// Mock react-router-dom to handle Jest CJS resolution with react-router-dom v7
jest.mock("react-router-dom", () => ({
  Link: ({ to, children, ...rest }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));

describe("Hero Component", () => {
  test("renders the Hero component and image", () => {
    render(<Hero />);

    const heroImage = screen.getByTestId("hero-image");
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute("src", "/homeHero.png");
  });

  test("renders heading and description text", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", { name: /invest in everything/i });
    expect(heading).toBeInTheDocument();

    const subtitle = screen.getByText(/online platform to invest in stocks/i);
    expect(subtitle).toBeInTheDocument();
  });

  test("renders sign up button with correct link", () => {
    render(<Hero />);

    const signupButton = screen.getByRole("link", { name: /sign up now/i });
    expect(signupButton).toBeInTheDocument();
    expect(signupButton).toHaveAttribute("href", "/Signup");
  });
});