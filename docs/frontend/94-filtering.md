# Advanced Filtering and Sorting (94)

Details the filter configurations, sorting strategies, and the mobile bottom-sheet drawer mechanisms.

## Filtering Parameters
- **Categories**: Filter destinations by categories (Beaches, Nature, Culture, Adventure, etc.).
- **Budget Range**: Matches `priceRange` configurations (`low`, `medium`, `high`, `luxury`).
- **Region**: Matches geographic continent fields.
- **Seasons & Travel Styles**: Evaluates suitability scores.
- **Min Rating**: Highlights highly-rated locations (e.g. 4.5+ stars).
- **Max Duration**: Standard range slider matching `durationWeeks`.

## Sorting Options
- `newest`: Reverse chronological ID matching.
- `popular`: Reviews count descending.
- `rating`: Star rating descending.
- `budget_low`: Price range weight ascending.
- `value`: Star rating divided by budget weight.
- `alphabetical`: Direct title comparison.

## Mobile Responsive Drawer
On mobile viewports, the desktop sidebar is hidden. In its place, a bottom sheet layout (`AnimatePresence` and `motion.div`) pops up from the bottom when clicking the "Filters" trigger bar.
