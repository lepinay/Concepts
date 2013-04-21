function tabsController($scope){
	var radio = require("radio");  
  
    $scope.tabs = new (require("Tabs"))(radio);
    
    FileSelected(radio, $scope.tabs);

    $scope.onTabSelected = function( path ){
        radio("FileSelected").broadcast(path);
    };

    $scope.documents = $scope.tabs.documents;
}