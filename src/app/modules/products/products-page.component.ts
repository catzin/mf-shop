import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PageState } from './store/page/page.state';
import { Observable } from 'rxjs';
import { SideNav } from '../../core/models/sidenav.interface';
import { GetCategories, UpdateActive } from './store/page/page.action';
import PubSub from 'pubsub-js';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit{
  
  //services
  private store : Store = inject( Store );

  public loading : WritableSignal<boolean> = signal(true);
  public links : WritableSignal<string[]> = signal([]);

  @Select(PageState.getData) dataLink$ !: Observable<SideNav>;
 

  ngOnInit(): void {
    this.store.dispatch( new GetCategories())
    this.dataLink$.subscribe((e) => {
      this.links.set( e.categories );
      this.loading.set( e.load );   
    })

    PubSub.subscribe('user_info',function(msg,data){
      console.log(msg,data)
    })

  }

  public mySubscriber(msg : any,data : any){
    console.log(msg,data)
  }

  public selectedOption(cate : string){
    this.store.dispatch(new UpdateActive(cate))
  }



}
