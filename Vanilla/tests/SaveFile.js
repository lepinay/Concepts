var expect = require("chai").expect;
var radio = require("radio");
var Editor = require("Editor");
var Explorer = require("Explorer");

var mockFileOpener = function(path){
				var files = {};
				files["somefilepath"] = {path:"somefilepath"};
				return files[path];
			} 

function MockFileSaver(){
	var self = this;
	
	this.log = [];

	this.save = function(path,content){
		self.log.push({path:path,content:content});
	}

}

describe("Editor",function(){
	describe("When I modify a file in an opened tab and I hit ctrl+s", function(){
		it("should save the file", function(){

			var mockFileSaver = new MockFileSaver();
			var explorer = new Explorer(null,null,radio);
			var	editor = new Editor(mockFileOpener, radio, mockFileSaver.save);

			explorer.setTree({path:"somefilepath"});
			explorer.selectFile("somefilepath");
			editor.setCurrentDocumentContent("Blah");
			editor.saveCurrentDocument();

			expect(mockFileSaver.log).to.deep.equal([{path:"somefilepath",content:"Blah"}]);

		})	
	})
})