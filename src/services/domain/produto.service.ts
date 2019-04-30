import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class ProdutoService{
    constructor(public http: HttpClient){}
    findByCategoria(categoria_id: string){
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
    }

    findById(produto_id : string) {
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
      }

    getSmallImage(id : string) : Observable<any> {
        let url = `assets/imgs/prod${id}-small.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }
    getImage(id : string) : Observable<any> {
        let url = `assets/imgs/prod${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }
}