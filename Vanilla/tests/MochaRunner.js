var expect = require("chai").expect;
var radio = require("radio");
var Editor = require("Editor");
var Explorer = require("Explorer");

var mockFileOpener = function(path){
				var files = {};
				files["somefilepath"] = {path:"somefilepath"};
				return files[path];
			}

describe("Mocha runner",function(){
	describe("When I save any file", function(){
		it("should run mocha on all test folders", function(){

			var explorer = new Explorer(null,null,radio);
          	var	editor = new Editor(mockFileOpener, radio, function(){});
          	var mochaRunner = new MochaRunner();

          	explorer.setTree({
              path:"c:/",
              folders:[{
                path:"c:/tests/",
                files:["test.js"]
              }]
            });
			explorer.selectFile("c:/tests/test.js");
			editor.saveCurrentDocument();
          
          	var expectedResult = ["start",{"total":1}]
				["pass",{"title":"should blah","fullTitle":"Editor blah ","duration":1}];
          
          	expect(mochaRunner.result).to.deep.equal(expectedResult);
		
		});	
	});
});