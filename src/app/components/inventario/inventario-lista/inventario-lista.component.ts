import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InventarioService } from 'src/app/services/inventario_service';
import { trashBin, pencil, cog, bagAdd, chevronForward, chevronBack } from 'ionicons/icons';
import { ProductCardComponent } from 'src/app/components/commons/product-card/product-card.component';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';
import { RecargaStockModalComponent } from '../recarga-stock-modal/recarga-stock-modal.component';
import {FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule, } from '@angular/forms';
import { CommonService } from 'src/app/services/common_service';
import { PopoverController } from '@ionic/angular/standalone';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'inventario-lista',
  templateUrl: './inventario-lista.component.html',
  styleUrls: ['./inventario-lista.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ProductCardComponent, ReactiveFormsModule]

})
export class InventarioListaComponent  implements OnInit {
  private searchSubject = new Subject<string>();
  
  
  constructor(private formBuilder: FormBuilder, private inventarioSvc: InventarioService, private modalController: ModalController, private commonService: CommonService, private popoverController: PopoverController) { 

    addIcons({trashBin, pencil,cog, bagAdd, chevronBack, chevronForward})
    this.searchSubject.pipe(
      debounceTime(300) // Ajusta el tiempo según lo que necesites
    ).subscribe(searchTerm => {
      this.filterItems(searchTerm);
    });
  }
  
  editForm: FormGroup = this.formBuilder.group({
    search: new FormControl('', [Validators.required]),
  });

  productos:any[]=[]
  mensaje:string=""
  showInventario:boolean=false;
  showCategorias:boolean=false;
  loading:boolean=false;
  actualPage:number = 1;
  url:string = '?limit=10&page='+this.actualPage;
  pages: number[] = Array(0).fill(0);

  ngOnInit() {this.getInventario()}

  onSearchInput(event: any) {
    const searchTerm = event.target.value;
    this.searchSubject.next(event);
  }
  getInventario(){
    this.productos = [];
    this.loading = true;
    this.inventarioSvc.getItems(this.actualPage, '').subscribe(
    (res:any)=>{
      if(res.status_code == 200){
        this.productos = res.data
        this.mensaje= '';
        this.pages = Array(res.total_pages).fill(0);
      }else{
        this.mensaje = res.detail;
        this.commonService.openModalConfirmation(this.mensaje, "close-outline")
      }
      this.loading = false;
    }, 
    (error:any)=>{
      this.loading = false;
      if(error.status == 401){
        this.commonService.closeSesionByToken();
      }else{
        this.commonService.openModalConfirmation("Error de conexíon", "close-outline")
      }
    })
  }
  filterItems($event?:any){

    if($event){
      $event.preventDefault();
      this.editForm.controls['search'].setValue($event.target.value);
    }

    this.loading = true;
    this.productos = [];
    this.inventarioSvc.getItems(this.actualPage, this.editForm.controls['search'].value).subscribe(
      (res:any)=>{
        if(res.status_code == 200){
          this.productos=res.data
          this.pages = Array(res.total_pages).fill(0);
          this.mensaje= ''
        }
        else{
          this.mensaje = res.detail
          this.commonService.openModalConfirmation(this.mensaje, "close-outline")
        }
        this.loading = false;
      }, 
      (error:any)=>{
        this.loading = false;
        if(error.status == 401){
          this.commonService.closeSesionByToken();
        }else{
          this.commonService.openModalConfirmation("Error de conexión", "close-outline")
        }
      })
  }
  async openModal(item:any) {

    const modal = await this.modalController.create({
      component: EditItemModalComponent,
      cssClass: 'modal-xl',
      componentProps: {item:item},
    });
    
    modal.onDidDismiss().then((result) => {
      if (result.data) {
         this.filterItems();
      }
      this.popoverController.dismiss();
    });

    return await modal.present();  
  }

  async openModalStock(item:any) {

    const modal = await this.modalController.create({
      component: RecargaStockModalComponent,
      cssClass: 'my-custom-modal',
      componentProps: {item:item},
    });
    
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.filterItems();
      }
      this.popoverController.dismiss();
    });

    return await modal.present();  
  }

  setPage(page:number){
    if(page < 1 || page > this.pages.length){
      return;
    }
    this.actualPage = page;
    this.url = this.url.replace(/page=\d+/, 'page=' + this.actualPage);
    this.getInventario();
  }
  nextPage(){
    if(this.actualPage < this.pages.length){
      this.actualPage++;
      this.url = this.url.replace(/page=\d+/, 'page=' + this.actualPage);
      this.getInventario();
    }
  }  
  prevPage(){
    if(this.actualPage > 1){
      this.actualPage--;
      this.url = this.url.replace(/page=\d+/, 'page=' + this.actualPage);
      this.getInventario();
    }
  }

}
