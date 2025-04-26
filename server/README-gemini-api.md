# Gemini API Documentation

This API provides an interface to Google's Gemini AI model for generating text responses from prompts.

## Endpoints

### Generate Response

Generates a text response based on the provided prompt using Google's Gemini AI model.

**URL:** `/api/gemini/generate`

**Method:** `POST`

**Request Body:**

```json
{
  "prompt": "Your text prompt here"
}
```

**Response:**

Success (200 OK)
```json
{
  "success": true,
  "prompt": "Your text prompt here",
  "response": "Generated response from Gemini AI..."
}
```

Error (400 Bad Request)
```json
{
  "success": false,
  "message": "Prompt cannot be empty"
}
```

Error (500 Internal Server Error)
```json
{
  "success": false,
  "message": "Error generating response",
  "error": "Error details..."
}
```

## Environment Configuration

Make sure your `.env` file contains:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

## Example Usage

### Using cURL

```bash
curl -X POST http://localhost:3000/api/gemini/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write a short poem about artificial intelligence"}'
```

### Using JavaScript Fetch

```javascript
const response = await fetch('http://localhost:3000/api/gemini/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'Write a short poem about artificial intelligence'
  })
});

const data = await response.json();
console.log(data.response);
``` 