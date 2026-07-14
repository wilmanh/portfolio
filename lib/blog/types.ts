export type BlogPost = { id:number; slug:string; title:string; excerpt:string; content:string; createdAt:string; published:boolean };
export type NewBlogPost = Pick<BlogPost,"title"|"excerpt"|"content">;
export interface BlogRepository { findPublished():Promise<BlogPost[]>; findBySlug(slug:string):Promise<BlogPost|null>; findById(id:number):Promise<BlogPost|null>; create(post:NewBlogPost):Promise<BlogPost>; }
