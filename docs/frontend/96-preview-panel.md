# Quick Preview Panel (96)

Specification for the slide-over preview detail drawer.

## Layout Configuration
The preview panel uses a slide-out overlay panel anchored to the right side of the screen on desktop. On mobile, it automatically switches to a full-screen layout.

```text
[Header Image & Overlays (X, Heart)]
[Title, Location, Region Tags]
[Ratings | Duration | Completeness Grid]
[About Description text]
[Weather Info & Avg Temp Info card]
[Highlights & Food Chips]
[Plan Itinerary Button | View Details Button]
```

## Motion Controls
Uses Framer Motion `motion.div` to slide-in from `x: '100%'` to `x: 0` on mounting, and slides out to `x: '100%'` when unmounting. Includes a backdrop layer resolving to `opacity: 0.5`.
