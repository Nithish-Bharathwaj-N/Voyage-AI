# 11. Notification Engine Architecture

## Responsibility
Dispatches asynchronous alerts to users regarding their trips.

## Use Cases
- `SendWeatherAlertUseCase`
- `SendTripReminderUseCase`

## Strategies
- **`EmailDeliveryStrategy`**
- **`InAppPushStrategy`**

## Dependency Injection
Requires:
- `EventSubscriber` (Triggers off domain events like `WeatherWarningIssued`).
- `QueueClient` (Schedules reminders using BullMQ delayed jobs).
