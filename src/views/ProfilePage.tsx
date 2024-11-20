import { useEffect, useRef, useState } from "react";
import { FullComment, FullPost, Profile } from "../lib/types";
import { Redirect, useParams } from "wouter";
import CardSkeleton from "../components/CardSkeleton";
import { FaCommentAlt, FaExclamationTriangle } from "react-icons/fa";
import PostsList from "../components/PostsList";
import { Button } from "../components/ui/button";
import List from "../components/List";
import CommentComponent from "../components/Comment";

export default function ProfilePage() {
    const { userId: _userId } = useParams()

    if (!_userId) {
        return <Redirect to="/profile" />
    }

    const userId = typeof _userId === "object" ? _userId[0] : _userId;

    const [prof, setProf] = useState<Profile | null>(null);
    const [profLoading, setProfLoading] = useState(true);
    const [posts, setPosts] = useState<FullPost[]>([]);
    const [comments, setComments] = useState<FullComment[]>([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"posts" | "comments">("posts");
    const pageRef = useRef(1);
    const hasMore = useRef(true);

    const getPosts = async (reset: boolean) => {
        if (!reset) pageRef.current += 1;
        else hasMore.current = true;

        if (!hasMore.current) return;
        
        setDataLoading(true);

        fetch(`/api/profiles/${userId}/posts?page=${pageRef.current}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.length === 0) hasMore.current = false;

                if (reset) {
                    setPosts(data);
                } else {
                    setPosts(prev => prev.concat(data));
                }
            })
            .catch(() => {
                console.error("Failed to fetch posts");
                setPosts([]);
            })
            .finally(() => setDataLoading(false));
    };

    const getComments = async (reset: boolean) => {
        if (!reset) pageRef.current += 1;
        else hasMore.current = true;

        if (!hasMore.current) return;

        setDataLoading(true);

        fetch(`/api/profiles/${userId}/comments?page=${pageRef.current}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.length === 0) hasMore.current = false;
                
                if (reset) {
                    setComments(data);
                } else {
                    setComments(prev => prev.concat(data));
                }
            })
            .catch(() => {
                console.error("Failed to fetch comments");
                setComments([]);
            })
            .finally(() => setDataLoading(false));
    };

    useEffect(() => {
        fetch(`/api/profiles/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                setProf(data);
            })
            .catch(() => {
                console.error("Failed to fetch profile");
                setProf(null);
            })
            .finally(() => setProfLoading(false));

        activeTab === "posts" ? getPosts(true) : getComments(true);
    }, [activeTab]);

    const toggleTab = () => {
        pageRef.current = 1;
        setActiveTab(prev => prev === "posts" ? "comments" : "posts");
    };

    return (
        <main className="p-4 grow w-full max-w-4xl mx-auto">
            {profLoading ? (
                <CardSkeleton avatarSize="lg" cardHeight="lg" />
            ) : !prof ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <FaExclamationTriangle size={50} className="text-amber-500" />
                    <h1 className="mt-4 text-2xl font-bold">Profile not found</h1>
                    <p className="mt-2 text-gray-600">The profile you are looking for does not exist.</p>
                </div>
            ) : (
                <div className="mb-8 flex items-center gap-2">
                    <div className="w-16 h-16 grid place-items-center bg-neutral-300 rounded-full">
                        <span>{prof.name.split(" ").slice(0, 3).map(w => w[0]?.toUpperCase() || '').join('')}</span>
                    </div>
                    <h1 className="font-semibold text-xl">
                        {prof.id}
                    </h1>
                </div>
            )}

            {prof && (
                <div>
                    <div className="mb-4">
                        <Button
                            className={`${activeTab === "posts" ? "bg-neutral-300" : ""}`}
                            onClick={toggleTab}
                            variant="ghost"
                        >
                            Posts
                        </Button>
                        <Button
                            className={`${activeTab === "comments" ? "bg-neutral-300" : ""}`}
                            onClick={toggleTab}
                            variant="ghost"
                        >
                            Comments
                        </Button>
                    </div>

                    {activeTab === "comments" ? (
                        <ul>
                            <List
                                data={comments}
                                Item={CommentComponent}
                                loading={dataLoading}
                                skeletonHeight="sm"
                                EmptyDataComponent={() => (
                                    <div className="flex flex-col items-center gap-2">
                                        <FaCommentAlt className="text-4xl text-neutral-400" />
                                        <p className="text-neutral-400">Be the first to comment</p>
                                    </div>
                                )}
                                onEnd={() => getComments(false)}
                            />
                        </ul>
                    ) : (
                        <PostsList
                            loading={dataLoading}
                            onEnd={() => getPosts(false)}
                            data={posts}
                        />
                    )}
                </div>
            )}
        </main>
    );
}