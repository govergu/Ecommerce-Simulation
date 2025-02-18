import CategorySelector from "../component/Categoryselector";
import ProductList from "../component/productList";

const Dashboard = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <CategorySelector />
      <ProductList />
    </div>
  );
};

export default Dashboard;
