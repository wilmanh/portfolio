import "server-only";
import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import type { BlogPost, BlogRepository, NewBlogPost } from "./types";

type Row={id:number;slug:string;title:string;excerpt:string;content:string;created_at:string;published:number};
const toPost=(row:Row):BlogPost=>({id:row.id,slug:row.slug,title:row.title,excerpt:row.excerpt,content:row.content,createdAt:row.created_at,published:Boolean(row.published)});
const slugify=(title:string)=>title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,70);

export class SqliteBlogRepository implements BlogRepository {
  private db:DatabaseSync;
  constructor(filename=process.env.BLOG_DATABASE_PATH ?? path.join(process.cwd(),"data","blog.db")){
    fs.mkdirSync(path.dirname(filename),{recursive:true}); this.db=new DatabaseSync(filename);
    this.db.exec("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, slug TEXT UNIQUE NOT NULL, title TEXT NOT NULL, excerpt TEXT NOT NULL, content TEXT NOT NULL, created_at TEXT NOT NULL, published INTEGER NOT NULL DEFAULT 1)");
  }
  async findPublished(){return (this.db.prepare("SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC").all() as unknown as Row[]).map(toPost)}
  async findBySlug(slug:string){const row=this.db.prepare("SELECT * FROM posts WHERE slug = ? AND published = 1").get(slug) as unknown as Row|undefined;return row?toPost(row):null}
  async findById(id:number){const row=this.db.prepare("SELECT * FROM posts WHERE id = ? AND published = 1").get(id) as unknown as Row|undefined;return row?toPost(row):null}
  async create(post:NewBlogPost){const base=slugify(post.title)||"entrada";const slug=`${base}-${Date.now().toString(36)}`;const createdAt=new Date().toISOString();const result=this.db.prepare("INSERT INTO posts (slug,title,excerpt,content,created_at,published) VALUES (?,?,?,?,?,1)").run(slug,post.title,post.excerpt,post.content,createdAt);return {id:Number(result.lastInsertRowid),slug,...post,createdAt,published:true}}
}
