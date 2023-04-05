/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
// 1. USE "unknow" INSTEAD OF "any"
// "any" turns off the type-check functionality of typescript
// "unknown" tells I currently don't know the type but I will know it in a second jejejeje

interface User {
  id: string;
  name: string;
}

interface Admin extends User {
  token: string;
}

const getData = async () => {
  const fetchDataFromBackend: unknown = await fetch("some.api.here");
};

// create some type guards:

const isAdmin = (obj: object): obj is Admin => {
  if ("token" in obj) {
    return true;
  }
  return false;
};

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
// 2. USE THE "is" OPERATOR:

// using "is" in type guards as before

// const isUser = (obj: object) : boolean => {
//     if("token" in obj){
//         return false
//     }
//     return true;
// }

const isUser = (obj: object): obj is User => {
  // here instead of returning boolean it explicitly says it returs if is type User or not
  if ("token" in obj) {
    return false;
  }
  return true;
};

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
// 3. USE THE "satisfies" OPERATOR (typescript 4.9):
// If there is a type that is the union of two or more types then it determins what of the union types is being used

interface Base64Image {
  data: string;
  width: number;
  height: number;
}

type Image = string | Base64Image;

interface Pokemon {
  id: string;
  name: string;
  image: Image;
}

// Not using "satisfied"
// const bulbasorWrong: Pokemon = {
//     id: "123",
//     name: "Bulbasor",
//     image: "some string here"
// }

// since it does not know if the image is actually a string or of type Base64Image then it does not recognize its methods:
// bulbasorWrong.image.  :(

// Using the "satisfies" operator:

// const bulbasor = {
//   id: "123",
//   name: "Bulbasor",
//   image: "some string here",
// } satisfies Pokemon;

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
// 4. USE ENUMS ASSIGNING STRING:

// wrong
enum EXAMPLE {
  fail,
  success,
}

// if I use the EXAMPLE enum as a param in a function, then it will receive any number:

const getSome = (response: EXAMPLE) => {
  console.log(response);
};

getSome(EXAMPLE.fail);
getSome(EXAMPLE.success);
getSome(100); // don't want this

// Istead do this:

enum GOOD_EXAMPLE {
  fail = "FAIL",
  success = "SUCCESS",
}

const getSome2 = (response: GOOD_EXAMPLE) => {
  console.log(response);
};

getSome2(GOOD_EXAMPLE.fail);
getSome2(GOOD_EXAMPLE.success);
//getSome2(100) does not accept any number!! great!! :)

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
// 5. USE <partial> and <omit>:

interface Product {
  id: string;
  name: string;
  location: string;
  country: string;
}

let updatedProduct: Partial<Omit<Product, "id">>; // the updatedProduct object has any of the Product interface
// keys because is a partial of that interface but it does not have the "id" key because its being omited :)
