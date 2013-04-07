function explorerController($scope) {

    $scope.onFileSelected = function (file) {
        $scope.component.explorer.selectFile(file);
    }

    $scope.onFolderSelected = function (folder) {
        $scope.component.explorer.selectFolder(folder);
    }

    $scope.explorer = $scope.component.explorer.tree;
}