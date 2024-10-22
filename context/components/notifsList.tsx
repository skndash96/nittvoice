"use client";
import { MouseEventHandler, useContext, useEffect, useRef } from "react";
import { NotifContext, NotifType } from "../notifContext";

export default function NotifsList({
    data
}: {
    data: NotifType[]
}) {
    return (
        <div className="fixed flex flex-col items-end gap-2 bottom-4 right-4">
            {data.map((notif) => (
                <NotifItem key={notif.id} data={notif} />
            ))}
        </div>
    );
}

function NotifItem({
    data
}: {
    data: NotifType
}) {
    const { removeNotif } = useContext(NotifContext);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let t = setTimeout(() => removeNotif(data.id), 2000);
        return () => clearTimeout(t);
    }, []);

    const color = data.type === "error"
        ? "bg-red-500"
        : data.type === "info"
        ? "bg-primary"
        : data.type === "success"
        ? "bg-green-500"
        : "bg-amber-500";

    const handleRemove : MouseEventHandler = () => {
        removeNotif(data.id);
    };

    return (
        <div className={`p-2 z-[1] relative flex w-fit items-center justify-between gap-2 text-white ${color} rounded-xl rounded-br-none rounded-bl-none shadow-lg`}>
            <p className="text-sm">{data.body}</p>

            <button className={`btn-square btn-xs rounded-full bg-white/25 text-white/85`} onClick={handleRemove}>
                x
            </button>

            <div className={`overflow-hidden absolute left-0 right-0 bottom-0 rounded-xl translate-y-full`}>
                <div ref={progressRef} className={`${color} opacity-50 h-1 animate-slide`}></div>
            </div>
        </div>
    );
}