@Injectable({
    providedIn: 'root'
  })
  export class moradas {
  
    constructor(private http:Httpmoradas) { }
  
    getAdress() {
      return new Observable (observer => {
        fetch('https://run.mocky.io/v3/1adc4a85-3181-4653-a899-7efe454056f7')
        .then(resposta => resposta.json())
        .then(json => {
          observer.next(json);
          observer.complete();
        });
      })
    }
  }