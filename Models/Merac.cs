using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System;

namespace Models
{
    [Table("Merac")]
    public class Merac
    {
        [Key]
        public int IdMerac { get; set; }

        [Required]
        [MaxLength(30)]
        public string Naziv { get; set; }

        [Required]
        public int GraniceOd { get; set; }

        [Required]
        public int GranceDo { get; set; }

        [Required]
        public int Ineterval { get; set; }

        [Required]
        public string Boja { get; set; }

        [Required]
        public int interval {get; set;}

        [Required]
        public float Trenutna {get; set;}

        [Required]
        public float Minimum {get; set;}
        
        [Required]
        public float Maksimum {get; set;}

        [Required]
        public float Prosecno {get; set;}
    }
}