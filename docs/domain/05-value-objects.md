# 05. Value Objects

Value objects are immutable, reusable concepts that have no conceptual identity. They describe characteristics of an entity. Two value objects with the exact same properties are considered strictly equal.

## Core Value Objects

- **Coordinates (GeoLocation)**
  - *Attributes:* `latitude` (float), `longitude` (float).
  - *Validation:* Lat must be between -90 and 90. Lng between -180 and 180.

- **Money (CurrencyAmount)**
  - *Attributes:* `amount` (integer, in cents to avoid float rounding), `currencyCode` (ISO 4217, e.g., "USD").
  - *Logic:* Can be added or subtracted safely. Cannot add USD to EUR without a ConversionRate value object.

- **TimeRange**
  - *Attributes:* `startTime` (ISO string or LocalTime), `endTime` (ISO string or LocalTime).
  - *Validation:* `startTime` must be chronologically before `endTime`.

- **DateRange**
  - *Attributes:* `startDate` (LocalDate), `endDate` (LocalDate).
  - *Validation:* `startDate` <= `endDate`.

- **Rating**
  - *Attributes:* `score` (float), `maxScore` (integer, usually 5).
  - *Validation:* Score >= 0 and Score <= MaxScore.

- **Address**
  - *Attributes:* `streetLine`, `city`, `stateRegion`, `country`, `postalCode`.
  - *Logic:* Used for standardizing physical locations for rendering Maps or invoking Ride-hailing services.

- **OperatingHours**
  - *Attributes:* A map of `DayOfWeek` to a list of `TimeRange`s.
  - *Logic:* Resolves whether an Attraction is "Open Now".

- **ImageReference**
  - *Attributes:* `url`, `altText`, `provider` (e.g., "unsplash", "internal").
  - *Logic:* Handles the Image Normalization strategy by never allowing naked, untested strings to represent images.
