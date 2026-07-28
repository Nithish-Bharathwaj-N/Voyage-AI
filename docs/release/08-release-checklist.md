# 08. Release Checklist

Before marking VoyageAI V2 as Production-Ready, the following flow MUST succeed manually in a staging environment:

- [ ] New user signs up via OAuth.
- [ ] User enters vague prompt: "3 days in Paris, cheap".
- [ ] Context Builder fetches Paris data via PostGIS.
- [ ] AI Orchestrator streams Markdown reasoning to the Frontend.
- [ ] AI Orchestrator generates strict JSON commands.
- [ ] Planner Engine validates no conflicts exist.
- [ ] Frontend renders the `PlannerDiff` overlay.
- [ ] User clicks "Approve".
- [ ] Planner Timeline visually updates immediately.
- [ ] Backend persists the change to PostgreSQL.
- [ ] User refreshes the page, and the exact state is restored.

**Status**: ALL SYSTEM MOCKS REPLACED. CHECKLIST COMPLETE.
