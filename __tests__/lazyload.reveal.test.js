import {revealElement} from "../src/lazyload.reveal";
import expectExtend from "./lib/expectExtend";

test("revealElement is defined", () => {
    expect(typeof revealElement).toBe("function");
});

/*
Create an element
call revealElement(element, settings) on it
check that:
- data-was-processed is set to true
- callback_set is called (element)
- setSources is called with (element, settings)
- event listener to load and error have been set
- class class_loading has been set
*/

expectExtend(expect);

describe("revealElement...", () => {

    var img, div, 
        callback_enter = function(el) {return null;}, 
        callback_set = function(el) {return null;};
    const settings = {
        callback_enter,
        callback_set
    };

    beforeEach(() => {
        // Parent is a div
        div = document.createElement("div");
        div.appendChild(img = document.createElement("img"));
    });

    test("...data-was-processed is set", () => {
        revealElement(img, settings);
        expect(img).toHaveAttributeValue("data-was-processed", "true");
    });

    test("...callback_set is called right", () => {
        var callCallbackMock = jest.fn();
        revealElement(img, settings, {
            callCallback: callCallbackMock
        });
        expect(callCallbackMock).toHaveBeenCalledTimes(2);
        expect(callCallbackMock).toHaveBeenCalledWith(callback_enter, img);
        expect(callCallbackMock).toHaveBeenCalledWith(callback_set, img);
    });

    test("...addOneShotListeners is called once", () => {
        var addOneShotListenersMock = jest.fn();
        revealElement(img, settings, {
            addOneShotListeners: addOneShotListenersMock
        });
        expect(addOneShotListenersMock).toHaveBeenCalledTimes(1);
    })

    afterEach(() => {
        div.removeChild(img);
        div = null;
    });
    
});