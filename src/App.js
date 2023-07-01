import { useState } from "react";
import { faker } from "@faker-js/faker";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import "./App.css";

function App() {
  const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <main>
      <article className="accordian__container">
        {/* Header */}
        <header className="container__title">
          <h2>Questions And Answers About Login</h2>
        </header>

        {/* Second Component */}
        <section className="accordian__main">
          {USERS.map((user, index) => {
            return (
              <div className="accordian__details">
                <header className="accordian__header">
                  <h4>{user.title}</h4>

                  {currentIndex !== index ? (
                    <FaPlusCircle
                      size={25}
                      onClick={() => setCurrentIndex(index)}
                    />
                  ) : (
                    <FaMinusCircle
                      size={25}
                      onClick={() => setCurrentIndex(null)}
                    />
                  )}
                </header>
                <div className="showContent">
                  {currentIndex === index && <p>{user.paragraph}</p>}
                </div>
              </div>
            );
          })}
        </section>
      </article>
    </main>
  );
}

export default App;

// Create Random User Using Faker.js

function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    title: faker.person.bio(),
    bio: faker.person.bio(),
    paragraph: faker.lorem.paragraphs({ min: 1, max: 2 }),
  };
}

const USERS = faker.helpers.multiple(createRandomUser, {
  count: 5,
});
