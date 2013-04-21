function FileSelected(bus, editor){
    var cache = [];
    bus("FileSelected").subscribe(function (file) {
        if (!cache[file]) {
            cache[file] = fileOpener(file);
            bus("DocumentLoaded").broadcast(cache[file]);
            editor.addDocument(cache[file]);
       	}
        editor.selectDocument(cache[file].path);
        bus("DocumentSelected").broadcast(cache[file]);
    });
}

function editorController($scope) {
	
	var radio = require("radio");  
  
    $scope.editor = new (require("Editor"))(radio, fileSaver);
    
    FileSelected(radio, $scope.editor);

    $scope.onTabSelected = function( path ){
        radio("FileSelected").broadcast(path);
    };

    $scope.saveCurrentDocument = function(){
        $scope.editor.saveCurrentDocument();
    };

    $scope.documents = $scope.editor.documents;
}