import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'ObjToArray'
})
export class ObjToArrayPipe implements PipeTransform{
    transform(objeto: any=[]):any {
        return Object.values(objeto);
    }
}