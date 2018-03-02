import {revealElement} from "../src/lazyload.reveal";
import expectExtend from "./lib/expectExtend";

test("revealElement is defined", () => {
    expect(typeof revealElement).toBe("function");
});

/*
Create an element
call revealElement(element, settings) on it
check that:
- callback_set is called (element)
- setSources is called with (element, settings)
- setData is called || data-was-processed is set to true
- event listener to load and error have been set
- class class_loading has been set
*/

expectExtend(expect);

describe("reveal calls set callback", () => {

    let img;
    const settings = {"set": "tings"};

    beforeEach(() => {
        // Parent is a div
        let div = document.createElement("div");
        div.appendChild(img = document.createElement("img"));
    });

    test("Was processed is set", () => {
        revealElement(img, settings);
        expect(img).toHaveAttributeValue("data-was-processed", "true");
    });
    
});