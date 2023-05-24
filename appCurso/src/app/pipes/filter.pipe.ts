import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any,args: any): any {
    const resultPosts=[];
    for(const post of value){
      if(post.nombre.toLowerCase().indexOf(args.toLowerCase())>-1 ){
        resultPosts.push(post);
      }

    }
    return resultPosts;
  }
 /* transform(value: any,args: any): any {
    const resultPosts=[];
    for(const post of value){
      if((post.nombre.toLowerCase().indexOf(args.toLowerCase())>-1) ||(post.ap.toLowerCase().indexOf(args.toLowerCase())>-1) ||(post.am.toLowerCase().indexOf(args.toLowerCase())>-1)  ){
        resultPosts.push(post);
      }

    }
    return resultPosts;
  }*/

}
