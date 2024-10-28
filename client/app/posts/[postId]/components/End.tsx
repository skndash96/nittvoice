import { useEffect, useRef, useState } from "react";

export default function End({
    onReach
}: {
    onReach: () => void
}) {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    onReach();
                }
            });
        });

        observer.observe(ref.current!);

        return () => {
            observer.disconnect();
        };
    }, []);
    
    return (
        <div ref={ref} className="w-full h-16"></div>
    );
}