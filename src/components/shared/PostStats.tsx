import { Models } from "appwrite";
import {
    useDeleteSavedPost,
    useGetCurrentUser,
    useLikePost,
    useSavePost
} from "@/lib/react-query/queriesAndMutations.ts";
import React, { useEffect, useState } from "react";
import { checkIsLiked } from "@/lib/utils.ts";
import { useLocation } from "react-router-dom";

type PostStatsProps = {
    post: Models.Document;
    userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
    // Ensure likes array exists and map the $id from users
    const likesList = post.likes ? post.likes.map((user: Models.Document) => user.$id) : [];
    const [likes, setLikes] = useState(likesList);
    const [isSaved, setIsSaved] = useState(false);

    const { mutate: likePost } = useLikePost();
    const { mutate: savePost } = useSavePost();
    const { mutate: deleteSavedPost } = useDeleteSavedPost();
    const { data: currentUser } = useGetCurrentUser();
    const location = useLocation();

    // Add null checks for currentUser and currentUser.save
    const savedPostRecord = currentUser && Array.isArray(currentUser.save)
        ? currentUser.save.find((record: Models.Document) => record.post?.$id === post.$id)
        : null;

    useEffect(() => {
        setIsSaved(!!savedPostRecord); // Update isSaved if the post is found in saved posts
    }, [currentUser, savedPostRecord, post.$id]);

    const handleLikePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();
        let likesArray = [...likes];
        if (likesArray.includes(userId)) {
            likesArray = likesArray.filter((Id) => Id !== userId);
        } else {
            likesArray.push(userId);
        }
        setLikes(likesArray);
        likePost({ postId: post.$id, likesArray });
    };

    const handleSavePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();
        if (savedPostRecord) {
            setIsSaved(false);
            return deleteSavedPost(savedPostRecord.$id);
        }
        savePost({ userId: userId, postId: post.$id });
        setIsSaved(true);
    };

    const containerStyles = location.pathname.startsWith("/profile") ? "w-full" : "";

    return (
        <div className={`flex justify-between items-center z-20 ${containerStyles}`}>
            <div className="flex gap-2 mr-5">
                <img
                    src={`${
                        checkIsLiked(likes, userId)
                            ? "/assets/icons/liked.svg"
                            : "/assets/icons/like.svg"
                    }`}
                    alt="like"
                    width={20}
                    height={20}
                    onClick={(e) => handleLikePost(e)}
                    className="cursor-pointer"
                />
                <p className="small-medium lg:base-medium">{likes.length}</p>
            </div>

            <div className="flex gap-2">
                <img
                    src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
                    alt="save"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={(e) => handleSavePost(e)}
                />
            </div>
        </div>
    );
};

export default PostStats;
