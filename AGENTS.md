# Workspace Guidelines & Engineering Rules

This project adopts four core principles for code quality, architectural efficiency, and documentation:

## 1. Radical Simplicity & YAGNI (Ponytail)
- The best code is the code never written.
- Before writing code, adhere strictly to the ladder:
  1. Does this need to exist? (YAGNI)
  2. Does it already exist in this codebase? Reuse it.
  3. Does the standard library do it? Use it.
  4. Does a native platform feature cover it? Use it (<input type="date"> over datepicker libs, CSS over JS).
  5. Does an already-installed dependency solve it? Use it.
  6. Can this be one line? Keep it one line.
  7. Only then: write the minimum code that works.
- Fix root causes, not symptoms. Trace all callers before patching shared functions.
- No unrequested abstractions, factories, or premature boilerplate.

## 2. Intentional & Distinctive Frontend Design (Frontend Design)
- Avoid generic AI templates: no standard warm cream background (#F4F1EA) with terracotta accents, no generic SaaS card grids with identical borders and soft grey shadows.
- Make deliberate, opinionated choices about palette, typography, and hierarchy tailored specifically to the problem.
- Spend boldness in one place: create one memorable focal point, keep everything else disciplined and clean.
- Use motion purposefully: prefer responses to user action over generic load animations.

## 3. UI/UX Design Intelligence (UI/UX Pro Max)
- Prioritize high-contrast, fully accessible, and responsive components.
- Choose typography scales and color harmonies intentionally based on UX guidelines and domain requirements.

## 4. Plain Language & Authentic Technical Writing (Humanizer)
- Write concise, direct, human prose. Lead with the point.
- Eliminate AI tells: no staged run-ups, no artificial "Not X but Y" constructs, no forced three-part lists, no buzzword inflation ("delve", "landscape", "pivotal").
