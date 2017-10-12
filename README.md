# giftR-cordova-android

Project Name: GiftR

This is a Cordova Android App that lets people store gift ideas.

There are two main screens and two modal popups. 

The first screen is the list of people that you have added to the app sorted by their birthdays. Each person has an arrow to navigate to the second page, a list of gift ideas for that person. The person screen also has a button to open a modal popup to add a new person. Clicking on a person's name from the list, also opens the same modal popup but it allows the user to edit the person instead of adding a new one.

On the gift page there will be a button for adding a new idea to the list. The modal popup for adding gifts will ask for the idea, the location where it can be bought, a URL where it can be found online, and a cost. The list of gifts display the idea and then optionally the other three things about the idea. If any of the other fields are empty then they are not displayed in the list. There is also a delete button for each idea so it can be removed.

All the data are saved as a single key in localStorage.

Other features:

1. When saving a person, set a local notification reminder for 10 days before their birthday and make it recur each year.
2. Access the contacts on the device, using the cordova-plugin-contacts plugin and allow the app user to import people from the contacts.
3. Allow the user to take pictures of the gifts, save them in the device, and display the images along with the idea, location, cost, etc.
4. On the edit screen allow the user to delete a person (including their gifts and the images of the gifts) 
