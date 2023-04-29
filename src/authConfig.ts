import { Configuration, PopupRequest } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
    auth: {
        clientId: "0a74a678-aba6-4b17-957d-98fd60b7fe5e",
        authority: "https://login.microsoftonline.com/5cb1f273-8ffe-4f6e-ad5a-02dbc3e19e3e",
        redirectUri: "http://localhost:3000/"
    },
    system: {
        allowNativeBroker: false // Disables WAM Broker
    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
    scopes: ["User.Read", "api://0a74a678-aba6-4b17-957d-98fd60b7fe5e/user_impersonation",],
    authority: "https://login.microsoftonline.com/5cb1f273-8ffe-4f6e-ad5a-02dbc3e19e3e",
    redirectUri: "http://localhost:3000/"
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};