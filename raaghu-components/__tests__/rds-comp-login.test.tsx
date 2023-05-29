import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompLogin from "../src/rds-comp-login/rds-comp-login";

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe("RdsCompLogin", () => {
  test("renders login form correctly", () => {
    render(
      <RdsCompLogin
        getvalidTenantName=""
        email=""
        password=""
        onLogin={() => {}}
        onForgotPassword={() => {}}
        onRegister={() => {}}
        currentTenant={{}}
        validTenant={{}}
        error={{ show: false, message: "" }}
      />
    );

    // Assert the presence of form elements
    expect(screen.getByText("Email/Username")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Remember me")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByText("Forgot password ?")).toBeInTheDocument();
    expect(screen.getByText("Don't Have An Account")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  test("calls onLogin when form is submitted", () => {
    const mockOnLogin = jest.fn();
    render(
      <RdsCompLogin
        getvalidTenantName=""
        email=""
        password=""
        onLogin={mockOnLogin}
        onForgotPassword={() => {}}
        onRegister={() => {}}
        currentTenant={{}}
        validTenant={{}}
        error={{ show: false, message: "" }}
      />
    );

    // Fill in the form
    fireEvent.change(screen.getByTestId("username"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByTestId("remember-me"));

    // Submit the form
    fireEvent.click(screen.getByTestId("login"));

    // Check if onLogin was called with the correct values
    expect(mockOnLogin).toHaveBeenCalledWith(
      "test@example.com",
      "password123",
      true
    );
  });

  test("calls onForgotPassword when 'Forgot password ?' is clicked", () => {
    const mockOnForgotPassword = jest.fn();
    render(
      <RdsCompLogin
        getvalidTenantName=""
        email=""
        password=""
        onLogin={() => {}}
        onForgotPassword={mockOnForgotPassword}
        onRegister={() => {}}
        currentTenant={{}}
        validTenant={{}}
        error={{ show: false, message: "" }}
      />
    );

    // Click on 'Forgot password ?' link
    fireEvent.click(screen.getByText("Forgot password ?"));

    // Check if onForgotPassword was called
    expect(mockOnForgotPassword).toHaveBeenCalled();
  });

  test("calls onRegister when 'Register' is clicked", () => {
    const mockOnRegister = jest.fn();
    render(
      <RdsCompLogin
        getvalidTenantName=""
        email=""
        password=""
        onLogin={() => {}}
        onForgotPassword={() => {}}
        onRegister={mockOnRegister}
        currentTenant={{}}
        validTenant={{}}
        error={{ show: false, message: "" }}
      />
    );

    // Click on 'Register' link
    fireEvent.click(screen.getByText("Register"));

    // Check if onRegister was called
    expect(mockOnRegister).toHaveBeenCalled();
  });

  test("displays error message when error prop is provided", () => {
    const error = { show: true, message: "Invalid credentials" };
    render(
      <RdsCompLogin
        getvalidTenantName=""
        email=""
        password=""
        onLogin={() => {}}
        onForgotPassword={() => {}}
        onRegister={() => {}}
        currentTenant={{}}
        validTenant={{}}
        error={error}
      />
    );

    // Assert the presence of the error message
    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  test("calls onDismissAlert when dismissing the error message", () => {
    const error = { show: true, message: "Invalid credentials" };
    const mockOnDismissAlert = jest.fn();
    render(
      <RdsCompLogin
        getvalidTenantName=""
        email=""
        password=""
        onLogin={() => {}}
        onForgotPassword={() => {}}
        onRegister={() => {}}
        currentTenant={{}}
        validTenant={{}}
        error={error}
        onDismissAlert={mockOnDismissAlert}
      />
    );

    // Click the dismiss button on the error message
    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    // Check if onDismissAlert was called
    expect(mockOnDismissAlert).toHaveBeenCalled();
  });
});
