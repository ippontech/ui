import type { DataSelectableWithChildren } from './DataSelectable.ts';
import { IpponCode } from './IpponCode.tsx';
import { IpponIcon } from './IpponIcon.tsx';
import { IpponIconSurface } from './IpponIconSurface.tsx';
import { IpponIon } from './IpponIon.tsx';
import { IpponText } from './IpponText.tsx';
import { IpponVSpace } from './IpponVSpace.tsx';

type IpponErrorAreaCommonProps = {
  title: string;
  description: string;
};

type IpponErrorAreaWithoutDetailProps = IpponErrorAreaCommonProps & {
  detailMessage?: never;
  detailLabel?: never;
  language?: never;
};

type IpponErrorAreaWithDetailProps = IpponErrorAreaCommonProps & {
  detailMessage: string | Error;
  detailLabel: string;
  language?: string;
};

type IpponErrorAreaVanillaProps = IpponErrorAreaWithoutDetailProps | IpponErrorAreaWithDetailProps;

type IpponErrorAreaProps = DataSelectableWithChildren<IpponErrorAreaVanillaProps>;

const toDetailContent = (detailMessage: string | Error): string => {
  if (detailMessage instanceof Error) {
    return detailMessage.stack ?? detailMessage.message;
  }
  return detailMessage;
};

export const IpponErrorArea = (props: IpponErrorAreaProps) => (
  <div className="ippon-error-area" data-selector={props.dataSelector}>
    <IpponVSpace gap={12} align="center">
      <IpponIconSurface color="error">
        <IpponIcon name="warning" variant="outline" size={24} />
      </IpponIconSurface>
      <IpponVSpace gap={4} align="center">
        <IpponText variant="body" weight="bold">
          {props.title}
        </IpponText>
        <IpponText variant="body" size="small" color="neutral-tertiary-inversed">
          {props.description}
        </IpponText>
      </IpponVSpace>
      {props.detailMessage && (
        <details className="ippon-error-area--detail">
          <summary className="ippon-error-area--summary">
            <IpponIon name="chevron-forward" className="ippon-error-area--chevron" />
            <IpponText variant="body" size="small" weight="bold">
              {props.detailLabel}
            </IpponText>
          </summary>
          <IpponCode
            className="ippon-error-area--code"
            language={props.language}
            dataSelector={props.dataSelector ? `${props.dataSelector}.detail` : undefined}
          >
            {toDetailContent(props.detailMessage)}
          </IpponCode>
        </details>
      )}
      {props.children}
    </IpponVSpace>
  </div>
);
