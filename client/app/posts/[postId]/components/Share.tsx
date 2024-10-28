import { NotifContext } from "@/app/context/notifContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext } from "react";
import { BsFillSendFill } from "react-icons/bs";

export default function Share({
    link
}: {
    link: string
}) {
    const { addNotif } = useContext(NotifContext);

    const handleClick = () => {
        navigator.clipboard.writeText(`${location.protocol}://${location.host}${link}`)
        .then(() => {
            addNotif({
                id: crypto.randomUUID(),
                body: "Link copied to clipboard",
                type: "success"
            });
        })
        .catch(e => {
            console.error(e);
            addNotif({
                id: crypto.randomUUID(),
                body: "Cannot copy link to clipboard",
                type: "error"
            });
        });
    };

    return (
        <Button onClick={handleClick} size="lg" variant="ghost" className="px-4">
            <BsFillSendFill />
        </Button>
    );
}