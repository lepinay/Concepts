function FileSelected(bus, editor){
    bus("FileSelected").subscribe(function (file) {
        if (!editor.hasFileOpened(file)) {
            var doc = fileOpener(file);
            editor.addDocument(doc);
            editor.selectDocument(file);
            bus("DocumentLoaded").broadcast(doc);
            bus("DocumentSelected").broadcast(doc);
       }
        self.selectEditor(file);
    });
}

function editorController($scope) {
	
	var radio = require("radio");  
  
    $scope.editor = new (require("Editor"))(radio, fileSaver);
    
    FileSelected(radio, $scope.editor);

    $scope.onTabSelected = function( path ){
        $scope.editor.selectEditor(path);
    };

    $scope.saveCurrentDocument = function(){
        $scope.editor.saveCurrentDocument();
    };

    $scope.documents = $scope.editor.documents;
}