// Cada referencia va en APA 7. Los tramos { i: "…" } se muestran en cursiva.
export type Tramo = string | { i: string };
export type Referencia = { id: string; partes: Tramo[]; url: string };

const doi = (sufijo: string) => `https://doi.org/${sufijo}`;

export const REFERENCIAS: Referencia[] = [
  {
    id: "alvez2019",
    partes: [
      "Álvez, J., Hermo, M., Lucio, P., y Rigau, G. (2019). Automatic white-box testing of first-order logic ontologies. ",
      { i: "Journal of Logic and Computation, 29" },
      "(5), 723–751.",
    ],
    url: doi("10.1093/logcom/exz001"),
  },
  {
    id: "benzmuller2020",
    partes: [
      "Benzmüller, C., y Scott, D. S. (2020). Automating free logic in HOL, with an experimental application in category theory. ",
      { i: "Journal of Automated Reasoning, 64" },
      "(1), 53–72.",
    ],
    url: doi("10.1007/s10817-018-09507-7"),
  },
  {
    id: "bertot2004",
    partes: [
      "Bertot, Y., y Castéran, P. (2004). ",
      { i: "Interactive theorem proving and program development: Coq'Art: The calculus of inductive constructions" },
      ". Springer.",
    ],
    url: doi("10.1007/978-3-662-07964-5"),
  },
  {
    id: "cc",
    partes: [
      "Creative Commons. (s. f.). ",
      { i: "Atribución-NoComercial-CompartirIgual 4.0 Internacional (CC BY-NC-SA 4.0)" },
      ".",
    ],
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es",
  },
  {
    id: "harvard2021",
    partes: [
      "Harvard CMSA. (2021, 1 de abril). ",
      { i: "Lawrence Paulson | Doing mathematics with simple types: Infinitary combinatorics in Isabelle/HOL" },
      " [Video]. YouTube.",
    ],
    url: "https://www.youtube.com/watch?v=LZMtQNdqtvc",
  },
  {
    id: "jensen2018",
    partes: [
      "Jensen, A. B., Larsen, J. B., Schlichtkrull, A., y Villadsen, J. (2018). Programming and verifying a declarative first-order prover in Isabelle/HOL. ",
      { i: "AI Communications, 31" },
      "(3), 281–299.",
    ],
    url: doi("10.3233/aic-180764"),
  },
  {
    id: "kaufmann2022",
    partes: [
      "Kaufmann, D. (2022). Formal verification of multiplier circuits using computer algebra. ",
      { i: "it - Information Technology, 64" },
      "(6), 285–291.",
    ],
    url: doi("10.1515/itit-2022-0039"),
  },
  {
    id: "kaufmann2024",
    partes: [
      "Kaufmann, D., Fleury, M., Biere, A., y Kauers, M. (2024). Practical algebraic calculus and Nullstellensatz with the checkers Pacheck and Pastèque and Nuss-Checker. ",
      { i: "Formal Methods in System Design, 64" },
      "(1–3), 73–107.",
    ],
    url: doi("10.1007/s10703-022-00391-x"),
  },
  {
    id: "lund2024",
    partes: [
      "Lund, S. T., y Villadsen, J. (2024). On verified automated reasoning in propositional logic: Teaching sequent calculus to computer science students. ",
      { i: "Vietnam Journal of Computer Science, 11" },
      "(4), 621–644.",
    ],
    url: doi("10.1142/s2196888824500064"),
  },
  {
    id: "nipkow2014",
    partes: ["Nipkow, T., y Klein, G. (2014). ", { i: "Concrete semantics: With Isabelle/HOL" }, ". Springer."],
    url: doi("10.1007/978-3-319-10542-0"),
  },
  {
    id: "nipkow2026",
    partes: [
      "Nipkow, T., Paulson, L. C., y Wenzel, M. (2026). ",
      { i: "Isabelle/HOL: A proof assistant for higher-order logic" },
      ".",
    ],
    url: "https://isabelle.in.tum.de/doc/tutorial.pdf",
  },
  {
    id: "paulson1994",
    partes: [
      "Paulson, L. C. (1994). ",
      { i: "Isabelle: A generic theorem prover" },
      " (Lecture Notes in Computer Science, Vol. 828). Springer.",
    ],
    url: doi("10.1007/BFb0030541"),
  },
  {
    id: "reynolds2017",
    partes: [
      "Reynolds, A., Tinelli, C., y Barrett, C. (2017). Constraint solving for finite model finding in SMT solvers. ",
      { i: "Theory and Practice of Logic Programming, 17" },
      "(4), 516–558.",
    ],
    url: doi("10.1017/s1471068417000175"),
  },
  {
    id: "sanchez2019",
    partes: ["Sánchez, C. (2019, 8 de febrero). ", { i: "Normas APA" }, " (7.ª ed.)."],
    url: "https://normas-apa.org/",
  },
  {
    id: "schlichtkrull2020",
    partes: [
      "Schlichtkrull, A., Blanchette, J., Traytel, D., y Waldmann, U. (2020). Formalizing Bachmair and Ganzinger’s ordered resolution prover. ",
      { i: "Journal of Automated Reasoning, 64" },
      "(7), 1169–1195.",
    ],
    url: doi("10.1007/s10817-020-09561-0"),
  },
  {
    id: "sun2020",
    partes: [
      "Sun, T., y Yu, W. (2020). A formal system of axiomatic set theory in Coq. ",
      { i: "IEEE Access, 8" },
      ", 21510–21523.",
    ],
    url: doi("10.1109/access.2020.2969486"),
  },
  {
    id: "teege2024",
    partes: ["Teege, G. (2024). ", { i: "A gentle introduction to Isabelle and Isabelle/HOL" }, ". GitHub."],
    url: "https://github.com/gteege/gentle-isabelle",
  },
  {
    id: "coq",
    partes: ["The Coq Development Team. (s. f.). ", { i: "The Coq reference manual" }, "."],
    url: "https://coq.inria.fr/doc/",
  },
  {
    id: "udec",
    partes: ["Universidad de Cundinamarca. (s. f.). ", { i: "Líneas translocales de investigación" }, "."],
    url: "https://www.ucundinamarca.edu.co/investigacion/index.php/la-universidad/lineas-translocales-de-investigacion",
  },
  {
    id: "ye2024",
    partes: [
      "Ye, K., Woodcock, J., y Foster, S. (2024). Probabilistic unifying relations for modelling epistemic and aleatoric uncertainty: Semantics and automated reasoning with theorem proving. ",
      { i: "Theoretical Computer Science, 1021" },
      ", Artículo 114876.",
    ],
    url: doi("10.1016/j.tcs.2024.114876"),
  },
];

export function urlDe(id: string): string {
  return REFERENCIAS.find((r) => r.id === id)?.url ?? "#";
}
