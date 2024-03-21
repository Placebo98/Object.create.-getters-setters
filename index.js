// метод create приймаэ 2 параметри і обидва з них Обєкти, перший обєкт являється(призначений для) протитопом для обєкту персен, а в другому ми назначаємо поля для данного обєкту персон

const person = Object.create(
  {},
  {
    name: { value: "Oleg" },
    age: { value: 25 },
    birthYear: { value: 1998 },
  }
);

console.log(person); // видно, что ключи в консоли подсвечиваються бледным цветом, это означает, что они( эти поля) как бы присудсвуют в об'экте, но при итерации по ключам данного об'єкта. они не будут входить в цыкл,
// Пример....

for (let key in person) {
  console.log(key + ": " + person[key]);
}

for (let key in person) {
  console.log("Key", key);
}
// Мы ничего не получаем в консоли, итерации не происходит, но если создадь об`ект по старинке....

// const person1 = {
//   name: "Oleg Tsaryk",
//   birthYear: 1998,
// };
// for (let key in person1) {
//   console.log(key + ": " + person1[key]);
//   console.log("Key", key);
// }
// ...все работает

/// Для того, что бы вернуть дефолтное повидение ключей данного обєкта,мы можем настраивать эти поля, мы можем передавать различные поля, которые называються PropertyDescriptor - ами,

const person2 = Object.create(
  {},
  {
    name: {
      value: "Oleg",
      enumerable: true, //делает поля видимыми
      writable: true, //// позволяет изменять значения поля
      configurable: true, // позволяет удалять какой либо ключ из обэкта
    },
    birthYear: {
      value: 1998,
      enumerable: false, // по умолчании
      writable: false, // по умолчании
      configurable: false, // по умолчании
    },
  }
);

// person2.name = "Nastya";
// console.log(person2);

// for (let key in person2) {
//   console.log(key + ": " + person2[key]);
//   console.log("Key", key);
// }
//////////////////////Геттеры и Сеттеры

const person3 = Object.create(
  {},
  {
    name: {
      value: "Ольга",
      enumerable: true,
      writable: true,
      configurable: true,
    },
    birthYear: {
      value: 2009,
      enumerable: false,
      writable: false,
      configurable: false,
    },
    age: {
      get() {
        // геттер должен что-то возвращать
        return new Date().getFullYear() - this.birthYear;
      },
      set(value) {
        //в сеттерах можно делать что угодно
        this.name = value;
        document.body.style.backgroundColor = "red";
      },
    },
  }
);

// console.log(person3.age + " years old");
// console.log(person3.age("Вольтарен"));
person3.age = "Вольтарен";
// console.log(person3);

////////////////////----hasOwnProperty

const person4 = Object.create(
  {
    // Добавляем в певрый обэкт прототип,
    // дублируем функцию которая показывает возраст
    calcAge() {
      console.log("age", new Date().getFullYear() - this.birthYear);
    },
  },
  {
    name: {
      value: "Ольга",
      enumerable: true,
      writable: true,
      configurable: true,
    },
    birthYear: {
      value: 2009,
      enumerable: false,
      writable: false,
      configurable: false,
    },
    age: {
      get() {
        return new Date().getFullYear() - this.birthYear;
      },
      set(value) {
        this.name = value;
        document.body.style.backgroundColor = "red";
      },
    },
  }
);
////теперь в консоли в прототипе обэкта можно увидеть, что есть метод сalcAge

// for (let key in person4) {
//   console.log(key + ": " + person4[key]);
//   console.log("Key", key);
// }
// person4.calcAge();

/////для того что бы не пробегаться по прототипу, а только по собственным ключам обэкта в итерации методом ForIn рекомендовано использовать метод hasOwnProperty
for (const key in person4) {
  if (Object.hasOwnProperty(key)) {
    console.log("key", key, person4[key]);
  }
}
