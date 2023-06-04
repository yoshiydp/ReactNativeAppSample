// Constants
import * as TEXT from "constants/text";

export const validateProjectTitle = (projectTitle: string, setState: (value: string) => void) => {
  if (!projectTitle) {
    setState(TEXT.ERROR_EMPTY_PROJECT_TITLE);
  }
};
