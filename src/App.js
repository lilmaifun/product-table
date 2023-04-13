import { useState } from 'react';

// 1st Level (TOP)
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

// 2nd Level
function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText}
        placeholder="Search..." 
        onChange={(e) => onFilterTextChange(e.target.value)}/>
      <label>
        <input 
          type="checkbox"
          checked={inStockOnly} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

// 3rd Level
function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  // Convert the data into component objects and then push into rows array to be
  // displayed in the UI
  products.forEach((product) => {

    // If filterText does not match a product or the product does not exist and is not in stock, do not display it
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }

    /* 
      If product does exist and is stocked
      Add the new category if it's different than the last one
      Then convert each product into a component and push into the rows array
    */
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }

    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );

    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

// 4th Level
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

// 5th Level
function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

// JSON api
const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() { 
  return <FilterableProductTable products={PRODUCTS} />;
}