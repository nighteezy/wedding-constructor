export type Venue = {
  city: string;
  name: string;
  address: string;
};

export type ProgramItem = {
  time: string;
  title: string;
  description?: string;
};

export type Wedding = {
  couple: {
    bride: string;
    groom: string;
    displayName: string;
  };
  date: {
    iso: string;
    display: string;
  };
  venue: Venue;
  invitation: {
    greeting: string;
    message: string;
  };
  program: ProgramItem[];
};
