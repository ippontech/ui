import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, configure, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponLinkButtonCard } from '../src';

configure({
  testIdAttribute: 'data-selector',
});

const getIpponLinkButtonCard = () => screen.getByTestId('ippon-link-button-card');

describe('IpponLinkButtonCard', () => {
  afterEach(cleanup);

  it('should render a link with button card classes', () => {
    render(
      <IpponLinkButtonCard href="/details" dataSelector="ippon-link-button-card">
        Content
      </IpponLinkButtonCard>,
    );

    const link = getIpponLinkButtonCard();

    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/details');
    expect(link).toHaveClass('ippon-button-card');
    expect(link).toHaveTextContent('Content');
  });

  describe('Shadow', () => {
    it.each(['l1', 'l2', 'l3', 'l4', 'l5', 'l6'] as const)('should have shadow %s', (level) => {
      render(
        <IpponLinkButtonCard href="/details" shadow={level} dataSelector="ippon-link-button-card">
          Content
        </IpponLinkButtonCard>,
      );

      expect(getIpponLinkButtonCard()).toHaveClass(`-shadow-${level}`);
    });
  });

  describe('Border', () => {
    it('should not have -border class by default', () => {
      render(
        <IpponLinkButtonCard href="/details" dataSelector="ippon-link-button-card">
          Content
        </IpponLinkButtonCard>,
      );

      expect(getIpponLinkButtonCard()).not.toHaveClass('-border');
    });

    it('should have -border class when border is present', () => {
      render(
        <IpponLinkButtonCard href="/details" border={true} dataSelector="ippon-link-button-card">
          Content
        </IpponLinkButtonCard>,
      );

      expect(getIpponLinkButtonCard()).toHaveClass('-border');
    });
  });

  describe('Full width', () => {
    it('should have -full-width class when fullWidth is present', () => {
      render(
        <IpponLinkButtonCard href="/details" fullWidth={true} dataSelector="ippon-link-button-card">
          Content
        </IpponLinkButtonCard>,
      );

      expect(getIpponLinkButtonCard()).toHaveClass('-full-width');
    });
  });

  describe('Size', () => {
    it.each(['small', 'large'] as const)('should be %s', (size) => {
      render(
        <IpponLinkButtonCard href="/details" size={size} dataSelector="ippon-link-button-card">
          Content
        </IpponLinkButtonCard>,
      );

      expect(getIpponLinkButtonCard()).toHaveClass(`-${size}`);
    });
  });

  describe('Color', () => {
    it.each(['success', 'error', 'information', 'warning'] as const)('should be %s', (color) => {
      render(
        <IpponLinkButtonCard href="/details" color={color} dataSelector="ippon-link-button-card">
          Content
        </IpponLinkButtonCard>,
      );

      expect(getIpponLinkButtonCard()).toHaveClass(`-${color}`);
    });
  });
});
