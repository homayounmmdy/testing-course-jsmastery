export * from "./router.mock";
export * from "./toast.mock";
export * from "./editor.mock";
export * from "./nextauth.mock";
export * from "./editdeleteaction.mock";
export * from "./image.mock";
export * from "./link.mock";
export * from "./metric.mock";

export const resetAllMocks = () => {
  jest.clearAllMocks();
};
