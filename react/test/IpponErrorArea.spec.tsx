import { afterEach, describe, expect, it } from 'vitest';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponButton, IpponErrorArea } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

const getIpponErrorArea = () => screen.getByTestId('ippon-error-area');

const renderErrorArea = (children?: React.ReactNode) =>
  render(
    <IpponErrorArea
      title="Loading error"
      description="Something went wrong."
      dataSelector="ippon-error-area"
    >
      {children}
    </IpponErrorArea>,
  );

describe('IpponErrorArea', () => {
  afterEach(cleanup);

  it('should be like pattern library', () => {
    renderErrorArea();

    const errorArea = getIpponErrorArea();

    expect(errorArea).toHaveClass('ippon-error-area');
    expect(errorArea.querySelector('.ippon-icon-surface')).toHaveClass('-error');
    expect(errorArea).toHaveTextContent('Loading error');
    expect(errorArea).toHaveTextContent('Something went wrong.');
  });

  it('should have no detail without a detail message', () => {
    renderErrorArea();

    expect(getIpponErrorArea().querySelector('details')).not.toBeInTheDocument();
  });

  it('should render the action', () => {
    renderErrorArea(<IpponButton>Retry</IpponButton>);

    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('should render a string detail message behind a summary', () => {
    render(
      <IpponErrorArea
        title="Loading error"
        description="Something went wrong."
        detailLabel="Show details"
        detailMessage="Request failed with status 500"
        language="json"
        dataSelector="ippon-error-area"
      />,
    );

    const details = getIpponErrorArea().querySelector('details');

    expect(details).not.toHaveAttribute('open');
    expect(details).toHaveTextContent('Show details');
    expect(details?.querySelector('.ippon-code')).toHaveClass('language-json');
    expect(details).toHaveTextContent('Request failed with status 500');
  });

  it('should render the stack of an error detail message', () => {
    const error = new TypeError('Cannot read properties of undefined');
    error.stack = 'TypeError: Cannot read properties of undefined\n    at renderItem (list.js:42)';

    render(
      <IpponErrorArea
        title="Loading error"
        description="Something went wrong."
        detailLabel="Show details"
        detailMessage={error}
        dataSelector="ippon-error-area"
      />,
    );

    expect(getIpponErrorArea().querySelector('code')).toHaveTextContent(
      'at renderItem (list.js:42)',
    );
  });

  it('should fall back on the error message without a stack', () => {
    const error = new TypeError('Cannot read properties of undefined');
    error.stack = undefined;

    render(
      <IpponErrorArea
        title="Loading error"
        description="Something went wrong."
        detailLabel="Show details"
        detailMessage={error}
        dataSelector="ippon-error-area"
      />,
    );

    expect(getIpponErrorArea().querySelector('code')).toHaveTextContent(
      'Cannot read properties of undefined',
    );
  });
});
