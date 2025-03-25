using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WaterController : ControllerBase
    {

        private WaterDbContext _waterContext;
        public WaterController(WaterDbContext temp) 
        { 
            _waterContext = temp;
        }

        [HttpGet("AllProjects")]
        public IActionResult GetProjects(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? projectTypes = null) // last part is receiving project types
        {
            var query = _waterContext.Projects.AsQueryable();

            if (projectTypes != null && projectTypes.Any()) // looking to see if the variable is empty
            {
                query = query.Where(p => projectTypes.Contains(p.ProjectType));     // if the project types don't match, filter out
            }

            var totalNumProjects = query.Count();


            string? favProjType = Request.Cookies["FavoriteProjectType"];
            Console.WriteLine("~~~~~COOKIE~~~~~\n" + favProjType);

            HttpContext.Response.Cookies.Append("FavoriteProjectType", "Borehole Well and Hand Pump", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,                  // cookie is only sent over https
                SameSite = SameSiteMode.None, // limiting cookies to just our site
                Expires = DateTime.Now.AddMinutes(1),
            });


            var something = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();


            var someObject = new 
            { 
                Projects = something,                   // getting the objects in json format
                TotalNumProjects = totalNumProjects     // getting the number of objects
            };

            return Ok(someObject);          // Need 'Ok' for when passing multiple objects out. 
                                            // 'Ok' converts output to json as well as sends out HTTP 200 message.

        }

        [HttpGet("GetProjectTypes")]
        public IActionResult GetProjectTypes ()
        {
            var projectTypes = _waterContext.Projects
                .Select(p =>  p.ProjectType) 
                .Distinct()
                .ToList(); 
            return Ok(projectTypes);
        }
    }
}
