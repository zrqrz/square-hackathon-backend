const { GoogleAuth} = require("google-auth-library");

async function sendRequest(textContent) {
    const auth = new GoogleAuth({
        scopes: "https://www.googleapis.com/auth/cloud-platform",
    });
    const client = await auth.getClient();
    const accessToken = (await client.getAccessToken()).token;

    const params = {
        apiEndpoint: "us-central1-aiplatform.googleapis.com",
        projectId: "xenon-heading-260506",
        modelId: "text-bison@001",
        instances: [
            {
                content: `${textContent}`,
            },
        ],
        parameters: {temperature: 0.2, maxOutputTokens: 1000, topP: 0.8, topK: 40},
    }

    const data = {instances: params.instances, parameters: params.parameters};

    const response = await fetch(
        `https://${params.apiEndpoint}/v1/projects/${params.projectId}/locations/us-central1/publishers/google/models/${params.modelId}:predict`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    )

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

module.exports = {
    sendRequest,
};