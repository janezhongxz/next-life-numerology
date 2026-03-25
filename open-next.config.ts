import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
	// Incremental cache disabled for simpler deployment
	// Can be enabled later with R2 bucket setup
});
