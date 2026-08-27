import type { ReactNode } from 'react';
import { Optional } from './Optional.ts';

export const toSlot = (slot: ReactNode): Optional<ReactNode> =>
  Optional.ofFalsifiable(slot).filter((content) => content !== false);
