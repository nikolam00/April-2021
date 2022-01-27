import { Merac } from "./Merac.js";

var M1 = new Merac(1, "Toplomer", 35, 42, 1, "red", 37, 35, 41, 37.5);
var M2 = new Merac(2, "Barometar", 60, 78, 2, "green", 77, 62, 78, 65);

M1.crtaj(document.body);
M2.crtaj(document.body);