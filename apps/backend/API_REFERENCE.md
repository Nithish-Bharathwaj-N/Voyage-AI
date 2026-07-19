# VoyageAI Backend — API Reference (Sprint 3)

All endpoints require Bearer Token Authentication in request headers via:
`Authorization: Bearer <supabase-jwt>`

---

## 🛄 Trip Endpoints

### 1. Create Trip
- **Path**: `POST /api/v1/trips`
- **Request Body**:
  ```json
  {
    "title": "Summer Tour Paris",
    "description": "Cafes and museums",
    "startDate": "2026-07-01T00:00:00.000Z",
    "endDate": "2026-07-10T00:00:00.000Z",
    "visibility": "PRIVATE",
    "currency": "USD",
    "estimatedBudget": 3000,
    "country": "France",
    "city": "Paris",
    "timezone": "Europe/Paris"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Trip created successfully",
    "data": {
      "id": "trip-uuid-12345",
      "ownerId": "user-uuid-999",
      "title": "Summer Tour Paris",
      "description": "Cafes and museums",
      "coverImage": null,
      "startDate": "2026-07-01T00:00:00.000Z",
      "endDate": "2026-07-10T00:00:00.000Z",
      "status": "PLANNING",
      "visibility": "PRIVATE",
      "currency": "USD",
      "estimatedBudget": 3000,
      "actualBudget": 0,
      "country": "France",
      "city": "Paris",
      "timezone": "Europe/Paris",
      "isArchived": false,
      "createdAt": "2026-06-27T10:00:00.000Z",
      "updatedAt": "2026-06-27T10:00:00.000Z"
    }
  }
  ```

### 2. Get Trips List
- **Path**: `GET /api/v1/trips`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Trips retrieved successfully",
    "data": [
      {
        "id": "trip-uuid-12345",
        "ownerId": "user-uuid-999",
        "title": "Summer Tour Paris",
        "startDate": "2026-07-01T00:00:00.000Z",
        "endDate": "2026-07-10T00:00:00.000Z",
        "status": "PLANNING",
        "visibility": "PRIVATE"
      }
    ]
  }
  ```

### 3. Update Trip
- **Path**: `PATCH /api/v1/trips/:id`
- **Request Body**:
  ```json
  {
    "title": "Autumn in Paris",
    "status": "ONGOING"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Trip updated successfully",
    "data": {
      "id": "trip-uuid-12345",
      "title": "Autumn in Paris",
      "status": "ONGOING"
    }
  }
  ```

### 4. Archive Trip
- **Path**: `POST /api/v1/trips/:id/archive`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Trip archived successfully",
    "data": {
      "id": "trip-uuid-12345",
      "isArchived": true
    }
  }
  ```

### 5. Duplicate Trip
- **Path**: `POST /api/v1/trips/:id/duplicate`
- **Response (201 Created)**: Clones trip and deep clones destinations and activities.
  ```json
  {
    "success": true,
    "message": "Trip duplicated successfully",
    "data": {
      "id": "new-cloned-trip-uuid",
      "title": "Summer Tour Paris - Copy"
    }
  }
  ```

---

## 📍 Destination Endpoints

### 1. Add Destination to Trip
- **Path**: `POST /api/v1/trips/:id/destinations`
- **Request Body**:
  ```json
  {
    "name": "Eiffel Tower Stop",
    "latitude": 48.8584,
    "longitude": 2.2945,
    "order": 1
  }
  ```
- **Response (210 Created)**:
  ```json
  {
    "success": true,
    "message": "Destination added successfully",
    "data": {
      "id": "dest-uuid-99",
      "tripId": "trip-uuid-12345",
      "name": "Eiffel Tower Stop",
      "order": 1
    }
  }
  ```

### 2. Get Trip Destinations List
- **Path**: `GET /api/v1/trips/:id/destinations`
- **Response (200 OK)**: Mapped array ordered by sequence `order`.

---

## 🏎️ Activity Endpoints

### 1. Add Activity to Destination
- **Path**: `POST /api/v1/destinations/:id/activities`
- **Request Body**:
  ```json
  {
    "name": "View Mona Lisa",
    "cost": 15,
    "order": 1
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Activity added successfully",
    "data": {
      "id": "act-uuid-55",
      "destinationId": "dest-uuid-99",
      "name": "View Mona Lisa",
      "cost": 15,
      "order": 1
    }
  }
  ```
