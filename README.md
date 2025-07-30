## Live Deployment

This API is deployed on Railway and available at:
https://aitextsummary.onrender.com/

The API is stateless and uses in-memory storage for the assignment requirements.
For a production environment with persistent storage, a database integration 
would be recommended.

##Photo
![API Response](https://private-user-images.githubusercontent.com/118610480/472665045-c9ffe994-fd7a-4c3c-99ae-b4bd8a2b813c.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTM5MDIyODksIm5iZiI6MTc1MzkwMTk4OSwicGF0aCI6Ii8xMTg2MTA0ODAvNDcyNjY1MDQ1LWM5ZmZlOTk0LWZkN2EtNGMzYy05OWFlLWI0YmQ4YTJiODEzYy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNzMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDczMFQxODU5NDlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0zNjZmZGI0ZTY1NzZhOGM4YWFhMjU5NGQxMTI2MmI0MzA0YmQzY2Y4OTJlZGRlMWZjNTgxMTE3Zjk2MTc5N2VlJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.PKouwIH1xsltyfcKXCkC2m37MgDCtqVPvmDFWXTBrdM)

## Example Responses

### Standard Summarization
```
{
    "original": {
        "text": "Climate change is one of the most pressing issues of our time...",
        "wordCount": 100
    },
    "summary": {
        "text": "Earth's average temperature has risen significantly, primarily due to human-caused emissions, in the past century. This warming trend, most pronounced in recent decades, is causing more extreme weather, rising sea levels, and harming ecosystems. Scientists urge immediate action to curb greenhouse gas emissions and mitigate the worst impacts of climate change.",
        "wordCount": 51
    },
    "stats": {
        "compressionRatio": "0.51",
        "processingTime": 1173
    }
}
```
## Enhanced Features

### Precision and Validation

The API includes sophisticated validation to ensure summaries are precise and high-quality:

- **Sentence Count Validation**: Ensures the summary contains the exact number of sentences requested
- **Quality Validation**: Checks for common error patterns and ensures minimum quality standards
- **Tone Validation**: Verifies that the summary matches the requested tone

### Reliability Features

- **Retry Logic**: Automatically retries failed summary generation with improved prompts
- **Timeout Handling**: Gracefully handles API timeouts without crashing
- **Health Monitoring**: Includes a /health endpoint for uptime monitoring

### Security Enhancements

- **Helmet**: Sets secure HTTP headers
- **CORS**: Controls cross-origin resource sharing
- **XSS Protection**: Prevents cross-site scripting attacks
- **Request Validation**: Validates all input before processing

### Performance Monitoring

- **Detailed Logging**: Comprehensive logs for troubleshooting
- **Processing Statistics**: Tracks compression ratio and processing time
- **Health Checks**: Monitors API health and performance
