import { AuthenticationResult } from "@azure/msal-browser";

export async function acquireTokenSilent(loginRequest: any, msalInstance: any): Promise<AuthenticationResult> {
    return await msalInstance.acquireTokenSilent({
        ...loginRequest
    });
}