# 187 - Streaming Architecture

`StreamManager` tracks active stream IDs. 
The UI observes the conversation state. When a message is in `streaming` status, it renders the `StreamingText` component which renders the text aggressively and appends a blinking cursor.
If the user cancels, `StreamManager` flags the ID as false, and the loop terminates.
