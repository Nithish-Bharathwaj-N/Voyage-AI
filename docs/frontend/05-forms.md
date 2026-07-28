# 05. Form System

VoyageAI forms are built on a strict triplet: **React Hook Form + Zod + Controlled Components**.

## The Formula
1. A Zod schema defines the exact structure and validation errors.
2. `useForm({ resolver: zodResolver(schema) })` binds it.
3. UI components (`<Input>`, `<Select>`) are completely unaware of validation logic; they simply receive `error` props and render `ring-destructive` classes.

No native HTML form validation is used.
