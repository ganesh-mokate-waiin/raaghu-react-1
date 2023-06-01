import React from 'react';
import "@testing-library/jest-dom"
import { render, screen, fireEvent } from '@testing-library/react';
import RdsCompWebhookSubscription, { RdsCompWebhookSubscriptionProps } from '../src/rds-comp-webhook-subscriptions/rds-comp-webhook-subscriptions';

describe('RdsCompWebhookSubscription', () => {
  const mockWebhookItem = jest.fn();

  const defaultProps: RdsCompWebhookSubscriptionProps = {
    webhookItem: mockWebhookItem,
  };

  beforeEach(() => {
    render(<RdsCompWebhookSubscription {...defaultProps} />);
  });

  test('renders all input fields', () => {
    expect(screen.getByText('Webhook Endpoint')).toBeInTheDocument();
    expect(screen.getByText('Webhook Event')).toBeInTheDocument();
  });

  test('displays error message for invalid endpoint', () => {
    const endpointInput = screen.getByTestId('webhook-endpoint');
    fireEvent.change(endpointInput, { target: { value: 'invalid-url' } });

    const errorMessage = screen.getByText('Enter valid url');
    expect(errorMessage).toBeInTheDocument();
  });

  test('calls webhookItem with user data on form submission', () => {
    const endpointInput = screen.getByTestId('webhook-endpoint') as HTMLInputElement;
    const eventInput = screen.getByTestId('webhook-event')as HTMLInputElement;
    const headerKeyInput = screen.getByTestId('header-key') as HTMLInputElement;
    const headerValueInput = screen.getByTestId('header-value') as HTMLInputElement;
    const saveButton = screen.getByTestId('save');

    fireEvent.change(endpointInput, { target: { value: 'https://example.com/postreceive' } });
    fireEvent.change(eventInput, { target: { value: 'some-event' } });
    fireEvent.change(headerKeyInput, { target: { value: 'header-key' } });
    fireEvent.change(headerValueInput, { target: { value: 'header-value' } });

    fireEvent.click(saveButton);
    expect(endpointInput.value).toBe("https://example.com/postreceive")
    expect(eventInput.value).toBe("some-event")
    expect(headerKeyInput.value).toBe("header-key")
    expect(headerValueInput.value).toBe("header-value")
  });
});
