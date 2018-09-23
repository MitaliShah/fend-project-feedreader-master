 /* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

//Reference: https://matthewcranford.com/feed-reader-walkthrough

        /* description of the tests: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URL is defined', function(){
           for(let feed of allFeeds){
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           }

         });


        /* description of the tests: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('name is defined and not empty', function(){
           for(let feed of allFeeds){
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }

         });

    });


    /* description of the tests: Write a new test suite named "The menu" */
    describe('The menu',function(){

        /* description of the tests: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('is hidden', function(){

           const body = document.querySelector('body');
           expect(body.classList.contains('menu-hidden')).toBe(true);


         });

         /* description of the tests: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('toggles on and off', function(){

            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');

            menu.click();
            expect(body.classList.contains('menu-hidden')).not.toBe(true);
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);  

          });

        });
    /* description of the tests: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){

        /* description of the tests: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done){
           loadFeed(0, done);
         });
         it('completes work', function(){
          const feedly = document.querySelectorAll('.feed .entry');
          expect(feedly.length).toBeGreaterThan(0);

         });
         });

    /* description of the tests: Write a new test suite named "New Feed Selection" */
    describe('News Feed Selection', function() {
      // Establishes DOM elements and empty arrays for later testing. 
      const feedly = document.querySelector('.feed');
      const feedOne = [];
      const feedTwo = [];

        /* description of the tests: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        // As per spec, `done` is passed as an argument to the `beforeEach` callback
        beforeEach(function(done) {
          //loads the first feed and executes a function to push each article to `feedOne` array
          loadFeed(0, function() {
              Array.from(feedly.children).forEach(function(feed) {
                  // console.log(feed);
                  feedOne.push(feed.innerText);
                  // loads the second feed and executes a function to push each article to the `feedTwo` array
                  loadFeed(1, function() {
                      Array.from(feedly.children).forEach(function(feed) {
                          feedTwo.push(feed.innerText);
                      });
                      console.log(feedOne);
                      console.log(feedTwo);
                      // executes `done()` function to cease asynchronous operation and signal that processing has completed
                      done();
                  });
              });
          });
      });
      it('actually changes', function() {
        //Checking feedone and feedtwo that it should not match
          expect(feedOne).not.toEqual(feedTwo);     
      });
  });
          
        

}());