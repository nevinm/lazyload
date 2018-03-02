import reveal from "../src/lazyload.reveal";

test("reveal is defined", () => {
    expect(typeof reveal).toBe("function");
});

/*
Create an element
call reveal(element, settings) on it
check that:
- callback_set is called (element)
- setSources is called with (element, settings)
- setData is called || data-was-processed is set to true
- event listener to load and error have been set
- class class_loading has been set
*/

expect.extend({
    toHaveAttributeValue: (element, attributeName, valueToVerify) => {
        const actualValue = element.getAttribute(attributeName);
        const pass = actualValue === valueToVerify;
        return pass ? {
            message: () => `${element.tagName} has attribute "${attributeName}" set to "${valueToVerify}"`,
            pass: true
        } : {
            message: () => `expected ${element.tagName} to have attribute "${attributeName}" set to "${valueToVerify}", received "${actualValue}"`,
            pass: false
        }
    }
});

describe("reveal calls set callback", () => {

    let img;
    const settings = {"set": "tings"};

    beforeEach(() => {
        // Parent is a div
        let div = document.createElement("div");
        div.appendChild(img = document.createElement("img"));
    });

    test("Was processed is set", () => {
        reveal(img, settings);
        expect(img).toHaveAttributeValue("data-was-processed", "true");
    });
    
});