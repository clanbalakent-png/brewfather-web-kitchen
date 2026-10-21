# Architecture
- Keep brewing formulas and unit conversions in a pure calculation module, separate from calculator definitions and the React view, so numerical behavior can be tested independently.
- Define calculator fields, defaults, validation limits and output labels in a typed registry so every calculator shares the same accessible form and result rendering.
- Run numerical calculator tests with `bun test src/lib/brewing.test.ts`; these tests do not depend on the browser.