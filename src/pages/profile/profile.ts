import { ClienteService } from './../../services/domain/cliente.service';
import { ClienteDTO } from './../../models/cliente.dto';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  cliente: ClienteDTO;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: StorageService,
              public clienteService: ClienteService) {}

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email).subscribe(response =>{
        this.cliente = response;
        //this.getImageIfExists();
      }, error =>{});
    }
  }
  /*getImageIfExists(){
    this.clienteService.getImage(this.cliente.id).subscribe(response =>{
      this.cliente.imageUrl = `assets/imgs/${this.cliente.id}.jpg`;
    });*/
    
  

}
