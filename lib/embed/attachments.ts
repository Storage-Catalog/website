import type { ArchiveListItem } from "../archive";
import type { Attachment } from "../types";
import { attachmentURL } from "../github";
import { siteConfig } from "../siteConfig";
import { absoluteHttpUrl, type EmbedAttachment, type EmbedPost } from "./protocol";

export function embedPost(post: ArchiveListItem): EmbedPost {
  return { id: post.entry.id, code: post.entry.codes[0], title: post.entry.name, url: `${siteConfig.siteUrl}/archives/${encodeURIComponent(post.slug)}/` };
}
export function embedAttachment(att: Attachment, post: ArchiveListItem): EmbedAttachment {
  const url = absoluteHttpUrl(attachmentURL(post.channel.path, post.entry.path, att), siteConfig.siteUrl);
  return {
    id: att.id, kind: att.litematic ? "litematic" : att.wdl ? "wdl" : "other", name: att.name,
    downloadUrl: att.canDownload ? url : null, sourceUrl: att.url, canDownload: att.canDownload && !!url,
    contentType: att.contentType, sizeBytes: att.size, litematic: att.litematic, wdl: att.wdl,
  };
}
