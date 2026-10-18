import { createServerlessApp } from "../server/serverless";

// Export the handler; the platform owns the listener and instance lifecycle.
export default createServerlessApp(process.env);
