import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, configure, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { IpponImportFile } from '../src';
import { fakeTextFile } from './File.fixture.ts';

configure({
  testIdAttribute: 'data-selector',
});

const getIpponImportFile = () => screen.getByTestId('ippon-import-file');

const expectToHaveClasses = (...classes: string[]) =>
  expect(getIpponImportFile()).toHaveClass('ippon-import-file', ...classes);

const getFileInput = () =>
  getIpponImportFile().querySelector('input[type="file"]') as HTMLInputElement;

describe('IpponImportFile', () => {
  beforeEach(cleanup);

  it('should be minimal', () => {
    render(
      <IpponImportFile
        title="Upload files"
        description="Click to browse"
        dataSelector="ippon-import-file"
      />,
    );

    expectToHaveClasses();
    expect(getFileInput()).toBeInTheDocument();
  });

  describe('dragover state', () => {
    it('should have dragover class when dragenter event fires', () => {
      render(
        <IpponImportFile
          title="Upload files"
          description="Click to browse"
          dataSelector="ippon-import-file"
        />,
      );

      fireEvent.dragEnter(getIpponImportFile());

      expectToHaveClasses('-dragover');
    });

    it('should not have dragover class when dragleave event fires and counter reaches 0', () => {
      render(
        <IpponImportFile
          title="Upload files"
          description="Click to browse"
          dataSelector="ippon-import-file"
        />,
      );

      fireEvent.dragEnter(getIpponImportFile());
      expectToHaveClasses('-dragover');

      fireEvent.dragLeave(getIpponImportFile());
      expect(getIpponImportFile()).not.toHaveClass('-dragover');
    });

    it('should not have dragover class after drop event', () => {
      render(
        <IpponImportFile
          title="Upload files"
          description="Click to browse"
          dataSelector="ippon-import-file"
        />,
      );

      fireEvent.dragEnter(getIpponImportFile());
      expectToHaveClasses('-dragover');

      fireEvent.drop(getIpponImportFile());
      expect(getIpponImportFile()).not.toHaveClass('-dragover');
    });

    it('should maintain dragover class with multiple dragenter events', () => {
      render(
        <IpponImportFile
          title="Upload files"
          description="Click to browse"
          dataSelector="ippon-import-file"
        />,
      );

      fireEvent.dragEnter(getIpponImportFile());
      fireEvent.dragEnter(getIpponImportFile());
      expectToHaveClasses('-dragover');

      fireEvent.dragLeave(getIpponImportFile());
      expectToHaveClasses('-dragover');

      fireEvent.dragLeave(getIpponImportFile());
      expect(getIpponImportFile()).not.toHaveClass('-dragover');
    });

    it('should not throw on dragover event', () => {
      render(
        <IpponImportFile
          title="Upload files"
          description="Click to browse"
          dataSelector="ippon-import-file"
        />,
      );

      expect(() => {
        fireEvent.dragOver(getIpponImportFile());
      }).not.toThrow();
    });
  });

  describe('file input', () => {
    it('should render hidden file input', () => {
      render(
        <IpponImportFile
          title="Upload files"
          description="Click to browse"
          dataSelector="ippon-import-file"
        />,
      );

      const input = getFileInput();
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'file');
    });

    it('should accept multiple files when multiple is true', () => {
      render(
        <IpponImportFile
          multiple={true}
          title="Upload files"
          description="Click to browse"
          dataSelector="ippon-import-file"
        />,
      );

      expect(getFileInput()).toHaveAttribute('multiple');
    });

    it('should accept specific file types when accept is provided', () => {
      render(
        <IpponImportFile
          accept=".pdf,.doc"
          title="Upload files"
          description="Click to browse"
          dataSelector="ippon-import-file"
        />,
      );

      expect(getFileInput()).toHaveAttribute('accept', '.pdf,.doc');
    });

    it('should have data-selector on input with .input suffix', () => {
      render(
        <IpponImportFile
          title="Upload files"
          description="Click to browse"
          dataSelector="ippon-import-file"
        />,
      );

      expect(getFileInput()).toHaveAttribute('data-selector', 'ippon-import-file.input');
    });

    it('should not have data-selector on input when dataSelector is not provided', () => {
      render(<IpponImportFile title="Upload files" description="Click to browse" />);

      const input = screen
        .getByRole('presentation')
        .closest('label')
        ?.querySelector('input[type="file"]');
      expect(input).not.toHaveAttribute('data-selector');
    });
  });

  describe('icon and text content', () => {
    it('should render icon with cloud-upload name', () => {
      render(
        <IpponImportFile
          title="Upload files"
          description="Click to browse"
          dataSelector="ippon-import-file"
        />,
      );

      const icon = getIpponImportFile().querySelector('.ippon-icon');
      expect(icon).toBeInTheDocument();
    });

    it('should render default text', () => {
      render(
        <IpponImportFile
          title="Drag and drop your files here"
          description="Or click to browse"
          dataSelector="ippon-import-file"
        />,
      );

      expect(getIpponImportFile()).toHaveTextContent('Drag and drop your files here');
      expect(getIpponImportFile()).toHaveTextContent('Or click to browse');
    });

    it('should render custom title', () => {
      render(
        <IpponImportFile
          title="Custom title text"
          description="Click to browse"
          dataSelector="ippon-import-file"
        />,
      );

      expect(getIpponImportFile()).toHaveTextContent('Custom title text');
      expect(getIpponImportFile()).toHaveTextContent('Click to browse');
    });

    it('should render custom description', () => {
      render(
        <IpponImportFile
          title="Upload files"
          description="Custom description text"
          dataSelector="ippon-import-file"
        />,
      );

      expect(getIpponImportFile()).toHaveTextContent('Upload files');
      expect(getIpponImportFile()).toHaveTextContent('Custom description text');
    });

    it('should render both custom title and description', () => {
      render(
        <IpponImportFile
          title="Custom title"
          description="Custom description"
          dataSelector="ippon-import-file"
        />,
      );

      expect(getIpponImportFile()).toHaveTextContent('Custom title');
      expect(getIpponImportFile()).toHaveTextContent('Custom description');
    });
  });

  describe('onChange', () => {
    it('should call onChange with single File in single mode', () => {
      const onChange = vi.fn();
      render(
        <IpponImportFile
          title="Upload file"
          description="Click to browse"
          onChange={onChange}
          dataSelector="ippon-import-file"
        />,
      );

      const input = getFileInput();
      const file = fakeTextFile({ content: 'content', name: 'test.txt', type: 'text/plain' });

      fireEvent.change(input, { target: { files: [file] } });

      expect(onChange).toHaveBeenCalledOnce();
      expect(onChange).toHaveBeenCalledWith(file);
    });

    it('should call onChange with File[] in multiple mode', () => {
      const onChange = vi.fn();
      render(
        <IpponImportFile
          title="Upload files"
          description="Click to browse"
          multiple={true}
          onChange={onChange}
          dataSelector="ippon-import-file"
        />,
      );

      const input = getFileInput();
      const file1 = fakeTextFile({ content: 'content1', name: 'test1.txt', type: 'text/plain' });
      const file2 = fakeTextFile({ content: 'content2', name: 'test2.txt', type: 'text/plain' });

      fireEvent.change(input, { target: { files: [file1, file2] } });

      expect(onChange).toHaveBeenCalledOnce();
      expect(onChange).toHaveBeenCalledWith([file1, file2]);
    });

    it('should not call onChange when files list is empty', () => {
      const onChange = vi.fn();
      render(
        <IpponImportFile
          title="Upload file"
          description="Click to browse"
          onChange={onChange}
          dataSelector="ippon-import-file"
        />,
      );

      const input = getFileInput();

      fireEvent.change(input, { target: { files: [] } });

      expect(onChange).not.toHaveBeenCalled();
    });

    it('should not throw error when onChange is not provided', () => {
      render(
        <IpponImportFile
          title="Upload file"
          description="Click to browse"
          dataSelector="ippon-import-file"
        />,
      );

      const input = getFileInput();
      const file = fakeTextFile({ content: 'content', name: 'test.txt', type: 'text/plain' });

      expect(() => {
        fireEvent.change(input, { target: { files: [file] } });
      }).not.toThrow();
    });

    it('should call onChange with single File when a file is dropped in single mode', () => {
      const onChange = vi.fn();
      render(
        <IpponImportFile
          title="Upload file"
          description="Click to browse"
          onChange={onChange}
          dataSelector="ippon-import-file"
        />,
      );

      const file = fakeTextFile({ content: 'content', name: 'test.txt', type: 'text/plain' });

      fireEvent.drop(getIpponImportFile(), { dataTransfer: { files: [file] } });

      expect(onChange).toHaveBeenCalledOnce();
      expect(onChange).toHaveBeenCalledWith(file);
    });

    it('should call onChange with File[] when files are dropped in multiple mode', () => {
      const onChange = vi.fn();
      render(
        <IpponImportFile
          title="Upload files"
          description="Click to browse"
          multiple={true}
          onChange={onChange}
          dataSelector="ippon-import-file"
        />,
      );

      const file1 = fakeTextFile({ content: 'content1', name: 'test1.txt', type: 'text/plain' });
      const file2 = fakeTextFile({ content: 'content2', name: 'test2.txt', type: 'text/plain' });

      fireEvent.drop(getIpponImportFile(), { dataTransfer: { files: [file1, file2] } });

      expect(onChange).toHaveBeenCalledOnce();
      expect(onChange).toHaveBeenCalledWith([file1, file2]);
    });

    it('should not call onChange when no files are dropped', () => {
      const onChange = vi.fn();
      render(
        <IpponImportFile
          title="Upload file"
          description="Click to browse"
          onChange={onChange}
          dataSelector="ippon-import-file"
        />,
      );

      fireEvent.drop(getIpponImportFile(), { dataTransfer: { files: [] } });

      expect(onChange).not.toHaveBeenCalled();
    });

    it('should call onChange twice when selecting the same file consecutively via input', () => {
      const onChange = vi.fn();
      render(
        <IpponImportFile
          title="Upload file"
          description="Click to browse"
          onChange={onChange}
          dataSelector="ippon-import-file"
        />,
      );

      const input = getFileInput();
      const file = fakeTextFile({ content: 'content', name: 'test.txt', type: 'text/plain' });

      // First selection
      fireEvent.change(input, { target: { files: [file] } });
      expect(onChange).toHaveBeenCalledOnce();
      expect(onChange).toHaveBeenCalledWith(file);

      // Second selection of the same file
      fireEvent.change(input, { target: { files: [file] } });
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith(file);
    });

    it('should call onChange twice when dropping the same file consecutively via drag & drop', () => {
      const onChange = vi.fn();
      render(
        <IpponImportFile
          title="Upload file"
          description="Click to browse"
          onChange={onChange}
          dataSelector="ippon-import-file"
        />,
      );

      const file = fakeTextFile({ content: 'content', name: 'test.txt', type: 'text/plain' });

      // First drop
      fireEvent.drop(getIpponImportFile(), { dataTransfer: { files: [file] } });
      expect(onChange).toHaveBeenCalledOnce();
      expect(onChange).toHaveBeenCalledWith(file);

      // Second drop of the same file
      fireEvent.drop(getIpponImportFile(), { dataTransfer: { files: [file] } });
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith(file);
    });
  });
});
