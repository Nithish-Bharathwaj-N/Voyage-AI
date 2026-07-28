# 09. Performance Strategy

## Next.js Features
- **Server Components**: The default. Only components requiring interactivity (`onClick`, `useState`) will be marked with `"use client"`.
- **Image Optimization**: Using `next/image` connected to the `@voyageai/storage` (Cloudinary) layer to automatically serve WebP/AVIF images at the correct viewport size.
- **Route-level Code Splitting**: Handled natively by Next.js App Router.

## Virtualization
- Lists containing more than 50 items (e.g., searching for all restaurants in Paris) MUST use `@tanstack/react-virtual` to prevent DOM bloat.
