function explorerController($scope) {
	
    var radio = require("radio");
  
    $scope.explorer = new (require("Explorer"))(fileOpener, filesLister, radio, getFilename, localStorage);

    $scope.onFileSelected = function (file) {
        $scope.explorer.selectFile(file);
    };

    $scope.onFolderSelected = function (folder) {
        $scope.explorer.selectFolder(folder);
    };

    $scope.folders = $scope.explorer.folders;
    
    radio("FilesDropedOnExplorer").subscribe(function(file){
        $scope.$apply(function(){
            $scope.explorer.addFile(file);
        });
    });
}