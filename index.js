// Import the functions you need from the SDKs you need
import { response } from 'express';
import { QuerySnapshot } from 'firebase-admin/firestore';
import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc,
  query, where, getDocs, GeoPoint, updateDoc, getDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQVhfhnMG3TPsgZaX2viK1AKiruUkpBvc",
  authDomain: "laptrinhnangcao-aeb32.firebaseapp.com",
  projectId: "laptrinhnangcao-aeb32",
  storageBucket: "laptrinhnangcao-aeb32.appspot.com",
  messagingSenderId: "280682153048",
  appId: "1:280682153048:web:73242b55214b6e9ec4762d",
  measurementId: "G-HBRLQSWFDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const colRef = collection(db, 'books');
const CarRef = collection(db, 'Car');
const DriverRef = collection(db, 'Driver');
const RouteRef = collection(db, 'Route');


// onSnapshot(DriverRef,(snapshot) =>{
//     let books = []
//     snapshot.docs.forEach((doc)=> {
//       books.push({ ...doc.data(), id: doc.id})
//     })
//     console.log(books)
//   })

export async function StoreDriverToFB(driverName, driverNumber, driverAddress) {
  var a = new GeoPoint(driverAddress.latitude, driverAddress.longitude)
  let response = {
    error: false,
    data: null
  }
  await addDoc(DriverRef, {

    name: driverName,
    number: driverNumber,
    address: a
  })
    .then((docRef) => {
      console.log(`succes, here is the id :${docRef.id}\n`)
      response.data = docRef.id

    })
    .catch((err) => {
      console.log(`err in StoreDriverToFB`)
      console.log(err)
      response.error = true
    })
  return response
}


export async function StoreCarToFB(type, licensePlate, engineFuel, height, length, mass, status, price) {
  let response = {
    error: false,
    data: null
  }
  await addDoc(CarRef, {
    type: type,
    licensePlate: licensePlate,
    engineFuel: engineFuel,
    height: height,
    length: length,
    mass: mass,
    status: status,
    price: price
  })
    .then((docRef) => {
      console.log(`succes, here is the id :${docRef.id}\n`)
      response.data = docRef.id

    }).catch((err) => {
      console.log(`err in StoreDriverToFB`)
      console.log(err)
      response.error = true
    })
  return response
}

export async function StoreRouteToFB(begin, end, beginDate, endDate, carNumber, DriverNumber, price) {
  var b = new GeoPoint(begin.latitude, begin.longitude)
  var e = new GeoPoint(end.latitude, end.longitude)
  let response = {
    error: false,
    data: null
  }
  addDoc(RouteRef, {
    begin: b,
    end: e,
    beginDate: toString(beginDate),
    endDate: toString(endDate),
    carNumber: carNumber,
    DriverNumber: DriverNumber,
    price: price
  })
    .then((docRef) => {
      console.log(`succes, here is the id :${docRef.id}\n`)
      response.data = docRef.id

    }).catch((err) => {
      console.log(`err in StoreDriverToFB`)
      console.log(err)
      response.error = true
    })
  return response
}

export async function getAllDriver() {
  let response = {
    error: false,
    data: null
  }

  await (getDocs(DriverRef).
    then((snapshot) => {
      let carArr = []
      snapshot.docs.forEach((doc) => {
        carArr.push({ ...doc.data(), id: doc.id })
      })
      response.data = carArr
    })
    .catch((err) => {
      console.log(`err in getAllDriver()`)
      console.log(err)
      response.error = true
    })
  )
  return response;

}
export async function getAllCar() {
  let response = {
    error: false,
    data: null
  }

  await (getDocs(CarRef).
    then((snapshot) => {
      let carArr = []
      snapshot.docs.forEach((doc) => {
        carArr.push({ ...doc.data(), id: doc.id })
      })
      response.data = carArr
    })
    .catch((err) => {
      console.log(`err in getAllCar()`)
      console.log(err)
      response.error = true
    })
  )
  return response;
}




export async function getAllRoute() {
  let response = {
    error: false,
    data: null
  }

  await (getDocs(RouteRef).
    then((snapshot) => {
      let carArr = []
      snapshot.docs.forEach((doc) => {
        carArr.push({ ...doc.data(), id: doc.id })
      })
      response.data = carArr
    })
    .catch((err) => {
      console.log(`err in getAllDriver()`)
      console.log(err)
      response.error = true
    })
  )
  return response;

}

export async function updateStatus(objectType, number, status) {
  let response = {
    error: false,
    data: null
  }
  if (objectType == "car" || objectType == "Car") {
    const q = query(CarRef, where("licensePlate", "==", number))
    await getDocs(q)             //find car exist or not
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("no Car found when call updateStatus");
          response.error = true
        } else {
          updateDoc(querySnapshot.docs[0].ref, {
            status: status
          }).then(
            () => {
              response.data = `update car id :${querySnapshot}  when call updateStatus successfully`
              response.error = false
            })
            .catch((error) => {
              console.error("Error updating car when call updateStatus:", error);
            })
        }
      })
      .catch((error) => {
        console.error("error in checking Car's existance when call updateStatus", error);
      });
    return response
  }
  else if (objectType == "driver" || objectType == "Driver") {
    const q = query(DriverRef, where("number", "==", number))
    await getDocs(q)             //find car exist or not
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("no Diver found when call updateStatus");
          response.error = true
        } else {
          updateDoc(querySnapshot.docs[0].ref, {
            status: status
          }).then(
            () => {
              response.data = `update driver id :${querySnapshot} when call updateStatus successfully`
              response.error = false
            })
            .catch((error) => {
              console.error("Error updating driver when call updateStatus:", error);
              response.error = true
            })
        }
      })
      .catch((error) => {
        console.error("error in checking Driver's existance when call updateStatus", error);
        response.error = true
      });
    return response

  }else{
    console.log("invalid Object need to update when call updateStatus")
    return response
  }
}
export async function updateDriverNumber(licensePlate, number) { //Use for class Car change driver info in database when route is created
  let response = {
    error: false,
    data: null
  }

    const q = query(CarRef, where("licensePlate", "==", licensePlate))
    await getDocs(q)             //find car exist or not
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("no Car found when call  updateDriverNumber");
          response.error = true
        } else {
          updateDoc(querySnapshot.docs[0].ref, {
            DriverNumber :number
          }).then(
            () => {
              response.data = `car update driver's number at id  :${querySnapshot} when call  updateDriverNumber successfully`
              response.error = false
            })
            .catch((error) => {
              console.error("Error updating driver's number for car when call  updateDriverNumber:", error);
            })
        }
      })
      .catch((error) => {
        console.error("error in checking Car's existance when call  updateDriverNumber", error);
      });
    return response
  }

  export async function updateCarLicensePlate( number,licensePlate) { //Use for class Driver to change car info in database when route is created
    let response = {
      error: false,
      data: null
    }
  
      const q = query(DriverRef, where("number", "==", number))
      await getDocs(q)             //find car exist or not
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            console.log("no Driver found when call  updateCarLicensePlate");
            response.error = true
          } else {
            updateDoc(querySnapshot.docs[0].ref, {
              licensePlate : licensePlate
            }).then(
              () => {
                response.data = `driver update car's license plate at id  :${querySnapshot} when call  updateCarLicensePlate successfully`
                response.error = false
              })
              .catch((error) => {
                console.error("Error updating car's license for driver when call  updateCarLicensePlate:", error);
              })
          }
        })
        .catch((error) => {
          console.error("error in checking Driver's existance when call  updateCarLicensePlate", error);
        });
      return response
    }
  
    
// // deleting documents
