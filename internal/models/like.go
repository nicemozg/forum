package models

type Heart struct {
	ID       int `json:"id"`
	UserID   int `json:"user_id"`
	PostID   int `json:"post_id"`
	LikeType int `json:"like_type"`
}

type LikeAndDislike struct {
	ID            int `json:"id"`
	PostID        int `json:"post_id"`
	LikesCount    int `json:"likes_count"`
	DislikesCount int `json:"dislikes_count"`
	UserLikeType  int `json:"user_like_type"`
}

type CommentHeart struct {
	ID        int `json:"id"`
	UserID    int `json:"user_id"`
	CommentID int `json:"comment_id"`
	LikeType  int `json:"like_type"`
}

var LikeTypes = struct {
	Like    int
	Dislike int
}{
	Like:    1,
	Dislike: 2,
}

type Like struct {
	Like    int `json:"like"`
	Dislike int `json:"dislike"`
}
