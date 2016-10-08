import { Injectable } from '@angular/core';

@Injectable()
export class ShareDBAceEditorService {
    private ShareDB:any;
    private connection:any;
    public savedLines:Array<string>;
    public dontTriggerChange:boolean;
    public aceDocument:any;
    public shareDocument:any;

    constructor() {
        this.dontTriggerChange = false;
    }

    connectWebSocket(url:string) {
        this.ShareDB = require('sharedb');
        var otText = require('ot-text');
        this.ShareDB.types.register(otText.type);
        var socket = new WebSocket(url);
        this.connection = new this.ShareDB.Connection(socket);
    }

    closeConnection() {
        this.connection.close();
    }

    sync(editor:any, collection:string, documentName:string) {
        var self = this;

        this.aceDocument = editor.getSession().getDocument();

        if(this.shareDocument) {
            this.shareDocument.destroy();
        } else {
            this.aceDocument.on('change', function(e:any) {
                if (!self.dontTriggerChange) {
                    var op;
                    if(e.action == 'insert') {
                        var start = self.aceDocument.positionToIndex(e.start);
                        var lines = e.lines.join('\n');
                        op = [start, lines];
                    } else if(e.action == 'remove') {
                        var start = self.aceDocument.positionToIndex(e.start);
                        var end = e.lines.join('\n').length;

                        op = [start, {d: end}];
                    }
                    self.shareDocument.submitOp(op, {source: 'moi'});
                    self.savedLines = self.aceDocument.getAllLines();
                }
            });
        }

        this.shareDocument = this.connection.get(collection, documentName);

        this.shareDocument.subscribe(function(err) {
            if (err)
                throw err;
            if(self.shareDocument.data) {
                self.dontTriggerChange = true;
                self.aceDocument.setValue(self.shareDocument.data);
                self.dontTriggerChange = false;
            }


            self.savedLines = self.aceDocument.getAllLines();

            self.shareDocument.on('op', function(op, source) {
                if (source === 'moi')
                    return;

                var cursor = 0;
                for(let i of op) {
                    if(typeof i === 'number') {
                        cursor += i;
                    } else if(typeof i === 'string') {
                        var str = i;
                        var start = self.aceDocument.indexToPosition(cursor);
                        var lines = str.split('\n');
                        end = {row: (start.row + lines.length - 1), column: lines[lines.length-1].length};
                        var delta = {action: 'insert', start: start, end: end, lines: lines};

                        self.dontTriggerChange = true;
                        self.aceDocument.applyDeltas([delta]);
                        self.dontTriggerChange = false;

                        cursor += str.length;
                    } else {
                        var start = self.aceDocument.indexToPosition(cursor);
                        var end = self.aceDocument.indexToPosition(cursor+i.d);
                        var lines = new Array<string>();
                        var delta = {action: 'remove', start: start, end: end, lines: lines};

                        self.dontTriggerChange = true;
                        self.aceDocument.applyDeltas([delta]);
                        self.dontTriggerChange = false;
                    }
                }
            });
        });
    }
}