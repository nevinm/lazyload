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
        callback_set,
        class_loading: "test-loading"
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
        expect(addOneShotListenersMock).toHaveBeenCalledWith(img, settings);
    });

    test("...addOneShotListeners is called once if elemnet is IFRAME", () => {
        var addOneShotListenersMock = jest.fn();
        revealElement(iframe, settings, {
            addOneShotListeners: addOneShotListenersMock
        });
        expect(addOneShotListenersMock).toHaveBeenCalledTimes(1);
        expect(addOneShotListenersMock).toHaveBeenCalledWith(iframe, settings);
    });

    test("...addOneShotListeners is NOT called if DIV", () => {
        var addOneShotListenersMock = jest.fn();
        revealElement(bgImg, settings, {
            addOneShotListeners: addOneShotListenersMock
        });
        expect(addOneShotListenersMock).toHaveBeenCalledTimes(0);
    });

    test("...addClass is called for loading", () => {
        var addClassMock = jest.fn();
        revealElement(img, settings, {
            addClass: addClassMock
        });
        expect(addClassMock).toHaveBeenCalledTimes(1);
        expect(addClassMock).toHaveBeenCalledWith(img, "test-loading");
    });

    afterEach(() => {
        div.removeChild(img);
        div.removeChild(bgImg);
        div.removeChild(iframe);
        div = null;
    });
    
});