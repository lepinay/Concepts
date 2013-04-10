
function editorController($scope) {
	
	var radio = require("radio");  
  
    $scope.editor = new (require("Editor"))(fileOpener, radio, fileSaver);

    $scope.onTabSelected = function( path ){
        $scope.editor.selectEditor(path);
    }

    $scope.saveCurrentDocument = function(){
    	$scope.editor.saveCurrentDocument();
    }

    $scope.documents = $scope.editor.documents;
}