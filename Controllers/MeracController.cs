using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using System.Linq;
using Models;


namespace April_2021.AddControllers
{
    [ApiController]
    [Route("[controller]")]

    public class MeracController : ControllerBase
    {
        public Context Context { get; set; }

        public MeracController(Context context)
        {
            Context = context;
        }

        //      GET metode

        [HttpGet]
        [Route("Vrati_merace")]

        public ActionResult VratiMerace()
        {
            var meraci = Context.Meraci.ToList();

            return Ok(meraci);
        }

        [HttpPut]
        [Route("Promeni_vrednost/{id}/{novaVrednost}")]

        public async Task<ActionResult> promeniVrednost(int id, int novaVrednost)
        {
            try
            {
                var Merac = Context.Meraci.Where(p => p.IdMerac == id).FirstOrDefault();

                if (Merac != null)
                {
                    if (novaVrednost < Merac.Minimum || novaVrednost > Merac.Maksimum)
                    {
                        return BadRequest("Pogresna vrednost za novu vrednost!");
                    }

                    Merac.Trenutna = novaVrednost;

                    Context.Meraci.Update(Merac);
                }
                else
                    return BadRequest("Merac sa ovim Id-jem ne postoji!");

                
                await Context.SaveChangesAsync();
                return Ok($"Merac sa Id-jem {id} je promenjen!");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}