let div = document.getElementById('divSadrzaj');
//instanciranje
let prisustvo = TabelaPrisustvo(div, {
  studenti: [
    { ime: 'Neko Nekic', index: 12345 },
    { ime: 'Drugi Neko', index: 15432 },
  ],
  prisustva: [
    { sedmica: 1, predavanja: 1, vjezbe: 2, index: 12345 },
    { sedmica: 4, predavanja: 1, vjezbe: 2, index: 15432 },
    { sedmica: 3, predavanja: 1, vjezbe: 2, index: 15432 },
    { sedmica: 2, predavanja: 0, vjezbe: 1, index: 12345 },
    { sedmica: 3, predavanja: 0, vjezbe: 0, index: 12345 },
  ],
  predmet: 'WT',
  brojPredavanjaSedmicno: 3,
  brojVjezbiSedmicno: 2,
});

//pozivanje metoda
// prisustvo.sljedecaSedmica();
// prisustvo.prethodnaSedmica();
