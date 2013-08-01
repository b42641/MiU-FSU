// main.js
// toBuy Project
// David Peterson 2013/6/19

var parseAddItemForm = function(data){
	//USES FORM DATA HERE

};

$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	

// addItem		
$('#addItem').on('pageinit', function(){

	var myForm = $('#addItemForm');
	var	addItemErrorsLink = $('#addItemErrorsLink');
	
	myForm.validate({
		invalidHandler: function(form, validator) {
			addItemErrorsLink.click();
			var html = '';
			if(itemName.value == "Enter the name of the item."){fieldName = "Item Name is required."};
			html += '<li>' + fieldName + '</li>';

			for(var key in validator.submitted){
				if(key == "itemName"){fieldName = "Item Name is required."};
				if(key == "vendorButton"){fieldName = "A Vendor must be selected."};
				if(key == "desireDate"){fieldName = "Date Desired is required."};

				//fieldName = key;
				html += '<li>' + fieldName + '</li>';
			};	
			$("#recordAddItemErrors ul").html(html);
		},		
				
		submitHandler: function() {
			var data = myForm.serializeArray();
			parseAddItemForm(data);
			storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	// the actual JSON OBJECT is loaded from HTML page
	//	store JSON data
	for(var n in json){
		var id          = Math.floor(Math.random()*100000001);
        localStorage.setItem(id, JSON.stringify(json[n]));
	} 
};
$('#browseItemsPage').on('pageinit', function(){
//	getData();
//});
	
//var getData = function(){
    if(localStorage.length === 0){
        alert("There is no data in local storage so default data was added.");
		autofillData();
    }
    // Write Data from Local Storage to Screen
    //------------
	var html = '';
			
	for(var i=0, len=localStorage.length; i<len; i++){
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var obj = JSON.parse(value);
        // 

		$("#browseItemsPage ul").html("hello");

		html += "<li> <img src= 'img/"+ obj.mediaType[1] + ".png'></li>";
	    for(var n in obj){
	      	if(obj[n][0] == "Item Name"){
	            var optSubText = obj[n][0]+" "+obj[n][1];
				html += '<li>' + optSubText;
			} else {
				var optSubText = "&nbsp;&nbsp;&nbsp;&nbsp;" + obj[n][0]+" "+obj[n][1];
				html += '<li>' + optSubText;
			}
	    }
	}

	$("#browseItemsPage ul").html(html);
});

		
    
    //-----------
    /*var makeDiv = document.createElement('div');
    makeDiv.setAttribute("id", "items");
    var makeList = document.createElement('ul');
	makeDiv.innerHTML = '';

    makeDiv.appendChild(makeList);
    document.body.appendChild(makeDiv);
    //eLement('items').style.display = "block";

    for(var i=0, len=localStorage.length; i<len; i++){
    	var browseItemsContent = document.getElementById("browseItemsContent")
    	

        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var obj = JSON.parse(value);
        
        var makeSubList = document.createElement('ul');
        makeli.appendChild(makeSubList);
        getImage(obj.mediaType[1], makeSubList);
        for(var n in obj){
            var makeSubli = document.createElement('li');
            makeSubList.appendChild(makeSubli);
            var optSubText = obj[n][0]+" "+obj[n][1];
            makeSubli.innerHTML = optSubText;
            makeSubli.appendChild(linksLi);
        }
        //makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete buttons for each
    }*/
//};

//get image for the cooresponding mediaType
function getImage(mediaName){
    var imageLi = document.createElement('li');
    makeSubList.appendChild(imageLi);
    var newImg = document.createElement('img');
    var setSrc = newImg.setAttribute("src", "img/"+ mediaName + ".png");
    imageLi.appendChild(newImg);
}
	
	// storeData 
	var storeData = function(data){
		var id = Math.floor(Math.random()*100000000001);
		console.log(id);
		var item = {};
			item.itemName       = data[0].value;
			item.mediaType      = data[1].value;
			item.desiredVendor  = data[2].value;
			item.priority       = data[3].value;
			item.desireDate     = data[4].value;
			console.log("in storeData");
			localStorage.setItem(id, JSON.stringify(item));
			alert("Item Saved!");
			addReset.click();
			goHome.click();
			
	
	}; 
	

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};

//Set Link and Submit Click Events    
// -- Border Active 
// -- focus actions
    var focusItem = function(){
        itemName.value="";
    }
       
    var blurItem = function(){
        itemName.value="Enter the name of the item.";
    }    
	
  
   //EventListener
    itemName.addEventListener("focus", focusItem);
    itemName.addEventListener("blur", blurItem);
    
//
/*
    var getData = function(){
    if(localStorage.length === 0){
        alert("There is no data in local storage so default data was added.");
		autofillData();
    }
    // Write Data from Local Storage to Screen
    var makeDiv = document.createElement('div');
    makeDiv.setAttribute("id", "items");
    var makeList = document.createElement('ul');
	makeDiv.innerHTML = '';

    makeDiv.appendChild(makeList);
    document.body.appendChild(makeDiv);
    //eLement('items').style.display = "block";

    for(var i=0, len=localStorage.length; i<len; i++){
    	var browseItemsContent = document.getElementById("browseItemsContent")
    	
        var makeli = document.createElement('li');
        var linksLi = document.createElement('li');
        makeList.appendChild(makeli);
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var obj = JSON.parse(value);
        
        var makeSubList = document.createElement('ul');
        makeli.appendChild(makeSubList);
        getImage(obj.mediaType[1], makeSubList);
        for(var n in obj){
            var makeSubli = document.createElement('li');
            makeSubList.appendChild(makeSubli);
            var optSubText = obj[n][0]+" "+obj[n][1];
            makeSubli.innerHTML = optSubText;
            makeSubli.appendChild(linksLi);
        }
        //makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete buttons for each
    }
};
*/
    