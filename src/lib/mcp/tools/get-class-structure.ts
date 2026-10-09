import { defineTool } from "@lovable.dev/mcp-js";
import { ketua, wakil, officers } from "@/data/officers";
import { teacher } from "@/data/teacher";

export default defineTool({
  name: "get_class_structure",
  title: "Get class structure",
  description: "Get the XI RPL D homeroom teacher and class officers.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const list = [ketua, wakil, ...officers].map((o) => ({ name: o.name, role: o.role, instagram: o.igHandle }));
    const homeroom = { name: teacher.name, subject: teacher.subject, instagram: teacher.igHandle };
    return {
      content: [{
        type: "text",
        text: `Wali Kelas: ${homeroom.name} (${homeroom.subject})\n` + list.map((o) => `${o.role}: ${o.name}`).join("\n"),
      }],
      structuredContent: { teacher: homeroom, officers: list },
    };
  },
});
