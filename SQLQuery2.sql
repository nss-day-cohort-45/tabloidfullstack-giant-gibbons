SELECT comment.[Subject], Comment.Content, Comment.UserProfileId, Comment.PostId, Comment.CreateDateTime  
  FROM Comment
  JOIN Post p ON comment.postId = p.id
  JOIN UserProfile up ON up.id = comment.UserProfileId

INSERT INTO Comment ([subject], Content, UserProfileId, PostId, CreateDateTime)
OUTPUT INSERTED.ID
VALUES ('this is a test', @content, @userProfileId, 1, @createDateTime)
WHERE Comment.PostId = p.Id;



INSERT INTO Comment (comment.[Subject], comment.Content, comment.UserProfileId, comment.PostId, comment.CreateDateTime),                      
        JOIN Post p ON comment.postId = p.id
        JOIN UserProfile up ON up.id = comment.UserProfileId
OUTPUT INSERTED.ID
VALUES('this is a test', @content, @userProfileId, 1, @createDateTime




SELECT comment.Subject, Comment.Content, 
                            Comment.UserProfileId, Comment.PostId, 
                            Comment.CreateDateTime 
                          FROM Comment
                          JOIN Post p ON comment.postId = p.id
                          JOIN UserProfile up ON up.id = comment.UserProfileId;

