const ROUTES = {
  HOME: "/",
  ASK_QUESTION: "/ask-question",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  COLLECTION: "/collection",
  COMMUNITY: "/community",
  TAGS: "/tags",
  JOBS: "/jobs",
  PROFILE: (id: string) => `/profile/${id}`,
  QUESTION: (id: string) => `/questions/${id}`,
  TAG: (id: string) => `/tags/${id}`,
};

export default ROUTES;
