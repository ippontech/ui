export type IpponGridColumns = 4 | 12;

export type IpponGridMediaBreakpoint = 'mobile' | 'tab' | 'desktop-s' | 'desktop-m';

export type IpponGridContainerBreakpoint = 's' | 'm' | 'l' | 'xl';

export type IpponGridResponsiveMedia = `${IpponGridMediaBreakpoint}-${IpponGridColumns}`;

export type IpponGridResponsiveContainer = `${IpponGridContainerBreakpoint}-${IpponGridColumns}`;

export type IpponGridMedia = IpponGridColumns | (IpponGridColumns | IpponGridResponsiveMedia)[];

export type IpponGridContainer =
  | IpponGridColumns
  | (IpponGridColumns | IpponGridResponsiveContainer)[];

type IpponGridGapSize = number;

type IpponGridGapBreakpoint = IpponGridMediaBreakpoint | IpponGridContainerBreakpoint;

type IpponGridResponsiveGap = `${IpponGridGapBreakpoint}-${IpponGridGapSize}`;

export type IpponGridGap = IpponGridGapSize | (IpponGridGapSize | IpponGridResponsiveGap)[];

type IpponGridSlotColumn = number;

type IpponGridSlotBreakpoint = IpponGridMediaBreakpoint | IpponGridContainerBreakpoint;

type IpponGridResponsiveSlotColumn = `${IpponGridSlotBreakpoint}-${IpponGridSlotColumn}`;

export type IpponGridCol =
  | IpponGridSlotColumn
  | (IpponGridSlotColumn | IpponGridResponsiveSlotColumn)[];
