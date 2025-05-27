import { PublicClientApplication } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    clientId: '29859196-426e-42c7-b5f1-8e3df6b5d492',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: typeof window !== 'undefined' ? window.location.origin : '',
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);