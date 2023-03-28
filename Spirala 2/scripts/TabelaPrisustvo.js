let TabelaPrisustvo = function (divRef, podaci) {
  var maxSedmica = 0;
  var minSedmica = 0;
  var odabranaSedmica = maxSedmica;
  let prisustva;

  function validacija(podaci) {
    var prisustvaPoSedmicama = [];

    var maxSedmica = 0;
    for (let i = 0; i < podaci.prisustva.length; i++) {
      if (podaci.prisustva[i].sedmica > maxSedmica) {
        maxSedmica = podaci.prisustva[i].sedmica;
      }
    }
    console.log('maxSedmica', maxSedmica);

    for (let i = 0; i < maxSedmica; i++) {
      var prisustvaZaTrenutnuSedmicu = [];
      for (let j = 0; j < podaci.prisustva.length; j++) {
        if (i + 1 == podaci.prisustva[j].sedmica) {
          prisustvaZaTrenutnuSedmicu.push(podaci.prisustva[j]);
        }
      }
      prisustvaPoSedmicama.push(prisustvaZaTrenutnuSedmicu);
    }

    for (let i = 0; i < prisustvaPoSedmicama.length; i++) {
      if (prisustvaPoSedmicama[i].length < 1) {
        return 'Podaci o prisustvu nisu validni!';
      }
    }

    //broj vjezbi i broj predavanja nije ok

    for (let i = 0; i < podaci.prisustva.length; i++) {
      if (
        podaci.prisustva[i].predavanja > podaci.brojPredavanjaSedmicno ||
        podaci.prisustva[i].vjezbe > podaci.brojVjezbiSedmicno
      ) {
        return 'Podaci o prisustvu nisu validni!';
      } else if (
        podaci.prisustva[i].predavanja < 0 ||
        podaci.prisustva[i].vjezbe < 0
      ) {
        return 'Podaci o prisustvu nisu validni!';
      }
    }

    //vise prisustvu za istu sedmicu
    for (let i = 0; i < prisustvaPoSedmicama.length; i++) {
      // console.log('sedmica', prisustvaPoSedmicama[i][0].sedmica);
      for (let j = 0; j < podaci.studenti.length; j++) {
        var brojPrisustva = 0;
        for (let k = 0; k < prisustvaPoSedmicama[i].length; k++) {
          if (prisustvaPoSedmicama[i][k].index == podaci.studenti[j].index) {
            brojPrisustva++;
          }
        }
        // console.log('PRISUSTVO', brojPrisustva);
        // console.log('index', podaci.studenti[j].index);
        if (brojPrisustva > 1) {
          return 'Podaci o prisustvu nisu validni!';
        }
      }
    }

    //vise do 2 studenta u listi
    for (let i = 0; i < podaci.studenti.length; i++) {
      // console.log('student', podaci.studenti[i].index);
      var brojStudenta = 0;
      for (let j = 0; j < podaci.studenti.length; j++) {
        if (podaci.studenti[i].index == podaci.studenti[j].index) {
          brojStudenta++;
        }
      }
      // console.log('brojStudenta', brojStudenta);
      if (brojStudenta > 1) {
        return 'Podaci o prisustvu nisu validni!';
      }
    }

    //postoji prisustvo za studenta koji ne postoji
    for (let i = 0; i < podaci.prisustva.length; i++) {
      var pronadjen = false;
      for (let j = 0; j < podaci.studenti.length; j++) {
        if (podaci.prisustva[i].index == podaci.studenti[j].index) {
          pronadjen = true;
        }
      }
      if (pronadjen == false) {
        return 'Podaci o prisustvu nisu validni!';
      }
    }

    return 'Validacija je ok!';
  }

  function romanize(num) {
    if (isNaN(num)) return NaN;
    var digits = String(+num).split(''),
      key = [
        '',
        'C',
        'CC',
        'CCC',
        'CD',
        'D',
        'DC',
        'DCC',
        'DCCC',
        'CM',
        '',
        'X',
        'XX',
        'XXX',
        'XL',
        'L',
        'LX',
        'LXX',
        'LXXX',
        'XC',
        '',
        'I',
        'II',
        'III',
        'IV',
        'V',
        'VI',
        'VII',
        'VIII',
        'IX',
      ],
      roman = '',
      i = 3;
    while (i--) roman = (key[+digits.pop() + i * 10] || '') + roman;
    return Array(+digits.join('') + 1).join('M') + roman;
  }

  let RasporediPrisustvaPoSedmicama = function (podaci) {
    var prisustvaPoSedmicama = [];

    var maxSedmica = 0;
    for (let i = 0; i < podaci.prisustva.length; i++) {
      if (podaci.prisustva[i].sedmica > maxSedmica) {
        maxSedmica = podaci.prisustva[i].sedmica;
      }
    }
    console.log('maxSedmica', maxSedmica);

    for (let i = 0; i < maxSedmica; i++) {
      var prisustvaZaTrenutnuSedmicu = [];
      for (let j = 0; j < podaci.prisustva.length; j++) {
        if (i + 1 == podaci.prisustva[j].sedmica) {
          prisustvaZaTrenutnuSedmicu.push(podaci.prisustva[j]);
        }
      }
      prisustvaPoSedmicama.push(prisustvaZaTrenutnuSedmicu);
    }

    for (let i = 0; i < prisustvaPoSedmicama.length; i++) {
      if (prisustvaPoSedmicama[i].length < 1) {
        return 'nevalidno';
      }
    }

    return prisustvaPoSedmicama;
  };

  let RasporediPrisustvaPoStudentima = function (podaci) {
    var prisustvaPoStudentima = []; // niz nizova prisustva
    var maxSedmica = 0;
    for (let i = 0; i < podaci.prisustva.length; i++) {
      if (podaci.prisustva[i].sedmica > maxSedmica) {
        maxSedmica = podaci.prisustva[i].sedmica;
      }
    }

    for (let j = 0; j < podaci.studenti.length; j++) {
      var prisustvaJednogStudenta = [];
      for (let i = 0; i < podaci.prisustva.length; i++) {
        if (podaci.studenti[j].index == podaci.prisustva[i].index) {
          prisustvaJednogStudenta.push(podaci.prisustva[i]);
        }
      }
      prisustvaJednogStudenta.sort(function (a, b) {
        return a.sedmica - b.sedmica;
      });
      prisustvaPoStudentima.push(prisustvaJednogStudenta);
    }

    return prisustvaPoStudentima;
  };

  let crtanjeTabele = function (
    prisustva,
    divRef,
    podaci,
    odabranaSedmica,
    maxSedmica,
    minSedmica
  ) {
    let tabela = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let red = document.createElement('tr');

    let imeStudentaKolona = document.createElement('th');
    imeStudentaKolona.innerHTML = 'Ime i prezime';
    red.appendChild(imeStudentaKolona);

    let indexKolona = document.createElement('th');
    indexKolona.innerHTML = 'Index';
    red.appendChild(indexKolona);

    // console.log(prisustva[0][prisustva[0].length - 1]);
    //kreira nazive kolona i dodaje ih u red

    //najveceg ako je validno

    for (let k = 0; k < maxSedmica; k++) {
      let sedmicaKolona = document.createElement('th');
      if (odabranaSedmica - 1 == k) {
        sedmicaKolona.colSpan =
          podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno;
      }
      sedmicaKolona.innerHTML = romanize(k + 1);
      red.appendChild(sedmicaKolona);
    }

    let zadnjaSedmica = document.createElement('th');
    zadnjaSedmica.innerHTML = romanize(maxSedmica + 1) + '-XV';

    var zadnjaSedmicaIspisivanja = RasporediPrisustvaPoSedmicama(podaci);
    // console.log(
    //   'zadnja sedmica:',
    //   zadnjaSedmicaIspisivanja[zadnjaSedmicaIspisivanja.length - 1]
    // );

    for (let j = 0; j < podaci.studenti.length; j++) {
      //za svakog studenta dodaje red i puni ga podacima

      //prodjem objekat studenti i gledam ciji su isti indexi i izvadim u jednu varijablu jednog studenta
      let redPoStudentu = document.createElement('tr');
      let redPredavanjaVjezbe = document.createElement('tr');

      let imeStudenta = document.createElement('td');
      imeStudenta.innerHTML = podaci.studenti[j].ime;
      imeStudenta.rowSpan = 2;
      redPoStudentu.appendChild(imeStudenta);

      let indexStudenta = document.createElement('td');
      indexStudenta.innerHTML = podaci.studenti[j].index;
      indexStudenta.rowSpan = 2;
      redPoStudentu.appendChild(indexStudenta);

      var prisustvaZaTrenutnogStudenta = [];
      for (let pr = 0; pr < prisustva.length; pr++) {
        if (prisustva[pr].length == 0) {
        } else if (prisustva[pr][0].index === podaci.studenti[j].index) {
          //naslo prisustva za tog studenta
          prisustvaZaTrenutnogStudenta = prisustva[pr];
        }
      }
      console.log(
        'prisustvaZaTrenutnogStudenta:',
        prisustvaZaTrenutnogStudenta
      );

      // prisustvo.innerHTML = podaci.prisustva[k].

      //prolazi kroz sedmice za svakog studenta
      for (
        let k = 0;
        k <
        zadnjaSedmicaIspisivanja[zadnjaSedmicaIspisivanja.length - 1][0]
          .sedmica;
        k++
      ) {
        var pronadjenaSedmica = null;
        var postojiSedmica = false;
        for (let prSt = 0; prSt < prisustvaZaTrenutnogStudenta.length; prSt++) {
          if (prisustvaZaTrenutnogStudenta[prSt].sedmica == k + 1) {
            postojiSedmica = true;
            pronadjenaSedmica = prisustvaZaTrenutnogStudenta[prSt];
          }
        }
        var jeLiOdabranaSedmica = false;
        if (k + 1 == odabranaSedmica) {
          jeLiOdabranaSedmica = true;
        } else {
          jeLiOdabranaSedmica = false;
        }

        console.log('kolko puta prodje', k + 1);
        console.log('pronadjenaSedmica', pronadjenaSedmica);
        console.log('postojiSedmica:', postojiSedmica);
        console.log('jeLiOdabranaSedmica:', jeLiOdabranaSedmica);
        console.log('----------------');

        if (jeLiOdabranaSedmica) {
          if (postojiSedmica) {
            for (let pred = 0; pred < podaci.brojPredavanjaSedmicno; pred++) {
              let predavanjaUkupno = document.createElement('td');
              predavanjaUkupno.innerHTML = 'p' + '<br />' + (pred + 1);
              redPoStudentu.appendChild(predavanjaUkupno);
            }
            for (let brVj = 0; brVj < podaci.brojVjezbiSedmicno; brVj++) {
              let vjezbiUkupno = document.createElement('td');
              vjezbiUkupno.innerHTML = 'v' + '<br />' + (brVj + 1);
              redPoStudentu.appendChild(vjezbiUkupno);
            }

            for (let pred = 0; pred < podaci.brojPredavanjaSedmicno; pred++) {
              if (pred < pronadjenaSedmica.predavanja) {
                let predavanjaGledano = document.createElement('td');
                predavanjaGledano.innerHTML = '<br />';
                predavanjaGledano.className = 'zelena';
                redPredavanjaVjezbe.appendChild(predavanjaGledano);
              } else {
                let predavanjaGledano = document.createElement('td');
                predavanjaGledano.innerHTML = '<br />';
                predavanjaGledano.className = 'crvena';
                redPredavanjaVjezbe.appendChild(predavanjaGledano);
              }
            }
            for (let brVj = 0; brVj < podaci.brojVjezbiSedmicno; brVj++) {
              if (brVj < pronadjenaSedmica.vjezbe) {
                let vjezbiSlusano = document.createElement('td');
                vjezbiSlusano.innerHTML = '<br />';
                vjezbiSlusano.className = 'zelena';
                redPredavanjaVjezbe.appendChild(vjezbiSlusano);
              } else {
                let vjezbiSlusano = document.createElement('td');
                vjezbiSlusano.innerHTML = '<br />';
                vjezbiSlusano.className = 'crvena';
                redPredavanjaVjezbe.appendChild(vjezbiSlusano);
              }
            }
          } else if (!postojiSedmica) {
            //ovo cemo zadnje -  ispisivanje praznih
            for (let pred = 0; pred < podaci.brojPredavanjaSedmicno; pred++) {
              let predavanjaUkupno = document.createElement('td');
              predavanjaUkupno.innerHTML = 'p' + '<br />' + (pred + 1);
              redPoStudentu.appendChild(predavanjaUkupno);
            }
            for (let brVj = 0; brVj < podaci.brojVjezbiSedmicno; brVj++) {
              let vjezbiUkupno = document.createElement('td');
              vjezbiUkupno.innerHTML = 'v' + '<br />' + (brVj + 1);
              redPoStudentu.appendChild(vjezbiUkupno);
            }

            for (let pred = 0; pred < podaci.brojPredavanjaSedmicno; pred++) {
              let predavanjaGledano = document.createElement('td');
              predavanjaGledano.innerHTML = '<br />';
              redPredavanjaVjezbe.appendChild(predavanjaGledano);
            }
            for (let brVj = 0; brVj < podaci.brojVjezbiSedmicno; brVj++) {
              let vjezbiSlusano = document.createElement('td');
              vjezbiSlusano.innerHTML = '<br />';
              redPredavanjaVjezbe.appendChild(vjezbiSlusano);
            }
          }
        } else if (!jeLiOdabranaSedmica) {
          if (postojiSedmica) {
            //prisustvo

            let prisustvo = document.createElement('td');
            var prisustvoProsjekZaSedmicu =
              ((pronadjenaSedmica.vjezbe + pronadjenaSedmica.predavanja) /
                (podaci.brojVjezbiSedmicno + podaci.brojPredavanjaSedmicno)) *
              100;
            prisustvo.rowSpan = 2;
            prisustvo.innerHTML = prisustvoProsjekZaSedmicu + '%';
            redPoStudentu.appendChild(prisustvo);
          } else if (!postojiSedmica) {
            //prazno
            let praznaCelija = document.createElement('td');

            praznaCelija.rowSpan = 2;
            redPoStudentu.appendChild(praznaCelija);
          }
        }
      }

      let praznaCelija = document.createElement('td');
      praznaCelija.rowSpan = 2;
      redPoStudentu.appendChild(praznaCelija);
      tbody.appendChild(redPoStudentu);
      tbody.appendChild(redPredavanjaVjezbe);
    }

    red.appendChild(zadnjaSedmica);
    thead.appendChild(red);
    tabela.appendChild(thead);
    tabela.appendChild(tbody);

    //crtanje dugmadi
    var dugmeNazad = document.createElement('button');
    var dugmeNaprijed = document.createElement('button');

    dugmeNazad.style = 'height: 50px; width: 50px; ';
    dugmeNaprijed.style = 'height: 50px; width: 50px;';

    var strelicaLijevo = document.createElement('i');
    strelicaLijevo.className = 'fa-solid fa-arrow-left';
    strelicaLijevo.style = 'font-size: 30px';

    var strelicaDesno = document.createElement('i');
    strelicaDesno.className = 'fa-solid fa-arrow-right';
    strelicaDesno.style = 'font-size: 30px';

    dugmeNazad.appendChild(strelicaLijevo);
    dugmeNaprijed.appendChild(strelicaDesno);

    dugmeNazad.addEventListener('click', function () {
      prethodnaSedmica();
    });
    dugmeNaprijed.addEventListener('click', function () {
      sljedecaSedmica();
    });

    divRef.appendChild(tabela);
    divRef.appendChild(dugmeNazad);
    divRef.appendChild(dugmeNaprijed);
  };

  //implementacija metoda
  let sljedecaSedmica = function () {
    if (odabranaSedmica == maxSedmica) {
    } else {
      odabranaSedmica++;
      divRef.innerHTML = '';
      crtanjeTabele(
        prisustva,
        divRef,
        podaci,
        odabranaSedmica,
        maxSedmica,
        minSedmica
      );
    }
  };

  let prethodnaSedmica = function () {
    if (odabranaSedmica == minSedmica) {
      console.log('MINSEDMICA: ' + minSedmica);
    } else {
      odabranaSedmica--;
      divRef.innerHTML = '';
      crtanjeTabele(
        prisustva,
        divRef,
        podaci,
        odabranaSedmica,
        maxSedmica,
        minSedmica
      );
    }
  };

  if (validacija(podaci) == 'Podaci o prisustvu nisu validni!') {
    divRef.innerHTML = 'Podaci o prisustvu nisu validni!';
  } else {
    console.log(
      'rasporedi po sedmici: ',
      RasporediPrisustvaPoSedmicama(podaci)
    );

    maxSedmica = podaci.prisustva[0].sedmica;
    for (let i = 1; i < podaci.prisustva.length; i++) {
      if (podaci.prisustva[i].sedmica > maxSedmica) {
        maxSedmica = podaci.prisustva[i].sedmica;
      }
    }

    minSedmica = podaci.prisustva[0].sedmica;
    for (let i = 1; i < podaci.prisustva.length; i++) {
      if (podaci.prisustva[i].sedmica < minSedmica) {
        minSedmica = podaci.prisustva[i].sedmica;
      }
    }

    // console.log('minSedmica', minSedmica);

    odabranaSedmica = maxSedmica;
    prisustva = RasporediPrisustvaPoStudentima(podaci);

    crtanjeTabele(
      prisustva,
      divRef,
      podaci,
      odabranaSedmica,
      maxSedmica,
      minSedmica
    );
  }

  return {
    sljedecaSedmica: sljedecaSedmica,
    prethodnaSedmica: prethodnaSedmica,
  };
};
