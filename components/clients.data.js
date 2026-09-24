/**
 * Our own project clients' marks — the same list, in the same order, as
 * the hero's "Trusted by teams at" ticker (`tickerLogos` in
 * components/Hero.jsx). A plain module so the server-rendered /company
 * page can read it; Hero keeps its own copy for now, so add a client in
 * both places until Hero imports this one.
 */
export const CLIENTS = [
  { name: "Zindagi", src: "/Zindagi.webp" },
  { name: "BankIslami", src: "/bank-islami-logo.webp" },
  { name: "JS Bank", src: "/js-bank-logo.webp" },
  { name: "Easypaisa", src: "/Easypaisa-logo.webp" },
  { name: "Zindagi Health", src: "/Zindagi-Health.webp" },
  { name: "Crédit Agricole", src: "/creditagricole.webp" },
  { name: "Aik Islami", src: "/logo-aik-islamic.svg" },
];
