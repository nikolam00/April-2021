export class Merac {
    constructor(id, Naziv, Od, Do, Int, Boja, Trenutna, Min, Max, Prosek) {
        this.id = id;
        this.Naziv = Naziv;
        this.GraniceOd = Od;
        this.GraniceDo = Do;
        this.Interval = Int;
        this.Boja = Boja;
        this.Trenutna = Trenutna;
        this.Minimum = Min;
        this.Maksimum = Max;
        this.Prosek = Prosek;

        this.container = null;
    }

    removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    crtaj(host) {
        this.kontainer = document.createElement("div");
        this.kontainer.classList.add("GlavniKontejner");
        this.kontainer.classList.add(this.id);
        host.appendChild(this.kontainer);

        var Zaglavlje = document.createElement("div");
        Zaglavlje.className = "Zaglavlje";
        this.kontainer.appendChild(Zaglavlje);

        var Grafik = document.createElement("div");
        Grafik.className = "Grafik";
        this.kontainer.appendChild(Grafik);

        this.crtajZaglavlje(Zaglavlje);
        this.crtajGrafik(Grafik);
    }

    crtajZaglavlje(host) {
        this.removeAllChildNodes(host);

        var Naslov = document.createElement("div");
        Naslov.className = "Naslov";
        host.appendChild(Naslov);

        var lblPrikaz = document.createElement("label");
        lblPrikaz.className = "labela";
        lblPrikaz.innerHTML = this.Naziv;
        Naslov.appendChild(lblPrikaz);

        var input = document.createElement("input");
        input.type = "text";
        input.className = "input";
        Naslov.appendChild(input);

        var btnSet = document.createElement("button");
        btnSet.innerHTML = "Setuj vrednost";

        btnSet.onclick = (ev) => this.PromeniVrednostJS(input.value);

        Naslov.appendChild(btnSet);

        var vrednosti = document.createElement("div");
        vrednosti.className = "vrednosti";
        host.appendChild(vrednosti);



        var labele = ["Max izmerena vrednost:", "Min izmerena vrednost:", "Prosecna vrednost:"];
        var labMax, labMin, labPr;
        var lab = [labMax, labMin, labPr];
        let i = 0;

        labele.forEach(p => {

            lab[i] = document.createElement("label");
            if (i === 0)
                lab[i].innerHTML = p + this.Maksimum;
            if (i === 1)
                lab[i].innerHTML = p + this.Minimum;
            if (i === 2)
                lab[i].innerHTML = p + this.Prosek;
            vrednosti.appendChild(lab[i]);
            i++;
        })
    }

    crtajGrafik(host) {

        this.removeAllChildNodes(host);

        var podeoci = document.createElement("div");
        podeoci.className = "podeoci";
        host.appendChild(podeoci);


        var stubic = document.createElement("div");
        stubic.className = "stubic";
        host.appendChild(stubic);

        this.crtajPodeoke(podeoci);
        this.crtajStubic(stubic);
    }

    crtajStubic(host) {
        var stub = document.createElement("div");
        stub.className = "stub";
        stub.style.backgroundColor = this.Boja;
        stub.style.height = ((this.Trenutna - this.GraniceOd) / (this.GraniceDo - this.GraniceOd)) * 100 + "%";
        host.appendChild(stub);
    }

    crtajPodeoke(host) {

        for (let i = this.GraniceDo; i >= this.Minimum; i--) {
            var podeok = document.createElement("div");
            podeok.className = "podeok";
            host.appendChild(podeok);

            var lab1 = document.createElement("label");
            lab1.className = "labPodeok";
            lab1.innerHTML = "_____";
            podeok.appendChild(lab1);

            var lab2 = document.createElement("label");
            lab2.className = "labPodeok";
            lab2.innerHTML = i;
            podeok.appendChild(lab2);
        }
    }

    PromeniVrednost(novaVrednost) {
        fetch("https://localhost:5001/Merac/Promeni_vrednost/" + this.id + "/" + novaVrednost, {
            method: 'PUT',
            body: JSON.stringify({
                "id": this.id,
                "novaVrednost": novaVrednost
            })
        }).then(Response => {

            // DA li treba da se pribavi taj merac preko nekog GEt i da se promene vrednosti za ovaj objekat, ili moze ovako?

            this.Trenutna = novaVrednost;

            let Zaglavlje = this.kontainer.querySelector(".Zaglavlje");
            this.crtajZaglavlje(Zaglavlje);

            let Grafik = this.kontainer.querySelector(".Grafik");
            this.crtajGrafik(Grafik);
        })
    }

    PromeniVrednostJS(novaVrednost) {
        this.Trenutna = novaVrednost;

        let Zaglavlje = this.kontainer.querySelector(".Zaglavlje");
        this.crtajZaglavlje(Zaglavlje);

        let Grafik = this.kontainer.querySelector(".Grafik");
        this.crtajGrafik(Grafik);
    }


}