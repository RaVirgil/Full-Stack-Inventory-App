import { Injectable } from '@angular/core';
import { HttpService } from '../api/http.service';

@Injectable({providedIn: 'root'})
export class EmailService {
    constructor(private readonly httpService: HttpService) { }
    
    public sendMessage(object: any): void{
        this.httpService.post('sirhood/mail', object).subscribe();
    }
}