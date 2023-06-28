import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class DataService {
    constructor(private readonly connection: Connection) { }
    async query() {
        try {
           
    }catch{

    }
}
}
