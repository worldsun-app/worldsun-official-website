/// <reference types="vite/client" />

declare module '@tryghost/content-api' {
  interface GhostContentAPIOptions {
    url: string;
    key: string;
    version: string;
  }

  interface Params {
    limit?: number | string;
    page?: number | string;
    order?: string;
    include?: string | string[];
    fields?: string | string[];
    filter?: string;
    formats?: string | string[];
  }

  interface Posts {
    browse(options?: Params): Promise<any[]>;
    read(data: { id: string } | { slug: string }, options?: Params): Promise<any>;
  }

  class GhostContentAPI {
    constructor(options: GhostContentAPIOptions);
    posts: Posts;
    // Add other resources as needed
  }

  export default GhostContentAPI;
}
