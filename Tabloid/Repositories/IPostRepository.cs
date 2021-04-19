using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAllPosts();
        void Add(Post post);
        void Delete(int id);
        void Update(Post post);
        List<Post> GetPostsByUserProfileId(int userProfileId);
        List<Post> GetPostsByFirebaseUserId(string firebaseUserId);
    }
}