## Postman Collection

For easy testing, import this Postman collection:

```json
{
	"info": {
		"_postman_id": "d121b586-4028-4130-872e-237ef6dcdf62",
		"name": "aitextsummary",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "Authenticated Summarize",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json",
						"type": "text"
					},
					{
						"key": "x-auth-token",
						"value": "YOUR_JWT_TOKEN_HERE",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\r\n  \"text\": \"Climate change is one of the most pressing issues of our time...\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "https://aitextsummary.onrender.com/api/summarize/authenticated",
					"protocol": "https",
					"host": [
						"aitextsummary",
						"onrender",
						"com"
					],
					"path": [
						"api",
						"summarize",
						"authenticated"
					]
				}
			}
		},
		{
			"name": "Public Summarize",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\r\n  \"text\": \"Climate change is one of the most pressing issues of our time. The Earth's average temperature has increased by about 1 degree Celsius since the late 19th century, primarily due to increased carbon dioxide and other human-made emissions into the atmosphere. Most of this warming has occurred in the past 40 years, with the six warmest years on record taking place since 2014. Climate change impacts include more frequent and severe weather events, rising sea levels, and ecosystem disruption. Scientists emphasize the need for immediate action to reduce greenhouse gas emissions to prevent the most catastrophic effects of climate change.\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "https://aitextsummary.onrender.com/api/summarize",
					"protocol": "https",
					"host": [
						"aitextsummary",
						"onrender",
						"com"
					],
					"path": [
						"api",
						"summarize"
					]
				}
			}
		},
		{
			"name": "Get History",
			"request": {
				"method": "GET",
				"header": [
					{
						"key": "x-auth-token",
						"value": "YOUR_JWT_TOKEN_HERE",
						"type": "text"
					}
				],
				"url": {
					"raw": "https://aitextsummary.onrender.com/api/history",
					"protocol": "https",
					"host": [
						"aitextsummary",
						"onrender",
						"com"
					],
					"path": [
						"api",
						"history"
					]
				}
			}
		}
	]
}
```

To import:
1. Open Postman
2. Click on "Import" button
3. Paste the JSON above
4. Replace `YOUR_JWT_TOKEN_HERE` with a valid token
5. Test each endpoint