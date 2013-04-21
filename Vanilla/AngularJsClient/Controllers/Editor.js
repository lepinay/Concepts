function FileSelected(bus, editor){
    var cache = [];
    bus("FileSelected").subscribe(function (file) {
        if (!cache[file]) {
            cache[file] = fileOpener(file);
            bus("DocumentLoaded").broadcast(cache[file]);
       	}
        bus("DocumentSelected").broadcast(cache[file]);
    });
}

function DocumentSaver(bus, filesaver){
    bus("SaveCurrentDocument").subscribe(function(doc){
        filesaver(doc.path,doc.content);
    });
}

var radio = require("radio");  
DocumentSaver(radio,fileSaver);

