# 115 — Selection Model

## useTripsSelection Hook
Pure selection state hook — no side effects, no API calls.

| Method | Behavior |
|---|---|
| select(id) | Add to Set |
| deselect(id) | Remove from Set |
| toggleSelect(id, multi) | multi=false clears others first |
| selectAll(ids) | Replace Set with all ids |
| clearSelection() | Reset to empty Set |

## Keyboard Interactions
| Key | Behavior |
|---|---|
| Click | Select single (clears others) |
| Cmd/Ctrl + Click | Add to selection |
| Escape | Clear all selection |

## BulkActionBar
AnimatePresence spring-slide from bottom when `selectionCount > 0`.
Actions: Archive, Duplicate, Share, Export, Delete — all stubs for Sprint 7B.
