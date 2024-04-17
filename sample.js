import { GeoPoint } from 'firebase-admin/firestore';
import { StoreCarToFB, StoreRouteToFB, StoreDriverToFB, getAllDriver, getAllCar, getAllRoute, updateCarLicensePlate, updateDriverNumber } from './index.js';
export class Address {
    latitude
    longitude
    constructor(lat, long) {
        this.latitude = lat;
        this.longitude = long;
    }

};
export class Car {
    #type;
    #licensePlate;
    #engineFuel;
    #height;
    #length;
    #mass;
    #status;
    price;
    driverNumber; //set this #when done the update method and manger's view auth
    constructor(type, licensePlate, engineFuel, height, length, mass, status, price) {
        this.type = type;
        this.licensePlate = licensePlate;
        this.engineFuel = engineFuel;
        this.height = height;
        this.length = length;
        this.mass = mass;
        this.status = status;
        this.price = price;
        StoreCarToFB(type, licensePlate, engineFuel, height, length, mass, status, price);


    }
    updateDriver(num) {
        this.driverNumber = this.driverNumber;
        updateDriverNumber(this.#licensePlate,this.driverNumber)

    }


};
export class Route {
    #begin;// convert to Json before store to firebase
    #end; // convert to Json before store to firebase
    #beginDate; // convert to  bc firebase dsnt have Date
    #endDate;// convert to  bc firebase dsnt have Date
    #carLicensePlate;
    #DriverNumber;
    #status;
    #price;

    calculateEndDateAndPrice(CarPrice) {
        //depend on lat and long of begin and end-> distance

        //this code'll be replaced
        const angle1 = (this.end.latitude * Math.PI / 180) - (this.begin.latitude * Math.PI / 180)
        const angle2 = (this.end.longitude * Math.PI / 180) - (this.begin.longitude * Math.PI / 180)
        const angle3 = Math.sqrt(Math.pow(angle1, 2) + Math.pow(angle2, 2));
        // use distance calculate time ( use t = s/v )
        console.log(angle1.type)
        //this code'll be replaced
        const t = angle3 / 20;
        //price = t . car's price ( get from car) and endDate = beginDate+t   
        console.log(t)
        console.log(CarPrice)
        this.#price = t * CarPrice;
        //store endDate  and price to variable
        this.#endDate = new Date(2024, 2, 21 + t);

    }
    constructor(Car, Driver, begin, end, Date) {
        Driver.updateCurrentLicensePlate(Car.licensePlate); // ??? how the licensePlate is #but can access
        this.#carLicensePlate = Car.licensePlate
        Car.updateDriver(Driver.number);
        this.#DriverNumber = Driver.number
        this.begin = begin;
        this.end = end;
        this.beginDate = Date;
        this.calculateEndDateAndPrice(Car.price);
        //store all info to firebase
        StoreRouteToFB(begin, end, this.#beginDate, this.#endDate, this.#carLicensePlate, this.#DriverNumber, this.#price);

    }


};
export class Person {
    #name;
    #number;
    #address;
    constructor(name, number, address) {
        this.name = name;
        this.number = number;
        this.address = address;
    }
};
export class Driver extends Person {
    driveHistory;
    available;
    #currentLicensePlate;
    #totalDistance;
    constructor(name, number, address) {
        super(name, number, address);
        StoreDriverToFB(name, number, address)
    }
    updateLicense() {
        // find how to store img , and create licenseImg object

    }
    updateCurrentLicensePlate(carNum) {
        this.updateCurrentLicensePlate = carNum;
        updateCarLicensePlate(this.number,this.#currentLicensePlate)
    }
}
export class ManagerSingleton extends Person {
    static #uniqueInstance = null;
    constructor(name, number, address) {
        super(name, number, address);

    }
    static getInstance(name, number, address) {
        if (ManagerSingleton.uniqueInstance == null) {
            ManagerSingleton.uniqueInstance = new ManagerSingleton(name, number, address);
        }
        return ManagerSingleton.uniqueInstance;
    }

    addCar(inputCar) {
        //add Car info to firebase 
        const car = new Car(inputCar.type, inputCar.licensePlate, inputCar.engineFuel, inputCar.height, inputCar.length, inputCar.mass, inputCar.status, inputCar.price)
        console.log(car)

    }
    addDriver(Driver) {
        //add Driver info to firebase 
    }
    addRoute(Car, Driver, begin, end, Date) {
        //assign Diver's  to Car, the same with Car's license plate
        //call route constructor 
        const route = new Route(Car, Driver, begin, end, Date)
    }
    async viewDriver() {
        //return all of object Driver
        const response = await getAllDriver() // can debug here use console.log (res.data)
        return response


    }
    async viewCar() {
        //return all of object of Car
        const response = await getAllCar() // can debug here use console.log (res.data)
        return response
    }
    async aviewRoute() {
        //return all of object route 
        const response = await getAllRoute() // can debug here use console.log (res.data)
        return response

    }


};




///*** test code***///

// let car = new Car("bike","09430","water","20cm","10fdd","10kg","avail",2);
// console.log(car)   type, licensePlate,engineFuel,height,length,mass,status,price
// let car ={
//     type:"bike",
//     licensePlate:"09430",
//     engineFuel:"nhat",
//     height:"20cm",
//     length:"10m",
//     mass:"10kg",
//     status:"available",
//     price:2
// }

// let addr = new Address(40, -30)
// let driv = new Driver("nhat", "0959", addr)
// const task =ManagerSingleton.getInstance("nhat","0959",addr);
// const beginExampe = new Address(-23,24)
// const endExampe = new Address(-10,40)
// const beginDate= new Date(2024,4,16)
// task.addRoute(car,driv,beginExampe,endExampe,beginDate)
// task.viewDriver();

// console.log('success')
// task.viewDriver()        // this make program not terminate i duno why
// console.log('success')
// updateCarLicensePlate("0959","213drd")