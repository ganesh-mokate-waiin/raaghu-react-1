import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompApiScopeBasicResource, {
  RdsCompApiScopeBasicResourceProps,
} from "../src/rds-comp-api-scope-basic-resource/rds-comp-api-scope-basic-resource";

describe("RdsCompApiScopeBasicResource", () => {
  const defaultProps: RdsCompApiScopeBasicResourceProps = {
    email: "test@example.com",
    fullname: "John Doe",
    message: "Test message",
    onSuccess: jest.fn(),
  };

  beforeEach(() => {
    render(<RdsCompApiScopeBasicResource {...defaultProps} />);
  });

  test("renders form elements", () => {
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Display name")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByTestId("cancel")).toBeInTheDocument();
    expect(screen.getByTestId("save")).toBeInTheDocument();
  });

  test("fills form fields and submits", () => {
    const nameInput = screen.getByTestId("name") as HTMLInputElement;
    const displayNameInput = screen.getByTestId(
      "display-name"
    ) as HTMLInputElement;
    const descInput = screen.getByTestId("desc") as HTMLTextAreaElement;
    const resourcesInput = screen.getByTestId(
      "resources"
    ) as HTMLTextAreaElement;
    const saveButton = screen.getByTestId("save") as HTMLButtonElement;

    fireEvent.change(nameInput, { target: { value: "test@example.com" } });
    fireEvent.change(displayNameInput, { target: { value: "Updated Name" } });
    fireEvent.change(descInput, { target: { value: "Updated Description" } });
    fireEvent.change(resourcesInput, {
      target: { value: "Updated Resources" },
    });
    fireEvent.click(saveButton);

    expect(defaultProps.onSuccess).toHaveBeenCalledWith({
      email: defaultProps.email,
      fullname: "Updated Name",
      message: "Updated Description",
      resource: "Updated Resources",
    });
  });

  test("initializes form fields with default values", () => {
    const nameInput = screen.getByTestId("name") as HTMLInputElement;
    const displayNameInput = screen.getByTestId(
      "display-name"
    ) as HTMLInputElement;
    const descInput = screen.getByTestId("desc") as HTMLTextAreaElement;
    const resourcesInput = screen.getByTestId(
      "resources"
    ) as HTMLTextAreaElement;
    expect(nameInput.value).toBe(defaultProps.email);
    expect(displayNameInput.value).toBe(defaultProps.fullname);
    expect(descInput.value).toBe(defaultProps.message);
    expect(resourcesInput.value).toBe("");
  });

  test('enables the "Save" button when the form is valid', () => {
    const nameInput = screen.getByTestId("name") as HTMLInputElement;
    const saveButton = screen.getByTestId("save") as HTMLButtonElement;
    fireEvent.change(nameInput, { target: { value: "Updated Name" } });
    expect(saveButton).toBeEnabled();
  });

  test("calls the onSuccess callback with correct data on form submission", () => {
    const saveButton = screen.getByTestId("save") as HTMLButtonElement;
    fireEvent.click(saveButton);
    expect(defaultProps.onSuccess).toHaveBeenCalledWith({
      email: defaultProps.email,
      fullname: defaultProps.fullname,
      message: defaultProps.message,
      resource: [],
    });
  });
});
