export interface MyFitnessNewsFeedResponse {
  props: Props;
}

export interface Props {
  pageProps: PageProps;
}

export interface PageProps {
  dehydratedState: DehydratedState;
}

export interface DehydratedState {
  mutations: any[];
  queries: Query[];
}

export interface Query {
  state: State;
  queryKey: string[];
  queryHash: string;
}

export interface State {
  data: MyFitnessNewsFeedData[][];
  dataUpdateCount: number;
  dataUpdatedAt: number;
  error: any;
  errorUpdateCount: number;
  errorUpdatedAt: number;
  fetchFailureCount: number;
  fetchMeta: any;
  isInvalidated: boolean;
  status: string;
  fetchStatus: string;
}

export interface MyFitnessNewsFeedData {
  id: string;
  type: string;
  created_at: string;
  likes_enabled: boolean;
  conversation_enabled: boolean;
  is_removable_by_user: boolean;
  is_commentable_by_user: boolean;
  correlation_id: number;
  data: Data;
  owner: Owner;
  likes: Likes;
  to_user_id: string;
}

export interface Data {
  text: string;
}

export interface Owner {
  user_id: string;
  username: string;
  relationship: string;
  profile_visibility: string;
  display_name: string;
  profile_photo_url: string;
}

export interface Likes {
  count: number;
  user_liked: boolean;
}
