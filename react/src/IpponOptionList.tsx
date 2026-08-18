import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import type { DataSelectableWithChildren } from './DataSelectable.ts';
import { toChildSelector } from './DataSelectable.ts';
import { IpponOptionPlaceholder } from './IpponOption.tsx';

type IpponOptionListVanillaProps = {
  id: string;
  multiple?: boolean;
  busy?: boolean;
  placeholderRows?: number;
  labelledBy?: string;
  message?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

type IpponOptionListProps = DataSelectableWithChildren<IpponOptionListVanillaProps>;

const toOptionsSelector = toChildSelector('options');

const toFooterSelector = toChildSelector('footer');

const toMessageSelector = toChildSelector('message');

const toPlaceholderRows = (count = 0): number[] => [...Array(count).keys()];

const isBusy = (props: IpponOptionListProps): true | undefined =>
  props.busy || toPlaceholderRows(props.placeholderRows).length > 0 || undefined;

export const IpponOptionList = (props: IpponOptionListProps) => (
  <div className={clsx('ippon-option-list', props.className)} data-selector={props.dataSelector}>
    <div className="ippon-option-list--scroll">
      <ul
        id={props.id}
        role="listbox"
        aria-multiselectable={props.multiple || undefined}
        aria-busy={isBusy(props)}
        aria-labelledby={props.labelledBy}
        className="ippon-option-list--options"
        data-selector={toOptionsSelector(props.dataSelector)}
      >
        {props.children}
        {toPlaceholderRows(props.placeholderRows).map((index) => (
          <IpponOptionPlaceholder key={index} />
        ))}
      </ul>
      {props.footer === undefined ? null : (
        <div
          className="ippon-option-list--footer"
          data-selector={toFooterSelector(props.dataSelector)}
        >
          {props.footer}
        </div>
      )}
    </div>
    <div
      role="status"
      className="ippon-option-list--message"
      data-selector={toMessageSelector(props.dataSelector)}
    >
      {props.message}
    </div>
  </div>
);
