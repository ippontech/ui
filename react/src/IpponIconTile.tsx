import { clsx } from 'clsx';
import type { DataSelectable } from './DataSelectable.ts';
import { optionalToAlternativeClass } from './CAP.ts';
import type { IpponIconTileColor, IpponIconTileSize } from './IconTile.ts';
import type { IpponIonIcon, IpponIonProps } from './IpponIon.tsx';
import { IpponIon } from './IpponIon.tsx';

type IpponIconTileProps = DataSelectable<{
  icon: IpponIonIcon;
  color?: IpponIconTileColor;
  size?: IpponIconTileSize;
}>;

export const IpponIconTile = (props: IpponIconTileProps) => (
  <IpponIon
    {...(props.icon as IpponIonProps)}
    className={clsx(
      'ippon-icon-tile',
      optionalToAlternativeClass(props.color),
      optionalToAlternativeClass(props.size),
    )}
    dataSelector={props.dataSelector}
  />
);
