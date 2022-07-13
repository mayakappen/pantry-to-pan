import { expect } from "chai";
import User from "../src/classes/User-class";

describe("User", () => {
    let userData = [];    
    beforeEach(() => {
        userData = new User ([
            {  
            "name": "Saige O'Kon",
            "id": 1,
            "pantry": [
                {
                    "ingredient": 11297,
                    "amount": 4
                },
                {
                    "ingredient": 1082047,
                    "amount": 10
                },
                {
                    "ingredient": 20081,
                    "amount": 5
                }
            ]},
            {
            "name": "Ephraim Goyette",
            "id": 2,
            "pantry": [
                {
                "ingredient": 6150,
                "amount": 3
                },
                {
                "ingredient": 1032009,
                "amount": 7
                },
                {
                "ingredient": 1082047,
                "amount": 8
                }],
            }
        ])

    });

    it('should be a function', () => {
        expect(User).to.be.a("function");
    })
   
    it('should be an instance of', () => {
        expect(userData).to.be.an.instanceOf(User);
    });

    it('should be an object', () => {
        expect(userData).to.be.an("object");
    });
    
    it('should have a name', () => {
        expect(userData.newUser[0].name).to.equal("Saige O'Kon");
        expect(userData.newUser[1].name).to.equal("Ephraim Goyette")
    });

    it('should have an id', () => {
        expect(userData.newUser[0].id).to.equal(1);
        expect(userData.newUser[1].id).to.equal(2);
    });

    it('should have a pantry array', () => {
        expect(userData.newUser[0].pantry).to.be.an("array");
        expect(userData.newUser[1].pantry).to.be.an("array");
    });

    it('should have an object in pantry', () => {
        expect(userData.newUser[0].pantry[0]).to.be.an("object");
        expect(userData.newUser[1].pantry[1]).to.be.an("object");
    });

    it('should have ingredient numbers', () => {
        expect(userData.newUser[0].pantry[1].ingredient).to.equal(1082047);
        expect(userData.newUser[1].pantry[2].ingredient).to.equal(1082047);
    });

    it('should have ingredient amounts', () => {
        expect(userData.newUser[0].pantry[0].amount).to.equal(4);
        expect(userData.newUser[1].pantry[0].amount).to.equal(3);
    })
});