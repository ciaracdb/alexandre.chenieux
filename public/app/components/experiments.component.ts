import {Component, AfterContentChecked} from '@angular/core';

declare var ace:any;

@Component({
    selector: 'experiments',
    templateUrl: '../../templates/experiments.html'
})
export class ExperimentsComponent implements AfterContentChecked {
    ShareDB:any;

    constructor() {
        this.ShareDB = require('sharedb');
        var socket = new WebSocket('ws://localhost:3000/ws');
        var connection = new this.ShareDB.Connection(socket);
        console.log(connection);
    }

    ngAfterContentChecked() {
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode("ace/mode/javascript");
        editor.setOptions({
            maxLines: 50
        });
    }
}