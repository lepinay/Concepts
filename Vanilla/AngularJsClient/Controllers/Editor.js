function editorController($scope) {

    $scope.onTabSelected = function( path ){
        $scope.component.editor.selectEditor(path);
    }

    $scope.saveCurrentDocument = function(){
    	$scope.component.editor.saveCurrentDocument();
    }

    $scope.documents = $scope.component.editor.documents;
}