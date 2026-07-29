export type WeddingResponse = {
  slug: string;
  couple: {
    bride: string;
    groom: string;
    displayName: string;
  };
  date: {
    iso: string;
    display: string;
  };
  venue: {
    city: string;
    name: string;
    address: string;
  };
  invitation: {
    greeting: string;
    message: string;
  };
  program: Array<{
    time: string;
    title: string;
    description?: string;
  }>;
};
