import {Component, OnInit, Output, EventEmitter} from '@angular/core';

declare var ace:any;

@Component({
    selector: 'ace-editor',
    template: '<div id="editor"></div>'
})
export class AceEditorComponent implements OnInit {
    editor:any;
    @Output() ready = new EventEmitter();

    ngOnInit() {
        this.editor = ace.edit("editor");
        this.editor.setTheme("ace/theme/monokai");
        this.editor.getSession().setMode("ace/mode/typescript");
        this.editor.setOptions({
            maxLines: 50
        });

        this.ready.emit(this.editor);
    }
}