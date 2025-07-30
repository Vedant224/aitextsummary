## Authentication

This API uses JWT (JSON Web Token) authentication for secured endpoints. Here's how to use it:

### Secured Endpoints
- `POST /api/summarize/authenticated` - Create summaries (with history saving)
- `GET /api/history` - Retrieve your summary history

### How to Generate a Test Token

For testing purposes, you can generate a JWT token using this online tool or with the provided script:

#### Option 1: Online JWT Generator
1. Go to [jwt.io](https://jwt.io/)
2. In the "PAYLOAD: DATA" section, use this format:
   ```json
   {
     "user": {
       "id": "your-username"
     }
   }
   ```
3. In the "VERIFY SIGNATURE" section, enter your secret key
4. Copy the generated token from the left panel

#### Option 2: Using the Token Generator Script
Create a file called `generate-token.js`:

```javascript
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Create a payload with user ID
const payload = {
  user: {
    id: 'your-username'
  }
};

// Generate a token that expires in 1 hour
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

console.log('Your JWT token:');
console.log(token);
```

Run it with:
```bash
node generate-token.js
```

### Using the Token in Requests

Include the token in the `x-auth-token` header:

#### Example with curl:
```bash
curl -X POST https://aitextsummary.onrender.com/api/summarize/authenticated \
  -H "Content-Type: application/json" \
  -H "x-auth-token: YOUR_JWT_TOKEN" \
  -d '{
    "text": "Climate change is one of the most pressing issues of our time..."
  }'
```

#### Example with Postman:
1. Add a new header:
   - Key: `x-auth-token`
   - Value: `YOUR_JWT_TOKEN`
2. Send your request to:
   - `https://aitextsummary.onrender.com/api/summarize/authenticated` (POST)
   - `https://aitextsummary.onrender.com/api/history` (GET)

### Sample Token for Quick Testing

For quick testing, you can use this pre-generated token (expires in 48 hours from July 30, 2025):

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoidGVzdC11c2VyIn0sImlhdCI6MTc1MzkwMDg3NCwiZXhwIjoxNzU0MDczNjc0fQ.L7xKW7MX2sgXl6N-X7XQuwxwlL8cjCco-NDmPmM3Y5g
```

⚠️ **Note:** JWT tokens expire after a certain time (typically 1 hour). If you get a "Token is not valid" error, generate a new token.

### Test User Identifiers

When testing with the authenticated endpoints, these IDs are preserved in your history:
- The user ID in the token is used to associate summaries with a specific user
- Each summary is saved with a unique timestamp and ID
- The history endpoint returns summaries for the authenticated user only