import { BehaviorSubject, map } from "rxjs";

export const regions = [
  { label: "BOENY" },
  { label: "DIANA" },
  { label: "SAVA" },
  { label: "BETSIBOKA" },
  { label: "MELAKY" },
  { label: "SOFIA" },
  { label: "ANALAMANGA" },
  { label: "VAKINANKARATRA" },
  { label: "ALAOTRA MANGORO" },
  { label: "ATSINANANA" },
  { label: "ITASY" },
  { label: "BONGOLAVA" },
  { label: "HAUTE MATSIATRA" },
  { label: "ATSIMO ANDREFANA" },
  { label: "VATOVAVY" },
  { label: "FITOVINANY" },
  { label: "ANDROY" },
  { label: "MENABE" },
  { label: "IHOROMBE" }
];

export const referents = [
  {
    region: "BOENY",
    lieu: [
      { label: "CSI MAHABIBO" },
      { label: "CSB 2 MAHAVOKY ATSIMO" },
      { label: "CSAJ TSARARANO AMBANY" },
      { label: "CSB 2 TSARARANO AMBONY" },
      { label: "CSB 2 ANTANIMASAJA" },
      { label: "CSB 2 AMBOROVY" },
      { label: "CSB 2 TANAMBAO SOTEMA" },
      { label: "CSB U MAROVOAY" },
      { label: "CSB 2 AMBATOBOENY" }
    ]
  },
  {
    region: "DIANA",
    lieu: [
      { label: "CSB 2 HELL VILLE" },
      { label: "CSB 2 DZAMANDZAR" },
      { label: "CSB 1 AMBATOLOAKA" },
      { label: "CSB 2 AMBANJA" },
      { label: "CSB 2 AMBILOBE" }
    ]
  },
  { region: "SAVA", lieu: [] },
  { region: "BETSIBOKA", lieu: [] },
  { region: "MELAKY", lieu: [] },
  { region: "SOFIA", lieu: [] },
  { region: "ANALAMANGA", lieu: [] },
  { region: "VAKINANKARATRA", lieu: [] },
  { region: "ALAOTRA MANGORO", lieu: [] },
  { region: "ATSINANANA", lieu: [] },
  { region: "ITASY", lieu: [] },
  { region: "BONGOLAVA", lieu: [] },
  { region: "HAUTE MATSIATRA", lieu: [] },
  { region: "ATSIMO ANDREFANA", lieu: [] },
  { region: "VATOVAVY", lieu: [] },
  { region: "FITOVINANY", lieu: [] },
  { region: "ANDROY", lieu: [] },
  { region: "MENABE", lieu: [] },
  { region: "IHOROMBE", lieu: [] }
];

export const referent$ = new BehaviorSubject([]);

referent$.next(referents);
