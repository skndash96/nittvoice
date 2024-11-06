import { Button } from "../components/ui/button";
import { PiArrowFatUp, PiArrowFatUpFill, PiArrowFatDown, PiArrowFatDownFill } from "react-icons/pi";

export default function VoteMenu({
    userVote,
    postVote,
    handleVote
}: {
    userVote: number,
    postVote: number,
    handleVote: (vote: number) => void
}) {
    return (

        <div className={`px-2 gap-2 rounded-lg flex items-center ${userVote ? "bg-emerald-300" : "bg-neutral-200/50"}`}>
            <Button onClick={() => handleVote(1)} size="icon" variant="ghost" className="px-2 h-8 hover:bg-transparent hover:text-purple-600">
                {
                    userVote === 1 ? (
                        <PiArrowFatUpFill />
                    ) : (
                        <PiArrowFatUp />
                    )
                }
            </Button>

            <span className="font-semibold">
                {postVote}
            </span>

            <Button onClick={() => handleVote(-1)} size="icon" variant="ghost" className="px-2 hover:bg-transparent hover:text-sky-600">
                {
                    userVote === -1 ? (
                        <PiArrowFatDownFill />
                    ) : (
                        <PiArrowFatDown />
                    )
                }
            </Button>
        </div>
    );
}