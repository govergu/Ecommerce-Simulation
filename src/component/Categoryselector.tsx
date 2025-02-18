import { useProductContext } from "../store/contextapi";

const CategorySelector = () => {
  const { setSortCategory, sortCategory } = useProductContext();
  return (
    <>
      <p>Select Category</p>
      <select
        value={sortCategory}
        onChange={(e) => setSortCategory(e.target.value)}
        className="w-sm px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="all">All</option>
        <option value="beauty">Beauty</option>
        <option value="fragrances">Fragrances</option>
        <option value="furniture">Furniture</option>
        <option value="groceries">Groceries</option>
      </select>
    </>
  );
};

export default CategorySelector;
