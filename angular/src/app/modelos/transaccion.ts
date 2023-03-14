import { Title } from '@angular/platform-browser';


export interface Transaccion {
    [x: string]: any;
    id?:string;
    origen?:string;
    destino?:string;
    cantidad?:number;
    fecha_realizada?:Date
};
