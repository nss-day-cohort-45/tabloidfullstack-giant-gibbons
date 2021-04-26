using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }
        

        public List<Post> GetAllPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT p.Id as PostId, p.Title, p.Content, p.ImageLocation, p.CreateDateTime, p.PublishDateTime, p.IsApproved, p.CategoryId,
                                        up.Id as UserProfileId, up.DisplayName, up.FirstName, up.LastName, up.Email, up.UserTypeId,
                                        c.Id as CategoryId, c.Name AS Category
                                       FROM Post p 
                                        LEFT JOIN UserProfile up on p.UserProfileId = up.Id
                                        LEFT JOIN Category c on p.CategoryId = c.Id
                                        WHERE p.IsApproved = 1
                                        ORDER BY p.PublishDateTime desc";

                    var reader = cmd.ExecuteReader();
                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "PostId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),

                            },
                            category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "Category")
                            }

                        });
                    }
                    reader.Close();
                    return posts;
                }
            }
        }

        public Post GetById (int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT p.Title, p.Content, p.ImageLocation, p.CreateDateTime, p.ImageLocation, p.PublishDateTime, p.CategoryId, p.UserProfileId,
                                        up.Id as UserProfileId, up.DisplayName, up.FirstName, up.LastName, up.Email, up.UserTypeId
                                       FROM Post p 
                                        LEFT JOIN UserProfile up on p.UserProfileId = up.Id
                                        WHERE p.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    Post post = null;
                    while (reader.Read())
                    {
                        post = new Post()
                        {
                            Id = id,
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            ImageLocation = DbUtils.IsDbNull(reader, "ImageLocation") ? null :
                                DbUtils.GetString(reader,"ImageLocation"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),

                            },
                        };
                    }
                    reader.Close();
                    return post;
                }
            }
        }
 


































































        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post  (Title, Content, ImageLocation, 
                               CreateDateTime, PublishDateTime, IsApproved, 
                               CategoryId, UserProfileId)

                               OUTPUT INSERTED.ID
                        VALUES (@title, @content, @imageLocation, @createDateTime, @publishDateTime,
                                 @isApproved, @categoryId, @userProfileId)";

                    DbUtils.AddParameter(cmd, "@title", post.Title);
                    DbUtils.AddParameter(cmd, "@content", post.Content);
                    DbUtils.AddParameter(cmd, "@imageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@createDateTime", post.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@publishDateTime", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@isApproved", post.IsApproved);
                    DbUtils.AddParameter(cmd, "@categoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@userProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public void Update(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Post
                            SET Title = @title,
                                Content = @content,
                                ImageLocation = @imageLocation,
                                PublishDateTime = @publishDateTime,
                                IsApproved = @isApproved,
                                CategoryId = @categoryId
                                WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", post.Id);
                    DbUtils.AddParameter(cmd, "@title", post.Title);
                    DbUtils.AddParameter(cmd, "@content", post.Content);
                    DbUtils.AddParameter(cmd, "@imageLocation", post.ImageLocation);     
                    DbUtils.AddParameter(cmd, "@publishDateTime", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@isApproved", post.IsApproved);
                    DbUtils.AddParameter(cmd, "@categoryId", post.CategoryId);
                   

                    cmd.ExecuteNonQuery();

                }
            }
        }
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Post WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Post> GetPostsByUserProfileId(int userProfileId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                 SELECT p.Id as PostId, p.Title, p.Content, p.ImageLocation, p.CreateDateTime, p.PublishDateTime, p.IsApproved, p.CategoryId,
                                        up.Id as UserProfileId, up.DisplayName, up.FirstName, up.LastName, up.Email, up.UserTypeId,
                                        c.Id as CategoryId, c.[Name] as Category
                FROM Post p
                LEFT JOIN UserProfile up ON up.Id = p.UserProfileId
                LEFT JOIN Category c on c.Id = p.CategoryId
                WHERE p.UserProfileId = @userProfileId
            ";

                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);

                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Post> posts = new List<Post>();

                    while (reader.Read())
                    {
                        Post post = new Post()
                        {
                            Id = DbUtils.GetInt(reader, "PostId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),

                            },
                            category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "Category")
                            }
                        };

                        post.userProfile = new UserProfile()
                        {
                            DisplayName = reader.GetString(reader.GetOrdinal("DisplayName"))
                        };


                        posts.Add(post);
                    }
                    reader.Close();
                    return posts;

                }
            }
        }


        // FirebaseUserId is coming from current user Id in session storage
        public List<Post> GetPostsByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // getting all variables associated with the current user's Id
                    cmd.CommandText = @"
                                        SELECT u.Id AS UserProfileId, u.FirebaseUserId, u.DisplayName,

		                                        Post.Id AS PostId, Post.Title, Post.Content, Post.CategoryId, Post.CreateDateTime, Post.ImageLocation,
                                                c.Id as CategoryId, c.[Name] as Category
                                        FROM UserProfile u
                                        LEFT JOIN Post ON Post.UserProfileId = u.id
                                        LEFT JOIN Category c on Post.CategoryId = c.id
                                        WHERE u.FirebaseUserId = @firebaseUserId
                                        ORDER BY Post.CreateDateTime DESC";

                    // setting sql variable to value of the parameter being passed into the method
                    cmd.Parameters.AddWithValue("@firebaseUserId", firebaseUserId);

                    var reader = cmd.ExecuteReader();
                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "PostId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            },
                            category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "Category")
                            }

                        });
                    }
                    reader.Close();
                    return posts;
                }
            }
        }

    }
    
}




