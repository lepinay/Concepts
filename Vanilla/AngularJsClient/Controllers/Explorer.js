function FolderSelected(radio, explorer){
    radio("SelectFolder").subscribe(function(folder){
        folder.expanded = !folder.expanded;
        if (folder.expanded && folder.files.length == 0 && folder.folders.length == 0){
            var newContent = filesLister(folder.path);
            folder.files = newContent.files;
        	folder.folders = newContent.folders;
        }
    });    
}

function FilesDropedOnExplorer(radio, explorer){
    radio("FilesDropedOnExplorer").subscribe(function(file){
        explorer.addFolder(getFilename(file),file);
    });
}

function ApplicationClosing(localStorage, explorer){
    radio("ApplicationClosing").subscribe(function(){
        localStorage["Explorer"] = JSON.stringify(explorer.folders);
    });
}

function ApplicationStarting(localStorage, explorer){
    var store = localStorage["Explorer"];
    if(store)store = JSON.parse(store);
    explorer.folders = store?store:[];
}

function explorerController($scope) {
	
    var radio = require("radio");
  
    $scope.explorer = new (require("Explorer"))(radio);
    
    FolderSelected(radio, $scope.explorer);
    FilesDropedOnExplorer(radio, $scope.explorer);
    ApplicationClosing(localStorage, $scope.explorer);
    ApplicationStarting(localStorage, $scope.explorer);

    $scope.onFileSelected = function (file) {
        radio("FileSelected").broadcast(file);
    };

    $scope.onFolderSelected = function (folder) {
        radio("SelectFolder").broadcast(folder);
    };

    $scope.folders = $scope.explorer.folders;
    
    radio("Angular.FilesDropedOnExplorer").subscribe(function(file){
        $scope.$apply(function(){
            radio("FilesDropedOnExplorer").broadcast(file);
        });
    });
}