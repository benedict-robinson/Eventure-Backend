import { formatArray } from "../utils";

describe('formatArray', () => { 
    test("Should return empty object string if passed an empty array", () => {
        expect(formatArray([])).toBe("{}")
    }) 
    test("Should return the value inside an object if passed a single element", () => {
        expect(formatArray(["EDM"])).toBe("{EDM}")
    })
    test("Should correctly return formatted array of strings", () => {
        expect(formatArray(["Sports", "Music", "Tech"])).toBe("{Sports,Music,Tech}")
    })
})