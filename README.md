## Live Deployment

This API is deployed on Railway and available at:
https://aitextsummary.onrender.com/

The API is stateless and uses in-memory storage for the assignment requirements.
For a production environment with persistent storage, a database integration 
would be recommended.
## Example Responses

### Standard Summarization
```json
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