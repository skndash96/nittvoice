-- Function to cast or update a vote
CREATE OR REPLACE FUNCTION vote_post(
    p_user_id TEXT,
    p_post_id TEXT,
    p_vote_type SMALLINT
) RETURNS INTEGER AS $$
BEGIN
    -- Insert or update the vote
    INSERT INTO "Vote" (voter_id, post_id, vote_type)
    VALUES (p_user_id, p_post_id, p_vote_type)
    ON CONFLICT (voter_id, post_id)
    DO UPDATE SET vote_type = p_vote_type
    WHERE "Vote".vote_type != p_vote_type;

    -- Update cached counts in Post table
    UPDATE "Post"
    SET 
        upvote_count = (
            SELECT COUNT(*) FROM "Vote" 
            WHERE post_id = p_post_id AND vote_type = 1
        ),
        downvote_count = (
            SELECT COUNT(*) FROM "Vote" 
            WHERE post_id = p_post_id AND vote_type = -1
        )
    WHERE id = p_post_id;

    RETURN 1;
END;
$$ LANGUAGE plpgsql;

-- Function to remove a vote
CREATE OR REPLACE FUNCTION remove_vote(
    p_user_id TEXT,
    p_post_id TEXT
) RETURNS INTEGER AS $$
BEGIN
    -- Delete the vote
    DELETE FROM "Vote" 
    WHERE user_id = p_user_id AND post_id = p_post_id;

    -- Update cached counts
    UPDATE "Post"
    SET 
        upvote_count = (
            SELECT COUNT(*) FROM "Vote" 
            WHERE post_id = p_post_id AND vote_type = 1
        ),
        downvote_count = (
            SELECT COUNT(*) FROM "Vote" 
            WHERE post_id = p_post_id AND vote_type = -1
        )
    WHERE id = p_post_id;

    RETURN 1;
END;
$$ LANGUAGE plpgsql;