import { useState } from "react";
import { faker } from "@faker-js/faker";
import "./App.css";

function App() {
  const [userData, setUserData] = useState(USERS);

  const removeUserCard = (id) => {
    const usersArray = [...userData];

    if (!id) return;

    const newUsers = usersArray.filter((user) => {
      return user.userId.toLowerCase() !== id.toLowerCase();
    });

    setUserData(newUsers);
  };

  return (
    <main>
      {userData.map((user) => {
        return (
          <CardDetails
            {...user}
            removeUserCard={removeUserCard}
            key={user.userId}
          />
        );
      })}
    </main>
  );
}

export default App;

// Card Details Component

function CardDetails({
  userId,
  title,
  imageSrc,
  price,
  paragraph,
  alt,
  removeUserCard,
}) {
  const [paragraphGreaterThan, setParagraphGreaterThan] = useState(
    paragraph?.length > 150
  );

  const renderParagraph = () => {
    return paragraphGreaterThan ? (
      <>
        <p>
          {paragraph.slice(0, 300)}...{" "}
          <span className="clickMoreParagph" onClick={handleShowMoreParagraph}>
            Read More
          </span>
        </p>
      </>
    ) : (
      <p>{paragraph}</p>
    );
  };

  const handleShowMoreParagraph = () => {
    setParagraphGreaterThan(false);
  };

  return (
    <section className="card" key={userId}>
      <img src={imageSrc} className="card__img" alt={alt} loading="lazy" />
      <div className="card__body" key={userId}>
        {/* Header */}
        <div className="card__header">
          <h3 className="card__title">{title}</h3>
          <p className="card__price">{price}</p>
        </div>

        {/* Description */}

        <p className="card__description">{renderParagraph()}</p>

        {/* Button */}
        <div className="card__btn">
          <p onClick={() => removeUserCard(userId)}>Not interested</p>
        </div>
      </div>
    </section>
  );
}

// Create Random User Using Faker.js

function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    title: faker.person.jobTitle(),
    price: faker.commerce.price({ symbol: "$" }),
    paragraph: faker.lorem.paragraphs({ min: 3, max: 5 }),
    imageSrc: faker.image.url(),
    alt: faker.commerce.productDescription(),
  };
}

const USERS = faker.helpers.multiple(createRandomUser, {
  count: 5,
});
