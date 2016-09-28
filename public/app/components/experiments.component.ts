import {Component} from '@angular/core';

@Component({
    selector: 'experiments',
    templateUrl: '../../templates/experiments.html'
})
export class ExperimentsComponent {
    ShareDB:any;

    constructor() {
        this.ShareDB = require('sharedb');
        var socket = new WebSocket('ws://localhost:3000/ws');
        var connection = new this.ShareDB.Connection(socket);
        console.log(connection);

        var doc = connection.get('examples', 'textarea');
        doc.subscribe(function(err) {
            if (err) throw err;
            var element = document.querySelector('textarea');
        });
    }
}
