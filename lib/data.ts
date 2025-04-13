export type Product = {
    id: string;
    name: string;
    description: string;
    image: string;
    price: string;
    oldPrice?: string;
    details: string;
};
export const products: Product[] = [
    { 
        id: 'classic',
        name: 'კლასიკური 1კგ.', 
        description: 'არაქისის კარაქი 1კგ | Peanut Butter 1kg | Snacky', 
        image: '/images/product/1.jpg', 
        price: '24.50₾', 
        oldPrice: '35.00₾', 
        details: 'ახლად მოხალული არაქისის კარაქი დანამატების გარეშე Snacky – არაქისის კარაქი არის უმაღლესი ხარისხის ახლად მოხალული ქართული მიწის თხილის კარაქი. მიწის თხილის კარაქს საკმაოდ მაღალი კვებითი ღირებულება გააჩნია. იგი დიდი რაოდენობით შეიცავს ცილებს, ჯანსაღ ცხიმს, საკვებ ბოჭკოსა და მცირე რაოდენობის ნახშირწყალს. იგი ცილის კარგი წყაროა, რაც ძალზედ სასარგებლო პროდუქტად აქცევს იმ ადამიანებისათვის, რომლებიც არ იღებენ ცილას ცხოველური წყაროებიდან (ვეგანებისა და ვეგეტარიანელებისათვის).' 
    },
    { id: 'crunchy', name: '2+1', description: '2 დიდი + 1 პატარა საჩუქრად 🎁', image: '/images/product/2+1.jpg', price: '49.00₾', oldPrice: '90.00₾', details: '' },
    { id: 'choco', name: '4+2', description: '4 დიდი + 2 პატარა საჩუქრად 🎁', image: '/images/product/4+2.jpg', price: '89.00₾', oldPrice: '180.00₾', details: '' },
    { id: 'protein', name: '400 გრ.', description: 'არაქისის კარაქი 400გ. | Peanut Butter 400g. | Snacky', image: '/images/product/400.jpg', price: '10.00₾', oldPrice: '19.00₾', details: '' },
];

// --- NEW FUNCTION ---
export function getProductById(id: string): Product | undefined {
    // Find the product in the array that matches the given id
    return products.find((product) => product.id === id);
}

// Optional: Function to get all product IDs for generateStaticParams
export function getAllProductIds() {
    return products.map((product) => ({
        id: product.id,
    }));
}
// --- END OF NEW FUNCTION ---
