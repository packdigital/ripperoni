export interface ImageNodeInput {
  id: string;
  src: string;
  [key: string]: unknown;
}

export interface Actions {
  createNode: Function;
  toucheNode: (arg: { nodeId: string }) => void;
  [key: string]: Function;
}

export interface Cache {
  get: Function;
  set: Function;
}

export interface ImageNodePluginArgs {
  actions: Actions;
  createNodeId: Function;
  store: object;
  cache: Cache;
  reporter: object;
  [key: string]: unknown;
}

export interface RemoteFileNode {
  id: string;
}
