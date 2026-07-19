# VoyageAI Backend — Trip Management Core (Sprint 3)

Welcome to the **Trip Management Module** documentation for VoyageAI. This module forms the core of our collaborative trip storage engine, providing transactional CRUD pathways, member collaborator authorization checking, and activity mapping.

---

## 🏗️ Architecture Layout

The module follows a highly modular, decoupled NestJS architecture:

```
src/trip/
├── controllers/
│   ├── trip.controller.ts          # Routes for trips CRUD, archives, copies, invites
│   ├── destination.controller.ts   # Routes for adding and managing trip destinations
│   └── activity.controller.ts      # Routes for managing destination-specific activities
├── services/
│   ├── trip.service.ts             # Core business logic, transactional duplicating, access verification
│   ├── destination.service.ts      # Destination database CRUD logic
│   └── activity.service.ts         # Activity database CRUD logic
├── dto/
│   ├── create-trip.dto.ts          # Validation rules for trip creation
│   ├── update-trip.dto.ts          # Validation rules for updating trip properties
│   ├── trip-response.dto.ts        # Swagger types representing trip payloads
│   ├── destination.dto.ts          # Creation, update, and response DTOs for destinations
│   ├── activity.dto.ts             # Creation, update, and response DTOs for activities
│   └── invitation.dto.ts           # Collaborator invite validation schemas
└── trip.module.ts                  # NestJS dependency injection graph compiler
```

---

## 🔒 Authorization Policy

Access is validated at the service layer in a single query via `TripService.verifyAccess`, checking the caller's membership status inside the `TripMember` join table:

| Route / Action | Owner | Editor | Viewer | Guest / Stranger |
| :--- | :---: | :---: | :---: | :---: |
| **Create Trip** | Allowed | Allowed | Allowed | Allowed (Authenticated) |
| **Read Trip (Private/Shared)** | Allowed | Allowed | Allowed | Denied |
| **Read Trip (Public)** | Allowed | Allowed | Allowed | Allowed |
| **Update Trip Header** | Allowed | Allowed | Denied | Denied |
| **Delete Trip** | Allowed | Denied | Denied | Denied |
| **Archive Trip** | Allowed | Denied | Denied | Denied |
| **Duplicate Trip** | Allowed | Allowed | Allowed | Allowed (If trip is Public) |
| **Invite Members** | Allowed | Denied | Denied | Denied |
| **Remove Member** | Allowed | Denied | Denied | Denied |
| **Manage Destinations** | Allowed | Allowed | Denied | Denied |
| **Manage Activities** | Allowed | Allowed | Denied | Denied |

---

## 📝 Logging & Auditing

Structured JSON logging tracks all mutations within the module using the standard application `PinoLoggerService`. Mapped logs automatically carry the request-scoped correlation identifier (`requestId`). Mapped log statements include:

- `Trip Created: <tripId> by user <userId>`
- `Trip Updated: <tripId> by user <userId>`
- `Trip Deleted: <tripId> by user <userId>`
- `Trip Archived: <tripId> by user <userId>`
- `Destination Added: <destinationId> to trip <tripId> by user <userId>`
- `Destination Removed: <destinationId> by user <userId>`
- `Activity Added: <activityId> to destination <destinationId> by user <userId>`
- `Activity Updated: <activityId> by user <userId>`
- `Activity Deleted: <activityId> by user <userId>`
- `Invitation Sent: <invitationId> for trip <tripId> by user <userId>`
- `Member Removed: <memberId> from trip <tripId> by user <userId>`

> [!WARNING]
> **PII and Secrets Policy**: Under no circumstances are tokens, secrets, emails, or credentials printed to log outputs.
