import { useEffect } from "react";

export const useWorker = (
    workerConstructor: ({
        new(options?: { name?: string }): Worker
    }),
    message: any,
    onmessage: (event: MessageEvent) => any,
    deps?: React.DependencyList,
    onmessageerror?: (event: MessageEvent) => any,
    onerror?: (event: ErrorEvent) => any,
) => {
    useEffect(() => {
        const worker = new workerConstructor();
        worker.postMessage(message);
        worker.onmessage = onmessage;
        worker.onmessageerror = onmessageerror ?? ((error) => {
            console.warn(error);
        });
        worker.onerror = onerror ?? ((error) => {
            console.warn(error);
        });
        return () => worker.terminate();
    }, deps ?? [])
}