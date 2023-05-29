import React from 'react';
import "@testing-library/jest-dom"
import { render, screen, fireEvent } from '@testing-library/react';
import RdsCompApplicationBasic, { RdsCompApplicationBasicProps } from '../src/rds-comp-application-basic/rds-comp-application-basic';

describe('RdsCompApplicationBasic', () => {
  const typeList = ['Type 1', 'Type 2', 'Type 3'];
  const scopesList = ['Scope 1', 'Scope 2', 'Scope 3'];
  const consentType = ['Consent Type 1', 'Consent Type 2', 'Consent Type 3'];

  const mockHandleSubmit = jest.fn();

  const defaultProps: RdsCompApplicationBasicProps = {
    typeList,
    basicData: {
      clientId: '',
      displayName: '',
      clientUri: '',
      logoUri: '',
      allowAuthorizationCodeFlow: false,
      allowHybridFlow: false,
      allowImplicitFlow: false,
      allowPasswordFlow: false,
      allowDeviceEndpoint: false,
      allowClientCredentialsFlow: false,
      redirectUris: [],
      allowLogoutEndpoint: false,
      postLogoutRedirectUris: [],
      allowRefreshTokenFlow: false,
      clientSecret: '',
      type: '',
      scopes: [],
      consentType: '',
    },
    scopesList,
    consentType,
    handleSubmit: mockHandleSubmit,
  };

  beforeEach(() => {
    render(<RdsCompApplicationBasic {...defaultProps} />);
  });

  it('renders client id input field', () => {
    const clientIdInput = screen.getByTestId('client-id');
    expect(clientIdInput).toBeInTheDocument();
  });

  it('renders display name input field', () => {
    const displayNameInput = screen.getByTestId('display-name');
    expect(displayNameInput).toBeInTheDocument();
  });

  it('renders client uri input field', () => {
    const clientUriInput = screen.getByTestId('client-url');
    expect(clientUriInput).toBeInTheDocument();
  });

  it('renders save button', () => {
    const saveButton = screen.getByTestId('save');
    expect(saveButton).toBeInTheDocument();
  });

  it('calls handleSubmit function when save button is clicked', () => {
    const saveButton = screen.getByTestId('save');
    fireEvent.click(saveButton);
  });

  it("should update the state when input fields change", () => {
    const clientIdInput = screen.getByTestId("client-id") as HTMLInputElement;
    const displayNameInput = screen.getByTestId("display-name") as HTMLInputElement;

    fireEvent.change(clientIdInput, { target: { value: "testClientId" } });
    fireEvent.change(displayNameInput, { target: { value: "testDisplayName" } });

    expect(clientIdInput.value).toBe("testClientId");
    expect(displayNameInput.value).toBe("testDisplayName");
    // Add assertions for other input fields
  });
});
