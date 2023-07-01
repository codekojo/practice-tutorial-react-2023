import { useCallback, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { FaQuoteRight, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "./App.css";

function App() {
  const [userData, setUserData] = useState(USERS);
  const [currentUserData, setCurrentUserData] = useState(userData[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxArray, setMaxArray] = useState(userData.length);
  // First Step: When a right or left is clicked a function is invoked
  // Second Step:  We

  const handleChangeUserData = () => {
    setCurrentIndex((prev) => {
      return prev + 1;
    });
  };

  useEffect(() => {
    console.log(currentIndex);
    if (currentIndex > maxArray) {
      console.log(currentIndex > maxArray, currentIndex);
      setCurrentIndex(0);
      setCurrentUserData(userData[0]);
      return;
    } else {
      console.log("currentIndex useEffect", currentIndex);
      // setCurrentUserData(userData[currentIndex]);
    }
  }, [currentIndex]);

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

        <h5 className="card__username">{currentUserData.name}</h5>
        <p className="card__jobType">{currentUserData.title}</p>

        <p className="card__bio">{currentUserData.paragraph}</p>

        <div className="navigate__user">
          <span className="chevron">
            <FaChevronLeft className="chevronRight" />
          </span>
          <span className="chevron">
            <FaChevronRight className="chevronLeft" />
          </span>
        </div>

        <div className="card__btn">
          <p onClick={() => handleChangeUserData()}>Surprise Me</p>
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
