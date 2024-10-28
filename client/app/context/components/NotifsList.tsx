"use client";
import { AnimatePresence } from "framer-motion";
import { NotifType } from "../notifContext";
import NotifItem from "./NotifItem";
import { motion } from "framer-motion";

export default function NotifsList({
    data
}: {
    data: NotifType[]
}) {
    return (
        <div className="z-[51] fixed flex flex-col items-end gap-2 top-16 right-4">
            <AnimatePresence>
                {data.map((notif) => (
                    <motion.div
                        key={notif.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.2 }}
                        className="origin-top-right"
                    >
                        <NotifItem key={notif.id} data={notif} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
