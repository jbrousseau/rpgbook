/* global jasmine describe it expect Template*/
(function() {
    "use strict";

    jasmine.DEFAULT_TIMEOUT_INTERVAL = jasmine.getEnv().defaultTimeoutInterval = 20000;

    describe("Template.header.displayName ", function() {
        it("asks for the display name when a user is not logged", function() {
            expect(Template.header.displayName()).toBe('');
        });
    });
});