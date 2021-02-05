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

    generazione2 (startPointX: number, startPointY: number, endPointX: number, endPointY: number, level:number): Segment {
        const segmentoiniziale = new Segment(this.scene, startPointX, startPointY, endPointX, endPointY, level);
        return segmentoiniziale;
    }

    funzioneT (segmento: Segment) : Segment[] {
        const listaSegmenti: Segment[] = [];
        let offsetSegmento = this.maxOffset; //il massimo Offset che posso dare ad un vertice del segmento
        // listaSegmenti.push(segmento);
        for (let i = 0; i <= 1; i++) {
            let puntoMedioX = Phaser.Math.Average([segmento.startX, segmento.endX]); //calcola il punto medio delle coordinate X dei punti iniziale e finale
            let puntoMedioY = Phaser.Math.Average([segmento.startY, segmento.endY]); //calcola il punto medio delle coordinate Y dei punti iniziale e finale
             //trascina il punto medio per un estensione casuale lungo la normale al segmento
             const angolo = Math.atan2(segmento.endY - segmento.startY, segmento.endX - segmento.startX); //calcolo angolo di inclinazione del segmento
             const randomOffset = Phaser.Math.RND.between(-offsetSegmento, offsetSegmento); // prendi un offset random tra quelli massimi negativo e positivo
             const x1 = Math.sin(angolo) * randomOffset + puntoMedioX;
                const y1 = -Math.cos(angolo) * randomOffset + puntoMedioY;
                const x2 = -Math.sin(angolo) * randomOffset + puntoMedioX;
                const y2 = Math.cos(angolo) * randomOffset + puntoMedioY;
                if (Phaser.Math.RND.between(-1, 1) < 0) {                     //sceglie tra una estensione a sx o a dx oppure sopra/sotto
                    // console.log(this.random);
                    puntoMedioX = x1;
                    puntoMedioY = y1;
                } else {
                    // console.log(this.random);
                    puntoMedioX = x2;
                    puntoMedioY = y2;
                }
                listaSegmenti.push(new Segment(this.scene, segmento.startX, segmento.startY, puntoMedioX, puntoMedioY, segmento.level));
                listaSegmenti.push(new Segment(this.scene, puntoMedioX, puntoMedioY, segmento.endX, segmento.endY, segmento.level));
                if (i === Phaser.Math.RND.between(0,this.generazioni) && i%2 == 0) {
                    const direzione = Math.sqrt(Math.pow(puntoMedioX - segmento.startX, 2) + Math.pow(puntoMedioY - segmento.startY, 2));
                    const endPointBranch = {
                        x: segmento.endX,
                        y: segmento.endY
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