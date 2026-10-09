import { defineMcp } from "@lovable.dev/mcp-js";
import listMembers from "./tools/list-members";
import getClassStructure from "./tools/get-class-structure";
import pickRandomStudent from "./tools/pick-random-student";

export default defineMcp({
  name: "xi-rpl-d-studio",
  title: "XI RPL D Studio",
  version: "0.1.0",
  instructions:
    "Public info about class XI RPL D (SMKN 8 Malang): list students, see the homeroom teacher and officers, and pick random students.",
  tools: [listMembers, getClassStructure, pickRandomStudent],
});
