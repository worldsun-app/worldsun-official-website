import GhostContentAPI from '@tryghost/content-api';

// Initialize the Ghost Content API client
const api = new GhostContentAPI({
    url: import.meta.env.VITE_GHOST_API_URL,
    key: import.meta.env.VITE_GHOST_CONTENT_API_KEY,
    version: "v5.0"
});

export interface GhostPost {
    id: string;
    uuid: string;
    title: string;
    slug: string;
    html: string;
    comment_id: string;
    feature_image: string;
    featured: boolean;
    visibility: string;
    created_at: string;
    updated_at: string;
    published_at: string;
    custom_excerpt: string;
    codeinjection_head: string | null;
    codeinjection_foot: string | null;
    custom_template: string | null;
    canonical_url: string | null;
    tags: Array<{
        id: string;
        name: string;
        slug: string;
        description: string | null;
        feature_image: string | null;
        visibility: string;
        meta_title: string | null;
        meta_description: string | null;
        url: string;
    }>;
    primary_author: {
        id: string;
        name: string;
        slug: string;
        profile_image: string | null;
        cover_image: string | null;
        bio: string | null;
        website: string | null;
        location: string | null;
        facebook: string | null;
        twitter: string | null;
        accessibility: string | null;
        meta_title: string | null;
        meta_description: string | null;
        url: string;
    };
    url: string;
    excerpt: string;
}

export const getFeaturedPosts = async (): Promise<GhostPost[]> => {
    try {
        return await api.posts
            .browse({
                limit: 3,
                filter: 'featured:true',
                include: ['tags', 'authors']
            })
            .catch((err) => {
                console.error("Error fetching featured posts:", err);
                return [];
            });
    } catch (error) {
        console.error("Ghost API Error:", error);
        return [];
    }
};

export const getLatestPosts = async (limit: number = 3): Promise<GhostPost[]> => {
    try {
        return await api.posts
            .browse({
                limit: limit,
                include: ['tags', 'authors']
            })
            .catch((err) => {
                console.error("Error fetching latest posts:", err);
                return [];
            });
    } catch (error) {
        console.error("Ghost API Error:", error);
        return [];
    }
};
