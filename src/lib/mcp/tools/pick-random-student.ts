import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { members } from "@/data/members";

export default defineTool({
  name: "pick_random_student",
  title: "Pick random students",
  description: "Randomly pick one or more distinct XI RPL D students.",
  inputSchema: {
    count: z.number().int().min(1).max(31).optional().describe("How many students to pick (default 1)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: false, openWorldHint: false },
  handler: ({ count }) => {
    const pool = [...members];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const picked = pool.slice(0, count ?? 1).map((m) => ({ id: m.id, name: m.name }));
    return {
      content: [{ type: "text", text: picked.map((m) => m.name).join(", ") }],
      structuredContent: { picked },
    };
  },
});
