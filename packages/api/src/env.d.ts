declare global {
  const process: {
    env: {
      API_URL?: string;
      WEDDING_SLUG?: string;
    };
  };
}

export {};
