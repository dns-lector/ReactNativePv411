export default interface INbuRate {
    "r030": number,
    "txt": string,
    "rate": number,
    "cc": string,
    "exchangedate": string,
    "special": string|null,
}
/*
{
    r030: 826,
    txt: "Фунт стерлінгів",
    rate: 59.6954,
    cc: "GBP",
    exchangedate: "11.05.2026",
    special: null
},
{
    r030: 840,
    txt: "Долар США",
    rate: 43.855,
    cc: "USD",
    exchangedate: "11.05.2026",
    special: "N"
},
*/