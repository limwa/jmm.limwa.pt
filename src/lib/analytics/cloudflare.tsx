import Script from "next/script";

export function CloudflareAnalytics() {
    const token = process.env.CLOUDFLARE_ANALYTICS_TOKEN;
    if (!token)
        throw new Error("CLOUDFLARE_ANALYTICS_TOKEN is not set");
    
    console.log("hey")
    return (
        <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${token}"}`}
        />
    )
}