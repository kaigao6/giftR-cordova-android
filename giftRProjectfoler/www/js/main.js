 /*****************************************************************
                 File: main.js
                 Author: Kai Gao
                 App Name: GiftR
                 Description: This is a dating app. Fetching profiles data from server, allowing user to delele or save profiles.
                 Here is the sequence of logic for the app


                 Version: 0.0.1
                 Updated: March 30, 2017
                 *****************************************************************/
 var app = {
     //declare 2 global variables
     // temporary stroage list in JS part for updating the local storage data
     //     localStorageList: null,
     localStorageList: {
         people: []
     }
     , currrentPersonID: null // this is a html attribute used to differentiate edit or add in the modal window
         // when editing, we need to find the index of that existing person---list item being clicked
         // when redering gift page, need this index to find the gift informaiton of the person being clicked 
         
     , init: function () {
         if ('deviceready' in document) {
             document.addEventListener('deviceready', app.onDeviceReady);
         }
         else {
             document.addEventListener('DOMContentLoaded', app.onDeviceReady);
         }
     }
     , onDeviceReady: function () {
         console.dir("enter onDeviceReady");
         //set up event listeners for push events
         window.addEventListener('push', app.pageChanged);
         //the following part is repeated twice
         var btnAddPerson = document.getElementById("btnAdd");
         btnAddPerson.addEventListener("touchstart", function (ev) {
             app.currrentPersonID = 0;
             console.log("ADD button touchstart works");
             console.log("currentperson after clicking ADD button");
             console.log(app.currrentPersonID);
             // clear the input fields when adding a new peronson in modal window
             document.getElementById("name").value = "";
             document.getElementById("dateOfBirth").value = "";
         });
         //         add listener for save button on person modal window
         document.getElementById("btnSavePersonModal").addEventListener("touchend", app.savePerson);
         //         add listener for cancel button on person modal window
         document.getElementById("btnCancelPersonModal").addEventListener("touchend", app.cancelPerson);
         //show the people list when loading
         app.showPageOne();
         //         add listener for save button on gift modal window
         //         add listener for cancel button on gift modal window
     }
     , pageChanged: function () {
         //user has clicked a link on a date of birth or chevron and gift.html page loaded
         //OR user has clicked on Back button on gift.html page which will lead to index.html page loaded
         //check to see which page and then call the appropriate function
         console.log("enter pageChanged fuction:");
         let contentDiv = document.querySelector(".content");
         let id = contentDiv.id;
         switch (id) {
         case "page-people":
             app.showPageOne();
             //set up event listeners for AddPerson button one page one,
             //each name on page one. NOT DONE yet
             var btnAddPerson = document.getElementById("btnAdd");
             btnAddPerson.addEventListener("touchstart", function (ev) {
                 app.currrentPersonID = 0;
                 console.log("ADD button touchstart works");
                 console.log("currentperson after clicking ADD button");
                 console.log(app.currrentPersonID);
                 // clear the input fields when adding a new peronson in modal window
                 document.getElementById("name").value = "";
                 document.getElementById("dateOfBirth").value = "";
             });
             document.getElementById("btnSavePersonModal").addEventListener("touchend", app.savePerson);
             //         add listener for cancel button on person modal window
             document.getElementById("btnCancelPersonModal").addEventListener("touchend", app.cancelPerson);
             break;
         case "page-gift":
             app.buildGiftPage();
             var btnAddGift = document.getElementById("btnAddGift");
             btnAddGift.addEventListener("touchstart", function(ev){
                 
                 document.getElementById("idea").value = "";
                 document.getElementById("store").value = "";
                 document.getElementById("url").value = "";
                 document.getElementById("cost").value = "";
             });
             
             //         add listener for save button on gift modal window
             document.getElementById("btnSaveGiftModal").addEventListener("touchend", app.saveGift);
             //         add listener for cancel button on gift modal window
             document.getElementById("btnCancelGiftModal").addEventListener("touchend", app.cancelGift);
             break;
         default:
             app.showPageOne();
         }
     }
     , saveGift: function () {
         console.log("save gift works");
         console.log("inside saveGift function");
         console.log(app.currrentPersonID);
         //find the person who will be added gift to 
         var indexTemp = -1;
         for (var i = 0, len = app.localStorageList.people.length; i < len; i++) {
             if (app.currrentPersonID == app.localStorageList.people[i].id) {
                 indexTemp = i;
                 break;
             }
         }
         //         console.log(indexTemp);
         let ideaEachTemp = {
             
             id: Date.now()+10
             ,idea: document.getElementById("idea").value
             , at: document.getElementById("store").value
             , url: document.getElementById("url").value
             , cost: document.getElementById("cost").value
         };
         //if the gift idea is not empty, then save it to localstorage
         if(document.getElementById("idea").value){
             app.localStorageList.people[indexTemp].ideas.push(ideaEachTemp);
             localStorage.setItem("giftr-gao00078", JSON.stringify(app.localStorageList));
         }else{
             
         //create a new div, adding message here to indicate if save idea successfully or not
         let divparent = document.getElementById("page-gift");
         let list = document.getElementById("gift-list");
             
         
         let divMsg = document.createElement("div");
         divMsg.classList.add("msg");
        setTimeout(function(){
            divMsg.classList.add("bad");
        }, 20); //delay before adding the class to trigger transition  
             
             
             
         divMsg.textContent = "Gift idea field is required!";
         divparent.insertBefore(divMsg,list);
         setTimeout((function(dparent,dm){
             return function(){
                 dparent.removeChild(dm);
             }
         })(divparent,divMsg),3000); 
             
         }
         
         
         
         //dispatch touchend event to closeGiftModal button
         var myTouchEndEv = new CustomEvent("touchend", {bubbles:true});
         var closeGiftModal = document.getElementById("closeGiftModal");
         closeGiftModal.dispatchEvent(myTouchEndEv);  

         app.buildGiftPage();
     }
     , cancelGift: function () {
         console.log("cancel gift works");
         var myTouchEndEv = new CustomEvent("touchend", {bubbles:true});
         var closeGiftModal = document.getElementById("closeGiftModal");
         closeGiftModal.dispatchEvent(myTouchEndEv);  
     }
     , buildGiftPage: function () {
         console.log("enter buildGiftPage function*********");
         //         console.log(app.currrentPersonID);
         let list = document.getElementById("gift-list");
         list.innerHTML = "";
         app.localStorageList = JSON.parse(localStorage.getItem("giftr-gao00078"));
         if (!app.localStorageList) {
             app.localStorageList = {
                 people: []
             };
         }
         var indexTemp = -1;
         for (var i = 0, len = app.localStorageList.people.length; i < len; i++) {
             if (app.currrentPersonID == app.localStorageList.people[i].id) {
                 indexTemp = i;
                 break;
             }
         }
         //change heading as person's name on gift page
         let headingGiftPage = document.getElementById("name-heading");
         headingGiftPage.textContent = "Ideas for " + app.localStorageList.people[indexTemp].fullname;
         //change heading as person's name on gift modal window 
         let headingGiftModal = document.getElementById("headind-name-modal");
         headingGiftModal.textContent = "Buying a gift for " + app.localStorageList.people[indexTemp].fullname;
         
         

         
         
         
         //start building all ideas for the person one idea by one idea
         for (var i = 0, len = app.localStorageList.people[indexTemp].ideas.length; i < len; i++) {
             let li = document.createElement("li");
             li.className = "table-view-cell media";
             let span = document.createElement("span");
             span.className = "pull-right icon icon-trash midline";
             span.setAttribute("gift-idea-id", app.localStorageList.people[indexTemp].ideas[i].id);
             span.addEventListener("touchend",function(ev){
                 let deleteIcon = ev.currentTarget;
                 let idForDelele = deleteIcon.getAttribute("gift-idea-id");
                 let len = app.localStorageList.people[indexTemp].ideas.length;
                 let indexDeleteItem = -1;
                 for(let i=0; i<len; i++){
                     if(idForDelele == app.localStorageList.people[indexTemp].ideas[i].id){
                         indexDeleteItem = i;
                         
                         break;
                     } 
                 }
                 if(indexDeleteItem > -1){
                     //removing that idea from array ideas 
                     app.localStorageList.people[indexTemp].ideas.splice(indexDeleteItem,1);
                     localStorage.setItem("giftr-gao00078", JSON.stringify(app.localStorageList));
                     ev.currentTarget.parentElement.parentElement.removeChild(ev.currentTarget.parentElement);
                 }
                
                 
                 
             });
             
             let div = document.createElement("div");
             div.className = "media-body";
             div.textContent = app.localStorageList.people[indexTemp].ideas[i].idea;
             let pstore = document.createElement("p");
             pstore.textContent = app.localStorageList.people[indexTemp].ideas[i].at;
             let purl = document.createElement("p");
             let a = document.createElement("a");
             a.href = "http://" + app.localStorageList.people[indexTemp].ideas[i].url;
             a.target = "_blank";
//             a.setAttribute("data-ignore", "push");
             a.innerHTML = app.localStorageList.people[indexTemp].ideas[i].url;
             
             purl.appendChild(a);
             let pcost = document.createElement("p");
             pcost.innerHTML = app.localStorageList.people[indexTemp].ideas[i].cost;
             div.appendChild(pstore);
             div.appendChild(purl);
             div.appendChild(pcost);
             li.appendChild(span);
             li.appendChild(div);
             list.appendChild(li);
         }
     }
     , savePerson: function () {
         //         ev.preventDefault();
         console.log("save person works");
         if (app.currrentPersonID == 0) {
             //adding new person, adding a new element into the array on JS side corresponding to the localstorage
             console.log("show currentPerson");
             console.log(app.currrentPersonID);
             //create new property---monthDay for sorting
             var arrTemp = document.getElementById("dateOfBirth").value.split("-");
             var monthDayString = arrTemp[1] + arrTemp[2];

             let temPerson = {
                 id: Date.now()
                 , fullname: document.getElementById("name").value
                 , dateOfBirth: document.getElementById("dateOfBirth").value
                 , monthDay: parseInt(monthDayString)
                 , ideas: []
             };
             //             app.localStorageList.push({people: temPerson});
             
             if(temPerson.fullname && temPerson.dateOfBirth){
                 app.localStorageList.people.push(temPerson);    
             }else{
                 
                  //create a new div, adding message here to indicate if save idea successfully or not
                 let divparent = document.getElementById("page-people");
                 let list = document.getElementById("contact-list");


                 let divMsg = document.createElement("div");
                 divMsg.classList.add("msg");
                setTimeout(function(){
                    divMsg.classList.add("bad");
                }, 20); //delay before adding the class to trigger transition  



                 divMsg.textContent = "Please enter both a name and DOB!";
                 divparent.insertBefore(divMsg,list);
                 setTimeout((function(dparent,dm){
                     return function(){
                         dparent.removeChild(dm);
                     }
                 })(divparent,divMsg),3000); 
                 
             }
             
         }
         else {
             console.log("enter savePerson else->show currentPerson");
             console.log(app.currrentPersonID);
             //editing existing person, updating the array on JS side corresponding to the localstorage.
             console.log("here clicked on save:");
             var indexCurrentLiClicked = -1;
             //find the currentClickedLiIndex by loop through the localStorageList.people
             for (var i = 0, len = app.localStorageList.people.length; i < len; i++) {
                 if (app.currrentPersonID == app.localStorageList.people[i].id) {
                     indexCurrentLiClicked = i;
                 }
             }
             
             
             
             
             app.localStorageList.people[indexCurrentLiClicked].fullname = document.getElementById("name").value;
             app.localStorageList.people[indexCurrentLiClicked].dateOfBirth = document.getElementById("dateOfBirth").value;
             
             //editing new property---monthDay
             var arrTemp = document.getElementById("dateOfBirth").value.split("-");
             var monthDayString = arrTemp[1] + arrTemp[2];
             app.localStorageList.people[indexCurrentLiClicked].monthDay = parseInt(monthDayString);
         }
         localStorage.setItem("giftr-gao00078", JSON.stringify(app.localStorageList));
         //dispatche touchend event to closePersonModal button
         var myTouchEndEv = new CustomEvent("touchend", {bubbles:true});
         var closePersonModal = document.getElementById("closePersonModal"); 
         closePersonModal.dispatchEvent(myTouchEndEv);  
         
         
         
         
         app.showPageOne();
     }
     , cancelPerson: function () {
         console.log("cancel person works");
         var myTouchEndEv = new CustomEvent("touchend", {bubbles:true});
         var closePersonModal = document.getElementById("closePersonModal"); 
         closePersonModal.dispatchEvent(myTouchEndEv);   
     }
     , showPageOne: function () {
         console.log("enter showPageOne");
         
     
         let list = document.querySelector('#contact-list');
         //clean up page one before rendering the people list
         list.innerHTML = "";
         //Loop through localstorage Ojbect and display all the contacts
         app.localStorageList = JSON.parse(localStorage.getItem("giftr-gao00078"));
         //if there is nothing in localstorage, then assign am empty array to localStorageList on JS side
         if (!app.localStorageList) {
             //             app.localStorageList.people = [];
             app.localStorageList = {
                 people: []
             };
         }else{
             //sorting people by dates---monthDay 
//             app.localStorageList = app.sortbyDob(app.localStorageList);
             console.log("enter else");
             app.localStorageList.people.sort(function(a,b){
                 return a.monthDay - b.monthDay;
             });
             
         }
         
         app.localStorageList.people.forEach(function (person) {

             let li = document.createElement("li");
             li.className = "table-view-cell";
             //add grey as background color for the past dates
               //find current date (monthDay format)

             var dateObj = new Date();
             var monthCurrent = (dateObj.getMonth()+1).toString();
             var dayCurrent = dateObj.getDate().toString();
             var monthDayCurrentNum = -1;
             //if day is less than 10, for example, April 1st, we need 401 instead of 41
             if(dateObj.getDate() < 10){
                monthDayCurrentNum = parseInt(monthCurrent)*100 + parseInt(dayCurrent);
               
             }else{
                 monthDayCurrentNum = parseInt(monthCurrent+dayCurrent);
             }
//             console.log(monthDayCurrentNum);
             if(person.monthDay < monthDayCurrentNum){
                 li.classList.add("grey");
             }
             
             
             //add html attribute to li tag, the attribute used to determine that this is editing or adding existing person, or go to second page
             li.setAttribute("data-id", person.id);
             let span_name = document.createElement("span");
             span_name.className = "name";
             let a_modal = document.createElement("a");
             a_modal.href = "#personModal";
             a_modal.innerHTML = person.fullname;
             span_name.appendChild(a_modal);
             a_modal.addEventListener("touchstart", function (ev) {
                 var anchorTemp = ev.currentTarget;
                 app.currrentPersonID = anchorTemp.parentNode.parentNode.getAttribute("data-id"); //get attribute from li html tag
                 console.log("enter name touchstart");
                 console.log("currentperson after clicking name anchor tag");
                 console.log(app.currrentPersonID);
                 //editing existing person, keep the original data from that person in the input fields
                 document.getElementById("name").value = person.fullname;
                 

                 document.getElementById("dateOfBirth").value = person.dateOfBirth;
                 console.log("here clicked on name:");
             });
             let a_chevron = document.createElement("a");
             a_chevron.href = "gifts.html"; 
             a_chevron.className = "navigate-right pull-right goToGiftPage";
             a_chevron.addEventListener("touchstart", function (ev) {
                 var anchorTemp = ev.currentTarget;
                 app.currrentPersonID = anchorTemp.parentNode.getAttribute("data-id"); //get attribute from li html tag
             });
             let span_dob = document.createElement("span");
             span_dob.className = "dob";
             let dateToMoment = moment(person.dateOfBirth).format("MMMM D");
             span_dob.innerHTML = dateToMoment;
             a_chevron.appendChild(span_dob);
             li.appendChild(span_name);
             li.appendChild(a_chevron);
             list.appendChild(li);
         });
     }
//     , sortbyDob: function(data){
//         console.log("enter sortbyDob function");
//         console.dir(data);
//         
//         data.people.sort(function(a,b){
//             return -b.id + a.id ;
//         });
//         console.log("after sorting");
//         console.dir(data);
//         return data;
//         
//     }
 };
 app.init();
 // just an example for creating a list item on page one
 //         <li class="table-view-cell">
 //                <span class="name"><a href="#personModal">Bob Smith</a></span>
 //  <!-- press and hold to open edit -->
 //                <a class="navigate-right pull-right" href="gifts.html">
 //  <!-- tap to view gifts -->
 //                    <span class="dob">March 10</span>
 //                </a>
 //         </li>
 //hard code, for test
 // For JSON data obect format: Note that I omit the key "people" in the assignment description
 // Array element in the localStorageList is directly a person object
 //     localStorageList: [
 //         {
 //             "id": 827381263882763,
 //             "name": "Jeff Bridges",
 //             "dob": "1960-05-23",
 //             "ideas": [
 //                 {
 //                     "idea": "White Russian",
 //                     "at": "LCBO",
 //                     "cost": "",
 //                     "url": "http://lcbo.com/"
 //                 },
 //                 {
 //                     "idea": "new Sweater",
 //                     "at": "Value Village",
 //                     "cost": "20.00",
 //                     "url": ""
 //                 }
 //  ]
 //         },
 //         {
 //             "id": 19283719282833,
 //             "name": "Walter Sobchak",
 //             "dob": "1961-12-12",
 //             "ideas": [
 //                 {
 //                     "idea": "new briefcase",
 //                     "at": "Staples",
 //                     "cost": "50.00",
 //                     "url": ""
 //                 }
 //  ]
 //         }
 //],
 //find the index of clicked li element, li is parent of span_name, and span_name is parent of a_modal.
 //                 var clickedLi = anchorTemp.parentNode.parentNode;
 //                 var clickedLiIndex = Array.from(clickedLi.parentNode.children).indexOf(clickedLi);
 //                 //                 clickedLi.setAttribute("")
 //                 app.currentClickedLiIndexForPersonModal = clickedLiIndex;