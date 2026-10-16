'use client';

import { useState } from "react";
import type { AttachmentContext, EmbedAttachment, EmbedPost } from "@/lib/embed/protocol";
import { useEmbed } from "./EmbedProvider";

export function AttachmentAction({ id, label, post, attachment, context }: {
  id: string; label: string; post: EmbedPost; attachment: EmbedAttachment; context: AttachmentContext;
}) {
  const { performAction } = useEmbed();
  const [state, setState] = useState<{ status: "pending" | "success" | "failure"; message: string } | null>(null);
  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        disabled={!attachment.canDownload || state?.status === "pending"}
        className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-800"
        onClick={async () => {
          setState({ status: "pending", message: "Working…" });
          const result = await performAction({ actionId: id, post, attachment, context }, (message) => setState({ status: "pending", message }));
          setState(result);
        }}
      >
        {label}
      </button>
      <span role="status" aria-live="polite" className={`max-w-64 text-xs ${state?.status === "failure" ? "text-red-600 dark:text-red-400" : "text-gray-600 dark:text-gray-300"}`}>
        {!attachment.canDownload ? "Direct file unavailable." : state?.message}
      </span>
    </div>
  );
}
