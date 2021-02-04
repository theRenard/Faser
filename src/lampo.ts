import Game from '~/Game';
import Segment from '~/Segment';
import {
    LAMPO_GENERAZIONI,
    LAMPO_MAXOFFSET,
    LAMPO_SCALA
} from '~/constants.json';

export default class Lampo {
    generazioni!: number;
    maxOffset!: number;
    scala!: number;
    scene!: Game;
    random!:boolean   
    constructor(scene: Game, generazioni: number, maxOffset: number, scala: number) {
        this.scene = scene;
        this.generazioni = LAMPO_GENERAZIONI;
        this.maxOffset = LAMPO_MAXOFFSET;
        this.scala = LAMPO_SCALA;
    }

    generazione(startPointX: number, startPointY: number, endPointX: number, endPointY: number, level:number) {
        const t0 = performance.now();
        const listaSegmenti: Segment[] = []; //array vuoto
        // const nuovaLista: Segment[] = []; //un altro array di appoggio
        const segmento1 = new Segment(this.scene, startPointX, startPointY, endPointX, endPointY, level);
        listaSegmenti.push(segmento1); //metto nell'array un primo segmento che va dal punto iniziale a quello finale
        let offsetSegmento = this.maxOffset; //il massimo Offset che posso dare ad un vertice del segmento

        for (let i = 0; i < this.generazioni; i++) {
            console.log('ciclo 1');
            listaSegmenti.forEach((segmento) =>{
            //for (const oldsegment in listaSegmenti) { //per tutti gli elementi del primo array
                console.log('ciclo 2');
                // console.log(vecchioSegmento);
                //const segmento = new Segment(this.scene, startPointX, startPointY, endPointX, endPointY, 1); // fai un altro segmento
                console.log(listaSegmenti[0]);
                console.log(listaSegmenti[1]);
                console.log(listaSegmenti[2]);
                console.log(listaSegmenti[3]);
                let puntoMedioX = Phaser.Math.Average([listaSegmenti[0].startX, listaSegmenti[0].endX]); //calcola il punto medio delle coordinate X dei punti iniziale e finale
                console.log(puntoMedioX, segmento.startX, segmento.endX);
                let puntoMedioY = Phaser.Math.Average([listaSegmenti[0].startY, listaSegmenti[0].endY]); //calcola il punto medio delle coordinate Y dei punti iniziale e finale
                console.log(puntoMedioY, segmento.startY, segmento.endY);


                //trascina il punto medio per un estensione casuale lungo la normale al segmento
                const angolo = Math.atan2(listaSegmenti[0].endY - listaSegmenti[0].startY, listaSegmenti[0].endX - listaSegmenti[0].startX); //calcolo angolo di inclinazione del segmento
                console.log(angolo);
                const randomOffset = Phaser.Math.RND.between(-offsetSegmento, offsetSegmento); // prendi un offset random tra quelli massimi negativo e positivo
                console.log(randomOffset);
                const x1 = Math.sin(angolo) * randomOffset + puntoMedioX;
                console.log(x1);
                const y1 = -Math.cos(angolo) * randomOffset + puntoMedioY;
                console.log(y1);
                const x2 = -Math.sin(angolo) * randomOffset + puntoMedioX;
                console.log(x2);
                const y2 = Math.cos(angolo) * randomOffset + puntoMedioY;
                console.log(y2);

                if (Phaser.Math.RND.between(-1, 1) < 0) {                     //sceglie tra una estensione a sx o a dx oppure sopra/sotto
                    console.log(this.random);
                    puntoMedioX = x1;
                    puntoMedioY = y1;
                } else {
                    console.log(this.random);
                    puntoMedioX = x2;
                    puntoMedioY = y2;
                }
                listaSegmenti.push(new Segment(this.scene, listaSegmenti[0].startX, listaSegmenti[0].startY, puntoMedioX, puntoMedioY, listaSegmenti[0].level));
                listaSegmenti.push(new Segment(this.scene, puntoMedioX, puntoMedioY, listaSegmenti[0].endX, listaSegmenti[0].endY, listaSegmenti[0].level));
                listaSegmenti.splice(0,1);
                console.log(listaSegmenti.length);


                if (i === Phaser.Math.RND.between(0,this.generazioni) && i%2 == 0) {
                    const direzione = Math.sqrt(Math.pow(puntoMedioX - listaSegmenti[0].startX, 2) + Math.pow(puntoMedioY - listaSegmenti[0].startY, 2));
                    const endPointBranch = {
                        x: listaSegmenti[0].endX,
                        y: listaSegmenti[0].endY
                    };
                    let angoloSuddivisione;
                    console.log(listaSegmenti[0].endX, listaSegmenti[0].endY);
                    if (Phaser.Math.RND.between(0, 2) < 1) {
                        angoloSuddivisione = Phaser.Math.RND.between(-0.8, -0.2);
                    } else {
                        angoloSuddivisione = Phaser.Math.RND.between(0.2, 0.8);
                    }
                    console.log(angoloSuddivisione);
                    Phaser.Math.RotateAroundDistance(endPointBranch, puntoMedioX, puntoMedioY, angoloSuddivisione, this.scala * direzione);
                    listaSegmenti.push(new Segment(this.scene, puntoMedioX, puntoMedioY, endPointBranch.x, endPointBranch.y, listaSegmenti[0].level + 1));
                    console.log(endPointBranch.x, endPointBranch.y);

                }

            })

            offsetSegmento /= 2;
            // listaSegmenti = nuovaLista;
        }
        const t1 = performance.now();
        console.log("Performance singolo Lampo " + (t1 - t0) + " millisecondi.")
        return listaSegmenti;

    }

