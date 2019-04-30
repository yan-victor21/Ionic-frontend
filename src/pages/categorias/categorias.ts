import { CategoriaDTO } from './../../models/categoria.dto';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  imagensUrl: string = 'assets/imgs'
  items: CategoriaDTO[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public categoriaService: CategoriaService) {}

  ionViewDidLoad() {
    this.categoriaService.findAll().subscribe(response =>{
      
      this.items = response;
      //console.log(response);
    },error =>{});
  
  }
  showProdutos(categoria_id:string){
    this.navCtrl.push('ProdutosPage',{categoria_id:categoria_id});
  }
}
