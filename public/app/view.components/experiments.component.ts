import {Component, OnInit, OnDestroy} from '@angular/core';
import {ShareDBAceEditorService} from '../services/sharedb.ace-editor.service';

declare var $:any;

@Component({
    selector: 'experiments',
    templateUrl: '../../templates/experiments.html',
    providers: [ShareDBAceEditorService]
})
export class ExperimentsComponent implements OnInit, OnDestroy {


    constructor(private shareService:ShareDBAceEditorService) {
        this.shareService.connectWebSocket('ws://'+window.location.host+'/ws');
    }

    editorReady(editor) {
        this.shareService.sync(editor, 'documents', 'test');
    }

    ngOnInit() {
        $('#jstree').jstree();
    }


    ngOnDestroy() {
        this.shareService.closeConnection();
    }
}