    generazione2 (startPointX: number, startPointY: number, endPointX: number, endPointY: number, level:number): Segment {
        const segmentoiniziale = new Segment(this.scene, startPointX, startPointY, endPointX, endPointY, level);
        return segmentoiniziale;
    }

    funzioneT (segmento: Segment) : Segment[] {
        const listaSegmenti: Segment[] = [];
        let offsetSegmento = this.maxOffset; //il massimo Offset che posso dare ad un vertice del segmento
        listaSegmenti.push(segmento);
        for (let i = 0; i <= listaSegmenti.length; i++) {
            let puntoMedioX = Phaser.Math.Average([listaSegmenti[0].startX, listaSegmenti[0].endX]); //calcola il punto medio delle coordinate X dei punti iniziale e finale
            let puntoMedioY = Phaser.Math.Average([listaSegmenti[0].startY, listaSegmenti[0].endY]); //calcola il punto medio delle coordinate Y dei punti iniziale e finale
             //trascina il punto medio per un estensione casuale lungo la normale al segmento
             const angolo = Math.atan2(listaSegmenti[0].endY - listaSegmenti[0].startY, listaSegmenti[0].endX - listaSegmenti[0].startX); //calcolo angolo di inclinazione del segmento
             const randomOffset = Phaser.Math.RND.between(-offsetSegmento, offsetSegmento); // prendi un offset random tra quelli massimi negativo e positivo
             const x1 = Math.sin(angolo) * randomOffset + puntoMedioX;
                const y1 = -Math.cos(angolo) * randomOffset + puntoMedioY;
                const x2 = -Math.sin(angolo) * randomOffset + puntoMedioX;
                const y2 = Math.cos(angolo) * randomOffset + puntoMedioY;
                if (Phaser.Math.RND.between(-1, 1) < 0) {                     //sceglie tra una estensione a sx o a dx oppure sopra/sotto
                    console.log(this.random);
                    puntoMedioX = x1;
                    puntoMedioY = y1;
                } else {
                    console.log(this.random);
                    puntoMedioX = x2;
                    puntoMedioY = y2;
                }
                listaSegmenti.push(new Segment(this.scene, listaSegmenti[0].startX, listaSegmenti[0].startY, puntoMedioX, puntoMedioY, listaSegmenti[0].level));
                listaSegmenti.push(new Segment(this.scene, puntoMedioX, puntoMedioY, listaSegmenti[0].endX, listaSegmenti[0].endY, listaSegmenti[0].level));
                listaSegmenti.splice(0,1);
                if (i === Phaser.Math.RND.between(0,this.generazioni) && i%2 == 0) {
                    const direzione = Math.sqrt(Math.pow(puntoMedioX - listaSegmenti[0].startX, 2) + Math.pow(puntoMedioY - listaSegmenti[0].startY, 2));
                    const endPointBranch = {
                        x: listaSegmenti[0].endX,
                        y: listaSegmenti[0].endY
                    };
                    let angoloSuddivisione;
                    if (Phaser.Math.RND.between(0, 2) < 1) {
                        angoloSuddivisione = Phaser.Math.RND.between(-0.8, -0.2);
                    } else {
                        angoloSuddivisione = Phaser.Math.RND.between(0.2, 0.8);
                    }
                    Phaser.Math.RotateAroundDistance(endPointBranch, puntoMedioX, puntoMedioY, angoloSuddivisione, this.scala * direzione);
                    listaSegmenti.push(new Segment(this.scene, puntoMedioX, puntoMedioY, endPointBranch.x, endPointBranch.y, listaSegmenti[0].level + 1));


                }
                offsetSegmento /= 2;
        }
        return listaSegmenti;
        
    }

    
}