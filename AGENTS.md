# Architecture rules
- Student games use the existing member dataset and ephemeral React state, with shared draw logic in a hook; this keeps both game modes consistent without persistence.
- The student wheel renders SVG segments and uses transform-only rotation; this keeps selection alignment deterministic and animation independent of layout.