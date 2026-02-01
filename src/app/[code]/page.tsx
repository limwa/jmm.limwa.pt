"use client";

import { redirect, useRouter } from "next/navigation";
import { Suspense, useDeferredValue, useTransition } from "react";

async function CodeInput({ code, setCode }: { code: Promise<string>, setCode: (code: string) => void }) {
    return <input
        type="text"
        value={await code}
        onChange={(e) => {
            setCode(e.target.value);
        }}
    />;
}

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
    const router = useRouter();
    const [isTransitioning, startTransition] = useTransition();


    return <Suspense fallback={<div>Loading...</div>}>
        <CodeInput code={params.then(p => p.code)} setCode={(code) => {
            startTransition(() => {
                redirect(`/${code}`);
            })
        }} />
    </Suspense>;

}