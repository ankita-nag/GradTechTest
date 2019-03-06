function createMenuData(data) {
	// Declare an array to store different elements 
	var result = [];
	// Declare an object to store parent and child menu items
	var obj;
	// Iterate through the list of data items
	for (var i = 0; i < data.length; i++){
		//Split the data items by /
		var splitMenuParts = data[i].split("/");
		// If there is a slash in the data item, process it further else ignore it
		if (splitMenuParts.length>1){
			obj ={};
			//Store the parent menu item as title
			obj.title = splitMenuParts[0];
			//Store the child menu item as data
			obj.data = splitMenuParts[1];
			// Push to the result array
			result.push(obj);
		}
	}
	// Declare an object to store unique parent menus
	const parentMenus = {};
	// Iterate over the result array
	result.forEach(function (object) {
		// If the title does not exist, add it else just append the data elements
		if (!parentMenus[object.title]) {
		parentMenus[object.title] = {
			title: object.title,
			data: [],
		};
	}
	// Keep on appending the child menus
	parentMenus[object.title].data.push(object.data);
	});
	// Now extract unique list
	const menuList = [];
	Object.keys(parentMenus).forEach(function (title) {
		// Extract the values from the map and put it to menuList
		menuList.push(parentMenus[title]);
	})
	// Retunr final menu list
	return menuList;
}
describe("menu Data Generator", () => {
    it("creates correct data structure ", () => {
      const data = [
        "parent1/parent1child",
        "parent1/parent1child2",
        "parent2/parent2child",
        "parent2/parent2child2",
        "parent1/parent1child3",
        "parent3",
        "parent3/parent3child1",
        "parent4"
      ];
  
      const expectedResult = [
        {
			title: "parent1",
			data: ["parent1child", "parent1child2", "parent1child3"]
        },
        { 
			title: "parent2", 
			data: ["parent2child", "parent2child2"] 
		},
        { 	
			title: "parent3", 
			data: ["parent3child1"] 
		}
      ];
  
      const actualResult = createMenuData(data);
      expect(actualResult).toMatchObject(expectedResult);
    });
  });