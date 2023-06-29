import "./App.css";

import { faker } from "@faker-js/faker";

function _calculateAge(birthday) {
  // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function App() {
  return (
    <article className="card__main">
      <h2>5 birthdays today</h2>
      <CardDetails />
      <CardDetails />
      <CardDetails />
      <CardDetails />
      <CardDetails />
      <CardDetails />

      <div className="btnClearAll" onClick={() => alert("Bow")}>
        <h3>Clear All</h3>
      </div>
    </article>
  );
}

export default App;

// Card Component

function CardDetails() {
  return (
    <section className="card">
      <img
        src={faker.image.urlPicsumPhotos()}
        alt="random avatar from faker"
        className="avatar__image"
      />
      <div className="card__content">
        <h6 className="card__username">{faker.person.fullName()}</h6>
        <p>{_calculateAge(faker.date.birthdate())} years</p>
      </div>
    </section>
  );
}
