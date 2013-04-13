function explorerController($scope) {
	
    var radio = require("radio");
  
    $scope.explorer = new (require("Explorer"))(fileOpener, filesLister, radio);

    $scope.onFileSelected = function (file) {
        $scope.explorer.selectFile(file);
    };

    $scope.onFolderSelected = function (folder) {
        $scope.explorer.selectFolder(folder);
    };

    $scope.folders = $scope.explorer.folders;
}