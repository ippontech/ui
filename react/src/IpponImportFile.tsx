import { clsx } from 'clsx';
import type { ChangeEvent, DragEvent } from 'react';
import { useRef, useState } from 'react';
import { Optional } from './Optional.ts';
import type { DataSelectable } from './DataSelectable.ts';
import { IpponIcon } from './IpponIcon.tsx';
import { IpponText } from './IpponText.tsx';
import { IpponVSpace } from './IpponVSpace.tsx';
import { toAlternativeClass } from './CAP.ts';

type IpponImportFileCommonProps = {
  accept?: string;
  title: string;
  description: string;
};

type IpponImportFileSingleProps = IpponImportFileCommonProps & {
  multiple?: false;
  onChange?: (file: File) => void;
};

type IpponImportFileMultipleProps = IpponImportFileCommonProps & {
  multiple: true;
  onChange?: (files: File[]) => void;
};

type IpponImportFileVanillaProps = IpponImportFileSingleProps | IpponImportFileMultipleProps;

type IpponImportFileProps = DataSelectable<IpponImportFileVanillaProps>;

const getFileForOnChange = (files: FileList): File => files[0];

const getFilesForOnChange = (files: FileList): File[] => Array.from(files);

const importOnChange = (props: IpponImportFileProps) => (files: FileList) => {
  if (!props.onChange) {
    return;
  }
  if (props.multiple) {
    props.onChange(getFilesForOnChange(files));
    return;
  }
  props.onChange(getFileForOnChange(files));
};

export const IpponImportFile = (props: IpponImportFileProps) => {
  const [isDragover, setIsDragover] = useState(false);
  const dragCounterRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const resetFile = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const importFiles = (files: FileList) => {
    importOnChange(props)(files);
    resetFile();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    Optional.ofNullable(event.target.files)
      .filter((files) => files.length > 0)
      .ifPresent(importFiles);
  };

  const handleDragEnter = () => {
    dragCounterRef.current += 1;
    setIsDragover(true);
  };

  const handleDragLeave = () => {
    dragCounterRef.current -= 1;
    if (dragCounterRef.current === 0) {
      setIsDragover(false);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    dragCounterRef.current = 0;
    setIsDragover(false);
    Optional.ofFalsifiable(event.dataTransfer?.files)
      .filter((files) => files.length > 0)
      .ifPresent(importFiles);
  };

  return (
    <label
      className={clsx('ippon-import-file', {
        [toAlternativeClass('dragover')]: isDragover,
      })}
      data-selector={props.dataSelector}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <IpponVSpace gap={8} align="center">
        <div className="ippon-import-file--icon">
          <IpponIcon name="cloud-upload" size={24} />
        </div>
        <IpponVSpace gap={4} align="center">
          <IpponText variant="body" weight="bold">
            {props.title}
          </IpponText>
          <IpponText variant="body" size="small" color="neutral-tertiary-inversed">
            {props.description}
          </IpponText>
        </IpponVSpace>
      </IpponVSpace>
      <input
        ref={inputRef}
        type="file"
        className="ippon-import-file--input"
        multiple={props.multiple}
        accept={props.accept}
        onChange={handleChange}
        data-selector={props.dataSelector ? `${props.dataSelector}.input` : undefined}
      />
    </label>
  );
};
