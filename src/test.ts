import { move } from "./apply";

export type User = {
    id: string;
    name: {
      first: string;
      last: string;
    }
    friends: {
      [topic: string]: Array<{ name: string }>
    }
  };
  
  export const user: User = {
    id: "userId",
    name: {
      first: "Marsh",
      last: "Mellow",
    },
    friends: {
      chess: [
        { name: "Magnus" },
        { name: "Fabi" },
      ],
    },
  };

move(user, ['id'], ['id'])