# 26. Form Validation

We use Zod and React Hook Form (`@hookform/resolvers/zod`) to strictly enforce client-side validation.

- **Passwords**: Enforced minimum 8 characters. Passwords must match `confirmPassword`.
- **Emails**: Validated via `z.string().email()`.
- **Terms**: Users must explicitly accept the terms via `z.literal(true)` before the signup form will submit.
