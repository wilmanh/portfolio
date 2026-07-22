"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "@/auth";
import { isAuthenticated } from "@/lib/auth";
import { getBlogRepository } from "@/lib/blog/repository";
import { sanitizePostHtml } from "@/lib/blog/sanitize";
import { LinkedInPublisher } from "@/lib/social/linkedin-publisher";
import { getSocialRepository } from "@/lib/social/repository";
const text=(form:FormData,key:string)=>String(form.get(key)??"").trim();
export async function loginWithGoogle(){await signIn("google",{redirectTo:"/blog/admin"})}
export async function logout(){await signOut({redirectTo:"/blog"})}
export async function createPost(form:FormData){if(!await isAuthenticated())redirect("/blog/login");const title=text(form,"title"),excerpt=text(form,"excerpt"),content=sanitizePostHtml(text(form,"content"));const plainText=content.replace(/<[^>]*>/g,"").trim();const containsImage=/<img\b/i.test(content);if(title.length<4||excerpt.length<10||(plainText.length<30&&!containsImage))redirect("/blog/admin?error=validation");const post=await getBlogRepository().create({title,excerpt,content});revalidatePath("/blog");redirect(`/blog/${post.slug}`)}
export async function publishToLinkedIn(form: FormData) { if (!(await isAuthenticated())) redirect("/blog/login"); const postId = Number(form.get("postId")); const post = Number.isInteger(postId) ? await getBlogRepository().findById(postId) : null; if (!post) redirect("/blog"); const repository = getSocialRepository(); const connection = await repository.getConnection("linkedin"); if (!connection) redirect("/blog/admin/social/linkedin?error=configuration"); try { const result = await new LinkedInPublisher().publish(post, connection); await repository.savePublication({ postId: post.id, platform: "linkedin", externalId: result.externalId, status: "published", error: null, publishedAt: new Date().toISOString() }); revalidatePath(`/blog/${post.slug}`); redirect(`/blog/${post.slug}?linkedin=published`); } catch (error) { await repository.savePublication({ postId: post.id, platform: "linkedin", externalId: null, status: "failed", error: error instanceof Error ? error.message : "Error de publicación", publishedAt: null }); redirect(`/blog/${post.slug}?linkedin=error`); } }
