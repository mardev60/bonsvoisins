export type Meal = {
  id: number;
  name: string;
  description: string | null;
  id_author: number;
  collect_address: string | null;
  collect_code: string | null;
  date_start: string | null;
  date_end: string | null;
  photo_url: string | null;
  createdat: string | null;
  updatedat: string | null;
  command: Command[];
  conversation: Conversation[];
  // user: {
  //   first_name: string;
  // }
};

export type Command = {
  id: number;
  id_meal: number;
  id_collector: number;
  collectedat: string | null;
};

export type Conversation = {
  id: number;
  id_meal: number;
  id_user: number;
  message: Message[];
};

export type Message = {
  id: number;
  id_sender: number;
  id_receiver: number;
  id_conversation: number;
  content: string;
  createdat: string | null;
  updatedat: string | null;
  conversation: Conversation;
};

export interface CommandDetailed {
  id: number;
  name: string;
  image: string;
  date_start: Date;
  date_end: Date;
  collectedAt: Date | null;
  collect_status: string;
  user: string;
}

export interface GroupedCommands {
  [key: string]: CommandDetailed[];
}

export interface User {
  avatar: string;
  first_name: string;
  id: number;
  id_auth0: string;
  last_name: string;
  phone: string;
}
