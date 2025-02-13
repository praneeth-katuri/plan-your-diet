import foodData from "@/data/foodData";
import FoodCard from "@/components/FoodCard";

const FoodFacts = () => (
  <div
    style={{
      padding: "20px",
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center",
    }}
  >
    {foodData.map((food) => (
      <FoodCard key={food.name} food={food} />
    ))}
  </div>
);

export default FoodFacts;
