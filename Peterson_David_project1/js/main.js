// additem.js
// toBuy Project
// David Peterson 2013/6/19
// VFW 1306 assignment 3
// toBuy gives the user a central location to create a "wishlist"
// for books, music, software,
// ultimately the category can be linked to preferred online store
//

//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
    
    //getElementById
    function eLement(x){
        var theElement = document.getElementById(x);
        return theElement;
    }
    
/*    //Create Select Field Element and populate with option
    function makeMedia(){
        var formTag = document.getElementsByTagName("form"),  //formTag is an array of all the formTags
            selectLi = eLement('select'),
            makeSelect = document.createElement('select');
            makeSelect.setAttribute("id", "mediaTypes");
        for (var i=0, j=mediaTypes.length; i<j; i++){
            var makeOption = document.createElement('option');
            var optText = mediaTypes[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        if(selectLi){selectLi.appendChild(makeSelect)};
    }
*/
 
    
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
    
    function storeData(key){
        //if no key then new item needing key
        if(!key){
            var id          = Math.floor(Math.random()*100000001);
        }else{
            //set id to the existing key
            id = key;
        }
        //Gather all form field values and store in object
        //Object properties are going to contain an array with form label and input values
        getChkItems();
        var item        = {};
            item.itemName       = ["Item Name", eLement('itemName').value];
            item.mediaType      = ["Media Type", eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", desiredVendorValue];
            item.priority       = ["Priority", eLement('priority').value];
            item.desireDate     = ["DesiredDate", eLement('desireDate').value];
            item.description    = ["Description", eLement('description').value];

        //Save Data into local storage: use stringify to convert our object to a string
        localStorage.setItem(id, JSON.stringify(item));
        alert("Contact Saved!");
    }
    
    function getData(){
        toggleControls("on");
        if(localStorage.length === 0){
            alert("There is no data in local storage.")
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
    
    //get image for the cooresponding mediaType
    function getImage(mediaName, makeSubList){
        var imageLi = document.createElement('li');
        makeSubList.appendChild(imageLi);
        var newImg = document.createElement('img');
        var setSrc = newImg.setAttribute("src", "img/"+ mediaName + ".png");
        imageLi.appendChild(newImg);
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
    
    function editItem(){
        //Grab the data from our item from Local Storage       
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        // Show the form
        toggleControls("off");
        //poplulate the form from current localStorage values
        eLement('itemName').value = item.itemName[1];
        // mediaType
        eLement('mediaType').value = item.mediaType[1];

        // checkboxes
            document.getElementById("amazon").checked=false;
            document.getElementById("iTunes").checked=false;
            document.getElementById("audible").checked=false;
    
        if(item.desiredVendor[1] == "Amazon"){
            document.getElementById("amazon").checked=true;
        }
        if(item.desiredVendor[1] == "iTunes"){
            document.getElementById("iTunes").checked=true;
        }
        if(item.desiredVendor[1] == "Audible"){
            document.getElementById("audible").checked=true;
        }

        //eLement('mediaType').value = item.media[1];
        eLement('priority').value = item.priority[1];
        eLement('desireDate').value = item.desireDate[1];
        eLement('description').value = item.description[1];
        
        //Remove the initial listener from the input 'save contact' button
        save.removeEventListener("click", storeData);
        //Change Submit Button value to edit button
        eLement('submitButton').value = "Edit Contact";
        var editSubmit = eLement('submitButton');
        //Save the key value established in this function as a property of the editSubmit event
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
    }
    
    function deleteItem(){
        var ask = confirm("Are you sure you want to delete this contact?");
        if(ask){
            localStorage.removeItem(this.key);
            window.location.reload()
        }else{
            alert("Contact was not deleted.")
        }
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
    
    function validate(e){
        //define elements we want to check
        var getItemName = eLement('itemName');
        var getDesireDate = eLement('desireDate');
        //Reset
        errMsg.innerHTML = "";
        getItemName.style.border = "1px solid black";
        getDesireDate.style.border = "1px solid black";
        // Get error messages
        var messageArray = [];
        //
        if(getItemName.value === ""){
            var itemNameError = "Item cannot be blank";
            getItemName.style.border = "1px solid red";
            messageArray.push(itemNameError);
        }
        
        // Date Validation
		// not needed for iPhone 
/*        var re = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
        if(getDesireDate.value ==="" || !(re.exec(getDesireDate.value))){
            var desireDateError = "Please enter a valid date.";
            getDesireDate.style.border = "1px solid red";
            messageArray.push(desireDateError);
        } */
        // if errors, display on screen
        if(messageArray.length >= 1){
            for(var i=0, j=messageArray.length; i < j; i++){
                var txt = document.createElement('li');
                txt.innerHTML = messageArray[i];
                errMsg.appendChild(txt);
            }
            e.preventDefault();
            return false;
        }else{
            //If ll is ok, save our data
            //Remember this.key value was passed throught the editSubmit event listener as propert
            storeData(this.key);
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
        

    // -- actions
    var blurItem = function(){
        itemName.removeAttribute("class", "hasFocus");
    }    
    var blurDesireDate = function(){
        desireDate.removeAttribute("class", "hasFocus");
    } 
    var blurDescription = function(){
        description.removeAttribute("class", "hasFocus");
    }        
    var mouseOverItemName = function(){
        itemName.setAttribute("class", "hasHover");
    }
    var mouseOnItemName = function(){
        itemName.removeAttribute("class", "hasHover");
    }
//    itemName.onmouseover = function(){
//        description.setAttribute("class", "hovering");
//    }


    var displayLink = eLement('displayLink');
    displayLink.addEventListener("click", getData);
    
    var clearLink = eLement('clearLink');
    clearLink.addEventListener("click", clearLocal);
    
    var seedLink = eLement('seedLink');
    seedLink.addEventListener("click", seedData);
    
    var save = eLement('submitButton');
    save.addEventListener("click", validate);
    
   //EventListener
    itemName.addEventListener("focus", focusItem);
    itemName.addEventListener("blur", blurItem);
    itemName.onmouseover = mouseOverItemName;
    itemName.onmouseout = mouseOnItemName;
    
    desireDate.addEventListener("focus", focusDesireDate);
    desireDate.addEventListener("blur", blurDesireDate);
    
    description.addEventListener("focus", focusDescription);
    description.addEventListener("blur", blurDescription);
    description.onmouseover = mouseOverItemName;
    description.onmouseout = mouseOnItemName;

});    
    


    //Gather all form field values and store in object
    //Object properties are going to contain an array with form label and input values
    seedData = function(){
        // 1 seed movie
        var id          = Math.floor(Math.random()*100000001);
        var item        = {};
            item.itemName       = ["Item Name", "Making of Star Wars Video"];
            item.mediaType      = ["Media Type", "movie"];   //eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", "Amazon"];
            item.priority       = ["Priority", "99"];
            item.desireDate     = ["DesiredDate", "01/11/2011"];
            item.description    = ["Description", "How the movie was made, etc."];
        localStorage.setItem(id, JSON.stringify(item));
    
        // 2 seed book
        var id          = Math.floor(Math.random()*100000001);
        var item        = {};
            item.itemName       = ["Item Name", "Inferno - Dan Brown"];
            item.mediaType      = ["Media Type", "book"];   //eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", "Amazon"];
            item.priority       = ["Priority", "22"];
            item.desireDate     = ["DesiredDate", "02/12/2012"];
            item.description    = ["Description", "Dan's latest book"];
        localStorage.setItem(id, JSON.stringify(item));
    
        // 3 seed audible
        var id          = Math.floor(Math.random()*100000001);
        var item        = {};
            item.itemName       = ["Item Name", "Doc"];
            item.mediaType      = ["Media Type", "audible"];   //eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", "Audible"];
            item.priority       = ["Priority", "33"];
            item.desireDate     = ["DesiredDate", "03/13/2013"];
            item.description    = ["Description", "Saddest sports story ever"];
        localStorage.setItem(id, JSON.stringify(item));

        // 4 seed music
        var id          = Math.floor(Math.random()*100000001);
        var item        = {};
            item.itemName       = ["Item Name", "ColdPlay"];
            item.mediaType      = ["Media Type", "music"];   //eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", "iTunes"];
            item.priority       = ["Priority", "44"];
            item.desireDate     = ["DesiredDate", "04/14/2014"];
            item.description    = ["Description", "Not sure which album to listen to"];
        localStorage.setItem(id, JSON.stringify(item));
         
		 // 5 seed movie
        var id          = Math.floor(Math.random()*100000001);
        var item        = {};
            item.itemName       = ["Item Name", "Kojak Seaons One"];
            item.mediaType      = ["Media Type", "movie"];   //eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", "Amazon"];
            item.priority       = ["Priority", "49"];
            item.desireDate     = ["DesiredDate", "06/11/2013"];
            item.description    = ["Description", "Best season is one"];
        localStorage.setItem(id, JSON.stringify(item));
    
        // 6 seed book
        var id          = Math.floor(Math.random()*100000001);
        var item        = {};
            item.itemName       = ["Item Name", "Enders game Orson Scott Card"];
            item.mediaType      = ["Media Type", "book"];   //eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", "Amazon"];
            item.priority       = ["Priority", "75"];
            item.desireDate     = ["DesiredDate", "12/12/2013"];
            item.description    = ["Description", "The book that started it all"];
        localStorage.setItem(id, JSON.stringify(item));
    
        // 7 seed audible
        var id          = Math.floor(Math.random()*100000001);
        var item        = {};
            item.itemName       = ["Item Name", "Black Swan"];
            item.mediaType      = ["Media Type", "audible"];   //eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", "Audible"];
            item.priority       = ["Priority", "33"];
            item.desireDate     = ["DesiredDate", "12/25/2013"];
            item.description    = ["Description", "Recommended Business book"];
        localStorage.setItem(id, JSON.stringify(item));

        // 8 seed music
        var id          = Math.floor(Math.random()*100000001);
        var item        = {};
            item.itemName       = ["Item Name", "Bob Dylan Dylan"];
            item.mediaType      = ["Media Type", "music"];   //eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", "iTunes"];
            item.priority       = ["Priority", "44"];
            item.desireDate     = ["DesiredDate", "01/14/2014"];
            item.description    = ["Description", "Dylans First Album"];
        localStorage.setItem(id, JSON.stringify(item));
		
          // 9 seed movie
        var id          = Math.floor(Math.random()*100000001);
        var item        = {};
            item.itemName       = ["Item Name", "Jeremiah Johnson"];
            item.mediaType      = ["Media Type", "movie"];   //eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", "Amazon"];
            item.priority       = ["Priority", "88"];
            item.desireDate     = ["DesiredDate", "01/11/2014"];
            item.description    = ["Description", "Favorite Redford Movie"];
        localStorage.setItem(id, JSON.stringify(item));
    
        // 10 seed book
        var id          = Math.floor(Math.random()*100000001);
        var item        = {};
            item.itemName       = ["Item Name", "Adams McCullough"];
            item.mediaType      = ["Media Type", "book"];   //eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", "Amazon"];
            item.priority       = ["Priority", "22"];
            item.desireDate     = ["DesiredDate", "07/01/2012"];
            item.description    = ["Description", "Greatest America"];
        localStorage.setItem(id, JSON.stringify(item));
    
        // 11 seed audible
        var id          = Math.floor(Math.random()*100000001);
        var item        = {};
            item.itemName       = ["Item Name", "Cod"];
            item.mediaType      = ["Media Type", "audible"];   //eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", "Audible"];
            item.priority       = ["Priority", "33"];
            item.desireDate     = ["DesiredDate", "12/25/2013"];
            item.description    = ["Description", "Strange fish Book"];
        localStorage.setItem(id, JSON.stringify(item));

        // 12 seed music
        var id          = Math.floor(Math.random()*100000001);
        var item        = {};
            item.itemName       = ["Item Name", "Slice Five for Fighting"];
            item.mediaType      = ["Media Type", "music"];   //eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", "iTunes"];
            item.priority       = ["Priority", "88"];
            item.desireDate     = ["DesiredDate", "12/14/2014"];
            item.description    = ["Description", "Last Albi,"];
        localStorage.setItem(id, JSON.stringify(item));
                 
		// 13 seed movie
        var id          = Math.floor(Math.random()*100000001);
        var item        = {};
            item.itemName       = ["Item Name", "Sopranos"];
            item.mediaType      = ["Media Type", "movie"];   //eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", "Amazon"];
            item.priority       = ["Priority", "99"];
            item.desireDate     = ["DesiredDate", "12/12/2014"];
            item.description    = ["Description", "The most watched TV series"];
        localStorage.setItem(id, JSON.stringify(item));
    
        // 14 seed book
        var id          = Math.floor(Math.random()*100000001);
        var item        = {};
            item.itemName       = ["Item Name", "Suduku"];
            item.mediaType      = ["Media Type", "book"];   //eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", "Amazon"];
            item.priority       = ["Priority", "99"];
            item.desireDate     = ["DesiredDate", "02/12/2013"];
            item.description    = ["Description", "Brain Exercise"];
        localStorage.setItem(id, JSON.stringify(item));
    
        // 15 seed audible
        var id          = Math.floor(Math.random()*100000001);
        var item        = {};
            item.itemName       = ["Item Name", "Woodrow Wilson"];
            item.mediaType      = ["Media Type", "audible"];   //eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", "Audible"];
            item.priority       = ["Priority", "66"];
            item.desireDate     = ["DesiredDate", "12/13/2013"];
            item.description    = ["Description", "Not sure of the author's name"];
        localStorage.setItem(id, JSON.stringify(item));

        // 16 seed music
        var id          = Math.floor(Math.random()*100000001);
        var item        = {};
            item.itemName       = ["Item Name", "Creedence Clearwater"];
            item.mediaType      = ["Media Type", "music"];   //eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", "iTunes"];
            item.priority       = ["Priority", "66"];
            item.desireDate     = ["DesiredDate", "12/12/2014"];
            item.description    = ["Description", "Any Album"];
        localStorage.setItem(id, JSON.stringify(item));
          
		  // 17 seed movie
        var id          = Math.floor(Math.random()*100000001);
        var item        = {};
            item.itemName       = ["Item Name", "1984"];
            item.mediaType      = ["Media Type", "movie"];   //eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", "Amazon"];
            item.priority       = ["Priority", "66"];
            item.desireDate     = ["DesiredDate", "01/11/2013"];
            item.description    = ["Description", "The Old One"];
        localStorage.setItem(id, JSON.stringify(item));
    
        // 18 seed book
        var id          = Math.floor(Math.random()*100000001);
        var item        = {};
            item.itemName       = ["Item Name", "IOS 8 Programming"];
            item.mediaType      = ["Media Type", "book"];   //eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", "Amazon"];
            item.priority       = ["Priority", "99"];
            item.desireDate     = ["DesiredDate", "09/12/2013"];
            item.description    = ["Description", "Pick Author when books come out"];
        localStorage.setItem(id, JSON.stringify(item));
    
        // 19 seed audible
        var id          = Math.floor(Math.random()*100000001);
        var item        = {};
            item.itemName       = ["Item Name", "D-Day Ambrose"];
            item.mediaType      = ["Media Type", "audible"];   //eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", "Audible"];
            item.priority       = ["Priority", "33"];
            item.desireDate     = ["DesiredDate", "12/13/2013"];
            item.description    = ["Description", "Gift for my Dad"];
        localStorage.setItem(id, JSON.stringify(item));

        // 20 seed music
        var id          = Math.floor(Math.random()*100000001);
        var item        = {};
            item.itemName       = ["Item Name", "Nickel Creek When In Rome"];
            item.mediaType      = ["Media Type", "music"];   //eLement('mediaType').value];
            item.desiredVendor  = ["Desired Vendor", "iTunes"];
            item.priority       = ["Priority", "55"];
            item.desireDate     = ["DesiredDate", "05/15/2014"];
            item.description    = ["Description", "Neo BLuegrass"];
        localStorage.setItem(id, JSON.stringify(item)); 
				 
        alert("Data Seeded!");
    }
  