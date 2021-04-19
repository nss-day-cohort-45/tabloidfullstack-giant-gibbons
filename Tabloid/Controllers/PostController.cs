using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;


        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAllPosts());
        }



        [HttpPost]
        public IActionResult Post(Post post)
        {
            DateTime dateCreated = DateTime.Now;
            post.CreateDateTime = dateCreated;
            post.IsApproved = true;
            string firebaseUserProfileId = GetCurrentFirebaseUserProfileId();
            post.FirebaseUserId = firebaseUserProfileId;
            _postRepository.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }



        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.Update(post);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.Delete(id);
            return NoContent();
        }

        // passing firebaseUserId into GetPostsByFirebaseUserId and filtering all posts to get only the current user's posts
        [HttpGet("MyPosts")]
        public IActionResult MyPosts()
        {
            string firebaseUserProfileId = GetCurrentFirebaseUserProfileId();
            var posts = _postRepository.GetPostsByFirebaseUserId(firebaseUserProfileId);
            return Ok(posts);
        }

        // retrieves firebaseUserId which is then used in MyPosts()
        private string GetCurrentFirebaseUserProfileId()
        {
            string id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return id;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);

        }
    }
}

   


























