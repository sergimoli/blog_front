import { useState } from "react";

// em fet un hook separant tota la logica.

export const useForm = (InitialObject = {}) => {
  const [form, setForm] = useState(InitialObject);

  const serializeForm = (form) => {
    //FormData es de javascript. li passem el formulari del qual li vull extreure les dades
    const formData = new FormData(form);
    // console.log(formData);
    const objComplete = {};
    //Faig un array of i trec aquests dos elements: name i value
    for (let [name, value] of formData) {
      objComplete[name] = value;
    }
    return objComplete;
  };

  const send = (e) => {
    e.preventDefault();
    // console.log(e.target);
    // let course = {
    //   title: e.target.title.value,
    //   year: e.target.year.value,
    //   desc: e.target.description.value,
    //   author: e.target.author.value,
    //   email: e.target.email.value,
    // };
    //seria exactament el mateix que fer un console.log(course)
    console.log(serializeForm(e.target));
    const course = serializeForm(e.target);
    setForm(course);
    // console.log(course);
    // li afegeixo una classe
    document.querySelector(".code").classList.add("send");
  };

  const changed = ({ target }) => {
    //així m'estolvioi el target.name i el target.value
    const { name, value } = target;
    setForm({
      // tenir en el objecte tot el que tenia + propietat nova. Funcionarà per tots els camps.
      ...form,
      [name]: value,
    });
  };

  return {
    form,
    send,
    changed,
  };
};
