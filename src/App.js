import { useState } from "react";
import { faker } from "@faker-js/faker";
import { FaQuoteRight, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "./App.css";

function App() {
  const [userData] = useState(USERS);
  const [currentUserData, setCurrentUserData] = useState(userData[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxArray] = useState(userData.length);

  // First Step: When a right or left is clicked a function is invoked
  // Second Step:  We

  //Fix logic and refactor
  const handleChangeUserData = (move) => {
    const currentDataIndex = currentIndex;

    if (currentDataIndex < maxArray - 1) {
      if (move === "navigateRight") {
        setCurrentUserData(userData[currentDataIndex + 1]);
        setCurrentIndex((prev) => {
          return prev + 1;
        });
        return;
      }

      if (move === "navigateLeft") {
        if (!(currentDataIndex - 1 < 0)) {
          setCurrentUserData(userData[currentDataIndex - 1]);
          setCurrentIndex((prev) => {
            return prev - 1;
          });
          return;
        } else {
          setCurrentUserData(userData[maxArray - 1]);
          setCurrentIndex(maxArray - 1);
          return;
        }
      }
    } else {
      setCurrentUserData(userData[0]);
      setCurrentIndex(0);
      return;
    }
  };

  //Function from MDN to get random Int Inclusive
  function getRandomIntInclusive(min = 0, max = 4) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomValue = Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    setCurrentUserData(userData[randomValue]);
    setCurrentIndex(randomValue);
  }

  return (
    <main>
      <section className="card__container">
        <div className="image__container">
          <img
            src={currentUserData.imageSrc}
            height={120}
            width={120}
            className="image__src"
            alt={currentUserData.alt}
          />
          <span className="image__quoteRight">
            <FaQuoteRight />
          </span>
        </div>

        <h5 className="card__username">
          {currentUserData.name} {currentIndex}
        </h5>
        <p className="card__jobType">{currentUserData.title}</p>

        <p className="card__bio">{currentUserData.paragraph}</p>

        <div className="navigate__user">
          <span className="chevron">
            <FaChevronLeft
              className="chevronRight"
              onClick={() => handleChangeUserData("navigateLeft")}
            />
          </span>
          <span className="chevron">
            <FaChevronRight
              className="chevronLeft"
              onClick={() => handleChangeUserData("navigateRight")}
            />
          </span>
        </div>

        <div className="card__btn">
          <p onClick={() => getRandomIntInclusive()}>Surprise Me</p>
        </div>
      </section>
    </main>
  );
}

export default App;

// Create Random User Using Faker.js

function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    name: faker.person.fullName(),
    title: faker.person.jobType(),
    bio: faker.person.bio(),
    paragraph: faker.lorem.paragraphs({ min: 1, max: 2 }),
    imageSrc: faker.image.url(),
    alt: faker.commerce.productDescription(),
  };
}

const USERS = faker.helpers.multiple(createRandomUser, {
  count: 5,
});
