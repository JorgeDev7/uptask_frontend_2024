import { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
    return (
        <div className="text-red-600 font-bold uppercase text-xs">
            {children}
        </div>
    );
}
