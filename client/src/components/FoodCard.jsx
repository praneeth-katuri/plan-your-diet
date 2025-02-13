import styles from "./FoodCard.module.css";

const FoodCard = ({ food }) => {
  return (
    <div className={styles["food-card"]}>
      <h2>{food.name}</h2>
      <div className={styles.nutrients}>
        <span>🍚 Carbs: {food.carbohydrates}</span>
        <span>🥑 Fats: {food.fats}</span>
        <span>🥩 Proteins: {food.proteins}</span>
      </div>
      <div className={styles.details}>
        <p>
          <strong>Vitamins:</strong> {food.vitamins}
        </p>
        <p>
          <strong>Minerals:</strong> {food.minerals}
        </p>
        <p>
          <strong>Calories:</strong> {food.calories}
        </p>
      </div>
      <p className={styles.info}>{food.info}</p>
    </div>
  );
};

export default FoodCard;
