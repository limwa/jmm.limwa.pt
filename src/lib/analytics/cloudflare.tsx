import Script from "next/script";

function CloudflareAnalytics({ token }: { token: string }) { 
    return (
        <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${token}"}`}
        />
    )
}

export function CloudflareAnalyticsProvider({ token, children }: { token: string, children: React.ReactNode }) {
    return <>
        <CloudflareAnalytics token={token} />
        {children}
    </>
}
