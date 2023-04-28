import React from 'react';
import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import RdsAddressDetail from '../src/rds-address-detail/rds-address-detail';

describe('RdsAddressDetail component', () => {
  it('renders without icon', () => {
    render(
      <RdsAddressDetail
            header="Address"
            addressLine1="123 Main St"
            addressLine2="Apt 4"
            addressLine3="Anytown, USA" children={undefined} />
    );
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('123 Main St,')).toBeInTheDocument();
    expect(screen.getByText('Apt 4,')).toBeInTheDocument();
    expect(screen.getByText('Anytown, USA')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(
      <RdsAddressDetail
            withIcon={true}
            header="Address"
            addressLine1="123 Main St"
            addressLine2="Apt 4"
            addressLine3="Anytown, USA" children={undefined}      />
    );
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('123 Main St,')).toBeInTheDocument();
    expect(screen.getByText('Apt 4,')).toBeInTheDocument();
    expect(screen.getByText('Anytown, USA')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders with card border', () => {
    render(
      <RdsAddressDetail
            withIcon={true}
            cardborder={true}
            header="Address"
            addressLine1="123 Main St"
            addressLine2="Apt 4"
            addressLine3="Anytown, USA" children={undefined}      />
    );
    expect(screen.getByTestId('address-detail')).toHaveClass('card');
  });
});