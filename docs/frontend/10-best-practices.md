# 10. Best Practices

## Clean Code
1. **No Magic Strings**: Icons sizes should be `size={24}` not `size="24px"`.
2. **Prop Drilling**: Max depth of 2. If deeper, use Zustand or Context.
3. **Memoization**: Do not blindly wrap everything in `React.memo`. Only memoize computationally expensive components (like the Mapbox container).
4. **Imports**: Use absolute path aliases `@/components/ui/Button` instead of `../../../components/ui/Button`.
