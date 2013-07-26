// brDisplay.js
// toBuy Project
// David Peterson 2013/6/19
// VFW 1306 assignment 3
// toBuy gives the user a central location to create a "wishlist"
// for books, music, software,
// ultimately the category can be linked to preferred online store
//

//Wait until the DOM is ready.



window.addEventListener("DOMContentLoaded", function(){
/*    
    //getElementById
    function eLement(x){
        var theElement = document.getElementById(x);
        return theElement;
    }
    
 
    
//Find value of selected checkbox
//    function getSelectedCheckbox(){

//        var desiredVendorvalue = document.forms[0].desiredVendor;
    var getChkItems = function(){
    var checkBoxes = document.getElementById("inputForm").vendors;
        for(i=0, j=checkBoxes.length; i<j; i++){
            if(checkBoxes[i].checked){
                desiredVendorValue = checkBoxes[i].value;
            };
        };
    }

    function toggleControls(n){
        switch(n){
            case "on":
                eLement('inputForm').style.display = "none";
                eLement('clearLink').style.display = "inline";
                eLement('displayLink').style.display = "none";
                eLement('addNew').style.display = "inline"
                break;
            case "off":
                eLement('inputForm').style.display = "block";
                eLement('clearLink').style.display = "inline";
                eLement('displayLink').style.display = "inline";
                eLement('addNew').style.display = "none";
                eLement('items').style.display = "none";
                break;
            default:
                return false;
        }
    }
    
*/
    function getData(){
        toggleControls("on");
        if(localStorage.length === 0){
            alert("There is no data in local storage so default data was added.");
			autoFillData();
        }
        // Write Data from Local Storage to Screen
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
		makeDiv.innerHTML = '';

        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        eLement('items').style.display = "block";

        for(var i=0, len=localStorage.length; i<len; i++){
            var makeli = document.createElement('li');
            var linksLi = document.createElement('li');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //Convert string from local storage back to an object
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
            makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete buttons for each
        }
    }

/*
    //get image for the cooresponding mediaType
    function getImage(mediaName, makeSubList){
        var imageLi = document.createElement('li');
        makeSubList.appendChild(imageLi);
        var newImg = document.createElement('img');
        var setSrc = newImg.setAttribute("src", "img/"+ mediaName + ".png");
        imageLi.appendChild(newImg);
    }
    
	// Auto
	function autoFillData(){
		// the actual JSON OBJECT is loaded from HTML page
		//	store JSON data
		for(var n in json){
			var id          = Math.floor(Math.random()*100000001);
	        localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	
    // Make Item Links
    //Creat the edit and delete links for each item
    function makeItemLinks(key, linksLi){
        //add edit single item link
        var editLink = document.createElement("a");
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Contact";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);
        
        //
        var breakTag = document.createElement('br');
        linksLi.appendChild(breakTag);
        
        //delete single item link
        var deleteLink = document.createElement("a");
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Contact";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink)
    }
    


    
    function clearLocal(){
        if(localStorage.length === 0){
            alert("There is no data to clear.")
        }else{
            localStorage.clear();
            alert("All Items are deleted.");
            window.location.reload();
            return false;
        }
    }

    //Variable defautls
//    var mediaTypes = ["-- Media Type --", "book", "ebook", "audible", "music", "movie"];
    var desiredVendorValue;
    var errMsg = eLement('errors');
//    makeMedia();
    
//Set Link and Submit Click Events    
// -- Border Active 
// -- focus actions
    var focusItem = function(){
        itemName.setAttribute("class", "hasFocus");
    }
    var focusDesireDate = function(){
        desireDate.setAttribute("class", "hasFocus");
    }    
    var focusDescription = function(){
        description.setAttribute("class", "hasFocus");
    }
        
*/


    var displayLink = eLement('displayLink');
    displayLink.addEventListener("click", getData);
    


});    
    
