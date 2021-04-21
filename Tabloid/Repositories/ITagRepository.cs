using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        void Add(Tag tag);
        void Delete(int id);
        List<Tag> GetAllTags();
        void Update(Tag tag);
    }
}