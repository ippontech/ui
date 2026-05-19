import { File as FileNode } from 'buffer';

export const fakeTextFile = ({
  content,
  name,
  type,
}: {
  content: string;
  name: string;
  type: string;
}): File => {
  return new FileNode([content], name, { type }) as unknown as File;
};
