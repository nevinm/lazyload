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

    var img, iframe, bgImg, div, 
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
        div.appendChild(iframe = document.createElement("iframe"));
        div.appendChild(bgImg = document.createElement("div"));
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

    test("...addOneShotListeners is called once if elemnet is IMG", () => {
        var addOneShotListenersMock = jest.fn();
        revealElement(img, settings, {
            addOneShotListeners: addOneShotListenersMock
        });
        expect(addOneShotListenersMock).toHaveBeenCalledTimes(1);
    });

    test("...addOneShotListeners is called once if elemnet is IFRAME", () => {
        var addOneShotListenersMock = jest.fn();
        revealElement(iframe, settings, {
            addOneShotListeners: addOneShotListenersMock
        });
        expect(addOneShotListenersMock).toHaveBeenCalledTimes(1);
    });

    test("...addOneShotListeners is NOT called if DIV", () => {
        var addOneShotListenersMock = jest.fn();
        revealElement(bgImg, settings, {
            addOneShotListeners: addOneShotListenersMock
        });
        expect(addOneShotListenersMock).toHaveBeenCalledTimes(0);
    });

    afterEach(() => {
        div.removeChild(img);
        div.removeChild(bgImg);
        div.removeChild(iframe);
        div = null;
    });
    
});