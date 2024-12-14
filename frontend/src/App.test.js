import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Routes', () => {
  test('renders Home component on default route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/JobPortal/i)).toBeInTheDocument(); // Adjust based on your Home component content
  });

  test('renders Login component on /login route', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument(); // Adjust based on your Login component content
  });

  test('renders Signup component on /signup route', () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Signup/i)).toBeInTheDocument(); // Adjust based on your Signup component content
  });

  test('renders Jobs component on /jobs route', () => {
    render(
      <MemoryRouter initialEntries={['/jobs']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Jobs/i)).toBeInTheDocument(); // Adjust based on your Jobs component content
  });

  test('renders ProtectedRoute for admin companies', () => {
    render(
      <MemoryRouter initialEntries={['/admin/companies']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Companies/i)).toBeInTheDocument(); // Adjust based on your Companies component content
  });

  test('renders ProtectedRoute for creating company', () => {
    render(
      <MemoryRouter initialEntries={['/admin/companies/create']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Create/i)).toBeInTheDocument(); // Adjust based on your CompanyCreate component content
  });

  test('renders PostJob component on /admin/jobs/create route', () => {
    render(
      <MemoryRouter initialEntries={['/admin/jobs/create']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Post Job/i)).toBeInTheDocument(); // Adjust based on your PostJob component content
  });
});
g