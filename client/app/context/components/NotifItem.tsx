"use client";
import { MouseEventHandler, useContext, useEffect, useRef } from "react";
import { NotifContext, NotifType } from "../notifContext";
import { FaExclamationCircle, FaInfoCircle, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function NotifItem({
    data
}: {
    data: NotifType
}) {
    const { removeNotif } = useContext(NotifContext);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let t = setTimeout(() => {
            removeNotif(data.id);
        }, 2900);

        return () => clearTimeout(t);
    }, []);

    return (
        <div
            className={`p-2 relative flex w-fit items-center justify-between gap-2 bg-white rounded-xl rounded-br-none rounded-bl-none shadow-lg`}
        >
            <span className={`${data.type === "error" ? "text-red-400" : data.type === "info" ? "text-sky-500" : data.type === "success" ? "text-emerald-500" : "text-amber-500"
                }`}>
                {
                    data.type === "error" ? (
                        <FaExclamationCircle className="w-6 h-6" />
                    ) : data.type === "info" ? (
                        <FaInfoCircle className="w-6 h-6" />
                    ) : data.type === "success" ? (
                        <FaCheckCircle className="w-6 h-6" />
                    ) : (
                        <FaExclamationTriangle className="w-6 h-6" />
                    )
                }
            </span>

            <p className="">{data.body}</p>

            <div className={`overflow-hidden absolute left-0 right-0 bottom-0 rounded-xl translate-y-full`}>
                <div ref={progressRef} className={`${data.type === "error" ? "bg-red-400" : data.type === "info" ? "bg-sky-500" : data.type === "success" ? "bg-emerald-500" : "bg-amber-500"
                    } opacity-50 h-1 animate-slide`}></div>
            </div>
        </div>
    );
}