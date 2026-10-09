import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { members } from "@/data/members";

export default defineTool({
  name: "list_members",
  title: "List class members",
  description: "List XI RPL D students, optionally filtered by name or gender.",
  inputSchema: {
    query: z.string().optional().describe("Part of a student's name to search for."),
    gender: z.enum(["L", "P"]).optional().describe("L for male, P for female."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, gender }) => {
    const q = query?.toLowerCase().trim();
    const list = members
      .filter((m) => (!gender || m.gender === gender) && (!q || m.name.toLowerCase().includes(q)))
      .map((m) => ({ id: m.id, name: m.name, gender: m.gender, instagram: m.igHandle }));
    return {
      content: [{ type: "text", text: list.map((m) => `${m.id}. ${m.name} (${m.gender})`).join("\n") || "No members found." }],
      structuredContent: { members: list },
    };
  },
});
