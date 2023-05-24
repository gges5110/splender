import { atomWithStorage } from "jotai/utils";

export const playerIDAtom = atomWithStorage<string | undefined>(
  "playerIDAtom",
  undefined
);
export const playerCredentialsAtom = atomWithStorage<string | undefined>(
  "playerCredentialsAtom",
  undefined
);
