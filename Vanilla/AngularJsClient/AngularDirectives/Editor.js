var radio = require("radio");
var modes = {};
modes.html = "htmlmixed";
modes.js = "javascript";
modes.css = "css";
modes.xml = "xml";
modes.sql = "text/x-sql";

angular.module('editor', [])
.directive('ngEditor', function () {
    return function (scope, element, attrs) {
        var docs = [];
        var currentDoc;
        
        var cm = CodeMirror(element[0], {
            theme:"ambiance" ,
            dragDrop:false,
            lineNumbers: true, 
            indentUnit:4,
            highlightSelectionMatches: true,
            //gutters: ["CodeMirror-lint-markers"],
            //lintWith: CodeMirror.javascriptValidator,
            autoCloseTags: true,
            extraKeys: {
                "Ctrl-S": function(instance) { 
                    currentDoc.content = instance.getValue();
                    scope.$apply(function(){
                        radio("SaveCurrentDocument").broadcast(currentDoc);
                    });
                },
            }
        });
        
        cm.on("change",function(){
            scope.$apply(function(){
                radio("CurrentDocumentModified").broadcast();
            });
        });
        
        radio("DocumentSelected").subscribe(function(doc){
            currentDoc = doc;
            cm.swapDoc(docs[doc.path]);
            cm.focus();
        });
        
        radio("DocumentLoaded").subscribe(function(doc){
            var extIdx = doc.path.indexOf(".");
            var mode;
            if(extIdx >= 0 )mode = modes[ doc.path.substr( extIdx  + 1 ) ];
            docs[doc.path] = CodeMirror.Doc(doc.content,mode);
        });
       
        document.getElementById('editor').ondrop = function(e){
            e.preventDefault();
            scope.$apply(function(){
                for (var i = 0; i < e.dataTransfer.files.length; ++i) {
                    radio("FileSelected").broadcast(e.dataTransfer.files[i].path);
                }
            });
            return false;
        };
        
        var resize = function(){
            var $element = $(element);
            var $parent = $element.closest("#editor");
            cm.setSize($parent.width(), $parent.height() - $element.position().top );
        };
        resize();
        radio("Reflow").subscribe(resize);
        
    };
});

