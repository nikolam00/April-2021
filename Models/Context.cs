using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class Context:DbContext
    {
        public DbSet<Merac> Meraci { get; set; }

        public Context(DbContextOptions options)
        : base(options)
        { }
    }
}