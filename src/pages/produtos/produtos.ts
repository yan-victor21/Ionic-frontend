import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[] =[];
  page:number=0;
  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public produtoService:ProdutoService,
              public loading: LoadingController) {
  }

  loadData(){
    let categoria_id = this.navParams.get('categoria_id')
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id,this.page,10).subscribe(response =>{
      let start = this.items.length;
      this.items = this.items.concat(response['content']);
      let end = this.items.length-1;
      loader.dismiss();
      this.loadImageUrls(start,end);
    },error =>{
      loader.dismiss();
    });
  }
  ionViewDidLoad() {
    this.loadData();
  }

  loadImageUrls(start: number, end: number) {
    for (var i= start; i<= end; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImage(item.id)
        .subscribe(response => {
          item.imageUrl = `assets/imgs/prod${item.id}-small.jpg`;
        },
        error => {});
    }
  } 
  
  showDetail(produto_id:string){
    this.navCtrl.push('ProdutoDetailPage',{produto_id:produto_id});
  }

  presentLoading() {
    let loader = this.loading.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
