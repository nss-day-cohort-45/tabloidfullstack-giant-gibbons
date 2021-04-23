using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }

        public List<Comment> GetAllCommentsByPostId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT c.Id, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime,
                                               p.Id,                                    
                                               u.Id AS userId
                                        FROM Comment c
                                        JOIN Post p ON c.PostId = p.Id
                                        JOIN UserProfile u ON c.UserProfileId = u.Id
                                        WHERE c.PostId = @id
                                        ORDER BY c.CreateDateTime DESC
                                        ";
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();
                    var comments = new List<Comment>();
                    while (reader.Read())
                    {
                        comments.Add(new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "userId")
                            }

                        });
                    }
                    reader.Close();
                    return comments;
                }

            }
        }
    }


}
