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
	 
};

var getData = function(){

};

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

    
    