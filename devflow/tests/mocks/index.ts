export * from "./router.mock";
export * from "./toast.mock";
export * from "./editor.mock";
export * from "./nextauth.mock";

export const resetAllMocks = () => {
  jest.clearAllMocks();
};
